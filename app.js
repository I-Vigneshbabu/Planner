// IPL - Input Planner List - Main Application
// This is a comprehensive task management and productivity tool

class IPLPlanner {
    constructor() {
        this.tasks = [];
        this.habits = [];
        this.sessions = [];
        this.currentDate = new Date();
        this.currentWeekStart = this.getWeekStart(new Date());
        this.timerRunning = false;
        this.timerInterval = null;
        this.currentTime = 25 * 60; // 25 minutes in seconds
        this.isWorkSession = true;
        this.completedToday = 0;
        
        this.initializeDB();
        this.loadData();
        this.setupEventListeners();
        this.renderDashboard();
        this.initializeTheme();
        this.checkNotificationPermission();
    }

    // Database Operations
    initializeDB() {
        if (!window.indexedDB) {
            console.warn('IndexedDB not supported, using localStorage only');
        }
    }

    loadData() {
        const stored = localStorage.getItem('plannerData');
        if (stored) {
            const data = JSON.parse(stored);
            this.tasks = data.tasks || [];
            this.habits = data.habits || [];
            this.sessions = data.sessions || [];
        }
        this.saveData();
    }

    saveData() {
        const data = {
            tasks: this.tasks,
            habits: this.habits,
            sessions: this.sessions,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('plannerData', JSON.stringify(data));
        this.updateStorageInfo();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
            btn.addEventListener('click', (e) => {
                const viewName = e.target.dataset.view;
                if (viewName) { // Only switch view if data-view exists
                    this.switchView(viewName);
                }
            });
        });

        // Templates Dropdown Logic
        const dropdownButton = document.querySelector('.dropdown .nav-btn');
        if (dropdownButton) {
            dropdownButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevents the window click listener from closing it immediately
                const dropdownContent = dropdownButton.nextElementSibling;
                dropdownContent.classList.toggle('show');
            });
        }

        // Close dropdown when clicking outside
        window.addEventListener('click', (event) => {
            if (!event.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-content.show').forEach(dropdown => dropdown.classList.remove('show'));
            }
        });

        // Dashboard
        document.getElementById('addTaskBtn')?.addEventListener('click', () => this.addTask());
        document.getElementById('taskInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterTasks(e.target.dataset.filter));
        });

        document.getElementById('searchInput')?.addEventListener('input', (e) => this.searchTasks(e.target.value));

        // Weekly
        document.getElementById('prevWeek')?.addEventListener('click', () => this.previousWeek());
        document.getElementById('nextWeek')?.addEventListener('click', () => this.nextWeek());

        // Habits
        document.getElementById('addHabitBtn')?.addEventListener('click', () => this.addHabit());
        document.getElementById('habitInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addHabit();
        });

        // Pomodoro
        document.getElementById('startBtn')?.addEventListener('click', () => this.startTimer());
        document.getElementById('pauseBtn')?.addEventListener('click', () => this.pauseTimer());
        document.getElementById('resetBtn')?.addEventListener('click', () => this.resetTimer());
        document.getElementById('workDuration')?.addEventListener('change', () => this.resetTimer());
        document.getElementById('breakDuration')?.addEventListener('change', () => this.resetTimer());

        // Modal
        const modal = document.getElementById('taskModal');
        document.querySelector('.close')?.addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-close')?.addEventListener('click', () => this.closeModal());
        document.getElementById('saveTaskBtn')?.addEventListener('click', () => this.saveEditedTask());
        document.getElementById('deleteTaskBtn')?.addEventListener('click', () => this.deleteTask());
        
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        // Settings
        document.getElementById('themeToggle')?.addEventListener('change', (e) => this.toggleTheme(e.target.checked));
        document.getElementById('colorPicker')?.addEventListener('change', (e) => this.changeThemeColor(e.target.value));
        document.getElementById('browserNotif')?.addEventListener('change', () => this.saveData());
        document.getElementById('timerNotif')?.addEventListener('change', () => this.saveData());

        // Export/Import
        document.getElementById('exportPdf')?.addEventListener('click', () => this.exportPdf());
        document.getElementById('exportCsv')?.addEventListener('click', () => this.exportCsv());
        document.getElementById('downloadData')?.addEventListener('click', () => this.downloadJson());
        document.getElementById('importData')?.addEventListener('click', () => {
            document.getElementById('importInput').click();
        });
        document.getElementById('importInput')?.addEventListener('change', (e) => this.importData(e));
        document.getElementById('clearData')?.addEventListener('click', () => this.clearAllData());
    }

    // View Management
    switchView(viewName) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        const view = document.getElementById(viewName);
        if (view) {
            view.classList.add('active');
        }

        document.querySelector(`[data-view="${viewName}"]`)?.classList.add('active');

        // Render view-specific content
        switch(viewName) {
            case 'weekly':
                this.renderWeekly();
                break;
            case 'habits':
                this.renderHabits();
                break;
            case 'pomodoro':
                this.renderPomodoro();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'dashboard':
            default:
                this.renderDashboard();
        }
    }

    // Task Management
    addTask() {
        const input = document.getElementById('taskInput');
        const priority = document.getElementById('prioritySelect').value;
        const taskName = input?.value.trim();

        if (!taskName) {
            this.showNotification('Please enter a task name', 'warning');
            return;
        }

        const task = {
            id: Date.now(),
            name: taskName,
            description: '',
            priority: priority,
            completed: false,
            date: new Date().toISOString().split('T')[0],
            tags: [],
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveData();
        input.value = '';
        this.renderDashboard();
        this.showNotification('Task added successfully! 🎉', 'success');
    }

    deleteTask(taskId = null) {
        if (!taskId) {
            taskId = parseInt(document.getElementById('editTaskId').value);
        }

        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveData();
        this.closeModal();
        this.renderDashboard();
        this.showNotification('Task deleted', 'success');
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        document.getElementById('editTaskId').value = taskId;
        document.getElementById('editTaskName').value = task.name;
        document.getElementById('editTaskDesc').value = task.description || '';
        document.getElementById('editTaskPriority').value = task.priority;
        document.getElementById('editTaskDate').value = task.date;
        document.getElementById('editTaskTags').value = task.tags?.join(', ') || '';

        document.getElementById('taskModal').classList.add('active');
    }

    saveEditedTask() {
        const taskId = parseInt(document.getElementById('editTaskId').value);
        const task = this.tasks.find(t => t.id === taskId);

        if (task) {
            task.name = document.getElementById('editTaskName').value;
            task.description = document.getElementById('editTaskDesc').value;
            task.priority = document.getElementById('editTaskPriority').value;
            task.date = document.getElementById('editTaskDate').value;
            task.tags = document.getElementById('editTaskTags').value
                .split(',')
                .map(t => t.trim())
                .filter(t => t);

            this.saveData();
            this.closeModal();
            this.renderDashboard();
            this.showNotification('Task updated! 📝', 'success');
        }
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            
            if (task.completed) {
                this.completedToday++;
                this.showNotification(`Great job! Task completed 🎊`, 'success');
            }
            
            this.saveData();
            this.renderDashboard();
        }
    }

    filterTasks(filter) {
        const container = document.getElementById('tasksList');
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`)?.classList.add('active');

        let filtered = this.tasks.filter(t => {
            const today = new Date().toISOString().split('T')[0];
            return t.date === today;
        });

        if (filter !== 'all') {
            if (filter === 'completed') {
                filtered = filtered.filter(t => t.completed);
            } else {
                filtered = filtered.filter(t => t.priority === filter);
            }
        }

        this.renderTasksList(filtered, container);
    }

    searchTasks(query) {
        const today = new Date().toISOString().split('T')[0];
        let filtered = this.tasks.filter(t => t.date === today);

        if (query) {
            filtered = filtered.filter(t => 
                t.name.toLowerCase().includes(query.toLowerCase()) ||
                t.description.toLowerCase().includes(query.toLowerCase()) ||
                t.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );
        }

        this.renderTasksList(filtered, document.getElementById('tasksList'));
    }

    // Dashboard Rendering
    renderDashboard() {
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = this.tasks.filter(t => t.date === today);
        const completedTasks = todayTasks.filter(t => t.completed);

        document.getElementById('taskCount').textContent = todayTasks.length;
        document.getElementById('completedCount').textContent = completedTasks.length;
        document.getElementById('streakCount').textContent = this.calculateStreak();

        // Reset filter
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('[data-filter="all"]')?.classList.add('active');

        this.renderTasksList(todayTasks, document.getElementById('tasksList'));
    }

    renderTasksList(tasks, container) {
        if (!container) return;

        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">✨</span>
                    <p>No tasks yet. Add one to get started!</p>
                </div>
            `;
            return;
        }

        // Sort by priority
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        container.innerHTML = tasks.map(task => `
            <div class="task-card ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="planner.toggleTask(${task.id})"
                >
                <div class="task-content" onclick="planner.editTask(${task.id})" style="cursor: pointer;">
                    <div class="task-title">${this.escapeHtml(task.name)}</div>
                    ${task.description ? `<p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${this.escapeHtml(task.description)}</p>` : ''}
                    <div class="task-meta">
                        <span class="task-priority ${task.priority}">${task.priority} Priority</span>
                        <span class="task-date">${new Date(task.date).toLocaleDateString()}</span>
                        ${task.tags?.length > 0 ? `<span>${task.tags.join(', ')}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn" onclick="planner.editTask(${task.id})" title="Edit">✏️</button>
                    <button class="task-btn" onclick="planner.deleteTask(${task.id})" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    closeModal() {
        document.getElementById('taskModal').classList.remove('active');
    }

    // Habit Management
    addHabit() {
        const input = document.getElementById('habitInput');
        const habitName = input?.value.trim();

        if (!habitName) {
            this.showNotification('Please enter a habit name', 'warning');
            return;
        }

        const habit = {
            id: Date.now(),
            name: habitName,
            streak: 0,
            lastCompleted: null,
            createdAt: new Date().toISOString(),
            completionDates: []
        };

        this.habits.push(habit);
        this.saveData();
        input.value = '';
        this.renderHabits();
        this.showNotification('Habit added! Start tracking! 🎯', 'success');
    }

    toggleHabitDay(habitId, dateStr) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        if (!habit.completionDates) {
            habit.completionDates = [];
        }

        const index = habit.completionDates.indexOf(dateStr);
        if (index > -1) {
            habit.completionDates.splice(index, 1);
        } else {
            habit.completionDates.push(dateStr);
        }

        habit.streak = this.calculateHabitStreak(habit);
        this.saveData();
        this.renderHabits();
    }

    calculateHabitStreak(habit) {
        if (!habit.completionDates || habit.completionDates.length === 0) return 0;

        const dates = habit.completionDates
            .map(d => new Date(d).getTime())
            .sort((a, b) => b - a);

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < dates.length; i++) {
            const checkDate = new Date(dates[i]);
            checkDate.setHours(0, 0, 0, 0);

            const expectedDate = new Date(currentDate);
            expectedDate.setDate(expectedDate.getDate() - i);

            if (checkDate.getTime() === expectedDate.getTime()) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    renderHabits() {
        const container = document.getElementById('habitsList');
        if (!container) return;

        if (this.habits.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">🎯</span>
                    <p>No habits yet. Create one to start tracking!</p>
                </div>
            `;
            return;
        }

        const today = new Date();
        const last30Days = this.getLast30Days();

        container.innerHTML = this.habits.map(habit => {
            const dayLabels = last30Days.map(date => date.toLocaleDateString('en-US', { weekday: 'short' }));
            
            return `
                <div class="habit-card">
                    <div class="habit-header">
                        <div class="habit-title">${this.escapeHtml(habit.name)}</div>
                        <div class="habit-streak">🔥 ${habit.streak}</div>
                    </div>
                    <div class="habit-calendar">
                        ${last30Days.map((date, idx) => {
                            const dateStr = date.toISOString().split('T')[0];
                            const isCompleted = habit.completionDates?.includes(dateStr);
                            const isToday = dateStr === new Date().toISOString().split('T')[0];
                            
                            return `
                                <div 
                                    class="habit-day ${isCompleted ? 'completed' : isToday ? 'active' : ''}"
                                    onclick="planner.toggleHabitDay(${habit.id}, '${dateStr}')"
                                    title="${dayLabels[idx]} ${date.getDate()}"
                                >
                                    ${date.getDate()}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Weekly Planner
    renderWeekly() {
        this.updateWeekDisplay();
        const container = document.getElementById('weeklyGrid');
        if (!container) return;

        const days = [];
        const start = new Date(this.currentWeekStart);

        for (let i = 0; i < 7; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i);
            days.push(date);
        }

        container.innerHTML = days.map(date => {
            const dateStr = date.toISOString().split('T')[0];
            const dayTasks = this.tasks.filter(t => t.date === dateStr);
            
            return `
                <div class="day-card">
                    <div class="day-header">
                        ${date.toLocaleDateString('en-US', { weekday: 'short' })}
                        <br>
                        ${date.getDate()}
                    </div>
                    <div class="day-tasks">
                        ${dayTasks.map(task => `
                            <div class="day-task ${task.completed ? 'completed' : ''}" draggable="true">
                                <input 
                                    type="checkbox" 
                                    ${task.completed ? 'checked' : ''}
                                    onchange="planner.toggleTask(${task.id})"
                                    style="margin-right: 0.5rem;"
                                >
                                <span>${this.escapeHtml(task.name)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    previousWeek() {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
        this.renderWeekly();
    }

    nextWeek() {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
        this.renderWeekly();
    }

    updateWeekDisplay() {
        const start = new Date(this.currentWeekStart);
        const end = new Date(start);
        end.setDate(end.getDate() + 6);

        const display = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        const weekDisplay = document.getElementById('weekDisplay');
        if (weekDisplay) {
            weekDisplay.textContent = `Week of ${display}`;
        }
    }

    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.setDate(diff));
    }

    // Pomodoro Timer
    renderPomodoro() {
        this.updateTimerDisplay();
        this.renderSessions();
    }

    startTimer() {
        if (this.timerRunning) return;

        this.timerRunning = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;

        this.timerInterval = setInterval(() => {
            this.currentTime--;

            if (this.currentTime <= 0) {
                this.completeSession();
            }

            this.updateTimerDisplay();
        }, 1000);
    }

    pauseTimer() {
        this.timerRunning = false;
        clearInterval(this.timerInterval);
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
    }

    resetTimer() {
        this.pauseTimer();
        const workDuration = parseInt(document.getElementById('workDuration')?.value || 25);
        this.currentTime = workDuration * 60;
        this.isWorkSession = true;
        document.getElementById('startBtn').disabled = false;
        this.updateTimerDisplay();
    }

    completeSession() {
        this.pauseTimer();
        const duration = this.isWorkSession ? 
            parseInt(document.getElementById('workDuration').value) : 
            parseInt(document.getElementById('breakDuration').value);

        const session = {
            id: Date.now(),
            type: this.isWorkSession ? 'work' : 'break',
            duration: duration,
            completedAt: new Date().toISOString()
        };

        this.sessions.push(session);

        if (this.isWorkSession && document.getElementById('timerNotif').checked) {
            this.sendNotification('Pomodoro Work Session Complete!', 'Time for a break!');
        } else if (!this.isWorkSession && document.getElementById('timerNotif').checked) {
            this.sendNotification('Break Over!', 'Ready for another session?');
        }

        this.isWorkSession = !this.isWorkSession;
        const duration2 = this.isWorkSession ? 
            parseInt(document.getElementById('workDuration').value) : 
            parseInt(document.getElementById('breakDuration').value);
        this.currentTime = duration2 * 60;

        this.saveData();
        this.renderPomodoro();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.textContent = display;
        }

        const timerMode = document.getElementById('timerMode');
        if (timerMode) {
            timerMode.textContent = this.isWorkSession ? 'Work' : 'Break';
        }

        // Update circle progress
        const workDuration = parseInt(document.getElementById('workDuration')?.value || 25);
        const breakDuration = parseInt(document.getElementById('breakDuration')?.value || 5);
        const totalDuration = this.isWorkSession ? workDuration * 60 : breakDuration * 60;
        const progress = ((totalDuration - this.currentTime) / totalDuration) * 282.6;
        
        const circle = document.getElementById('timerCircle');
        if (circle) {
            circle.style.strokeDashoffset = 282.6 - progress;
        }
    }

    renderSessions() {
        const container = document.getElementById('sessionsList');
        if (!container) return;

        const today = new Date().toISOString().split('T')[0];
        const todaysSessions = this.sessions.filter(s => s.completedAt.split('T')[0] === today);

        if (todaysSessions.length === 0) {
            container.innerHTML = '<p class="empty-text">No sessions yet</p>';
            return;
        }

        container.innerHTML = todaysSessions.reverse().map(session => `
            <div class="session-item">
                ${session.type === 'work' ? '💼' : '☕'} ${session.type.toUpperCase()} - ${session.duration} min @ ${new Date(session.completedAt).toLocaleTimeString()}
            </div>
        `).join('');
    }

    // Analytics
    renderAnalytics() {
        this.renderProductivityScore();
        this.renderMostProductiveTime();
        this.renderHabitStats();
    }

    renderProductivityScore() {
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = this.tasks.filter(t => t.date === today);
        
        if (todayTasks.length === 0) {
            document.getElementById('productivityScore').textContent = '0';
            document.getElementById('scoreDescription').textContent = 'Complete tasks to improve your score!';
            return;
        }

        const completed = todayTasks.filter(t => t.completed).length;
        const score = Math.round((completed / todayTasks.length) * 100);

        document.getElementById('productivityScore').textContent = score;
        
        let description = '';
        if (score === 100) description = '🎉 Perfect! All tasks completed!';
        else if (score >= 80) description = '🌟 Excellent work!';
        else if (score >= 60) description = '👍 Good progress!';
        else if (score >= 40) description = '💪 Keep pushing!';
        else description = '🚀 You can do better!';

        document.getElementById('scoreDescription').textContent = description;
    }

    renderMostProductiveTime() {
        const hours = {};
        this.tasks.filter(t => t.completed).forEach(task => {
            const hour = new Date(task.date).getHours();
            hours[hour] = (hours[hour] || 0) + 1;
        });

        const container = document.getElementById('mostProductiveTime');
        if (!container) return;

        if (Object.keys(hours).length === 0) {
            container.innerHTML = '<p>Complete tasks to see your most productive time!</p>';
            return;
        }

        const mostProductive = Object.entries(hours).sort((a, b) => b[1] - a[1])[0];
        const hour = parseInt(mostProductive[0]);
        const count = mostProductive[1];
        
        container.innerHTML = `<p><strong>${hour}:00</strong> - ${count} tasks completed</p>`;
    }

    renderHabitStats() {
        const container = document.getElementById('habitStats');
        if (!container) return;

        if (this.habits.length === 0) {
            container.innerHTML = '<p class="empty-text">No habit data yet</p>';
            return;
        }

        const stats = this.habits.map(h => `
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: var(--light-bg); border-radius: 6px;">
                <strong>${this.escapeHtml(h.name)}</strong><br>
                Streak: <span style="color: var(--primary-color); font-weight: bold;">🔥 ${h.streak}</span>
            </div>
        `).join('');

        container.innerHTML = stats;
    }

    // Theme Management
    initializeTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        const color = localStorage.getItem('themeColor') || '#6366f1';

        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeToggle').checked = true;
        }

        document.documentElement.style.setProperty('--primary-color', color);
        document.getElementById('colorPicker').value = color;
    }

    toggleTheme(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }

    changeThemeColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
        localStorage.setItem('themeColor', color);
    }

    // Notifications
    checkNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    sendNotification(title, options = {}) {
        if (document.getElementById('browserNotif')?.checked && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="75" font-size="80" text-anchor="middle">📋</text></svg>',
                ...options
            });
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Export/Import
    exportPdf() {
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = this.tasks.filter(t => t.date === today);
        
        let content = `
            <h1>Daily Planner - ${new Date().toLocaleDateString()}</h1>
            <h2>Tasks</h2>
            ${todayTasks.length === 0 ? '<p>No tasks</p>' : `
                <ul>
                    ${todayTasks.map(t => `
                        <li>${t.completed ? '✓' : '○'} ${t.name} (${t.priority})</li>
                    `).join('')}
                </ul>
            `}
            <h2>Habits</h2>
            ${this.habits.length === 0 ? '<p>No habits</p>' : `
                <ul>
                    ${this.habits.map(h => `
                        <li>${h.name} - Streak: ${h.streak}</li>
                    `).join('')}
                </ul>
            `}
        `;

        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
    }

    exportCsv() {
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = this.tasks.filter(t => t.date === today);

        let csv = 'Task,Priority,Status,Date\n';
        csv += todayTasks.map(t => 
            `"${t.name}","${t.priority}","${t.completed ? 'Completed' : 'Pending'}","${t.date}"`
        ).join('\n');

        this.downloadFile(csv, 'tasks.csv', 'text/csv');
    }

    downloadJson() {
        const data = {
            tasks: this.tasks,
            habits: this.habits,
            sessions: this.sessions,
            exportedAt: new Date().toISOString()
        };

        this.downloadFile(JSON.stringify(data, null, 2), 'planner-data.json', 'application/json');
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.tasks = data.tasks || [];
                this.habits = data.habits || [];
                this.sessions = data.sessions || [];
                this.saveData();
                this.showNotification('Data imported successfully! 📥', 'success');
                this.renderDashboard();
            } catch (error) {
                this.showNotification('Error importing data', 'error');
                console.error(error);
            }
        };
        reader.readAsText(file);
    }

    downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        this.showNotification(`${filename} downloaded! 📥`, 'success');
    }

    clearAllData() {
        if (confirm('Are you sure you want to delete all data? This cannot be undone!')) {
            this.tasks = [];
            this.habits = [];
            this.sessions = [];
            localStorage.clear();
            this.showNotification('All data cleared', 'success');
            this.renderDashboard();
        }
    }

    updateStorageInfo() {
        if (navigator.storage?.estimate) {
            navigator.storage.estimate().then(estimate => {
                const used = (estimate.usage / 1024 / 1024).toFixed(2);
                document.getElementById('storageUsed').textContent = `${used} MB`;
            });
        }
    }

    // Utility Functions
    calculateStreak() {
        let streak = 0;
        let currentDate = new Date();

        while (true) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const dayTasks = this.tasks.filter(t => t.date === dateStr);
            const allCompleted = dayTasks.length > 0 && dayTasks.every(t => t.completed);

            if (allCompleted) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    getLast30Days() {
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date);
        }
        return days;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize the application
let planner;
document.addEventListener('DOMContentLoaded', () => {
    planner = new IPLPlanner();
    
    // Mobile menu optimization
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Auto-scroll to top on mobile
                window.scrollTo(0, 0);
            });
        });
    }
});

// Service Worker for offline support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}

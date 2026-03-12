# Smart Daily Planner - Developer Guide

## Quick Start for Developers

### Project Structure
```
smart-planner/
├── index.html          # Main HTML file with SEO & PWA config
├── styles.css          # All styling (dark mode, responsive)
├── app.js              # Main application logic (SmartPlanner class)
├── sw.js               # Service Worker for offline support
├── manifest.json       # PWA manifest
├── package.json        # NPM configuration
├── README.md           # User documentation
├── DEPLOYMENT.md       # Deployment guide
├── FEATURES.md         # Feature documentation
├── .htaccess          # Apache configuration
├── app.yaml           # Google App Engine config
├── netlify.toml       # Netlify configuration
├── robots.txt         # SEO robots file
├── sitemap.xml        # SEO sitemap
├── .gitignore         # Git ignore rules
└── DEVELOPER.md       # This file
```

### Getting Started

#### 1. Local Development
```bash
# No build required - just open index.html
# Or use a local server:

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# Then open http://localhost:8000
```

#### 2. Code Structure

##### Main Application Class (app.js)
```javascript
class SmartPlanner {
    constructor()          // Initialize app
    loadData()            // Load from localStorage
    saveData()            // Save to localStorage
    
    // Dashboard
    addTask()             // Create new task
    deleteTask(id)        // Delete task
    editTask(id)          // Open edit modal
    toggleTask(id)        // Mark complete/incomplete
    
    // Weekly
    renderWeekly()        // Render weekly view
    previousWeek()        // Navigate weeks
    nextWeek()            // Navigate weeks
    
    // Habits
    addHabit()            // Create new habit
    toggleHabitDay(id)    // Toggle habit day completion
    
    // Pomodoro
    startTimer()          // Start timer
    pauseTimer()          // Pause timer
    resetTimer()          // Reset timer
    
    // Settings
    toggleTheme()         // Toggle dark mode
    changeThemeColor()    // Change primary color
    exportPdf()           // Export as PDF
    exportCsv()           // Export as CSV
    importData()          // Restore from JSON
}

// Initialize
planner = new SmartPlanner()
```

### Key Functions to Know

#### Data Operations
```javascript
// All data is in localStorage
localStorage.getItem('plannerData')      // Get data
localStorage.setItem('plannerData', data) // Save data
localStorage.removeItem('plannerData')   // Clear data

// Data structure
{
  tasks: [],
  habits: [],
  sessions: [],
  lastSaved: timestamp
}
```

#### DOM Manipulation
```javascript
// Main container
#app                    // Root element
#tasksList              // Task container
#habitsList             // Habits container
#weeklyGrid             // Weekly planner
#timerDisplay           // Pomodoro display

// Render functions
renderDashboard()       // Render task list
renderTasksList(tasks)  // Render specific tasks
renderWeekly()          // Render weekly view
renderHabits()          // Render habits
renderPomodoro()        // Render timer
renderAnalytics()       // Render charts
```

#### View Switching
```javascript
// Each view is a section with id
#dashboard    - Daily tasks
#weekly       - Weekly planner
#habits       - Habit tracker
#pomodoro     - Pomodoro timer
#analytics    - Analytics dashboard
#settings     - Settings page

// Switch view
switchView(viewName)    // Changes .active class
```

### Extending the Application

#### Add a New Feature

1. **Add to HTML** (index.html)
```html
<section id="myfeature" class="view">
    <!-- Your feature markup -->
</section>

<!-- Add nav button -->
<button class="nav-btn" data-view="myfeature">My Feature</button>
```

2. **Add Styling** (styles.css)
```css
/* Add CSS for your feature */
#myfeature {
    /* styles */
}
```

3. **Add Logic** (app.js)
```javascript
// Add method to SmartPlanner class
renderMyFeature() {
    // Render your feature
}

// Add event listeners in setupEventListeners()
document.querySelector('[data-view="myfeature"]')
    ?.addEventListener('click', () => this.switchView('myfeature'));
```

#### Add a New Task Property

1. **Update Task Creation** (app.js)
```javascript
const task = {
    id: Date.now(),
    name: taskName,
    // New property
    myProperty: 'value',
    createdAt: new Date().toISOString()
};
```

2. **Update Display** (app.js)
```javascript
// In renderTasksList
return `
    <div class="task-card">
        <!-- Add display of myProperty -->
        <span>${task.myProperty}</span>
    </div>
`;
```

3. **Update Storage Schema** (localStorage)
- Data automatically saves when you modify task object

#### Add New Storage

```javascript
// Add to loadData()
const customData = localStorage.getItem('customKey');

// Add to saveData()
localStorage.setItem('customKey', JSON.stringify(customData));
```

### Common Tasks

#### Change Color Scheme
Edit `:root` variables in styles.css:
```css
:root {
    --primary-color: #6366f1;      /* Main color */
    --secondary-color: #8b5cf6;    /* Accent */
    --success-color: #10b981;      /* Success */
    --danger-color: #ef4444;       /* Danger */
    /* ... more colors ... */
}
```

#### Add a New Priority Level
1. Update priority select (index.html)
```html
<option value="Urgent">Urgent</option>
```

2. Add styling (styles.css)
```css
.task-priority.Urgent {
    background: rgba(color, 0.1);
    color: #color;
}
```

3. Update priority order (app.js)
```javascript
const priorityOrder = { 
    Urgent: 0,
    High: 1, 
    Medium: 2, 
    Low: 3 
};
```

#### Change Timer Durations
Default values in app.js:
```javascript
this.currentTime = 25 * 60;  // Work duration
// Change to 20 * 60 for 20 minutes
```

Or let users change in UI (already implemented in settings).

#### Add Persistent Settings

```javascript
// Save setting
localStorage.setItem('mySetting', value);

// Load setting on init
const mySetting = localStorage.getItem('mySetting') || 'default';

// Apply setting
if (mySetting === 'value') {
    // Do something
}
```

### Debug Tips

#### Console Logging
```javascript
// View all data
console.log(planner.tasks);
console.log(planner.habits);
console.log(localStorage.getItem('plannerData'));

// Debug a function
console.log('Function called with:', taskId);

// Performance monitoring
console.time('renderDashboard');
planner.renderDashboard();
console.timeEnd('renderDashboard');
```

#### Browser DevTools
```javascript
// In console, access planner instance
planner.tasks                // View all tasks
planner.habits               // View all habits
planner.renderDashboard()    // Reload view
localStorage.clear()         // Clear all data
```

#### Testing
```javascript
// Manual test in console
planner.addTask()            // Trigger add task

// Add test data
planner.tasks.push({
    id: Date.now(),
    name: 'Test Task',
    priority: 'High',
    completed: false,
    date: new Date().toISOString().split('T')[0]
});
planner.saveData();
planner.renderDashboard();
```

### Performance Optimization

#### Reduce Rendering
```javascript
// Bad - renders entire list every filter
this.renderTasksList(this.tasks);

// Good - only render filtered results
const filtered = this.tasks.filter(/* condition */);
this.renderTasksList(filtered);
```

#### Efficient DOM Updates
```javascript
// Bad - rebuilds entire HTML
container.innerHTML = html;

// Good - reuse existing elements
const existing = container.querySelector('#task-' + id);
existing.className = 'task-card completed';
```

#### Cache Selectors
```javascript
// Bad - queries DOM every time
document.getElementById('tasksList').innerHTML = html;
document.getElementById('tasksList').addEventListener('click', handler);

// Good - cache reference
const container = document.getElementById('tasksList');
container.innerHTML = html;
container.addEventListener('click', handler);
```

### Testing Checklist

- [ ] Add task
- [ ] Edit task
- [ ] Delete task
- [ ] Mark complete/incomplete
- [ ] Filter by priority
- [ ] Search tasks
- [ ] Add habit
- [ ] Toggle habit days
- [ ] Start/pause/reset timer
- [ ] Toggle dark mode
- [ ] Export PDF/CSV
- [ ] Import JSON
- [ ] Check localStorage
- [ ] Test on mobile
- [ ] Test offline (DevTools → Network → Offline)

### Browser APIs Used

#### localStorage
- Persistent client-side storage
- 5-10MB limit per domain
- No expiration

#### Service Worker
- Background caching
- Offline support
- Background sync (planned)

#### Notification API
- Browser notifications
- Permission required
- User can allow/deny

#### File API
- Read imported JSON
- Download exports

#### Intl API
- Localized dates
- Number formatting

### Deployment Checklist

Before deploying:
- [ ] Update domain in index.html meta tags
- [ ] Update robots.txt domain
- [ ] Update sitemap.xml domain
- [ ] Test all features
- [ ] Check console for errors
- [ ] Verify offline mode works
- [ ] Test on mobile
- [ ] Run Lighthouse audit
- [ ] Enable HTTPS
- [ ] Configure caching headers
- [ ] Setup monitoring/alerts

### Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### Code Style Guide

#### JavaScript
```javascript
// Use camelCase for variables/functions
const myVariable = 'value';
function myFunction() { }

// Use UPPERCASE for constants
const MAX_PRIORITY = 3;

// Use single quotes
const string = 'value';

// Use template literals for interpolation
const message = `Hello, ${name}`;

// Arrow functions preferred
const result = array.map(item => item * 2);
```

#### CSS
```css
/* Use kebab-case for class names */
.my-element {
    /* properties */
}

/* Use CSS variables for colors */
color: var(--primary-color);

/* Mobile first */
@media (min-width: 768px) {
    /* tablet styles */
}
```

#### HTML
```html
<!-- Use semantic elements -->
<header>
<nav>
<main>
<section>
<article>
<footer>

<!-- Use data attributes -->
<button data-view="dashboard">View</button>

<!-- Use aria labels -->
<button aria-label="Close">×</button>
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/MyFeature`)
3. Make changes
4. Test thoroughly
5. Commit with clear messages
6. Push to branch
7. Create Pull Request

## License

MIT License - Free for personal and commercial use

---

**Happy coding! 🚀**

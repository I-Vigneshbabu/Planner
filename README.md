# 📋 Smart Daily Planner

A comprehensive, modern task management and productivity application with advanced features including habit tracking, Pomodoro timer, analytics, and offline support.

## 🚀 Features

### Core Features
- **Daily Planner Dashboard** - Add, edit, delete, and manage tasks
- **Priority System** - Organize tasks by High/Medium/Low priority
- **Weekly Planner** - Drag-and-drop weekly view
- **Habit Tracker** - Track daily habits with streaks and progress
- **Pomodoro Timer** - Integrated work/break timer with sessions tracking
- **Task Reminders** - Browser and optional email notifications
- **Search & Filter** - Quick search and advanced filtering by priority, tags, or date
- **Export/Download** - PDF, CSV, and JSON export options

### Advanced Features
- **Dark/Light Mode** - Customizable theme with color picker
- **Analytics Dashboard** - Productivity charts and insights
- **Offline Mode** - Full functionality with IndexedDB/localStorage
- **Streak Tracking** - Gamification with streak badges
- **Data Import/Export** - Backup and restore your data
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **PWA Support** - Install as an app on any device

## 📱 Tech Stack

### Frontend
- **HTML5** - Semantic, SEO-optimized markup
- **CSS3** - Modern, responsive design with CSS Grid
- **Vanilla JavaScript** - No dependencies, lightweight and fast

### Storage
- **localStorage** - Client-side data persistence
- **IndexedDB** - Advanced offline support (future)
- **Service Worker** - Offline functionality and caching

### Deployment
- **Google Cloud Storage** - Static file hosting
- **Google Cloud Run** - Optional backend for advanced features
- **Netlify/Vercel** - Alternative static hosting
- **GitHub Pages** - Free hosting option

## 📥 Installation

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/yourusername/smart-planner.git
cd smart-planner
```

2. No build process required! Just open `index.html` in your browser
3. Or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server
```

## 🌐 Deployment Guide

### Option 1: Google Cloud Storage (Recommended)

1. **Create a Google Cloud Project**
   ```bash
   gcloud projects create your-planner-project
   gcloud config set project your-planner-project
   ```

2. **Create a Cloud Storage Bucket**
   ```bash
   gsutil mb gs://your-planner-project.appspot.com
   ```

3. **Upload Files**
   ```bash
   gsutil -m cp -r * gs://your-planner-project.appspot.com/
   ```

4. **Configure as Website**
   ```bash
   gsutil web set -m index.html -e index.html gs://your-planner-project.appspot.com/
   ```

5. **Make Public (Optional)**
   ```bash
   gsutil iam ch allUsers:objectViewer gs://your-planner-project.appspot.com
   ```

6. **Access Your App**
   ```
   https://your-planner-project.appspot.com
   ```

### Option 2: Netlify (Free & Easy)

1. Push code to GitHub
2. Go to [Netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
6. Deploy!

### Option 3: Vercel

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (no configuration needed)

### Option 4: GitHub Pages

1. Push code to GitHub
2. Go to Settings → Pages
3. Select Main branch as source
4. Your app is live at `https://yourusername.github.io/smart-planner`

## 🔒 Features & Usage

### Daily Dashboard
- **Add Tasks** - Type task name, select priority, click Add
- **Mark Complete** - Check the checkbox to mark tasks done
- **Edit Tasks** - Click on task to edit details, description, and tags
- **Filter** - Use filter buttons to view specific priority or completed tasks
- **Search** - Use search box to find tasks by name or tags

### Weekly View
- **Drag & Drop** - Organize tasks across the week
- **Quick View** - See all upcoming tasks at a glance
- **Navigation** - Use Previous/Next buttons to view other weeks

### Habit Tracker
- **Add Habits** - Create habits to track
- **Daily Check-in** - Click on calendar days to mark habit completion
- **Streak Tracking** - See your current streak for each habit
- **30-Day View** - Track last 30 days of habit completion

### Pomodoro Timer
- **Customizable Durations** - Set work and break durations
- **Session Tracking** - View completed sessions for the day
- **Notifications** - Get notified when sessions end
- **Pause/Resume** - Full control over timer

### Analytics
- **Productivity Score** - Daily completion percentage
- **Most Productive Time** - Identify when you work best
- **Habit Statistics** - View habit streaks and completion rates
- **Weekly Charts** - Visual representation of productivity

### Settings
- **Theme** - Toggle dark/light mode
- **Color Picker** - Customize primary color
- **Notifications** - Enable/disable notifications
- **Data Export** - Download as PDF, CSV, or JSON
- **Data Import** - Restore from backup
- **Storage Info** - See how much data is stored

## 💾 Data Management

### Automatic Saving
- All data is automatically saved to browser localStorage
- Works completely offline
- No server required for basic functionality

### Backup & Restore
```javascript
// Download backup
Click Settings → Download Data (JSON)

// Restore backup
Click Settings → Import Data → Select JSON file
```

## 🔐 Privacy & Security

- **100% Client-Side** - All data stored locally in your browser
- **No Server** - We don't collect or store any personal data
- **No Tracking** - No analytics or user tracking
- **Offline First** - Works without internet connection
- **Export Anytime** - Full data ownership

## 🚀 Performance

- **Lightweight** - < 50KB JavaScript
- **Fast Loading** - Instant app startup
- **No Dependencies** - Pure vanilla JavaScript
- **Mobile Optimized** - 99% Lighthouse score
- **Offline Ready** - Service Worker caching

## 📊 SEO Optimization

- ✅ Semantic HTML5 structure
- ✅ Meta tags and Open Graph support
- ✅ Structured data (Schema.org)
- ✅ Mobile-first responsive design
- ✅ Fast load times
- ✅ Service Worker for caching

## 🎯 Browser Support

- Chrome/Edge 50+
- Firefox 45+
- Safari 12+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## 📱 Progressive Web App

Install on any device:
1. Open the app in your browser
2. Desktop: Click "Install" in address bar
3. Mobile: Tap "Add to Home Screen" or menu → Install

## 🛠️ Advanced Configuration

### Environment Variables (Optional Backend)
Create `.env` file:
```
GOOGLE_CLOUD_PROJECT=your-project-id
API_ENDPOINT=https://your-api.com
NOTIFICATION_SERVICE_WORKER=true
```

### Custom Branding
Edit in `index.html` and `styles.css`:
- Logo and title
- Primary colors
- Favicon

## 🐛 Troubleshooting

### Data Not Saving?
- Check localStorage is enabled
- Ensure you're not in private/incognito mode
- Check browser console for errors

### Service Worker Not Working?
- Must be served over HTTPS (except localhost)
- Check browser DevTools → Application → Service Workers

### Dark Mode Not Persisting?
- Browser may be in light mode preference
- Try toggling in Settings

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

MIT License - Use freely in personal and commercial projects

## 📞 Support

- Check README for FAQ
- Review code comments for implementation details
- Open an issue on GitHub

## 🎓 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)

## 🌟 Future Enhancements

- [ ] Backend with Node.js/Express
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Collaborative planning
- [ ] AI task suggestions
- [ ] Email reminders
- [ ] Calendar integration
- [ ] Mobile app (React Native)
- [ ] Voice commands

## 📈 Roadmap

**v1.0** - Current (Core Features)
**v1.1** - Analytics enhancement
**v1.2** - Cloud sync support
**v2.0** - Backend and collaboration

---

**Made with ❤️ by Smart Planner Team**

Transform your productivity today! 🚀

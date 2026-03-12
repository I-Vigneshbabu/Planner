# GitHub → Google Cloud Quick Reference Card

**Print this or bookmark for quick reference while deploying!**

---

## 🚀 5-Step Deployment (15 minutes)

### Step 1: GitHub Setup (5 min)
```powershell
cd c:\Planner
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/smart-planner
git push -u origin main
```

### Step 2: Google Cloud Project (3 min)
- Go to https://console.cloud.google.com
- Select or create project: `smart-planner-app`
- Enable APIs: Cloud Build, App Engine, Cloud Storage

### Step 3: Connect GitHub (3 min)
- Go to Cloud Build → Triggers
- Click "Create Trigger"
- Select GitHub and authenticate
- Choose `smart-planner` repository
- Click "Create"

### Step 4: Deploy (3 min)
```bash
gcloud app create --region=us-central
gcloud app deploy
```

### Step 5: Done! ✅
Your app is live at: `https://smart-planner-app.uc.r.appspot.com`

---

## 📋 File Locations

| File | Purpose |
|------|---------|
| **app.yaml** | App Engine configuration (in repo) |
| **cloudbuild.yaml** | Cloud Build configuration (in repo) |
| **index.html** | Main application |
| **app.js** | JavaScript logic |
| **styles.css** | Styling |

---

## 🔄 Git Commands Cheatsheet

```bash
# First time setup
git init
git config --global user.email "email@example.com"
git config --global user.name "Your Name"
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/smart-planner
git push -u origin main

# Regular updates
git add .
git commit -m "Your changes"
git push origin main
# Auto-deploys! ✅

# Check status
git status
git log

# Fix last commit
git commit --amend
```

---

## ☁️ Google Cloud Commands

```bash
# Setup
gcloud init
gcloud config set project smart-planner-app
gcloud services enable cloudbuild.googleapis.com
gcloud services enable appengine.googleapis.com

# Deploy
gcloud app create --region=us-central
gcloud app deploy

# View
gcloud app browse
gcloud app describe

# Logs
gcloud app logs read -n 50
gcloud app logs read -f

# Maintenance
gcloud app versions list
gcloud app delete
```

---

## 🌍 Important URLs

| Purpose | URL |
|---------|-----|
| **GitHub Repo** | https://github.com/YOUR_USERNAME/smart-planner |
| **Google Cloud** | https://console.cloud.google.com |
| **Cloud Build** | https://console.cloud.google.com/cloud-build |
| **App Engine** | https://console.cloud.google.com/appengine |
| **Your App** | https://smart-planner-app.uc.r.appspot.com |
| **Custom Domain** | https://yourdomain.com (after setup) |

---

## 🛠️ Troubleshooting Quick Fixes

### Build Failed
1. Go to Cloud Build → Builds
2. Click failed build
3. Read error in "Build Logs"
4. Fix in code, push again

### Can't Access App
- Wait 2-3 minutes
- Check correct URL spelling
- Clear browser cache
- Verify build completed

### Git Push Failed
```bash
# Check remote
git remote -v

# Fix if wrong
git remote set-url origin https://github.com/USERNAME/smart-planner

# Login to GitHub
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Try again
git push origin main
```

### App Not Updating
1. Verify git push succeeded (`git log`)
2. Check Cloud Build started new build
3. Wait for build to complete
4. Hard refresh browser (Ctrl+Shift+Delete)

---

## 💰 Cost Estimate

| Resource | Free Tier | Cost |
|----------|-----------|------|
| **App Engine** | 28 hours/day | ~$5-15/month |
| **Cloud Build** | 120 build-min/day | Included in free |
| **Cloud Storage** | 5GB | $0.005/GB over limit |
| **Total** | ✅ FREE for typical use | Very low |

**Your app will likely be completely free!** 🎉

---

## 📚 Full Documentation

- **[GITHUB_GOOGLE_CLOUD.md](GITHUB_GOOGLE_CLOUD.md)** - Full step-by-step guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - All deployment options
- **[README.md](README.md)** - User guide
- **[DEVELOPER.md](DEVELOPER.md)** - Code documentation

---

## ✅ Deployment Checklist

- [ ] GitHub account created
- [ ] Code pushed to GitHub (`git push`)
- [ ] Google Cloud project created
- [ ] APIs enabled (Cloud Build, App Engine)
- [ ] GitHub connected to Cloud Build
- [ ] Build trigger created
- [ ] App Engine initialized (`gcloud app create`)
- [ ] App deployed (`gcloud app deploy`)
- [ ] Can access app in browser ✅
- [ ] Git push triggers auto-deploy ✅

---

## 🎯 After Deployment

### Daily Workflow
```bash
cd c:\Planner
# Make changes to files
git add .
git commit -m "Your changes"
git push origin main
# Automatic deployment! ✅
```

### Monitor Your App
```bash
# View logs
gcloud app logs read -f

# Check status
gcloud app describe

# Manage versions
gcloud app versions list
```

### Add Features
- See DEVELOPER.md for code examples
- Push changes to GitHub
- Auto-deployed within minutes!

---

## 🔗 Quick Links

- [Sign up GitHub](https://github.com/signup)
- [Sign up Google Cloud](https://console.cloud.google.com)
- [Git Download](https://git-scm.com/download)
- [gcloud SDK](https://cloud.google.com/sdk/docs/install)

---

## 💬 Need Help?

**GitHub issue?** Check git commands above

**Google Cloud issue?** 
- See Cloud Build logs
- Enable debug mode
- Contact Google Cloud support

**App code issue?**
- See DEVELOPER.md
- Check browser console (F12)
- Check app logs (`gcloud app logs read -f`)

---

## 🎉 Congratulations!

You've deployed a professional, scalable productivity app! 🚀

- ✅ Hosted on Google Cloud
- ✅ Auto-deployed from GitHub
- ✅ Professional setup
- ✅ Free tier
- ✅ Scalable
- ✅ Secure with HTTPS

**Every push to GitHub = automatic update!**

---

**Last Updated: March 12, 2026**

**Bookmark this page for quick reference!** 📌

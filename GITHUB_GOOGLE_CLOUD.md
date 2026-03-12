# GitHub → Google Cloud Deployment Guide

**Complete step-by-step guide to deploy Smart Daily Planner from GitHub to Google Cloud with auto-deployment.**

---

## ⏱️ Time Required: 15-20 minutes

---

## 📋 Prerequisites

1. **GitHub Account** - Free at https://github.com
2. **Google Cloud Account** - Free tier at https://console.cloud.google.com
3. **Git installed** - Download from https://git-scm.com
4. **Project files** - Already have `smart-planner` folder

---

## Step 1: Create GitHub Repository (5 min)

### 1.1 Create Repository
1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `smart-planner`
   - **Description**: `Smart Daily Planner - Task Management with Habits & Pomodoro`
   - **Visibility**: Choose **Public** (for GitHub Pages) or **Private** (for Cloud Build)
3. Click "Create repository"

### 1.2 Push Code to GitHub

Open PowerShell and run:

```powershell
# Navigate to project
cd c:\Planner

# Initialize git
git init

# Configure git (if first time)
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Smart Daily Planner v1.0"

# Add remote (REPLACE YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/smart-planner.git

# Set main branch and push
git branch -M main
git push -u origin main
```

✅ **Your code is now on GitHub!**

---

## Step 2: Setup Google Cloud Project (5 min)

### 2.1 Create Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click "Select a project" → "New Project"
3. Fill in:
   - **Project name**: `smart-planner-app`
   - **Organization**: (leave as is)
4. Click "Create"
5. Wait for creation (1-2 minutes)

### 2.2 Enable Required APIs

1. In Google Cloud Console, go to "APIs & Services" → "API Library"
2. Search for and enable:
   - **Cloud Build API** ✅
   - **App Engine API** ✅
   - **Cloud Storage API** ✅

```bash
# Or via command line:
gcloud services enable cloudbuild.googleapis.com
gcloud services enable appengine.googleapis.com
gcloud services enable storage-api.googleapis.com
```

### 2.3 Install Google Cloud CLI (if not already)

```powershell
# Download and install from:
# https://cloud.google.com/sdk/docs/install

# Or via PowerShell:
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.ps1", "${env:UserProfile}\add-google-cloud-ops-agent-repo.ps1") ; & "${env:UserProfile}\add-google-cloud-ops-agent-repo.ps1" --also-install
```

### 2.4 Initialize gcloud

```bash
gcloud init
gcloud config set project smart-planner-app
```

---

## Step 3: Connect GitHub to Google Cloud (5 min)

### 3.1 Setup GitHub Connection

1. Go to https://console.cloud.google.com/cloud-build/triggers
2. Click "Create Trigger"
3. Select **GitHub (Cloud Build)** as source
4. Click "Authenticate to GitHub"
   - Follow OAuth prompts
   - Allow Google Cloud to access repositories
5. Select your **smart-planner** repository
6. Click "Create Trigger"

### 3.2 Configure Build Trigger

1. **Name**: `smart-planner-build`
2. **Event**: Push to a branch
3. **Branch**: ^main$
4. **Build configuration**: Cloud Build configuration file
5. **Cloud Build config file location**: `cloudbuild.yaml`
6. Click "Create"

✅ **GitHub is now connected to Google Cloud!**

---

## Step 4: Deploy to Google Cloud (5 min)

### Option A: Google Cloud App Engine (Recommended)

#### 4A.1 Initialize App Engine

```bash
# Create app engine app
gcloud app create --region=us-central

# View status
gcloud app describe
```

#### 4A.2 Deploy

```bash
# Deploy from your local directory
gcloud app deploy

# Or force deployment
gcloud app deploy --quiet
```

**Your app will be live at:**
```
https://smart-planner-app.uc.r.appspot.com
```

#### 4A.3 View Logs

```bash
# View recent logs
gcloud app logs read -n 50

# Stream logs live
gcloud app logs read -f
```

### Option B: Google Cloud Storage

#### 4B.1 Create Storage Bucket

```bash
# Create bucket (replace YOURNAME)
gsutil mb gs://smart-planner-yourname

# Make it a website
gsutil web set -m index.html -e index.html gs://smart-planner-yourname

# Make public (optional)
gsutil iam ch allUsers:objectViewer gs://smart-planner-yourname
```

#### 4B.2 Upload Files

```bash
# Upload all files
gsutil -m cp -r * gs://smart-planner-yourname/

# Verify
gsutil ls gs://smart-planner-yourname/
```

**Your app will be live at:**
```
https://storage.googleapis.com/smart-planner-yourname/index.html
```

---

## Step 5: Setup Auto-Deploy (Optional)

Auto-deploy means every time you push to GitHub, Google Cloud automatically deploys your changes.

### 5.1 Cloud Build Trigger Setup

The trigger you created in Step 3 will automatically:
1. Detect pushes to `main` branch
2. Run build steps in `cloudbuild.yaml`
3. Deploy to your cloud storage/App Engine

### 5.2 Test Auto-Deploy

1. Make a small change to a file
   ```bash
   # Edit any file, for example index.html
   # Change something visible like the title
   ```

2. Commit and push
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```

3. Watch build in Cloud Console
   - Go to https://console.cloud.google.com/cloud-build/builds
   - Click on the new build
   - Watch it progress
   - See "SUCCESS" when done

4. Your changes are live! 🎉

---

## Step 6: Setup Custom Domain (Optional)

### 6.1 Point Domain to Google Cloud

**For App Engine:**

1. Go to Google Cloud Console → App Engine → Settings
2. Click "Add customs domain"
3. Add your domain name
4. Enter verification code in DNS settings
5. Add DNS records shown by Google

**For Cloud Storage:**

1. Create a CNAME record pointing to Cloud Storage
2. DNS setting: `CNAME www.example.com storage.googleapis.com`

### 6.2 Get Free SSL Certificate

Google automatically provides SSL/HTTPS for:
- App Engine
- Cloud Storage
- Custom domains

No additional setup needed!

---

## Step 7: Monitor & Maintain

### View Traffic
```bash
# App Engine
gcloud app describe

# View real-time metrics
gcloud monitoring dashboards list
```

### View Logs
```bash
# Recent logs
gcloud app logs read

# Real-time logs
gcloud app logs read -f

# Specific log
gcloud app logs read-latest
```

### Update Your App

Simply push to GitHub:
```bash
# Make changes locally
# Commit and push
git add .
git commit -m "Your change description"
git push origin main

# Auto-deployed! ✅
```

---

## 📊 Cost Estimate

### Google Cloud App Engine
- **Free tier**: 28 instance hours/day
- **Typical cost**: $5-15/month (for a small app)
- **Always on**: ~$30/month

### Google Cloud Storage
- **Storage**: $0.005 per GB/month
- **Typical app**: ~$0.05/month
- **Bandwidth**: $0.12 per GB (first 1GB free)

### Best Value
✅ **App Engine with auto-scaling** (free tier covers most usage)

---

## 🔧 Troubleshooting

### Push Fails
```bash
# Check remote is correct
git remote -v

# Update if needed
git remote set-url origin https://github.com/YOUR_USERNAME/smart-planner.git

# Try again
git push origin main
```

### Build Fails
1. Go to Cloud Build → Builds
2. Click the failed build
3. See error in "Build Logs"
4. Common issues:
   - Missing `cloudbuild.yaml`
   - Wrong project ID
   - Missing API permissions

### App Not Updating
1. Check build status in Cloud Console
2. See if build succeeded
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check app logs for errors

### Can't Access App
1. Verify deployment completed
2. Check URL spelling
3. Wait 2-3 minutes for propagation
4. Check firewall rules

---

## 📈 Next Steps

### 1. Verify Deployment
```bash
# Open in browser
# Your app should work exactly like locally
```

### 2. Make Changes
```bash
# Edit any file
git add .
git commit -m "Your change"
git push origin main
# Auto-deploys! ✅
```

### 3. Add Features
- See DEVELOPER.md for extending app
- Add new features locally
- Push to GitHub
- Automatic deployment!

### 4. Setup Analytics
- Google Analytics (add to index.html)
- Cloud Monitoring
- Application Performance Monitoring (APM)

---

## 🎯 GitHub → Google Cloud Workflow

```
Local Development
    ↓
git push to GitHub
    ↓
GitHub webhook triggers
    ↓
Google Cloud Build
    ↓
cloudbuild.yaml runs
    ↓
App Engine deploys
    ↓
Live! ✅
```

Every push = automatic deployment!

---

## 📝 Quick Reference

### Essential Commands

```bash
# Git commands
git add .                           # Stage changes
git commit -m "message"             # Commit
git push origin main                # Push to GitHub

# Google Cloud commands
gcloud app deploy                   # Manual deploy
gcloud app logs read                # View logs
gcloud app browse                   # Open in browser

# Cloud Storage commands
gsutil ls gs://bucket-name          # List files
gsutil cp file gs://bucket-name     # Upload file
gsutil web set -m index.html        # Set website
```

### URLs
- GitHub: https://github.com/YOUR_USERNAME/smart-planner
- Google Cloud Console: https://console.cloud.google.com
- Cloud Build: https://console.cloud.google.com/cloud-build
- Your app: `https://smart-planner-app.uc.r.appspot.com`

---

## ✅ Deployment Checklist

- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Created Google Cloud project
- [ ] Enabled required APIs
- [ ] Connected GitHub to Cloud Build
- [ ] Created build trigger
- [ ] Deployed to App Engine
- [ ] Tested app works
- [ ] Verified auto-deploy works
- [ ] Added custom domain (optional)
- [ ] Enabled monitoring/logs

---

## 🎉 You're Deployed!

Your Smart Daily Planner is now:
- ✅ Hosted on Google Cloud
- ✅ Auto-deployed from GitHub
- ✅ Live on the internet
- ✅ Scalable & secure
- ✅ Free (within free tier)

**Every push to GitHub = automatic update** 🚀

---

## 📞 Support

- **Google Cloud Help**: https://cloud.google.com/support
- **GitHub Help**: https://docs.github.com
- **Cloud Build Docs**: https://cloud.google.com/build/docs

---

**Successfully deployed? Share your app URL!** 🌟

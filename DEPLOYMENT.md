# Smart Daily Planner - Deployment Guide

Choose how to deploy your Smart Daily Planner to the internet.

---

## 🎯 Quick Recommendation Guide

| Use Case | Platform | Time | Cost | Recommendation |
|----------|----------|------|------|---|
| **Want auto-deploy from GitHub** | Google Cloud + Cloud Build | 15 min | Free tier | ⭐⭐⭐ BEST |
| **Easiest setup, auto from Git** | Netlify | 5 min | Free | ⭐⭐⭐ EASIEST |
| **Google preference, simple** | Google Cloud App Engine | 10 min | Free tier | ⭐⭐ GOOD |
| **Fastest CDN performance** | Vercel | 5 min | Free | ⭐⭐ FAST |
| **Totally free, no credit card** | GitHub Pages | 5 min | Free | ⭐⭐ FREE |
| **Have traditional hosting already** | Apache/Nginx | 5 min | Existing | ⭐ OK |

**→ Start with [GitHub → Google Cloud](GITHUB_GOOGLE_CLOUD.md) (auto-deploy, professional, free tier)**

---

## Platform Comparison

```
GitHub + Google Cloud Build
├─ Auto-deploy on git push ✅
├─ Professional setup ✅
├─ Free tier (free for 1 year+)
├─ Scalable infrastructure
└─ Recommended for production

vs

Netlify (Simplest)
├─ Super easy setup (2 clicks)
├─ Auto-deploy on git push ✅
├─ Free tier (generous limits)
└─ Best for beginners

vs

Vercel (Fastest)
├─ Ultra-fast CDN
├─ Auto-deploy on git push ✅
├─ Free tier
└─ Best performance

vs

GitHub Pages (Free)
├─ Totally free
├─ Simplest for static sites
├─ No monthly costs
└─ Good for less traffic
```

---

## ⭐ RECOMMENDED: GitHub → Google Cloud (Auto-Deploy)

This is the best approach for production apps with automatic deployments from GitHub.

### Prerequisites
- GitHub account (free)
- Google Cloud account (free tier available)
- `git` installed on your computer

### Quick Summary
1. Push code to GitHub
2. Connect GitHub to Google Cloud Build
3. Auto-deploy on every push
4. Your app is live! 🎉

### 👉 Full Detailed Guide
**See [GITHUB_GOOGLE_CLOUD.md](GITHUB_GOOGLE_CLOUD.md) for complete step-by-step instructions (15 minutes)**

Key benefits:
```
✅ Auto-deploy on every push
✅ No manual deployment needed
✅ Version control with Git
✅ Free tier includes App Engine
✅ Includes free SSL/HTTPS
✅ Scalable & professional
✅ Automatic backups
```

### Quick Steps
```bash
# 1. Create GitHub repo and push code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/smart-planner
git push -u origin main

# 2. In Google Cloud Console:
# - Create project
# - Enable Cloud Build API
# - Create trigger from GitHub
# - Auto-deploy is ready!

# 3. To update, just push:
git push origin main
# Auto-deployments! ✅
```

---

## 🚀 Quick Start - Choose Your Platform

- [GitHub → Google Cloud (Recommended)](#recommended-github--google-cloud-auto-deploy) ⭐
- [Google Cloud (App Engine)](#google-cloud-app-engine)
- [Google Cloud Storage](#google-cloud-storage) 
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Traditional Hosting (Apache/Nginx)](#traditional-hosting)

---

## Google Cloud App Engine

### Prerequisites
- Google Cloud Account
- `gcloud` CLI installed
- Project ID ready

### Step 1: Install Google Cloud SDK
```bash
# Windows
https://cloud.google.com/sdk/docs/install-sdk

# macOS
brew install google-cloud-sdk

# Linux
sudo apt-get install google-cloud-sdk
```

### Step 2: Initialize gcloud
```bash
gcloud init
gcloud config set project YOUR_PROJECT_ID
```

### Step 3: Deploy
```bash
# From project directory
gcloud app deploy

# View logs
gcloud app logs read -n 50

# Open in browser
gcloud app browse
```

### Step 4: Configure Domain
1. Go to Google Cloud Console
2. App Engine → Settings → Custom Domain
3. Add your domain
4. Follow DNS configuration

### Monitoring
```bash
# View traffic
gcloud app describe

# View logs in real-time
gcloud app logs read -f

# Increase/decrease instances
gcloud app instances list
```

---

## Google Cloud Storage

### Best for: Static hosting with minimal cost

### Step 1: Create Storage Bucket
```bash
# Create bucket
gsutil mb gs://your-planner-project.appspot.com

# Or with custom name
gsutil mb -l US -b on gs://smart-planner-app
```

### Step 2: Upload Files
```bash
# Copy all files
gsutil -m cp -r . gs://your-planner-project.appspot.com/

# Or specific files
gsutil -m cp *.html *.css *.js gs://your-planner-project.appspot.com/
```

### Step 3: Enable Website Hosting
```bash
# Set index and 404 files
gsutil web set -m index.html -e index.html gs://your-planner-project.appspot.com/
```

### Step 4: Make Public
```bash
# Allow public access
gsutil iam ch allUsers:objectViewer gs://your-planner-project.appspot.com

# Or for specific files
gsutil acl ch -u AllUsers:R gs://your-planner-project.appspot.com/index.html
```

### Step 5: Access Your App
```
https://storage.googleapis.com/your-planner-project.appspot.com/index.html
```

### Step 6: Setup CDN (Optional)
```bash
# Create Cloud CDN backend bucket
gcloud compute backend-buckets create planner-backend \
    --gcs-bucket-name=your-planner-project.appspot.com

# Create HTTPS load balancer
gcloud compute url-maps create planner-lb \
    --default-service=planner-backend
```

### Cost Optimization
- Typical cost: $0.005 per GB stored
- Low traffic = ~$1/month
- For better CDN, use Cloud CDN or Firebase Hosting

---

## Netlify

### Best for: Easiest deployment

### Option 1: Git Integration (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/smart-planner
git push -u origin main
```

2. **Connect to Netlify**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select GitHub
   - Choose repository
   - Deploy!

3. **Deploy Settings**
   - Build command: (leave empty)
   - Publish directory: `.`

### Option 2: Direct Upload
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir .
```

### Option 3: Drag & Drop
- Go to https://app.netlify.com/drop
- Drag folder into drop zone
- Done!

### Custom Domain
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records
4. Enable HTTPS (automatic)

### Environment Variables
Create `.env` file:
```
REACT_APP_API=https://api.example.com
NODE_ENV=production
```

---

## Vercel

### Best for: Performance and built-in analytics

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
# Interactive deployment
vercel

# Production deployment
vercel --prod
```

### Step 3: Git Integration
1. Go to https://vercel.com
2. Import Git repository
3. Environment variables (if needed)
4. Deploy!

### Custom Domain
```bash
# Add domain
vercel domains add yourdomain.com

# DNS configuration will be shown automatically
```

### Auto-Deploy on Push
- Connected to GitHub/GitLab/Bitbucket
- Auto-deploys on main branch push

---

## GitHub Pages

### Best for: Free hosting with Git integration

### Step 1: Enable GitHub Pages
1. Go to GitHub repository
2. Settings → Pages
3. Select "main" branch
4. Save

### Step 2: Access
```
https://username.github.io/smart-planner
```

### Step 3: Custom Domain (Optional)
1. Add CNAME file with your domain
2. Configure DNS
3. Enable HTTPS

### Deploy Workflow
```bash
git add .
git commit -m "Update"
git push origin main
# Automatically deployed to GitHub Pages
```

---

## Traditional Hosting

### Apache Server

1. **Upload files via FTP/SFTP**
   - .htaccess is included for rewrite rules
   - All security headers configured

2. **Configure domain**
   - Point DNS to server
   - Update .htaccess if needed

3. **Enable modules**
   ```bash
   # Check if modules enabled
   apache2ctl -M | grep rewrite
   apache2ctl -M | grep headers
   apache2ctl -M | grep expires
   
   # Enable modules
   sudo a2enmod rewrite
   sudo a2enmod headers
   sudo a2enmod expires
   ```

4. **Restart Apache**
   ```bash
   sudo systemctl restart apache2
   ```

### Nginx Server

Create `/etc/nginx/sites-available/planner`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/smart-planner;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css text/javascript application/javascript;

    # Cache control
    location ~* \.(js|css)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(html)$ {
        expires 5m;
        add_header Cache-Control "public, must-revalidate";
    }

    # Service Worker
    location = /sw.js {
        expires 5m;
        add_header Cache-Control "public, must-revalidate";
    }

    # Rewrite for SPA
    location / {
        try_files $uri /index.html;
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/planner /etc/nginx/sites-enabled/
sudo nginx -s reload
```

---

## Environment-Specific Configuration

### Production Checklist
- [ ] Update domain in index.html meta tags
- [ ] Update sitemap.xml domain
- [ ] Update robots.txt domain
- [ ] Enable HTTPS
- [ ] Setup CDN (optional)
- [ ] Configure monitoring
- [ ] Setup error tracking
- [ ] Enable analytics
- [ ] Backup setup

### Security Checklist
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS headers
- [ ] Add security headers
- [ ] Enable compression
- [ ] Disable directory listing
- [ ] Rate limiting configured
- [ ] DDoS protection enabled

---

## Monitoring & Analytics

### Google Cloud Console
```bash
# View metrics
gcloud monitoring dashboards list

# View logs
gcloud logging read --limit 50

# Setup alerts
gcloud alpha monitoring policies create
```

### Server Logs
```bash
# Apache
tail -f /var/log/apache2/access.log

# Nginx
tail -f /var/log/nginx/access.log

# Google Cloud App Engine
gcloud app logs read -f
```

---

## Performance Optimization

### 1. Enable Gzip Compression
- Apache: `.htaccess` configured ✓
- Nginx: See configuration above
- Google Cloud: Automatic ✓

### 2. Setup CDN
- Netlify: Built-in ✓
- Vercel: Built-in ✓
- Google Cloud: Cloud CDN
- Traditional: Cloudflare

### 3. Cache Strategy
- HTML: 5 minutes
- CSS/JS: 1 year (with hash)
- Manifest: 1 hour
- Service Worker: 5 minutes

### 4. Image Optimization
- Use SVG icons ✓
- Lazy load images ✓
- WebP format recommended
- Responsive images

---

## Troubleshooting

### 404 Errors
- Check routing configuration
- Verify .htaccess or nginx rewrite rules
- Ensure index.html is in root

### Service Worker Not Caching
- Must use HTTPS (except localhost)
- Check browser console for SW errors
- Clear cache: DevTools → Application → Clear storage

### Data Not Persisting
- localStorage might be disabled
- Check browser privacy settings
- Ensure app origin is consistent

### Domain Not Resolving
- DNS propagation takes 24-48 hours
- Check DNS records with `nslookup`
- Verify CNAME/A records

```bash
# Check DNS
nslookup yourdomain.com

# Check SSL certificate
curl -I https://yourdomain.com

# Check redirects
curl -L -I yourdomain.com
```

---

## Rollback Instructions

### Google Cloud App Engine
```bash
# View versions
gcloud app versions list

# Set traffic to previous version
gcloud app instances list
gcloud app services set-traffic --split-by=ip --splits=v1=.5,v2=.5

# Delete bad version
gcloud app versions delete VERSION_ID
```

### Git-based (Netlify, Vercel, GitHub Pages)
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset
git reset --hard COMMIT_HASH
```

---

## Support & Resources

- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Successfully deployed? Share your setup!** 🎉

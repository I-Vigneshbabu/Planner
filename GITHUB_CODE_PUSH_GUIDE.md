# 📤 HOW TO ADD YOUR CODE TO GITHUB (Simple Version)

**Time Required:** 5-10 minutes

---

## WHAT WE'RE DOING

Taking your 24 files from `c:\Planner` folder on your computer and uploading them to GitHub (the cloud).

**After this:** Your code will be safe in the cloud and ready to deploy!

---

---

# STEP 1: Open PowerShell Terminal

**PowerShell is like a terminal - a command-line program where you type commands**

### **Open PowerShell**

**Method 1 (Fastest):**
1. Press these keys together: **Windows Key + R**
2. Type: `powershell`
3. Press **Enter**
4. A dark window opens

**Method 2 (Alternative):**
1. Click Windows Start button (bottom left)
2. Type: `powershell`
3. Click "Windows PowerShell" from results
4. Dark window opens

**You should see:**
```
Windows PowerShell
Copyright (C) Microsoft Corporation.

PS C:\Users\YourName>
```

---

## STEP 2: Navigate to Your Planner Folder

**We need to tell PowerShell: "Go to the c:\Planner folder where my code is"**

### **Type This Command**

In PowerShell, type:
```
cd c:\Planner
```

**Then press Enter**

### **You Should See**

```
PS C:\Planner>
```

**(The path changed from C:\Users\YourName to C:\Planner)**

### **If You See Error**

Error message like: `Cannot find path 'c:\Planner'...`

**What to do:**
1. Make sure `c:\Planner` folder exists on your computer
2. Or your files might be in a different location
3. Find where your files are (look in File Explorer)
4. Replace `c:\Planner` with the correct path
5. Try the `cd` command again

---

## STEP 3: Verify Your 24 Files Are There

**Just to make sure all files are in this folder before uploading**

### **Type This Command**

```
dir
```

**Press Enter**

### **You Should See**

A list showing all your files:

```
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          3/12/2026   2:34 PM           1234 index.html
-a---          3/12/2026   2:35 PM          45678 app.js
-a---          3/12/2026   2:35 PM          23456 styles.css
-a---          3/12/2026   2:36 PM           3456 sw.js
-a---          3/12/2026   2:36 PM           2345 manifest.json
-a---          3/12/2026   2:36 PM           1234 robots.txt
-a---          3/12/2026   2:36 PM           5678 sitemap.xml
-a---          3/12/2026   2:36 PM           9876 package.json
-a---          3/12/2026   2:37 PM           4321 netlify.toml
-a---          3/12/2026   2:37 PM           5432 .gitignore
... and more files
```

**Count the files:**
- If you see about 20-24 files = ✅ Good
- If you see very few files = ⚠️ Wrong folder

---

## STEP 4: Initialize Git Repository

**Tell Git: "Start tracking changes in this folder"**

### **Type This Command**

```
git init
```

**Press Enter**

### **You Should See**

```
Initialized empty Git repository in c:\Planner\.git
```

### **If You Get Error**

Error: `git is not recognized...`

**What to do:**
1. Git is not installed on your computer
2. Download Git from: `https://git-scm.com/download/win`
3. Run the installer (accept all defaults)
4. Close and reopen PowerShell
5. Try `git init` again

---

## STEP 5: Configure Git (First Time Only)

**Tell Git: "This is who I am"**

### **Type Your Name**

```
git config --global user.name "Your Full Name"
```

**Replace "Your Full Name" with YOUR actual name**

Example:
```
git config --global user.name "John Smith"
```

**Press Enter**

**You won't see any message - that's normal**

### **Type Your Email**

```
git config --global user.email "your.email@gmail.com"
```

**Replace with YOUR actual email** (use the same email as your GitHub account)

Example:
```
git config --global user.email "john@gmail.com
```

**Press Enter**

**You won't see any message - that's normal**

---

## STEP 6: Add All Your Files to Git

**Tell Git: "Include all these files when I upload"**

### **Type This Command**

```
git add .
```

**(That's "git add" then a space then a dot/period)**

**Press Enter**

### **What Happens**

- Git scans all 24 files
- Marks them for upload
- You won't see any confirmation message - **that's normal**

### **Command Breakdown**

```
git add .
│    │  │
│    │  └─ Period (.) means "all files"
│    └──── Command to stage files
└───────── Tool we're using
```

---

## STEP 7: Create a Commit (Save Point)

**Think of this as: "Save these files as version 1.0"**

### **Type This Command**

```
git commit -m "Initial commit: IPL - Input Planner List app"
```

**Press Enter**

### **You Should See**

```
[main (root-commit) a1b2c3d] Initial commit: IPL - Input Planner List app
 24 files changed, 5432 insertions(+)
 create mode 100644 index.html
 create mode 100644 app.js
 create mode 100644 styles.css
 create mode 100644 sw.js
 create mode 100644 manifest.json
 (... more files listed ...)
```

**Look for:** "24 files changed" = ✅ All files included

### **If You See Different Number**

Example: "12 files changed"
- Some files might be missing
- Check Step 3 again
- Make sure all files are in c:\Planner

---

## STEP 8: Get Your GitHub Repository URL

**We need to connect our local folder to the remote repository on GitHub**

### **Go to GitHub Website**

1. Open your browser
2. Go to: `https://github.com`
3. Log in with your GitHub username and password
4. Find your repository: `ipl-planner`
5. Click on it to open

### **Find the Code Button**

**Look at the top right of your repository page:**

You'll see a green button that says: **[<> Code]**

**(It might say "Clone" or have a "<>" symbol)**

### **Click the Code Button**

**A dropdown menu appears:**

```
┌─────────────────────────────────┐
│ Code                            │
│                                 │
│ Local                           │
│ ⭕ HTTPS      ← Select this     │
│ ⭕ SSH                          │
│ ⭕ GitHub CLI                   │
│                                 │
│ https://github.com/             │
│ YOUR_USERNAME/ipl-planner.git   │
│                                 │
│ [Copy button] (two squares)     │
└─────────────────────────────────┘
```

### **Make Sure HTTPS is Selected**

- Look for circle (⭕) next to "HTTPS"
- It should be selected/filled
- If not, click on "HTTPS"

### **Copy the URL**

**You should see:**
```
https://github.com/YOUR_USERNAME/ipl-planner.git
```

(Replace YOUR_USERNAME with your actual GitHub username)

**Click the copy button** (looks like two overlapping squares on the right)

**The URL is now copied to your clipboard**

---

## STEP 9: Connect Your Local Folder to GitHub

**Tell Git: "Upload these files to this GitHub repository"**

### **Go Back to PowerShell**

(Switch back to the PowerShell window)

### **Type This Command**

```
git remote add origin https://github.com/YOUR_USERNAME/ipl-planner.git
```

**BUT INSTEAD OF TYPING THE URL:**

1. Type: `git remote add origin `
2. Right-click in PowerShell
3. Click "Paste"
4. This pastes the URL you copied from GitHub

**Press Enter**

**You won't see any message - that's normal**

### **Command Breakdown**

```
git remote add origin https://github.com/YOUR_USERNAME/ipl-planner.git
│      │     │      └─────────── Your repository URL
│      │     └───────────────── Name for this remote location
│      └──────────────────────── Add a remote connection
└────────────────────────────── Git command
```

---

## STEP 10: Rename Branch to "main"

**Different Git versions use different default names - we standardize to "main"**

### **Type This Command**

```
git branch -M main
```

**Press Enter**

**You won't see any message - that's normal**

---

## STEP 11: Upload Your Code to GitHub (The Big Upload!)

**This is the moment! Your files go to the cloud!**

### **Type This Command**

```
git push -u origin main
```

**Press Enter**

### **What Happens Next**

**First time:** Browser might open or PowerShell asks for authentication

**Option A: Browser Opens**
1. You'll be taken to GitHub login
2. Click **[Authorize]** or **[Allow]**
3. Come back to PowerShell

**Option B: PowerShell Asks for Credentials**
1. It asks: "Username: "
2. Type your GitHub username
3. Press Enter
4. It asks: "Password: "
5. Type your GitHub password (you won't see it being typed - that's normal)
6. Press Enter

**Option C: Token Required**
1. PowerShell shows a URL
2. Click the link
3. GitHub creates a special token
4. Copy the token
5. Paste it in PowerShell when asked

### **You Should See**

```
Enumerating objects: 24, done.
Counting objects: 100% (24/24), done.
Delta compression using up to 8 threads
Compressing objects: 100% (24/24), done.
Writing objects: 100% (1.25 MiB | 625 KiB/s) done.
Total 24 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/YOUR_USERNAME/ipl-planner.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from origin.
```

**Look for:**
- "24 files changed" or "Writing objects" = ✅ Upload successful
- "new branch" = ✅ Branch created
- "main -> main" = ✅ Correct branch

### **If You See Error**

**Error: "Permission denied"**
- You might have typed the wrong username/password
- Get a new personal token from GitHub
- Or use SSH instead of HTTPS

**Error: "Repository not found"**
- Check your GitHub repository URL is correct
- Make sure you're logged into GitHub as the right user

---

## STEP 12: Verify on GitHub Website

**Make absolutely sure your code is there**

### **Go to Your GitHub Repository**

1. Open your browser
2. Go to: `https://github.com/YOUR_USERNAME/ipl-planner`
3. Replace YOUR_USERNAME with your actual username

### **What You Should See**

**At the top:**
```
ipl-planner [main]
```

(Shows "main" branch selected)

**Below that, all 24 files listed:**
```
index.html
app.js
styles.css
sw.js
manifest.json
robots.txt
sitemap.xml
... and more
```

**Each file has a green checkmark** ✅ or **no error symbol**

### **If You Don't See Files**

1. Refresh the page (press F5)
2. Wait 5 seconds
3. Refresh again

**Files should appear**

---

## ✅ YOU'VE SUCCESSFULLY ADDED YOUR CODE TO GITHUB!

---

---

# QUICK COMMAND SUMMARY

**If you need to do this again, here are all the commands in order:**

```bash
# 1. Navigate to folder
cd c:\Planner

# 2. Initialize Git
git init

# 3. Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 4. Add all files
git add .

# 5. Create commitment
git commit -m "Initial commit: IPL app"

# 6. Add GitHub connection
git remote add origin https://github.com/USERNAME/ipl-planner.git

# 7. Rename branch
git branch -M main

# 8. Upload to GitHub
git push -u origin main
```

---

---

# NEXT STEPS

**After your code is on GitHub, you can:**

1. **Deploy to Netlify** - See COMPLETE_MASTER_GUIDE.md Part 2
2. **Register with Google** - See COMPLETE_MASTER_GUIDE.md Part 3
3. **Update your code** - See "Making Changes Later" section below

---

---

# MAKING CHANGES LATER (Updating Your Code)

**After your code is on GitHub, if you want to make changes:**

### **Edit Your Files**

1. Open VS Code
2. Edit your files (app.js, index.html, etc.)
3. Test locally with: `python -m http.server 8080`
4. Make sure everything works

### **Upload Changes**

**Open PowerShell in c:\Planner**

```bash
# 1. Add changes
git add .

# 2. Describe the change
git commit -m "Added new feature: [describe what changed]"

# 3. Upload to GitHub
git push origin main
```

**That's it!** Netlify will automatically see the changes and redeploy in 1-2 minutes.

---

---

# TROUBLESHOOTING

### **Problem: "git is not recognized"**

**Solution:**
1. Git is not installed
2. Download: `https://git-scm.com/download/win`
3. Run installer
4. Restart PowerShell
5. Try again

---

### **Problem: "fatal: path 'c:\Planner' does not exist"**

**Solution:**
1. Your files are in a different location
2. Find where your files are (open File Explorer)
3. Use correct path in `cd` command
4. Example: `cd c:\Users\YourName\Desktop\Planner`

---

### **Problem: "Please tell me who you are" when committing**

**Solution:**
1. Configure Git with your name and email (Step 5)
2. Then try `git commit` again

---

### **Problem: "Permission denied (publickey)" when pushing**

**Solution:**
1. Use HTTPS instead of SSH
2. Use personal access token instead of password
3. Go to: `https://github.com/settings/tokens`
4. Create new token
5. Use token as password when pushing

---

### **Problem: Files not showing on GitHub**

**Solution:**
1. Refresh GitHub page (F5)
2. Wait 10 seconds
3. Check PowerShell output for errors
4. If errors, fix them and try again
5. Make sure `git push` completed successfully

---

### **Problem: "Repository not found"**

**Solution:**
1. Check your GitHub username is correct in URL
2. Make sure you created repository on GitHub first
3. Check repository is Public (not Private)
4. Copy exact URL from GitHub website
5. Try pushing again

---

---

# WHAT EACH COMMAND DOES

| Command | What It Does |
|---------|-------------|
| `cd c:\Planner` | Navigate to folder with your code |
| `dir` | List all files in current folder |
| `git init` | Start Git tracking in this folder |
| `git config --global user.name` | Tell Git your name |
| `git config --global user.email` | Tell Git your email |
| `git add .` | Mark all files to upload |
| `git commit -m "message"` | Save files with a description |
| `git remote add origin [URL]` | Connect to GitHub repository |
| `git branch -M main` | Rename branch to "main" |
| `git push -u origin main` | Upload to GitHub |

---

---

# SECURITY TIPS

1. **Never share your GitHub password** with anyone
2. **Use personal access tokens** instead of passwords when possible
3. **Don't commit sensitive information** like API keys (use .gitignore)
4. **Keep your email private** - GitHub has options for this
5. **Use 2FA** (two-factor authentication) on your GitHub account for security

---

---

# YOU'RE DONE!

Your code is now:
✅ **Safely stored in the cloud** (GitHub)
✅ **Version controlled** (can track changes)
✅ **Ready to deploy** (to Netlify in next step)
✅ **Shareable** (you can show others your code)

---

**Next Step:** Follow COMPLETE_MASTER_GUIDE.md **PART 2** to deploy to Netlify!


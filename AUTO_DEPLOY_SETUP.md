# 🚀 Automatic Deployment Setup

## Quick Setup for Auto-Updates

### Step 1: Initialize Git Repository (One-time setup)
```bash
# In your project folder, run:
git init
git remote add origin https://github.com/samu77-b/teas-cs-pwa.git
git branch -M main
```

### Step 2: Choose Your Auto-Deploy Method

#### Option A: Windows Batch File (Easiest)
1. Double-click `auto-deploy.bat`
2. It will automatically:
   - Add all changes
   - Commit with timestamp
   - Push to GitHub
   - Trigger live site update

#### Option B: PowerShell Script (Better formatting)
1. Right-click `auto-deploy.ps1`
2. Select "Run with PowerShell"
3. Same automatic process as above

#### Option C: Manual Git Commands
```bash
git add .
git commit -m "Update: $(date)"
git push origin main
```

### Step 3: Workflow
1. **Make changes** to your files (index.html, etc.)
2. **Run auto-deploy script** (double-click .bat or .ps1)
3. **Wait 2-5 minutes** for GitHub Actions to deploy
4. **Check live site**: https://samu77-b.github.io/teas-cs-pwa/

## 🔄 Automatic Update Process

### What Happens When You Run the Script:
1. **Git Add** - Stages all changed files
2. **Git Commit** - Creates commit with timestamp
3. **Git Push** - Pushes to GitHub
4. **GitHub Actions** - Automatically triggers deployment
5. **Live Site Updates** - Your PWA updates in 2-5 minutes

### Files That Get Updated:
- `index.html` - Main PWA file
- `manifest.json` - PWA manifest
- `sw.js` - Service worker
- `Brand/` folder - Logo and branding
- `images/` folder - Category icons
- Any other files you modify

## 🎯 Benefits

- **Instant Updates** - Changes go live in minutes
- **No Manual Upload** - No need to use GitHub web interface
- **Version Control** - All changes are tracked
- **Professional Workflow** - Industry-standard deployment process
- **Client Demo Ready** - Always up-to-date for client presentations

## 🔧 Troubleshooting

### If Script Doesn't Work:
1. **Check Git Installation**: Run `git --version` in command prompt
2. **Check Repository**: Make sure you're in the right folder
3. **Check Permissions**: Ensure you have write access to the repository
4. **Manual Push**: Use the manual git commands above

### If Site Doesn't Update:
1. **Check GitHub Actions**: Go to repository → Actions tab
2. **Check for Errors**: Look for failed workflow runs
3. **Manual Trigger**: Click "Run workflow" in Actions tab

## 📱 Client Demo Workflow

1. **Make Changes** - Edit your PWA files
2. **Run Auto-Deploy** - Double-click the script
3. **Wait 2-5 Minutes** - For deployment to complete
4. **Share Updated URL** - Send to client: https://samu77-b.github.io/teas-cs-pwa/

## 🎉 Result

Your PWA will automatically update every time you make changes and run the script. Perfect for rapid development and client demos!

---

**Your live site will always be up-to-date with your latest changes!** 🚀

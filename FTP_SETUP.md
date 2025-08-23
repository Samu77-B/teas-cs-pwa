# FTP Setup for Teas & Cs PWA

## 🚀 VS Code FTP Configuration

### Step 1: Install VS Code Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for **"FTP-Simple"** or **"SFTP"**
4. Install the extension

### Step 2: Get Hostinger FTP Credentials
1. Log into your Hostinger control panel
2. Go to **Files** → **FTP Accounts**
3. Create a new FTP account or use existing one
4. Note down:
   - FTP Hostname: `paul-banning.com`
   - Username: `YOUR_FTP_USERNAME`
   - Password: `YOUR_FTP_PASSWORD`
   - Port: `21`

### Step 3: Update Configuration
1. Open `.vscode/sftp.json`
2. Replace `YOUR_FTP_USERNAME` with your actual FTP username
3. Replace `YOUR_FTP_PASSWORD` with your actual FTP password

### Step 4: Create Subdomain Directory
1. In Hostinger File Manager, navigate to your domain root
2. Create a folder called `teas` (if it doesn't exist)
3. This will be your subdomain directory

### Step 5: Upload Files
1. In VS Code, press `Ctrl+Shift+P`
2. Type "FTP" and select **"FTP-Simple: Upload"**
3. Select all files to upload
4. Files will be uploaded to `paul-banning.com/teas/`

### Step 6: Access Your PWA
Once uploaded, your PWA will be accessible at:
`https://paul-banning.com/teas/`

## 📁 Files to Upload
- `index.html` (main PWA file)
- `manifest.json` (PWA manifest)
- `sw.js` (service worker)
- `_redirects` (for routing)
- `Brand/` folder (logo)
- `images/` folder (category icons)

## ⚙️ Configuration Features
- **Auto-upload on save**: Files upload automatically when you save
- **File watching**: Monitors for changes and uploads automatically
- **Ignore patterns**: Excludes unnecessary files (.git, .vscode, etc.)
- **Remote path**: Uploads to `/teas/` subdirectory

## 🔧 Troubleshooting
- **Connection issues**: Check FTP credentials and hostname
- **Permission errors**: Ensure FTP account has write permissions
- **Path issues**: Verify the `teas` folder exists on the server

## 🌐 PWA Features
- Offline functionality
- Install prompt
- Responsive design
- Haptic feedback
- QR scanner
- Shopping cart
- Dynamic pricing (20% discount)

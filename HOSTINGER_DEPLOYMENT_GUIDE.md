# Teas & C's PWA - Hostinger Deployment Guide

This guide will walk you through deploying your Teas & C's PWA ordering app to Hostinger, including both frontend and backend setup.

## Prerequisites

- Hostinger hosting account with Node.js support
- Domain name configured with Hostinger
- Stripe account with API keys
- FTP/SFTP client (FileZilla recommended)

## Step 1: Hostinger Account Setup

### 1.1 Choose Hosting Plan
- **Recommended**: Business Hosting or VPS (for Node.js support)
- **Minimum**: Shared Hosting with Node.js support
- **Alternative**: Use Hostinger's VPS for full control

### 1.2 Enable Node.js Support
1. Log into your Hostinger control panel (hPanel)
2. Go to **Advanced** → **Node.js**
3. Enable Node.js support for your domain
4. Note down the Node.js version (recommend v18 or v20)

## Step 2: Backend Server Deployment (Node.js)

### 2.1 Prepare Backend Files
Create a deployment-ready version of your backend:

```bash
# Create a deployment folder
mkdir teas-cs-backend
cd teas-cs-backend

# Copy backend files
cp stripe-backend.js .
cp package.json .
```

### 2.2 Update Backend Configuration
Edit `stripe-backend.js` for production:

```javascript
// Update CORS origins for your domain
app.use(cors({
    origin: [
        'https://yourdomain.com',
        'https://www.yourdomain.com',
        'https://ordering.yourdomain.com', // if using subdomain
        'http://localhost:3000' // Keep for development
    ],
    credentials: true
}));
```

### 2.3 Environment Variables Setup
Create a `.env` file with your production keys:

```env
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
PORT=3001
NODE_ENV=production
```

### 2.4 Upload Backend to Hostinger
1. Connect to your Hostinger via FTP/SFTP
2. Upload files to your domain's root directory or create a subdirectory like `/api`
3. Structure should be:
   ```
   public_html/
   ├── api/                    # Backend files
   │   ├── stripe-backend.js
   │   ├── package.json
   │   └── .env
   └── data/                   # Will be created automatically
   ```

### 2.5 Install Dependencies and Start Server
1. In hPanel, go to **Advanced** → **Terminal**
2. Navigate to your backend directory:
   ```bash
   cd /domains/yourdomain.com/public_html/api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node stripe-backend.js
   ```

### 2.6 Set Up Process Manager (PM2)
For production stability, use PM2:

```bash
# Install PM2 globally
npm install -g pm2

# Start your app with PM2
pm2 start stripe-backend.js --name "teas-cs-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

## Step 3: Frontend PWA Deployment

### 3.1 Prepare Frontend Files
Upload these files to your domain's `public_html` directory:

**Essential Files:**
- `index.html`
- `manifest.json`
- `sw.js` (Service Worker)
- `config.js`
- `admin.html`
- `footer-component.html`

**Assets:**
- `images/` folder (all images)
- `Brand/` folder (logo files)

### 3.2 Update Configuration for Production
Edit `config.js` for production:

```javascript
const CONFIG = {
    // Update with your actual domain
    API_BASE_URL: 'https://yourdomain.com/api',
    
    // Your live Stripe publishable key
    STRIPE_PUBLISHABLE_KEY: 'pk_live_your_live_publishable_key',
    
    // Secure admin token (change from default)
    ADMIN_TOKEN: 'your-secure-admin-token-2024',
    
    // Production environment
    ENVIRONMENT: 'production'
};

// Auto-detect environment
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    CONFIG.ENVIRONMENT = 'production';
    CONFIG.API_BASE_URL = 'https://yourdomain.com/api';
}
```

### 3.3 Update Service Worker
Edit `sw.js` to cache the correct URLs:

```javascript
const CACHE_NAME = 'teas-cs-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html',
  '/manifest.json',
  '/Brand/Teasandcs Logo White.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];
```

## Step 4: SSL Certificate Setup

### 4.1 Enable SSL in Hostinger
1. Go to **Advanced** → **SSL**
2. Enable **Let's Encrypt SSL** or **Cloudflare SSL**
3. Force HTTPS redirect

### 4.2 Update Service Worker for HTTPS
Ensure all URLs in your service worker use HTTPS.

## Step 5: Stripe Production Configuration

### 5.1 Update Stripe Keys
1. Get your live API keys from Stripe Dashboard
2. Update `config.js` with live publishable key
3. Update backend `.env` with live secret key

### 5.2 Configure Webhooks
1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy webhook signing secret to backend `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### 5.3 Update Webhook Handler
In `stripe-backend.js`, update the webhook secret:

```javascript
// Replace the hardcoded secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
```

## Step 6: Domain Configuration

### 6.1 DNS Settings
If using subdomain for ordering:
1. Create A record: `ordering.yourdomain.com` → Your Hostinger IP
2. Or use CNAME: `ordering` → `yourdomain.com`

### 6.2 Update CORS Origins
Update backend CORS to include your actual domain:

```javascript
origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    'https://ordering.yourdomain.com'
]
```

## Step 7: Testing and Verification

### 7.1 Test Frontend
1. Visit `https://yourdomain.com`
2. Verify PWA installation prompt appears
3. Test ordering flow
4. Verify payment processing

### 7.2 Test Admin Dashboard
1. Visit `https://yourdomain.com/admin.html`
2. Test product management
3. Verify order management

### 7.3 Test API Endpoints
```bash
# Health check
curl https://yourdomain.com/api/health

# Products endpoint
curl https://yourdomain.com/api/products
```

## Step 8: Performance Optimization

### 8.1 Enable Compression
Add to your backend server:

```javascript
const compression = require('compression');
app.use(compression());
```

### 8.2 Set Up CDN (Optional)
- Use Hostinger's CDN or Cloudflare
- Optimize image delivery
- Cache static assets

### 8.3 Database Considerations
For production, consider upgrading from file-based storage:
- MongoDB Atlas (free tier available)
- PostgreSQL
- MySQL

## Step 9: Monitoring and Maintenance

### 9.1 Set Up Logging
```javascript
const fs = require('fs');
const path = require('path');

// Add logging middleware
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFileSync('logs/access.log', logEntry);
    next();
});
```

### 9.2 Regular Backups
- Set up automated backups of your data folder
- Backup your configuration files
- Test restore procedures

### 9.3 Security Updates
- Keep Node.js updated
- Monitor for security vulnerabilities
- Update dependencies regularly

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your frontend domain is in the CORS origins list
2. **SSL Issues**: Verify SSL certificate is properly installed
3. **Service Worker Issues**: Clear browser cache and test in incognito mode
4. **Payment Failures**: Check Stripe webhook configuration and logs

### Debug Commands:
```bash
# Check if Node.js process is running
pm2 status

# View logs
pm2 logs teas-cs-backend

# Restart application
pm2 restart teas-cs-backend
```

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Secure admin token (not default)
- [ ] Use environment variables for secrets
- [ ] Enable firewall rules
- [ ] Regular security updates
- [ ] Monitor access logs
- [ ] Backup data regularly

## Support Resources

- Hostinger Knowledge Base: https://support.hostinger.com/
- Stripe Documentation: https://stripe.com/docs
- Node.js Documentation: https://nodejs.org/docs/

---

**Note**: Replace `yourdomain.com` with your actual domain name throughout this guide. Test thoroughly in a staging environment before going live with real payments.

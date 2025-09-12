# Subdomain Deployment Guide for Teas & C's PWA

This guide will help you deploy your PWA to a subdomain like `ordering.teasandcs.com`.

## 🌐 Subdomain Setup Options

### Option 1: GitHub Pages with Custom Domain (Recommended)

#### Step 1: Configure GitHub Pages
1. Go to your GitHub repository: `https://github.com/Samu77-B/teas-cs-pwa`
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **master** branch and **/ (root)** folder
6. In **Custom domain**, enter: `ordering.teasandcs.com`
7. Check **Enforce HTTPS**

#### Step 2: Configure DNS
Add these DNS records in your domain registrar:

```
Type: CNAME
Name: ordering
Value: samu77-b.github.io
TTL: 3600
```

#### Step 3: Wait for SSL
- GitHub will automatically provision an SSL certificate
- This usually takes 5-10 minutes
- You'll see a green checkmark when ready

### Option 2: Your Own Server

#### Step 1: Upload Files
1. Upload all files to your server
2. Ensure `index.html` is in the root directory

#### Step 2: Configure Subdomain
1. In your hosting control panel, create subdomain: `ordering`
2. Point it to the directory with your files
3. Enable SSL certificate

#### Step 3: Configure Web Server
For Apache, create `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## 🔒 Security Configuration

### Update Stripe Configuration
1. **In Stripe Dashboard**:
   - Go to **Settings > Domains**
   - Add your subdomain: `ordering.teasandcs.com`
   - This ensures Stripe only accepts requests from your domain

2. **Update Backend CORS**:
   - The backend is already configured for your subdomain
   - Deploy backend to a secure server (Heroku, Railway, etc.)

### Environment Variables for Production
Set these in your backend deployment:

```bash
STRIPE_SECRET_KEY=sk_live_your_actual_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NODE_ENV=production
```

## 🚀 Deployment Steps

### Frontend (PWA)
1. **Push to GitHub** (already done)
2. **Configure custom domain** in GitHub Pages
3. **Update DNS** records
4. **Wait for SSL** certificate

### Backend (Payment Processing)
1. **Deploy to Heroku**:
   ```bash
   heroku create teas-cs-payment-api
   heroku config:set STRIPE_SECRET_KEY=sk_live_your_key
   git push heroku main
   ```

2. **Update frontend** to use your backend URL:
   ```javascript
   // In index.html, update the fetch URL:
   const response = await fetch('https://teas-cs-payment-api.herokuapp.com/create-payment-intent', {
   ```

## 🔧 Post-Deployment Checklist

- [ ] Subdomain loads correctly
- [ ] HTTPS is working (green lock icon)
- [ ] PWA installs on mobile devices
- [ ] Payment form loads
- [ ] Test payment with real card
- [ ] Check Stripe Dashboard for payments
- [ ] Verify email confirmations work

## 🆘 Troubleshooting

### Common Issues:

1. **DNS not propagating**: Wait 24-48 hours
2. **SSL not working**: Check DNS records are correct
3. **CORS errors**: Verify backend CORS configuration
4. **Payment fails**: Check Stripe domain settings

### Testing Your Subdomain:
```bash
# Test DNS resolution
nslookup ordering.teasandcs.com

# Test HTTPS
curl -I https://ordering.teasandcs.com

# Test PWA manifest
curl https://ordering.teasandcs.com/manifest.json
```

## 📱 Benefits of Subdomain Approach

1. **Professional URL**: `ordering.teasandcs.com`
2. **SSL Security**: Automatic HTTPS
3. **Brand Consistency**: Matches your main site
4. **SEO Benefits**: Subdomain authority
5. **Easy Management**: Separate from main site
6. **Stripe Compliance**: Better domain validation

## 🎯 Next Steps

1. Choose your subdomain name (e.g., `ordering.teasandcs.com`)
2. Configure DNS records
3. Set up GitHub Pages custom domain
4. Deploy backend to secure server
5. Test payment flow
6. Go live!

Your PWA will be accessible at `https://ordering.teasandcs.com` with full Stripe payment integration!

# Netlify + Railway Deployment Guide

This guide will help you deploy your T&C PWA with admin dashboard to Netlify (frontend) and Railway (backend).

## 🚀 Quick Deployment Steps

### 1. Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select your repository**
5. **Railway will auto-detect** the Node.js app
6. **Deploy** - Railway will run `node stripe-backend.js`

### 2. Get Railway Backend URL

1. **Go to your Railway project**
2. **Click on the service**
3. **Go to Settings** → **Domains**
4. **Copy the Railway URL** (e.g., `https://your-app.railway.app`)

### 3. Update Frontend API URLs

Update these files to use your Railway backend URL:

**In `index.html` (line ~3605):**
```javascript
const response = await fetch('YOUR_RAILWAY_URL/create-payment-intent', {
```

**In `index.html` (line ~3693):**
```javascript
const response = await fetch('YOUR_RAILWAY_URL/api/orders', {
```

**In `admin-integration.js` (line 3):**
```javascript
const API_BASE_URL = 'YOUR_RAILWAY_URL';
```

### 4. Deploy Frontend to Netlify

1. **Go to [Netlify.com](https://netlify.com)**
2. **Sign up/Login** with GitHub
3. **New site from Git** → **GitHub**
4. **Select your repository**
5. **Build settings:**
   - Build command: `echo "No build required"`
   - Publish directory: `.` (root)
6. **Deploy site**

### 5. Configure Environment Variables

**In Railway (Backend):**
1. Go to your Railway project
2. **Variables** tab
3. Add these environment variables:
   ```
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   NODE_ENV=production
   ```

**In Netlify (Frontend):**
1. Go to your Netlify site
2. **Site settings** → **Environment variables**
3. Add:
   ```
   RAILWAY_BACKEND_URL=https://your-app.railway.app
   ```

## 🔧 Configuration Files

### Netlify Configuration (`netlify.toml`)
- Handles redirects for admin dashboard
- Serves the PWA correctly
- No build process needed

### Railway Configuration (`railway.json`)
- Specifies Node.js runtime
- Sets start command
- Configures restart policy

## 📱 URLs After Deployment

- **Customer PWA**: `https://your-site.netlify.app`
- **Admin Dashboard**: `https://your-site.netlify.app/admin.html`
- **Backend API**: `https://your-app.railway.app`

## 🔐 Security Notes

1. **Change admin credentials** in `admin.html`:
   ```javascript
   const ADMIN_CREDENTIALS = {
       username: 'your-secure-username',
       password: 'your-secure-password'
   };
   ```

2. **Update admin token** in `admin-integration.js`:
   ```javascript
   const ADMIN_TOKEN = 'your-secure-admin-token';
   ```

3. **Use environment variables** for sensitive data

## 🧪 Testing Checklist

After deployment, test:

- [ ] Customer can scan QR codes
- [ ] Customer can add items to cart
- [ ] Customer can complete payment
- [ ] Admin receives order notifications
- [ ] Admin can manage products
- [ ] Admin can manage orders
- [ ] Admin can create discounts

## 🚨 Troubleshooting

### Backend Issues
- Check Railway logs for errors
- Verify environment variables are set
- Ensure Stripe keys are correct

### Frontend Issues
- Check Netlify build logs
- Verify API URLs are updated
- Test in browser developer tools

### CORS Issues
- Backend CORS is configured for common domains
- Add your Netlify domain to CORS origins if needed

## 📞 Support

If you encounter issues:
1. Check Railway logs
2. Check Netlify build logs
3. Test API endpoints directly
4. Verify environment variables

## 🎉 Success!

Once deployed, your client can:
- Test the customer ordering experience
- Access the admin dashboard
- See real-time order notifications
- Manage products and orders

The app will be fully functional with a live backend!

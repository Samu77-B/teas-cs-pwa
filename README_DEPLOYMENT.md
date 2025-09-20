# 🚀 T&C PWA Deployment Ready!

Your app is now ready for deployment to Netlify + Railway. Here's what I've set up:

## 📁 Files Created/Updated

### ✅ Configuration Files
- `config.js` - Centralized configuration for API URLs and keys
- `netlify.toml` - Netlify deployment configuration
- `railway.json` - Railway deployment configuration
- `deploy.sh` - Deployment helper script

### ✅ Updated Files
- `index.html` - Now uses config.js for API URLs
- `admin.html` - Now uses config.js for API URLs
- `admin-integration.js` - Now uses config.js for API URLs

## 🎯 Quick Deployment Steps

### 1. **Deploy Backend to Railway**
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project → Deploy from GitHub
4. Select your repository
5. Railway auto-detects Node.js and deploys
6. Copy your Railway URL (e.g., `https://your-app.railway.app`)

### 2. **Update Configuration**
1. Edit `config.js`
2. Replace `http://localhost:3001` with your Railway URL
3. Update your Stripe publishable key
4. Change environment to `'production'`

### 3. **Deploy Frontend to Netlify**
1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub
3. New site from Git → GitHub
4. Select your repository
5. Deploy (no build command needed)

### 4. **Set Environment Variables**
**In Railway:**
- `STRIPE_SECRET_KEY=sk_test_your_key`
- `STRIPE_PUBLISHABLE_KEY=pk_test_your_key`
- `STRIPE_WEBHOOK_SECRET=whsec_your_secret`

## 🔗 URLs After Deployment

- **Customer PWA**: `https://your-site.netlify.app`
- **Admin Dashboard**: `https://your-site.netlify.app/admin.html`
- **Backend API**: `https://your-app.railway.app`

## 🧪 Testing Checklist

After deployment, test:
- [ ] Customer can scan QR codes
- [ ] Customer can add items to cart
- [ ] Customer can complete payment
- [ ] Admin receives order notifications
- [ ] Admin can manage products
- [ ] Admin can manage orders

## 🔐 Security Reminders

Before going live:
1. **Change admin credentials** in `admin.html`
2. **Update admin token** in `config.js`
3. **Use production Stripe keys**
4. **Set secure environment variables**

## 📞 Support

If you need help:
1. Check Railway logs for backend issues
2. Check Netlify build logs for frontend issues
3. Use browser developer tools to debug
4. Test API endpoints directly

## 🎉 Success!

Your client will be able to:
- Test the full customer ordering experience
- Access the admin dashboard
- See real-time order notifications
- Manage products and orders

The app will be fully functional with a live backend!

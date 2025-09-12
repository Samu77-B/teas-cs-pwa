# Stripe Payment Integration Setup

This guide will help you set up Stripe payments for your Teas & C's PWA.

## 🚀 Quick Setup

### 1. Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or log in
3. Go to **Developers > API Keys**
4. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
5. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)

### 2. Update Frontend (index.html)

Replace the test key in `index.html` line 3554:

```javascript
// Replace this line:
this.stripe = Stripe('pk_test_your_publishable_key_here');

// With your actual publishable key:
this.stripe = Stripe('pk_live_your_actual_publishable_key_here');
```

**⚠️ SECURITY WARNING**: Never commit your actual keys to GitHub! Use environment variables or config files.

### 3. Set Up Backend Server

1. Install Node.js dependencies:
```bash
npm install
```

2. Update `stripe-backend.js` with your secret key:
```javascript
// Replace this line:
const stripe = require('stripe')('sk_test_your_secret_key_here');

// With your actual secret key:
const stripe = require('stripe')('sk_test_your_actual_secret_key_here');
```

3. Start the backend server:
```bash
npm start
```

4. Update the frontend to use your backend:
```javascript
// In the createPaymentIntent method, replace the mock with:
async createPaymentIntent(amount) {
    const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: amount,
            currency: 'gbp'
        })
    });
    
    const { clientSecret } = await response.json();
    return clientSecret;
}
```

## 🔧 Configuration

### Test Cards

Use these test card numbers for testing:

- **Successful payment**: `4242 4242 4242 4242`
- **Declined payment**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

### Webhook Setup

1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Set URL to: `http://localhost:3001/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook signing secret
6. Update the webhook secret in `stripe-backend.js`

## 🚀 Deployment

### Frontend (GitHub Pages)
Your PWA is already deployed to GitHub Pages. Just update the Stripe key and backend URL.

### Backend (Heroku/Railway/Vercel)
Deploy your backend to a cloud service:

1. **Heroku**:
   ```bash
   git add .
   git commit -m "Add Stripe backend"
   heroku create your-app-name
   git push heroku main
   ```

2. **Railway**:
   - Connect your GitHub repository
   - Set environment variables for Stripe keys
   - Deploy automatically

3. **Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

## 🔒 Security Notes

- **Never** commit your secret keys to version control
- Use environment variables for production
- Always use HTTPS in production
- Validate webhook signatures
- Implement proper error handling

## 📱 Testing

1. Add items to your cart
2. Click "Proceed to Checkout"
3. Enter test card details
4. Complete payment
5. Check Stripe Dashboard for payment confirmation

## 🆘 Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your publishable key
2. **"Payment failed"**: Verify your secret key and backend
3. **CORS errors**: Ensure backend has CORS enabled
4. **Webhook errors**: Check webhook URL and secret

### Support:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)

## 💡 Next Steps

1. Add order management system
2. Implement email confirmations
3. Add payment method saving
4. Set up subscription payments
5. Add analytics and reporting

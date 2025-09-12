// Stripe Backend Server for Teas & C's PWA
// This is a basic Node.js server to handle Stripe payments
// Run with: node stripe-backend.js

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_your_secret_key_here');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create PaymentIntent endpoint
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'gbp' } = req.body;
        
        // Validate amount
        if (!amount || amount < 50) { // Minimum £0.50
            return res.status(400).json({ error: 'Invalid amount' });
        }
        
        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to pence
            currency: currency,
            metadata: {
                integration_check: 'accept_a_payment',
            },
        });
        
        res.json({
            clientSecret: paymentIntent.client_secret,
        });
        
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
});

// Webhook endpoint for Stripe events
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_your_webhook_secret');
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment succeeded:', paymentIntent.id);
            // Here you would update your database, send confirmation emails, etc.
            break;
        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Payment failed:', failedPayment.id);
            // Handle failed payment
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    
    res.json({received: true});
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Stripe backend server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});

// Example usage:
// 1. Install dependencies: npm install express stripe cors
// 2. Replace 'sk_test_your_secret_key_here' with your actual Stripe secret key
// 3. Update the frontend to call: http://localhost:3001/create-payment-intent
// 4. Set up webhook endpoint in Stripe dashboard: http://localhost:3001/webhook

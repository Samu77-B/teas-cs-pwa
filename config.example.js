// Stripe Configuration Example
// Copy this file to config.js and add your actual keys

module.exports = {
    // Stripe Secret Key (starts with sk_live_ or sk_test_)
    stripeSecretKey: 'sk_test_your_secret_key_here',
    
    // Stripe Publishable Key (starts with pk_live_ or pk_test_)
    stripePublishableKey: 'pk_test_your_publishable_key_here',
    
    // Webhook Secret (from Stripe Dashboard)
    stripeWebhookSecret: 'whsec_your_webhook_secret_here',
    
    // Server Configuration
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development'
};

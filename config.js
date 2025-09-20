// Configuration for deployment
// Update these URLs when deploying to production

const CONFIG = {
    // Backend API URL - Update this to your Vercel URL
    API_BASE_URL: 'http://localhost:3001', // Change to your Vercel URL in production
    
    // Stripe Configuration
    STRIPE_PUBLISHABLE_KEY: 'pk_test_your_publishable_key_here', // Update with your Stripe key
    
    // Admin Configuration
    ADMIN_TOKEN: 'admin-token-2024', // Change to secure token in production
    
    // Environment
    ENVIRONMENT: 'development' // Change to 'production' when deployed
};

// Auto-detect environment and update URLs
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Production environment
    CONFIG.ENVIRONMENT = 'production';
    // Update this to your actual Vercel URL
    CONFIG.API_BASE_URL = 'https://teas-cs-hz5h2d57e-banningp-gmailcoms-projects.vercel.app';
}

# Admin Dashboard Setup Guide

This guide will help you set up and use the admin dashboard for your Teas & C's PWA Ordering app.

## Features

The admin dashboard provides the following functionality:

### 🔐 Admin Authentication
- Secure login system
- Session management
- Logout functionality

### 📦 Product Management
- Add new products with categories, prices, and descriptions
- Edit existing products
- Delete products
- Organize products by categories (Hot Drinks, Cold Drinks, Tea, Matcha, Coffee, Specials)

### 💰 Discount Management
- Create discount codes (percentage or fixed amount)
- Set minimum order amounts
- Limit usage counts
- Edit and delete existing discounts

### 📋 Order Management
- View all orders in real-time
- Mark orders as completed
- Reopen completed orders
- Delete orders
- Order status tracking

### 🔔 Notification System
- Real-time order notifications with popup alerts
- Customizable notification sounds
- Configurable notification duration
- Test notification functionality

### 📊 Dashboard Overview
- Total products count
- Total orders count
- Pending orders count
- Total revenue tracking

## Setup Instructions

### 1. Backend Setup

1. **Install Dependencies**
   ```bash
   npm install express stripe cors
   ```

2. **Configure Stripe**
   - Copy `config.example.js` to `config.js`
   - Add your Stripe secret and publishable keys
   - Set up webhook endpoints in your Stripe dashboard

3. **Start the Backend Server**
   ```bash
   node stripe-backend.js
   ```
   The server will run on `http://localhost:3001`

### 2. Admin Dashboard Access

1. **Open the Admin Dashboard**
   - Navigate to `http://localhost:3001/admin.html` (if serving from backend)
   - Or open `admin.html` directly in your browser

2. **Login Credentials**
   - Username: `admin`
   - Password: `teasandcs2024`
   
   **⚠️ IMPORTANT: Change these credentials in production!**

### 3. Configuration

#### Backend API Configuration
Edit `admin-integration.js` to configure the API endpoint:
```javascript
const API_BASE_URL = 'http://localhost:3001'; // Change to your backend URL
const ADMIN_TOKEN = 'admin-token-2024'; // Change to a secure token
```

#### Admin Credentials
Edit `admin.html` to change the login credentials:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'your-username',
    password: 'your-secure-password'
};
```

## Usage Guide

### Adding Products

1. Navigate to the **Products** section
2. Click **Add New Product**
3. Fill in the product details:
   - Product Name
   - Category (Hot Drinks, Cold Drinks, etc.)
   - Regular Price
   - Large Price
   - Product Type (Tea, Coffee, Matcha, Specialty)
   - Description (optional)
4. Click **Save Product**

### Creating Discounts

1. Navigate to the **Discounts** section
2. Click **Add New Discount**
3. Configure the discount:
   - Discount Name
   - Discount Code (what customers will enter)
   - Discount Type (Percentage or Fixed Amount)
   - Discount Value
   - Minimum Order Amount (optional)
   - Maximum Uses (optional)
   - Description
4. Click **Save Discount**

### Managing Orders

1. Navigate to the **Orders** section
2. View all orders with their status
3. Use the following actions:
   - **Mark Complete**: Change order status to completed
   - **Reopen**: Change completed order back to pending
   - **Delete**: Remove order from the system
   - **Refresh Orders**: Reload orders from the backend

### Notification Settings

1. Navigate to the **Notifications** section
2. Configure notification preferences:
   - Enable/disable order notifications
   - Choose notification sound
   - Set notification duration
3. Click **Save Settings**
4. Use **Test Notification** to verify settings

## API Endpoints

The backend provides the following admin API endpoints:

### Products
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create/update product
- `DELETE /api/admin/products/:id` - Delete product

### Discounts
- `GET /api/admin/discounts` - Get all discounts
- `POST /api/admin/discounts` - Create/update discount
- `DELETE /api/admin/discounts/:id` - Delete discount

### Orders
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `DELETE /api/admin/orders/:id` - Delete order

### Public Endpoints
- `GET /api/products` - Get products for frontend
- `GET /api/discounts` - Get discounts for frontend
- `POST /api/validate-discount` - Validate discount code
- `POST /api/orders` - Create new order

## Security Considerations

### Production Deployment

1. **Change Default Credentials**
   - Update admin username and password
   - Use strong, unique passwords
   - Consider implementing 2FA

2. **Secure API Token**
   - Change the default admin token
   - Use environment variables for sensitive data
   - Implement proper JWT authentication

3. **HTTPS**
   - Always use HTTPS in production
   - Update CORS settings for your domain

4. **Data Backup**
   - Regular backups of the `data/` directory
   - Consider using a proper database for production

### Environment Variables

Set these environment variables in production:

```bash
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
ADMIN_TOKEN=your_secure_admin_token
NODE_ENV=production
```

## Troubleshooting

### Common Issues

1. **Admin Dashboard Not Loading**
   - Check if backend server is running
   - Verify API_BASE_URL in admin-integration.js
   - Check browser console for errors

2. **API Requests Failing**
   - Verify admin token is correct
   - Check CORS settings in backend
   - Ensure backend server is accessible

3. **Orders Not Appearing**
   - Check if orders are being created in the frontend
   - Verify the `/api/orders` endpoint is working
   - Check backend logs for errors

4. **Notifications Not Working**
   - Verify notification settings are saved
   - Check browser permissions for notifications
   - Test with the "Test Notification" button

### Data Storage

The admin dashboard stores data in:
- **Backend**: `data/` directory (products.json, orders.json, discounts.json)
- **Frontend**: localStorage (notification settings, admin session)

### Logs

Check the backend console for:
- API request logs
- Error messages
- Order creation notifications

## Support

For issues or questions:
1. Check the browser console for JavaScript errors
2. Check the backend console for server errors
3. Verify all configuration settings
4. Test with the provided test functionality

## Future Enhancements

Potential improvements for the admin dashboard:
- Real-time WebSocket notifications
- Advanced analytics and reporting
- Inventory management
- Customer management
- Email notifications
- Mobile app integration
- Multi-location support

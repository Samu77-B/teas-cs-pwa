# Chair Number Feature

## Overview

The admin dashboard now includes chair number tracking for all orders. When customers place orders, the chair number they scanned or entered is captured and displayed in the admin notifications and order management system.

## How It Works

### Customer Side
1. **QR Code Scanning**: Customers can scan QR codes on their tables to automatically set their chair number
2. **Manual Entry**: Customers can manually enter their chair number (1-8) if QR scanning is not available
3. **Default Chair**: If no chair is selected, the system defaults to "Chair One"

### Admin Side
1. **Order Notifications**: When a new order comes in, the popup notification shows:
   - Order number
   - **Chair number** (highlighted with location icon)
   - Total amount
   - Number of items

2. **Order Management**: In the orders section, each order displays:
   - Chair number prominently displayed
   - Order timestamp
   - Order details and status

## Features

### Enhanced Notifications
- **Visual Highlighting**: Chair number is displayed in a highlighted box with a location icon (📍)
- **Clear Format**: "Chair One", "Chair Two", etc.
- **Fallback**: Shows "Not specified" if no chair number is captured

### Order Display
- **Chair Information**: Each order card shows the chair number in a dedicated info section
- **Timestamp**: Shows when the order was placed
- **Status Tracking**: Pending/completed status with chair number context

### Testing
- **Test Notification**: The "Test Notification" button now includes a sample chair number
- **Simulate Orders**: The development "Simulate Order" button randomly assigns chair numbers (Table 1-10)

## Technical Implementation

### Backend Changes
- **Order Creation**: The `/api/orders` endpoint now accepts `chairNumber` parameter
- **Data Storage**: Chair numbers are stored with each order in the JSON database
- **Default Handling**: If no chair number is provided, defaults to "Not specified"

### Frontend Changes
- **Payment Integration**: When payment succeeds, the chair number is automatically sent to the backend
- **Data Capture**: Chair number is captured from the QR scanner or manual input
- **Display Format**: Consistent "Chair [Name]" format throughout the system

## Usage Examples

### Customer Flow
1. Customer scans QR code on table → "Chair Three" is set
2. Customer adds items to cart and proceeds to payment
3. Payment succeeds → Order is sent to backend with chair number
4. Admin receives notification: "New Order #123 from Chair Three"

### Admin Flow
1. Admin sees popup notification with chair number highlighted
2. Admin goes to Orders section to see full order details
3. Admin can easily identify which table the order is for
4. Admin marks order as complete when delivered to the correct table

## Configuration

### Chair Number Format
- **Display Format**: "Chair [Name]" (e.g., "Chair One", "Chair Two")
- **QR Code Format**: Can contain "chair 1", "chair1", or just "1"
- **Manual Input**: Accepts numbers 1-8

### Notification Settings
- **Duration**: Configurable notification display time
- **Sound**: Optional notification sounds
- **Enable/Disable**: Can be turned on/off in admin settings

## Benefits

1. **Improved Service**: Staff can immediately see which table to deliver orders to
2. **Reduced Errors**: Clear chair number identification prevents delivery mistakes
3. **Better Organization**: Orders are organized by location for efficient service
4. **Customer Experience**: Customers don't need to specify their location repeatedly

## Future Enhancements

Potential improvements for the chair number feature:
- **Table Layout**: Visual table layout in admin dashboard
- **Delivery Tracking**: Track delivery status per table
- **Multiple Orders**: Handle multiple orders from the same table
- **Table Status**: Show which tables have pending orders
- **Analytics**: Track popular tables and peak ordering times

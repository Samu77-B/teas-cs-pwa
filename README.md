# Teas & C's PWA

A Progressive Web App for ordering drinks at Teas & C's coffee shop.

## Features

- **Offline Support**: Works without internet connection
- **Installable**: Can be installed on mobile devices and desktops
- **Responsive Design**: Optimized for mobile and tablet use
- **Interactive Menu**: Browse and customize drinks
- **Shopping Cart**: Add multiple items and checkout
- **Order Confirmation**: Visual feedback with animations
- **Rating System**: Rate your experience after ordering

## How to Use

1. **Open the App**: Navigate to `teas-cs-new-design.html` in your browser
2. **Browse Menu**: Select from Everyday Teas, Matcha Teas, Coffees, or Specialties
3. **Customize**: Choose size, milk type, and sweetener options
4. **Add to Cart**: Select quantity and add items to your cart
5. **Checkout**: Review your order and complete checkout
6. **Rate**: Provide feedback on your experience

## Installation

### For Development
1. Open `teas-cs-new-design.html` in a web browser
2. The PWA will automatically register the service worker

### For Production
1. Host the files on a web server with HTTPS
2. The PWA will be installable on supported devices
3. Users can add it to their home screen

## Files Structure

- `teas-cs-new-design.html` - Main PWA application
- `manifest.json` - PWA manifest configuration
- `sw.js` - Service worker for offline functionality
- `README.md` - This documentation

## PWA Features

- **Manifest**: Defines app appearance and behavior
- **Service Worker**: Enables offline functionality and caching
- **Responsive Design**: Works on all screen sizes
- **Install Prompt**: Users can install the app on their device

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

To modify the app:
1. Edit `teas-cs-new-design.html` for UI changes
2. Update `manifest.json` for PWA settings
3. Modify `sw.js` for caching behavior

The app uses vanilla JavaScript and CSS for maximum compatibility.

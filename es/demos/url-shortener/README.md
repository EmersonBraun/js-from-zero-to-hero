# URL Shortener

> [pt-br version](README-PTBR.md)

A modern URL shortening service that converts long URLs into compact, shareable links with click tracking and custom aliases.

## CLASS

### Features
- **URL Shortening**: Convert long URLs into short, manageable links
- **Custom Aliases**: Create memorable custom URLs for your links
- **Click Tracking**: Monitor how many times your links are accessed
- **URL History**: View and manage your recently shortened URLs
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Local Storage**: URLs are saved locally in your browser

### Controls
- **URL Input**: Enter the long URL you want to shorten
- **Custom Alias**: Optionally specify a custom short code
- **Shorten Button**: Generate the shortened URL
- **Copy Button**: Copy the shortened URL to clipboard
- **Clear Button**: Reset the form
- **URL History**: Click on shortened URLs to visit them

### How It Works
- Enter a valid URL in the input field
- Optionally add a custom alias (3-20 characters)
- Click "Shorten URL" to generate a short link
- The shortened URL uses hash-based routing for redirection
- Click tracking is automatically updated when links are accessed
- All data is stored locally in your browser

## CHALLENGE 01

### Additional Features
- **QR Code Generation**: Generate QR codes for shortened URLs
- **Analytics Dashboard**: Detailed click statistics and charts
- **URL Expiration**: Set expiration dates for temporary links
- **Password Protection**: Add password protection to sensitive links
- **Bulk URL Shortening**: Shorten multiple URLs at once

### Technical Improvements
- Implement QR code generation using Canvas API
- Add chart.js for analytics visualization
- Create URL expiration system with cleanup
- Add password protection with encryption
- Implement bulk processing with progress indicators

## CHALLENGE 02

### Advanced Features
- **API Integration**: Connect to external URL shortening services
- **Social Media Integration**: Direct sharing to social platforms
- **Advanced Analytics**: Geographic and device tracking
- **URL Categories**: Organize URLs into categories and tags
- **Export/Import**: Backup and restore URL data

### Enhanced UX
- **Real-time Validation**: Instant feedback on URL format
- **Auto-complete**: Suggest URLs from history
- **Keyboard Shortcuts**: Quick actions with keyboard
- **Dark/Light Theme**: Toggle between themes
- **Progressive Web App**: Install as desktop/mobile app

### Technical Enhancements
- Integrate with Bitly, TinyURL, or similar APIs
- Implement social sharing APIs (Twitter, Facebook, LinkedIn)
- Add advanced analytics with user agent parsing
- Create category management system
- Implement data export/import functionality

## Technologies Used

- **HTML5**: Semantic structure and form elements
- **CSS3**: Modern styling with glassmorphism effects
- **JavaScript ES6+**: URL processing and local storage
- **Local Storage API**: Client-side data persistence
- **Hash-based Routing**: URL redirection system

## Core Features

### URL Processing
- **Validation**: Ensures URLs are properly formatted
- **Short Code Generation**: Creates unique 6-character codes
- **Custom Aliases**: Allows user-defined short codes
- **Collision Prevention**: Ensures unique short codes
- **Hash-based Redirects**: Uses URL fragments for redirection

### Data Management
- **Local Storage**: Persistent data storage in browser
- **Click Tracking**: Automatic click counting
- **History Management**: Recent URLs display and management
- **Data Validation**: Input sanitization and validation
- **Error Handling**: Graceful error management

### User Interface
- **Modern Design**: Glassmorphism effects and gradients
- **Responsive Layout**: Works on all device sizes
- **Interactive Elements**: Hover effects and animations
- **Accessibility**: Proper labels and keyboard navigation
- **Copy Functionality**: One-click URL copying

## How to Use

1. **Enter URL**: Paste or type the long URL you want to shorten
2. **Custom Alias** (optional): Add a memorable custom code
3. **Shorten**: Click the "Shorten URL" button
4. **Copy**: Use the copy button to copy the shortened URL
5. **Share**: Share the shortened URL with others
6. **Track**: Monitor clicks in the URL history section

## URL Format

- **Generated URLs**: `yourdomain.com#AbC123`
- **Custom Aliases**: `yourdomain.com#my-custom-link`
- **Redirect System**: Hash-based routing for instant redirects

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Features

- **URL Validation**: Prevents malicious URL injection
- **Input Sanitization**: Cleans user input
- **Local Storage**: Data stays on your device
- **No External Services**: No data sent to third parties
- **Hash-based Security**: Uses URL fragments for redirection

## Performance

- **Instant Processing**: No server requests required
- **Local Storage**: Fast data access and retrieval
- **Optimized Rendering**: Efficient DOM updates
- **Memory Management**: Proper cleanup of unused data
- **Responsive Design**: Smooth performance on all devices

## Future Enhancements

- **Cloud Sync**: Sync URLs across devices
- **Advanced Analytics**: Detailed click tracking and reporting
- **API Development**: RESTful API for external integrations
- **Mobile App**: Native mobile applications
- **Enterprise Features**: Team collaboration and management
- **AI Integration**: Smart URL suggestions and categorization

## Limitations

- **Local Storage**: URLs are device-specific
- **Hash-based Routing**: Requires JavaScript for redirects
- **No Server**: Cannot track clicks across different devices
- **Storage Limits**: Limited by browser storage capacity
- **No Global Uniqueness**: Short codes are only unique per device

---

**Note**: This URL shortener is designed for personal use and learning purposes. For production use, consider implementing server-side functionality for global uniqueness and cross-device tracking. 
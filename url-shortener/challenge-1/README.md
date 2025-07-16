# URL Shortener - Challenge 1

> [pt-br version](README-PTBR.md)

## CLASS

Basic URL shortening service with simple functionality.

### Features:
- Convert long URLs to short ones
- Copy shortened URLs to clipboard
- Basic URL validation
- Simple interface

### Controls:
- **URL Input**: Enter the long URL to shorten
- **Shorten Button**: Generate short URL
- **Copy Button**: Copy shortened URL to clipboard
- **Clear Button**: Clear all inputs

---

## CHALLENGE 01

Enhanced URL shortener with custom aliases, expiry dates, and click tracking.

### New Features:
- **Custom Aliases**: Create memorable custom short codes
- **Expiry Dates**: Set expiration dates for URLs
- **Click Tracking**: Monitor how many times URLs are clicked
- **URL History**: View and manage previously shortened URLs
- **Statistics Dashboard**: Track total URLs, clicks, and activity
- **Export Functionality**: Export URL data
- **Enhanced Validation**: Better URL and alias validation

### URL Options:
- **Long URL**: The original URL to shorten
- **Custom Alias**: Optional custom short code (letters, numbers, hyphens, underscores)
- **Expiry Date**: Optional expiration date and time
- **Auto-generated Alias**: Random short code if no custom alias provided

### Controls:
- **URL Input**: Enter the long URL to shorten
- **Custom Alias Input**: Create custom short code
- **Expiry Date Picker**: Set expiration date
- **Shorten Button**: Generate short URL
- **Copy Button**: Copy shortened URL to clipboard
- **Clear Button**: Clear all inputs
- **Clear History**: Remove all saved URLs
- **Export Button**: Export URL data as JSON

### URL Information Display:
- **Original URL**: The full original URL
- **Created Date**: When the URL was shortened
- **Expiry Info**: When the URL expires (or "Never")
- **Click Count**: Number of times the URL was accessed
- **Status**: Active or expired status

### Statistics:
- **Total URLs**: Number of URLs created
- **Total Clicks**: Combined clicks across all URLs
- **Active URLs**: Currently active URLs
- **Expired URLs**: URLs that have expired

### Data Management:
- **Local Storage**: URLs and data persist between sessions
- **History Management**: View and manage all shortened URLs
- **Data Export**: Export all URL data as JSON file
- **Data Import**: Import previously exported data

### Validation Features:
- **URL Format**: Validates proper URL format
- **Alias Format**: Only allows letters, numbers, hyphens, and underscores
- **Expiry Validation**: Ensures expiry date is in the future
- **Duplicate Prevention**: Checks for existing aliases

---

## CHALLENGE 02

Advanced URL shortener with analytics, QR codes, API access, and professional features.

### New Features:
- **QR Code Generation**: Generate QR codes for shortened URLs
- **Advanced Analytics**: Detailed click tracking and reporting
- **API Access**: RESTful API for programmatic access
- **Password Protection**: Secure URLs with passwords
- **Click Limits**: Set maximum number of clicks
- **Tabbed Interface**: Organized sections for different features
- **Charts and Graphs**: Visual analytics with Chart.js
- **Advanced Settings**: Customizable default options

### Advanced URL Options:
- **Password Protection**: Optional password for URL access
- **Click Limits**: Maximum number of times URL can be accessed
- **QR Code**: Automatic QR code generation
- **Advanced Analytics**: Detailed tracking and reporting

### Analytics Features:
- **Click Tracking**: Monitor URL performance over time
- **Date Range Filtering**: View analytics for specific periods
- **Visual Charts**: Interactive charts showing click trends
- **Top URLs**: Identify most popular shortened URLs
- **Detailed Reports**: Comprehensive analytics table

### API Features:
- **RESTful API**: Programmatic access to URL shortening
- **API Documentation**: Complete endpoint documentation
- **API Testing**: Built-in API testing interface
- **JSON Responses**: Standardized API responses

### Settings Management:
- **Default Domain**: Customize the default short domain
- **Default Expiry**: Set default expiration period
- **Auto-generation**: Toggle automatic alias generation
- **Analytics Options**: Configure tracking preferences
- **Data Management**: Import/export and clear data

### Professional Features:
- **Tabbed Interface**: Organized sections (Shortener, Analytics, API, Settings)
- **Responsive Design**: Works on all device sizes
- **Professional UI**: Modern, clean interface design
- **Error Handling**: Comprehensive error management
- **Loading States**: Visual feedback for operations

### Controls:
- **All previous controls from Challenge 1**
- **Tab Navigation**: Switch between different sections
- **QR Code Download**: Download generated QR codes
- **API Testing**: Test API endpoints directly
- **Settings Configuration**: Customize application behavior
- **Data Export/Import**: Manage application data

### Advanced Analytics:
- **Time-based Charts**: Visual representation of click trends
- **Geographic Data**: Track clicks by country (if enabled)
- **Device Tracking**: Monitor clicks by device type
- **Referrer Tracking**: Track where clicks originate from
- **Performance Metrics**: Detailed performance analysis

---

## Technologies Used

- **HTML5**: Semantic structure and form elements
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript ES6+**: URL shortening logic, local storage, and DOM manipulation
- **Chart.js**: Interactive charts and analytics visualization
- **QRCode.js**: QR code generation library
- **Local Storage**: Persistent data storage

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Installation

1. Clone or download the project
2. Open `index.html` in a web browser
3. Start shortening URLs!

## API Usage

### Shorten URL
```javascript
fetch('/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        url: 'https://example.com/long-url',
        alias: 'optional-alias',
        expiry: '2024-12-31T23:59:59',
        maxClicks: 100,
        password: 'optional-password'
    })
})
```

### Get Analytics
```javascript
fetch('/api/analytics/abc123')
    .then(response => response.json())
    .then(data => console.log(data));
```

## Contributing

Feel free to contribute to this project by:
- Adding new analytics features
- Improving the API
- Adding more URL options
- Enhancing the UI/UX
- Adding social media integration

## License

This project is part of the JS Dev Course and follows the same licensing terms. 
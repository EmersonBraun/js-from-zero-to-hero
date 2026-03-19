# Random Image Feed

> [pt-br version](README-PTBR.md)

A beautiful image discovery application that allows users to search, browse, and explore high-quality images from Unsplash with advanced filtering and interactive features.

## CLASS

### Features
- **Image Search**: Search for specific images using keywords
- **Random Discovery**: Get random images with a single click
- **Category Filtering**: Filter images by categories (nature, architecture, people, etc.)
- **Orientation Filtering**: Filter by image orientation (landscape, portrait, square)
- **Grid/List Views**: Toggle between different viewing modes
- **Image Modal**: Click images to view full-size with details
- **Download & Share**: Download images or share them with others
- **Responsive Design**: Works seamlessly on all devices

### Controls
- **Search Bar**: Enter keywords to search for specific images
- **Search Button**: Execute the search
- **Random Button**: Get a random image
- **Category Filter**: Filter by image categories
- **Orientation Filter**: Filter by image orientation
- **View Toggle**: Switch between grid and list views
- **Load More**: Load additional images
- **Image Cards**: Click to view full-size images

### How It Works
- Connects to the Unsplash API to fetch high-quality images
- Displays images in an attractive card layout
- Shows image details including photographer, likes, and downloads
- Provides smooth navigation and search functionality
- Handles errors gracefully with user-friendly messages

## CHALLENGE 01

### Additional Features
- **Favorites System**: Save favorite images to local storage
- **Advanced Search**: Search by color, size, and other criteria
- **Collections**: Browse curated image collections
- **User Profiles**: View photographer profiles and their work
- **Image Details**: Show camera settings, location, and tags

### Technical Improvements
- Implement local storage for favorites
- Add color-based search functionality
- Create collection browsing system
- Add photographer profile integration
- Implement detailed image metadata display

## CHALLENGE 02

### Advanced Features
- **Infinite Scroll**: Automatically load more images as you scroll
- **Image Editing**: Basic image editing tools (crop, filter, etc.)
- **Social Features**: Like, comment, and share images
- **Custom Collections**: Create and share personal image collections
- **Advanced Analytics**: Track popular images and trends

### Enhanced UX
- **Lazy Loading**: Load images as they come into view
- **Smooth Animations**: Transitions and hover effects
- **Keyboard Navigation**: Full keyboard support
- **Dark/Light Theme**: Toggle between themes
- **Progressive Web App**: Install as desktop/mobile app

### Technical Enhancements
- Implement intersection observer for lazy loading
- Add image editing capabilities with Canvas API
- Create social interaction system
- Build collection management features
- Add analytics and tracking

## Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients and animations
- **JavaScript ES6+**: Async/await and modern JavaScript features
- **Unsplash API**: RESTful API for high-quality images
- **Fetch API**: Modern HTTP requests
- **Responsive Design**: Mobile-first approach

## Core Features

### Image Discovery
- **Search Functionality**: Find images by keywords
- **Random Images**: Discover unexpected beautiful photos
- **Category Browsing**: Explore images by category
- **Orientation Filtering**: Find images in specific orientations
- **Pagination**: Load more images as needed

### Image Display
- **Grid Layout**: Masonry-style image grid
- **List View**: Alternative list-based layout
- **Modal View**: Full-size image viewing
- **Image Information**: Photographer, location, stats
- **Responsive Images**: Optimized for all screen sizes

### User Interaction
- **Image Click**: Open full-size modal
- **Download**: Save images to device
- **Share**: Share images via native sharing
- **View Toggle**: Switch between grid and list
- **Loading States**: Visual feedback during operations

## API Integration

### Unsplash API Endpoints
- `/photos`: Get curated photos
- `/search/photos`: Search for specific images
- `/photos/random`: Get random images
- `/photos/{id}`: Get specific image details
- `/users/{username}`: Get user profile

### Data Structure
```javascript
{
  id: string,
  urls: {
    raw: string,
    full: string,
    regular: string,
    small: string,
    thumb: string
  },
  description: string,
  alt_description: string,
  user: {
    name: string,
    username: string,
    portfolio_url: string
  },
  likes: number,
  downloads: number,
  location: {
    title: string,
    name: string
  }
}
```

## How to Use

1. **Search Images**: Enter keywords in the search bar
2. **Random Discovery**: Click "Random Image" for surprises
3. **Filter Results**: Use category and orientation filters
4. **Browse Grid**: View images in grid or list format
5. **View Details**: Click any image for full-size view
6. **Download/Share**: Use modal controls to download or share
7. **Load More**: Click "Load More" for additional images

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Images load as they become visible
- **Optimized Images**: Use appropriate image sizes
- **Caching**: Cache API responses for better performance
- **Error Handling**: Graceful fallbacks for failed requests
- **Smooth Animations**: 60fps animations and transitions

## Error Handling

- **Network Errors**: Handle API connection issues
- **Invalid Searches**: Provide helpful error messages
- **Missing Images**: Fallback images and placeholder content
- **Rate Limiting**: Respect API rate limits
- **User Feedback**: Clear error messages and retry options

## Future Enhancements

- **Offline Support**: Cache images for offline viewing
- **Advanced Search**: AI-powered image search
- **Social Features**: User accounts and interactions
- **Custom Themes**: User-customizable color schemes
- **Voice Search**: Voice-activated image search
- **AR Integration**: Augmented reality image viewing

## API Limitations

- **Rate Limiting**: Unsplash API has rate limits
- **Authentication**: Requires API key for production use
- **Image Quality**: Varies by photographer and settings
- **Network Dependency**: Requires internet connection
- **CORS Restrictions**: API may have cross-origin restrictions

## Contributing

This project uses the Unsplash API. For production use, you'll need to register for an API key at [unsplash.com/developers](https://unsplash.com/developers).

---

**Note**: This Random Image Feed is designed for educational purposes and image discovery. All images are provided by Unsplash and are used in accordance with their terms of service. 
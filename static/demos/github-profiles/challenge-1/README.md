# GitHub Profiles

> [pt-br version](README-PTBR.md)

A GitHub profile viewer application that integrates with the GitHub API to display user profiles, repositories, statistics, and social information in a beautiful and interactive interface.

## CLASS

Basic GitHub profile display with simple search functionality.

### Features:
- Search GitHub users by username
- Display basic profile information
- Show user statistics
- List recent repositories

### Technologies:
- HTML5
- CSS3 (with gradients and animations)
- JavaScript (ES6+)
- GitHub API integration

## CHALLENGE 01

Enhanced GitHub profile viewer with advanced features and improved user experience.

### Additional Features:
- GitHub API integration for real-time data
- Comprehensive profile information display
- Repository listing with metadata
- Social links and external profiles
- Language color coding for repositories
- Responsive design with hover effects
- Advanced error handling and loading states
- Repository statistics (stars, forks, language)
- Profile statistics (repos, gists, followers, following)
- Keyboard shortcuts support

### Technical Improvements:
- API integration with proper error handling
- Dynamic profile data loading
- Repository metadata processing
- Language color mapping
- Date formatting and relative time display
- Advanced DOM manipulation
- Event handling and state management

## CHALLENGE 02

Advanced features and additional functionality.

### Planned Features:
- User activity timeline
- Repository analytics and insights
- Followers and following lists
- Repository search and filtering
- User comparison tools
- Advanced profile customization
- Repository contribution graphs
- Social features and sharing

### Advanced Features:
- GitHub authentication
- Personal dashboard
- Repository cloning and forking
- Advanced analytics and metrics
- Team and organization profiles
- Repository collaboration tools
- Advanced search filters
- Profile export functionality

## Navigation

- [Main Project](../README.md)
- [Challenge 1](README.md) ← You are here
- [Challenge 2](../challenge-2/README.md)

## Demo

The application allows users to:
1. Search for any GitHub user by username
2. View comprehensive profile information including:
   - Profile picture and basic info
   - Bio and description
   - Statistics (repositories, gists, followers, following)
   - Social links (blog, Twitter, company)
3. Browse recent repositories with:
   - Repository names and descriptions
   - Programming language with color coding
   - Star and fork counts
   - Last updated dates
4. Access direct links to GitHub profiles and repositories

## Features

### Core Functionality:
- **User Search**: Find any GitHub user by username
- **Profile Display**: Comprehensive profile information
- **Repository Listing**: Recent repositories with metadata
- **Statistics**: Real-time user statistics
- **Social Links**: Direct links to external profiles

### User Experience:
- **Responsive Design**: Works on desktop and mobile devices
- **Hover Effects**: Interactive elements with smooth animations
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error messages and fallbacks
- **Keyboard Navigation**: Quick access with keyboard shortcuts

### Profile Information:
- **Basic Info**: Name, username, bio, avatar
- **Statistics**: Public repos, gists, followers, following
- **Social Links**: GitHub profile, blog, Twitter, company
- **Repository Data**: Names, descriptions, languages, stats

## API Integration

This project uses the [GitHub REST API](https://docs.github.com/en/rest) to fetch:
- User profile information
- Repository data and metadata
- User statistics and activity
- Social links and external profiles

### API Endpoints Used:
- **User Profile**: `/users/{username}`
- **User Repositories**: `/users/{username}/repos`
- **Rate Limiting**: Respects GitHub API rate limits
- **Error Handling**: Proper error responses and status codes

## Repository Information

For each repository, the app displays:
- **Name**: Repository name with link to GitHub
- **Description**: Repository description or "No description available"
- **Language**: Primary programming language with color coding
- **Statistics**: Stars, forks, and last updated date
- **Metadata**: Repository size, visibility, and other details

## Language Colors

The app includes color coding for popular programming languages:
- JavaScript (#f1e05a)
- TypeScript (#2b7489)
- Python (#3572A5)
- Java (#b07219)
- C++ (#f34b7d)
- And many more...

## Keyboard Shortcuts

- **Ctrl/Cmd + F**: Focus search input
- **Enter**: Execute search

## Error Handling

The application handles various error scenarios:
- **User Not Found**: Clear error message for invalid usernames
- **API Errors**: Graceful handling of API failures
- **Network Issues**: User-friendly error messages
- **Rate Limiting**: Respects GitHub API limits

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Features

- **Efficient API Calls**: Minimal API requests for optimal performance
- **Lazy Loading**: Load data only when needed
- **Caching**: Browser caching for API responses
- **Responsive Images**: Optimized avatar loading

## GitHub API Rate Limits

The GitHub API has rate limits:
- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour
- **Enterprise**: Higher limits for enterprise accounts

## Usage Examples

Try searching for these popular GitHub users:
- `octocat` (GitHub's mascot)
- `torvalds` (Linus Torvalds)
- `gaearon` (Dan Abramov)
- `addyosmani` (Addy Osmani)
- `sindresorhus` (Sindre Sorhus)

## Contributing

This project demonstrates:
- Modern JavaScript ES6+ features
- API integration best practices
- Responsive web design
- Error handling patterns
- User experience optimization 
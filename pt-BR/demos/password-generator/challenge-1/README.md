# Password Generator

> [pt-br version](README-PTBR.md)

A secure password generator application with customizable options, strength analysis, and password history management for creating strong and unique passwords.

## CLASS

Basic password generation with simple character options.

### Features:
- Generate random passwords
- Basic character type selection
- Simple length control
- Copy to clipboard functionality
- Basic password display

### Technologies:
- HTML5
- CSS3 (with gradients and animations)
- JavaScript (ES6+)
- Local Storage API

## CHALLENGE 01

Enhanced password generator with advanced features and improved user experience.

### Additional Features:
- Adjustable password length (4-50 characters)
- Multiple character type options (uppercase, lowercase, numbers, symbols)
- Real-time password strength analysis
- Visual strength meter with color coding
- Password history with copy functionality
- Statistics tracking (passwords generated)
- Advanced copy to clipboard with fallback
- Responsive design for mobile devices
- Keyboard shortcuts support
- Message notification system

### Technical Improvements:
- Secure password generation algorithm
- Strength calculation based on multiple factors
- Local storage for history and statistics
- Clipboard API with fallback support
- Dynamic DOM manipulation
- Event handling and state management
- Error handling and user feedback

## CHALLENGE 02

Advanced features and additional functionality.

### Planned Features:
- Password patterns and templates
- Custom character sets
- Password categories (social, banking, work)
- Export password history
- Password sharing (encrypted)
- Advanced strength analysis
- Password breach checking
- Two-factor authentication integration

### Advanced Features:
- Password manager integration
- Cloud synchronization
- Advanced encryption options
- Password generation rules
- Bulk password generation
- Password strength training
- Security recommendations
- Advanced analytics and insights

## Navigation

- [Main Project](../README.md)
- [Challenge 1](README.md) ← You are here
- [Challenge 2](../challenge-2/README.md)

## Demo

The application allows users to:
1. Adjust password length using the slider (4-50 characters)
2. Select character types (uppercase, lowercase, numbers, symbols)
3. Generate secure passwords with one click
4. View real-time password strength analysis
5. Copy passwords to clipboard with visual feedback
6. Access password history for reuse
7. Track statistics of generated passwords

## Features

### Core Functionality:
- **Password Generation**: Secure random password creation
- **Length Control**: Adjustable password length from 4 to 50 characters
- **Character Options**: Select from uppercase, lowercase, numbers, and symbols
- **Strength Analysis**: Real-time password strength evaluation
- **Copy to Clipboard**: One-click password copying with feedback

### User Experience:
- **Visual Strength Meter**: Color-coded strength indicator
- **Password History**: Recent passwords with copy functionality
- **Statistics Tracking**: Count of generated passwords
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Shortcuts**: Quick access to main functions

### Security Features:
- **Strength Calculation**: Based on length, character variety, and complexity
- **Character Variety**: Ensures at least one character from each selected type
- **Secure Generation**: Uses cryptographically secure random selection
- **History Management**: Local storage with automatic cleanup

## Password Strength Levels

- **Weak (Red)**: Basic passwords with limited character variety
- **Fair (Orange)**: Moderate strength with some character variety
- **Good (Yellow)**: Strong passwords with good character variety
- **Strong (Green)**: Very strong passwords with maximum security

## Character Sets

- **Uppercase Letters**: A-Z (26 characters)
- **Lowercase Letters**: a-z (26 characters)
- **Numbers**: 0-9 (10 characters)
- **Symbols**: !@#$%^&*()_+-=[]{}|;:,.<>? (16 characters)

## Keyboard Shortcuts

- **Ctrl/Cmd + G**: Generate new password
- **Ctrl/Cmd + C**: Copy current password
- **Ctrl/Cmd + X**: Clear current password

## Security Considerations

- Passwords are generated client-side for privacy
- No passwords are transmitted or stored on servers
- Local storage is used only for history and statistics
- Clipboard operations use secure APIs with fallbacks
- Character selection ensures password complexity

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Local Storage

The app uses browser's localStorage to persist:
- Password history (last 10 passwords)
- Generated password count
- User preferences and settings

## Performance

The application is optimized for:
- Fast password generation
- Smooth UI interactions
- Efficient memory usage
- Responsive user interface 
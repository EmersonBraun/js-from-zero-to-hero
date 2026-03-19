# Todo List

> [pt-br version](README-PTBR.md)

A modern todo list application with local storage, filtering, and interactive features for managing daily tasks efficiently.

## CLASS

Basic todo list functionality with add, complete, and delete operations.

### Features:
- Add new todo items
- Mark todos as complete/incomplete
- Delete individual todos
- Local storage persistence
- Simple and clean interface
- Responsive design

### Technologies:
- HTML5
- CSS3 (with gradients and animations)
- JavaScript (ES6+)
- Local Storage API

## CHALLENGE 01

Enhanced todo list with advanced features and improved user experience.

### Additional Features:
- Edit existing todos
- Filter todos (All, Active, Completed)
- Clear all completed todos
- Statistics display (Total, Completed, Pending)
- Smooth animations and transitions
- Better error handling and user feedback
- Responsive design for mobile devices
- Enter key support for adding todos
- Confirmation dialogs for destructive actions

### Technical Improvements:
- Local storage for data persistence
- Dynamic DOM manipulation
- Event delegation for better performance
- CSS animations and hover effects
- Message notifications system
- XSS protection with HTML escaping

## CHALLENGE 02

Advanced features and additional functionality.

### Planned Features:
- Todo categories/tags
- Priority levels
- Due dates and reminders
- Search functionality
- Export/import todos
- Dark/light theme toggle
- Keyboard shortcuts
- Drag and drop reordering
- Todo templates
- Collaboration features

### Advanced Features:
- Cloud synchronization
- Multiple todo lists
- Advanced filtering and sorting
- Todo analytics and insights
- Integration with calendar
- Mobile app features
- Offline support
- Advanced search with filters

## Navigation

- [Main Project](../README.md)
- [Challenge 1](README.md) ← You are here
- [Challenge 2](../challenge-2/README.md)

## Demo

The application allows users to:
1. Add new todo items by typing and pressing Enter or clicking "Add"
2. Mark todos as complete by checking the checkbox
3. Edit todos by clicking the "Edit" button
4. Delete todos with confirmation dialog
5. Filter todos by status (All, Active, Completed)
6. Clear all completed todos at once
7. View statistics (Total, Completed, Pending tasks)
8. All data persists in local storage

## Features

### Core Functionality:
- **Add Todos**: Type and add new todo items
- **Complete Todos**: Check/uncheck to mark completion
- **Edit Todos**: Modify existing todo text
- **Delete Todos**: Remove individual todos
- **Filter Todos**: View all, active, or completed todos
- **Clear Completed**: Remove all completed todos at once

### User Experience:
- **Local Storage**: Todos persist between browser sessions
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Visual feedback for all interactions
- **Message Notifications**: Success, error, and info messages
- **Confirmation Dialogs**: Prevent accidental deletions
- **Keyboard Support**: Enter key to add todos

### Statistics:
- **Total Tasks**: Count of all todos
- **Completed Tasks**: Count of completed todos
- **Pending Tasks**: Count of active todos

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Local Storage

The app uses browser's localStorage to persist todo data. Data is automatically saved when:
- Adding new todos
- Completing/uncompleting todos
- Editing todos
- Deleting todos
- Clearing completed todos 
# Drag and Drop

> [pt-br version](README-PTBR.md)

A modern drag and drop file upload interface with preview, validation, and progress tracking.

![Drag and Drop](gifs/class.gif)

## CLASS

### Features

- **Drag & Drop Interface**: Intuitive drag and drop file upload
- **File Preview**: Visual preview of uploaded files
- **File Validation**: Size and type validation with custom limits
- **Progress Tracking**: Real-time upload progress with visual feedback
- **Multiple File Support**: Upload multiple files simultaneously
- **File Information**: Detailed file information display
- **Responsive Design**: Works perfectly on all devices
- **Custom Controls**: Adjustable file limits and restrictions

### How to Use

1. **Drag Files**: Simply drag files from your computer to the upload area
2. **Browse Files**: Click "Browse Files" to select files manually
3. **Preview Files**: View thumbnails and file information
4. **Remove Files**: Click the X button on any file to remove it
5. **Adjust Settings**: Modify file limits and restrictions
6. **Upload Files**: Click "Upload Files" to process the files

### File Support

- **Images**: JPG, PNG, GIF, WebP, SVG
- **Documents**: PDF, DOC, DOCX, TXT
- **Custom Types**: Configurable file type restrictions

### Controls

- **Max Files**: Set maximum number of files (1-50)
- **Max Size**: Set maximum file size in MB (1-100)
- **Allowed Types**: Choose file type restrictions
- **Clear All**: Remove all uploaded files
- **Download All**: Download all files as ZIP
- **Upload Files**: Process and upload files

### File Information Displayed

- **File Name**: Original filename
- **File Size**: Size in bytes, KB, MB, or GB
- **File Type**: MIME type and extension
- **Last Modified**: File modification date
- **File Preview**: Thumbnail for images, icon for documents

### Validation Features

- **File Size Check**: Ensures files don't exceed size limit
- **File Type Check**: Validates against allowed file types
- **Duplicate Check**: Prevents duplicate file uploads
- **Error Handling**: Clear error messages for invalid files

### Technologies Used

- HTML5 (Drag and Drop API)
- CSS3 (with animations and transitions)
- Vanilla JavaScript
- File API
- Canvas API (for image previews)
- Local Storage API

---

## CHALLENGE 01

### Additional Features

- **Image Compression**: Automatic image compression before upload
- **File Renaming**: Custom file naming patterns
- **Batch Operations**: Select and operate on multiple files
- **Upload History**: Track and manage previous uploads
- **File Categories**: Organize files by type or category
- **Search & Filter**: Search through uploaded files

### Implementation

- Add image compression using Canvas API
- Create file renaming system with patterns
- Implement batch selection and operations
- Add upload history with Local Storage
- Create file categorization system
- Add search and filter functionality

---

## CHALLENGE 02

### Advanced Features

- **Cloud Storage**: Upload directly to cloud services
- **Drag Between Zones**: Move files between different upload areas
- **File Editing**: Basic image editing capabilities
- **Collaborative Upload**: Multiple users can upload to shared space
- **Advanced Preview**: 3D file previews and thumbnails
- **Upload Scheduling**: Schedule uploads for later

### Implementation

- Integrate cloud storage APIs (Google Drive, Dropbox)
- Create multiple drop zones with file transfer
- Add basic image editing with Canvas
- Implement real-time collaboration with WebSockets
- Create 3D preview system with WebGL
- Add upload scheduling system

---

## Navigation

- [Challenge 1](challenge-1/index.html)
- [Challenge 2](challenge-2/index.html)
- [Main Project](index.html)

---

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License. 
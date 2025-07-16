class DragAndDrop {
    constructor() {
        this.files = [];
        this.maxFiles = 10;
        this.maxSize = 10 * 1024 * 1024; // 10MB
        this.allowedTypes = ['image/*', '.pdf', '.doc', '.docx', '.txt'];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateUI();
    }
    
    setupEventListeners() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const clearBtn = document.getElementById('clearBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const closeModal = document.getElementById('closeModal');
        
        // Drag and drop events
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const droppedFiles = Array.from(e.dataTransfer.files);
            this.handleFiles(droppedFiles);
        });
        
        // Click to upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            const selectedFiles = Array.from(e.target.files);
            this.handleFiles(selectedFiles);
        });
        
        // Control buttons
        clearBtn.addEventListener('click', () => {
            this.clearAll();
        });
        
        downloadBtn.addEventListener('click', () => {
            this.downloadAll();
        });
        
        // Modal close
        closeModal.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('previewModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }
    
    handleFiles(newFiles) {
        const validFiles = newFiles.filter(file => this.validateFile(file));
        
        if (validFiles.length === 0) {
            this.showMessage('No valid files found', 'error');
            return;
        }
        
        if (this.files.length + validFiles.length > this.maxFiles) {
            this.showMessage(`Maximum ${this.maxFiles} files allowed`, 'error');
            return;
        }
        
        this.files.push(...validFiles);
        this.updateUI();
        this.showMessage(`${validFiles.length} file(s) added successfully`, 'success');
    }
    
    validateFile(file) {
        // Check file size
        if (file.size > this.maxSize) {
            this.showMessage(`${file.name} is too large (max ${this.maxSize / (1024 * 1024)}MB)`, 'error');
            return false;
        }
        
        // Check file type
        const isValidType = this.allowedTypes.some(type => {
            if (type.includes('*')) {
                return file.type.startsWith(type.replace('*', ''));
            }
            return file.name.toLowerCase().endsWith(type);
        });
        
        if (!isValidType) {
            this.showMessage(`${file.name} is not an allowed file type`, 'error');
            return false;
        }
        
        return true;
    }
    
    updateUI() {
        this.updateFileInfo();
        this.updatePreviewGrid();
        this.updateButtons();
    }
    
    updateFileInfo() {
        const infoGrid = document.getElementById('infoGrid');
        infoGrid.innerHTML = '';
        
        this.files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const size = this.formatFileSize(file.size);
            const type = this.getFileType(file);
            
            fileItem.innerHTML = `
                <h4>${file.name}</h4>
                <p><strong>Size:</strong> ${size}</p>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Last Modified:</strong> ${new Date(file.lastModified).toLocaleDateString()}</p>
                <button class="btn" onclick="dragAndDrop.removeFile(${index})" style="margin-top: 0.5rem; padding: 0.3rem 0.8rem; font-size: 0.8rem;">Remove</button>
            `;
            
            infoGrid.appendChild(fileItem);
        });
    }
    
    updatePreviewGrid() {
        const previewGrid = document.getElementById('previewGrid');
        previewGrid.innerHTML = '';
        
        this.files.forEach((file, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.onclick = () => this.showFilePreview(file);
            
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = file.name;
                previewItem.appendChild(img);
            } else {
                const icon = document.createElement('span');
                icon.className = 'file-icon';
                icon.textContent = this.getFileIcon(file);
                previewItem.appendChild(icon);
            }
            
            const fileName = document.createElement('div');
            fileName.className = 'file-name';
            fileName.textContent = file.name;
            previewItem.appendChild(fileName);
            
            previewGrid.appendChild(previewItem);
        });
    }
    
    updateButtons() {
        const clearBtn = document.getElementById('clearBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        
        clearBtn.disabled = this.files.length === 0;
        downloadBtn.disabled = this.files.length === 0;
    }
    
    removeFile(index) {
        this.files.splice(index, 1);
        this.updateUI();
        this.showMessage('File removed', 'info');
    }
    
    clearAll() {
        this.files = [];
        this.updateUI();
        this.showMessage('All files cleared', 'info');
    }
    
    downloadAll() {
        if (this.files.length === 0) {
            this.showMessage('No files to download', 'error');
            return;
        }
        
        this.files.forEach((file, index) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(file);
            link.download = file.name;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up the object URL
            setTimeout(() => URL.revokeObjectURL(link.href), 100);
        });
        
        this.showMessage(`${this.files.length} file(s) downloaded`, 'success');
    }
    
    showFilePreview(file) {
        const modal = document.getElementById('previewModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = '';
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = file.name;
            modalBody.appendChild(img);
        } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = document.createElement('div');
                content.className = 'file-content';
                content.textContent = e.target.result;
                modalBody.appendChild(content);
            };
            reader.readAsText(file);
        } else {
            const info = document.createElement('div');
            info.innerHTML = `
                <div class="file-icon" style="font-size: 4rem; margin-bottom: 1rem;">${this.getFileIcon(file)}</div>
                <h3>${file.name}</h3>
                <p><strong>Size:</strong> ${this.formatFileSize(file.size)}</p>
                <p><strong>Type:</strong> ${this.getFileType(file)}</p>
                <p>Preview not available for this file type</p>
            `;
            modalBody.appendChild(info);
        }
        
        modal.style.display = 'block';
    }
    
    closeModal() {
        const modal = document.getElementById('previewModal');
        modal.style.display = 'none';
        
        // Clean up any object URLs
        const modalBody = document.getElementById('modalBody');
        const img = modalBody.querySelector('img');
        if (img && img.src.startsWith('blob:')) {
            URL.revokeObjectURL(img.src);
        }
    }
    
    showMessage(message, type = 'info') {
        const statusMessages = document.getElementById('statusMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `status-message ${type}`;
        messageElement.textContent = message;
        
        statusMessages.appendChild(messageElement);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 5000);
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    getFileType(file) {
        if (file.type) {
            return file.type;
        }
        
        const extension = file.name.split('.').pop().toLowerCase();
        const typeMap = {
            'pdf': 'application/pdf',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'txt': 'text/plain'
        };
        
        return typeMap[extension] || 'Unknown';
    }
    
    getFileIcon(file) {
        if (file.type.startsWith('image/')) return '🖼️';
        if (file.type === 'application/pdf') return '📄';
        if (file.type.includes('word')) return '📝';
        if (file.type === 'text/plain') return '📄';
        return '📁';
    }
    
    // Public methods for external access
    getFiles() {
        return [...this.files];
    }
    
    getStats() {
        const totalSize = this.files.reduce((sum, file) => sum + file.size, 0);
        const types = [...new Set(this.files.map(file => this.getFileType(file)))];
        
        return {
            fileCount: this.files.length,
            totalSize: this.formatFileSize(totalSize),
            fileTypes: types,
            maxFiles: this.maxFiles,
            maxSize: this.formatFileSize(this.maxSize)
        };
    }
}

// Initialize the drag and drop functionality
let dragAndDrop;

document.addEventListener('DOMContentLoaded', () => {
    dragAndDrop = new DragAndDrop();
    
    // Make it globally accessible for debugging
    window.dragAndDrop = dragAndDrop;
    
    console.log('Drag and Drop Challenge 1 initialized');
    console.log('Features: File validation, preview, download, and modal viewing');
}); 
// DOM Elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const brushBtn = document.getElementById('brushBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const strokesCount = document.getElementById('strokesCount');
const timeElapsed = document.getElementById('timeElapsed');

// Canvas setup
canvas.width = 800;
canvas.height = 600;
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'brush';
let currentColor = '#000000';
let currentSize = 5;
let strokes = 0;
let startTime = Date.now();
let drawingHistory = [];
let historyIndex = -1;

// Event Listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

colorPicker.addEventListener('input', updateColor);
sizeSlider.addEventListener('input', updateSize);
brushBtn.addEventListener('click', () => setTool('brush'));
eraserBtn.addEventListener('click', () => setTool('eraser'));
clearBtn.addEventListener('click', clearCanvas);
saveBtn.addEventListener('click', saveDrawing);
undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);

// Initialize
function init() {
    updateSize();
    updateStats();
    saveCanvasState();
}

// Start drawing
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getMousePos(e);
}

// Draw function
function draw(e) {
    if (!isDrawing) return;
    
    e.preventDefault();
    
    const [currentX, currentY] = getMousePos(e);
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    
    if (currentTool === 'brush') {
        ctx.strokeStyle = currentColor;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    } else if (currentTool === 'eraser') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }
    
    ctx.lineWidth = currentSize;
    ctx.stroke();
    
    [lastX, lastY] = [currentX, currentY];
    
    // Increment stroke count
    strokes++;
    updateStats();
}

// Stop drawing
function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        saveCanvasState();
    }
}

// Get mouse position relative to canvas
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return [
        e.clientX - rect.left,
        e.clientY - rect.top
    ];
}

// Update color
function updateColor(e) {
    currentColor = e.target.value;
    updateBrushPreview();
}

// Update size
function updateSize(e) {
    currentSize = e ? parseInt(e.target.value) : parseInt(sizeSlider.value);
    sizeValue.textContent = currentSize;
    updateBrushPreview();
}

// Set tool
function setTool(tool) {
    currentTool = tool;
    
    // Update button states
    brushBtn.classList.toggle('active', tool === 'brush');
    eraserBtn.classList.toggle('active', tool === 'eraser');
    
    updateBrushPreview();
}

// Update brush preview
function updateBrushPreview() {
    const brushPreview = document.getElementById('brushPreview');
    const eraserPreview = document.getElementById('eraserPreview');
    
    if (brushPreview) {
        brushPreview.style.backgroundColor = currentColor;
        brushPreview.style.width = `${currentSize * 2}px`;
        brushPreview.style.height = `${currentSize * 2}px`;
        brushPreview.textContent = currentSize;
    }
    
    if (eraserPreview) {
        eraserPreview.style.width = `${currentSize * 2}px`;
        eraserPreview.style.height = `${currentSize * 2}px`;
        eraserPreview.textContent = currentSize;
    }
}

// Clear canvas
function clearCanvas() {
    if (confirm('Are you sure you want to clear the canvas?')) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        strokes = 0;
        updateStats();
        saveCanvasState();
        showMessage('Canvas cleared', 'info');
    }
}

// Save drawing
function saveDrawing() {
    try {
        const link = document.createElement('a');
        link.download = `drawing-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
        link.href = canvas.toDataURL();
        link.click();
        showMessage('Drawing saved successfully!', 'success');
    } catch (error) {
        showError('Failed to save drawing');
        console.error('Save error:', error);
    }
}

// Save canvas state for undo/redo
function saveCanvasState() {
    // Remove any states after current index
    drawingHistory = drawingHistory.slice(0, historyIndex + 1);
    
    // Add current state
    drawingHistory.push(canvas.toDataURL());
    historyIndex++;
    
    // Limit history size
    if (drawingHistory.length > 20) {
        drawingHistory.shift();
        historyIndex--;
    }
    
    updateUndoRedoButtons();
}

// Undo
function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        loadCanvasState();
        updateUndoRedoButtons();
        showMessage('Undone', 'info');
    }
}

// Redo
function redo() {
    if (historyIndex < drawingHistory.length - 1) {
        historyIndex++;
        loadCanvasState();
        updateUndoRedoButtons();
        showMessage('Redone', 'info');
    }
}

// Load canvas state
function loadCanvasState() {
    const img = new Image();
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };
    img.src = drawingHistory[historyIndex];
}

// Update undo/redo buttons
function updateUndoRedoButtons() {
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= drawingHistory.length - 1;
}

// Update statistics
function updateStats() {
    strokesCount.textContent = strokes;
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timeElapsed.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Show message
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: #fff;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            messageDiv.style.backgroundColor = '#4caf50';
            break;
        case 'error':
            messageDiv.style.backgroundColor = '#f44336';
            break;
        case 'info':
            messageDiv.style.backgroundColor = '#2196f3';
            break;
        default:
            messageDiv.style.backgroundColor = '#2e647a';
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Show error
function showError(message) {
    showMessage(message, 'error');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'z':
                e.preventDefault();
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
                break;
            case 'y':
                e.preventDefault();
                redo();
                break;
            case 's':
                e.preventDefault();
                saveDrawing();
                break;
            case 'c':
                e.preventDefault();
                clearCanvas();
                break;
        }
    } else {
        switch (e.key) {
            case 'b':
                setTool('brush');
                break;
            case 'e':
                setTool('eraser');
                break;
            case 'Escape':
                stopDrawing();
                break;
        }
    }
});

// Touch support for mobile devices
canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);
canvas.addEventListener('touchend', stopDrawing);

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                    e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

// Auto-save functionality
setInterval(() => {
    if (strokes > 0) {
        localStorage.setItem('drawing_autosave', canvas.toDataURL());
        localStorage.setItem('drawing_strokes', strokes.toString());
    }
}, 30000); // Auto-save every 30 seconds

// Load auto-saved drawing on page load
window.addEventListener('load', () => {
    const autosave = localStorage.getItem('drawing_autosave');
    const autosaveStrokes = localStorage.getItem('drawing_strokes');
    
    if (autosave && autosaveStrokes) {
        if (confirm('Found an auto-saved drawing. Would you like to restore it?')) {
            const img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                strokes = parseInt(autosaveStrokes);
                updateStats();
                saveCanvasState();
            };
            img.src = autosave;
        }
    }
});

// Initialize the app
init(); 
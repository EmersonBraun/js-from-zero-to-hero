document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const brushSize = document.getElementById('brushSize');
    const sizeValue = document.getElementById('sizeValue');
    const colorPicker = document.getElementById('colorPicker');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveBtn');
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');

    // Tool buttons
    const brushTool = document.getElementById('brushTool');
    const eraserTool = document.getElementById('eraserTool');
    const lineTool = document.getElementById('lineTool');
    const rectTool = document.getElementById('rectTool');
    const circleTool = document.getElementById('circleTool');

    // Drawing state
    let isDrawing = false;
    let currentTool = 'brush';
    let startX, startY;
    let history = [];
    let historyIndex = -1;

    // Initialize canvas
    function initCanvas() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveState();
    }

    // Save current state
    function saveState() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        history = history.slice(0, historyIndex + 1);
        history.push(imageData);
        historyIndex++;
        
        // Limit history size
        if (history.length > 20) {
            history.shift();
            historyIndex--;
        }
        
        updateUndoRedoButtons();
    }

    // Update undo/redo buttons
    function updateUndoRedoButtons() {
        undoBtn.disabled = historyIndex <= 0;
        redoBtn.disabled = historyIndex >= history.length - 1;
    }

    // Undo
    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            ctx.putImageData(history[historyIndex], 0, 0);
            updateUndoRedoButtons();
        }
    }

    // Redo
    function redo() {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            ctx.putImageData(history[historyIndex], 0, 0);
            updateUndoRedoButtons();
        }
    }

    // Get mouse position
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    // Get touch position
    function getTouchPos(e) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
    }

    // Drawing functions
    function draw(e) {
        if (!isDrawing) return;
        
        const pos = e.type.includes('touch') ? getTouchPos(e) : getMousePos(e);
        
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (currentTool === 'brush') {
            ctx.strokeStyle = colorPicker.value;
            ctx.globalCompositeOperation = 'source-over';
        } else if (currentTool === 'eraser') {
            ctx.strokeStyle = '#fff';
            ctx.globalCompositeOperation = 'destination-out';
        }
        
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function startDrawing(e) {
        isDrawing = true;
        const pos = e.type.includes('touch') ? getTouchPos(e) : getMousePos(e);
        startX = pos.x;
        startY = pos.y;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        if (currentTool === 'brush' || currentTool === 'eraser') {
            ctx.lineWidth = brushSize.value;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            if (currentTool === 'brush') {
                ctx.strokeStyle = colorPicker.value;
                ctx.globalCompositeOperation = 'source-over';
            } else {
                ctx.strokeStyle = '#fff';
                ctx.globalCompositeOperation = 'destination-out';
            }
        }
    }

    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            ctx.closePath();
            saveState();
        }
    }

    // Shape drawing functions
    function drawLine(e) {
        if (!isDrawing) return;
        
        const pos = e.type.includes('touch') ? getTouchPos(e) : getMousePos(e);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(history[historyIndex], 0, 0);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function drawRect(e) {
        if (!isDrawing) return;
        
        const pos = e.type.includes('touch') ? getTouchPos(e) : getMousePos(e);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(history[historyIndex], 0, 0);
        
        const width = pos.x - startX;
        const height = pos.y - startY;
        
        ctx.strokeRect(startX, startY, width, height);
    }

    function drawCircle(e) {
        if (!isDrawing) return;
        
        const pos = e.type.includes('touch') ? getTouchPos(e) : getMousePos(e);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(history[historyIndex], 0, 0);
        
        const radius = Math.sqrt(Math.pow(pos.x - startX, 2) + Math.pow(pos.y - startY, 2));
        
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Tool selection
    function selectTool(tool) {
        currentTool = tool;
        
        // Update active tool button
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    // Event listeners
    brushTool.addEventListener('click', () => selectTool('brush'));
    eraserTool.addEventListener('click', () => selectTool('eraser'));
    lineTool.addEventListener('click', () => selectTool('line'));
    rectTool.addEventListener('click', () => selectTool('rect'));
    circleTool.addEventListener('click', () => selectTool('circle'));

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', (e) => {
        if (currentTool === 'brush' || currentTool === 'eraser') {
            draw(e);
        } else if (currentTool === 'line') {
            drawLine(e);
        } else if (currentTool === 'rect') {
            drawRect(e);
        } else if (currentTool === 'circle') {
            drawCircle(e);
        }
    });
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e);
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (currentTool === 'brush' || currentTool === 'eraser') {
            draw(e);
        } else if (currentTool === 'line') {
            drawLine(e);
        } else if (currentTool === 'rect') {
            drawRect(e);
        } else if (currentTool === 'circle') {
            drawCircle(e);
        }
    });
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing();
    });

    // Control events
    brushSize.addEventListener('input', () => {
        sizeValue.textContent = brushSize.value;
    });

    clearBtn.addEventListener('click', () => {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveState();
    });

    saveBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'paint-drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);

    // Initialize
    initCanvas();
}); 
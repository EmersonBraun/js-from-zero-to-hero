document.addEventListener('DOMContentLoaded', function() {
    const keyNumber = document.getElementById('keyNumber');
    const keyValue = document.getElementById('keyValue');
    const keyCode = document.getElementById('keyCode');
    const keyCodeNumber = document.getElementById('keyCodeNumber');
    const keyDisplay = document.querySelector('.key-display');
    const eventType = document.getElementById('eventType');
    const displayMode = document.getElementById('displayMode');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const copyBtn = document.getElementById('copyBtn');
    const resetBtn = document.getElementById('resetBtn');
    const helpBtn = document.getElementById('helpBtn');
    const keyboard = document.getElementById('keyboard');

    let keyHistory = [];
    let lastKey = null;
    let currentEventType = 'keydown';

    // Initialize
    createKeyboardLayout();
    loadHistory();

    // Create keyboard layout
    function createKeyboardLayout() {
        const layout = [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
            ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
            ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
            ['Ctrl', 'Meta', 'Alt', 'Space', 'Alt', 'Meta', 'Ctrl']
        ];

        layout.forEach((row, rowIndex) => {
            const keyboardRow = document.createElement('div');
            keyboardRow.className = 'keyboard-row';
            
            row.forEach(key => {
                const keyElement = document.createElement('div');
                keyElement.className = 'key';
                keyElement.textContent = key;
                keyElement.setAttribute('data-key', key.toLowerCase());
                
                // Add special classes for specific keys
                if (key === 'Space') {
                    keyElement.classList.add('space');
                } else if (key === 'Tab') {
                    keyElement.classList.add('tab');
                } else if (key === 'Caps') {
                    keyElement.classList.add('caps');
                } else if (key === 'Enter') {
                    keyElement.classList.add('enter');
                } else if (key === 'Shift') {
                    keyElement.classList.add('shift');
                } else if (['Ctrl', 'Alt', 'Meta'].includes(key)) {
                    keyElement.classList.add(key.toLowerCase());
                }
                
                keyboardRow.appendChild(keyElement);
            });
            
            keyboard.appendChild(keyboardRow);
        });
    }

    // Handle key events
    function handleKeyEvent(e) {
        e.preventDefault();
        
        const keyData = {
            key: e.key,
            code: e.code,
            keyCode: e.keyCode,
            eventType: currentEventType,
            timestamp: new Date().toLocaleTimeString()
        };

        // Update display
        updateKeyDisplay(keyData);
        
        // Add to history
        addToHistory(keyData);
        
        // Update keyboard visualization
        updateKeyboardVisualization(keyData);
        
        // Store last key
        lastKey = keyData;
        
        // Add visual feedback
        keyDisplay.classList.add('active');
        setTimeout(() => {
            keyDisplay.classList.remove('active');
        }, 200);
    }

    // Update key display
    function updateKeyDisplay(keyData) {
        const displayText = keyData.key === ' ' ? 'Space' : keyData.key;
        keyNumber.textContent = displayText;
        keyValue.textContent = keyData.key;
        keyCode.textContent = keyData.code;
        keyCodeNumber.textContent = keyData.keyCode;
    }

    // Add to history
    function addToHistory(keyData) {
        keyHistory.unshift(keyData);
        
        // Limit history to 50 items
        if (keyHistory.length > 50) {
            keyHistory.pop();
        }
        
        updateHistoryDisplay();
        saveHistory();
    }

    // Update history display
    function updateHistoryDisplay() {
        if (displayMode.value === 'history') {
            historyList.innerHTML = '';
            
            keyHistory.forEach((item, index) => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                
                const displayKey = item.key === ' ' ? 'Space' : item.key;
                historyItem.innerHTML = `
                    <div class="history-key">${displayKey}</div>
                    <div class="history-details">
                        ${item.code} | ${item.keyCode} | ${item.eventType} | ${item.timestamp}
                    </div>
                `;
                
                historyList.appendChild(historyItem);
            });
        }
    }

    // Update keyboard visualization
    function updateKeyboardVisualization(keyData) {
        // Remove previous active states
        document.querySelectorAll('.key.active').forEach(key => {
            key.classList.remove('active');
        });
        
        // Add active state to pressed key
        const keyElement = document.querySelector(`[data-key="${keyData.key.toLowerCase()}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
            setTimeout(() => {
                keyElement.classList.remove('active');
            }, 200);
        }
    }

    // Save history to localStorage
    function saveHistory() {
        localStorage.setItem('keyHistory', JSON.stringify(keyHistory));
    }

    // Load history from localStorage
    function loadHistory() {
        const saved = localStorage.getItem('keyHistory');
        if (saved) {
            keyHistory = JSON.parse(saved);
            updateHistoryDisplay();
        }
    }

    // Clear history
    function clearHistory() {
        keyHistory = [];
        historyList.innerHTML = '';
        localStorage.removeItem('keyHistory');
    }

    // Copy last key to clipboard
    function copyLastKey() {
        if (lastKey) {
            const textToCopy = `Key: ${lastKey.key}, Code: ${lastKey.code}, KeyCode: ${lastKey.keyCode}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                showNotification('Key information copied to clipboard!');
            }).catch(() => {
                showNotification('Failed to copy to clipboard');
            });
        } else {
            showNotification('No key pressed yet');
        }
    }

    // Reset display
    function resetDisplay() {
        keyNumber.textContent = 'Press any key';
        keyValue.textContent = '-';
        keyCode.textContent = '-';
        keyCodeNumber.textContent = '-';
        lastKey = null;
        
        document.querySelectorAll('.key.active').forEach(key => {
            key.classList.remove('active');
        });
    }

    // Show help
    function showHelp() {
        const helpText = `
            Event Keycodes - Keyboard Event Inspector
            
            Features:
            • Press any key to see its information
            • View key, code, and keyCode values
            • Track key history
            • Visual keyboard layout
            • Copy key information
            
            Keyboard Shortcuts:
            • Any key: Display key information
            • Ctrl+C: Copy last key info
            • Escape: Reset display
            
            Event Types:
            • keydown: When key is pressed down
            • keyup: When key is released
            • keypress: When character is typed
        `;
        
        alert(helpText);
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Event listeners
    document.addEventListener('keydown', handleKeyEvent);
    document.addEventListener('keyup', handleKeyEvent);
    document.addEventListener('keypress', handleKeyEvent);
    
    eventType.addEventListener('change', function() {
        currentEventType = this.value;
    });
    
    displayMode.addEventListener('change', function() {
        updateHistoryDisplay();
    });
    
    clearHistoryBtn.addEventListener('click', clearHistory);
    copyBtn.addEventListener('click', copyLastKey);
    resetBtn.addEventListener('click', resetDisplay);
    helpBtn.addEventListener('click', showHelp);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            copyLastKey();
        } else if (e.key === 'Escape') {
            resetDisplay();
        }
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}); 
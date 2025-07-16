// Auto Text Effect - Main Application
class AutoTextEffect {
    constructor() {
        this.text = '';
        this.currentIndex = 0;
        this.isTyping = false;
        this.isPaused = false;
        this.typingSpeed = 100;
        this.pauseDuration = 2000;
        this.autoRepeat = false;
        this.effectType = 'typewriter';
        this.cursorStyle = '|';
        this.textColor = '#ffffff';
        this.fontSize = 24;
        this.startTime = 0;
        this.typingInterval = null;
        this.pauseTimeout = null;
        this.history = [];
        
        this.initializeElements();
        this.bindEvents();
        this.loadSettings();
        this.updateDisplay();
    }

    initializeElements() {
        // Main elements
        this.displayText = document.getElementById('displayText');
        this.cursor = document.getElementById('cursor');
        this.textInput = document.getElementById('textInput');
        this.typingSpeedSlider = document.getElementById('typingSpeed');
        this.speedValue = document.getElementById('speedValue');
        this.effectTypeSelect = document.getElementById('effectType');
        this.cursorStyleSelect = document.getElementById('cursorStyle');
        this.autoRepeatSelect = document.getElementById('autoRepeat');
        this.pauseDurationSlider = document.getElementById('pauseDuration');
        this.pauseValue = document.getElementById('pauseValue');
        this.textColorPicker = document.getElementById('textColor');
        this.fontSizeSlider = document.getElementById('fontSize');
        this.fontSizeValue = document.getElementById('fontSizeValue');
        
        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.loadBtn = document.getElementById('loadBtn');
        this.exportBtn = document.getElementById('exportBtn');
        
        // Statistics
        this.charactersTyped = document.getElementById('charactersTyped');
        this.wordsTyped = document.getElementById('wordsTyped');
        this.typingTime = document.getElementById('typingTime');
        this.wpm = document.getElementById('wpm');
        
        // History
        this.historyList = document.getElementById('historyList');
        
        // Preset buttons
        this.presetButtons = document.querySelectorAll('.preset-btn');
    }

    bindEvents() {
        // Control events
        this.startBtn.addEventListener('click', () => this.startTyping());
        this.pauseBtn.addEventListener('click', () => this.pauseTyping());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.clearBtn.addEventListener('click', () => this.clear());
        this.saveBtn.addEventListener('click', () => this.saveSettings());
        this.loadBtn.addEventListener('click', () => this.loadSettings());
        this.exportBtn.addEventListener('click', () => this.exportText());
        
        // Slider events
        this.typingSpeedSlider.addEventListener('input', (e) => {
            this.typingSpeed = parseInt(e.target.value);
            this.speedValue.textContent = `${this.typingSpeed}ms`;
        });
        
        this.pauseDurationSlider.addEventListener('input', (e) => {
            this.pauseDuration = parseInt(e.target.value);
            this.pauseValue.textContent = `${this.pauseDuration}ms`;
        });
        
        this.fontSizeSlider.addEventListener('input', (e) => {
            this.fontSize = parseInt(e.target.value);
            this.fontSizeValue.textContent = `${this.fontSize}px`;
            this.updateDisplay();
        });
        
        // Select events
        this.effectTypeSelect.addEventListener('change', (e) => {
            this.effectType = e.target.value;
            this.updateDisplay();
        });
        
        this.cursorStyleSelect.addEventListener('change', (e) => {
            this.cursorStyle = e.target.value;
            this.updateCursor();
        });
        
        this.autoRepeatSelect.addEventListener('change', (e) => {
            this.autoRepeat = e.target.value === 'true';
        });
        
        this.textColorPicker.addEventListener('change', (e) => {
            this.textColor = e.target.value;
            this.updateDisplay();
        });
        
        // Preset button events
        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.textInput.value = e.target.dataset.text;
                this.showStatus('Preset loaded!', 'success');
            });
        });
    }

    startTyping() {
        if (this.isTyping) return;
        
        this.text = this.textInput.value.trim();
        if (!this.text) {
            this.showStatus('Please enter some text to type!', 'error');
            return;
        }
        
        this.isTyping = true;
        this.isPaused = false;
        this.currentIndex = 0;
        this.startTime = Date.now();
        
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.resetBtn.disabled = false;
        
        this.showStatus('Typing started!', 'success');
        this.typeNextCharacter();
    }

    typeNextCharacter() {
        if (!this.isTyping || this.isPaused) return;
        
        if (this.currentIndex < this.text.length) {
            const char = this.text[this.currentIndex];
            this.displayText.textContent += char;
            this.currentIndex++;
            
            this.updateStatistics();
            this.updateDisplay();
            
            this.typingInterval = setTimeout(() => {
                this.typeNextCharacter();
            }, this.typingSpeed);
        } else {
            this.finishTyping();
        }
    }

    pauseTyping() {
        if (!this.isTyping) return;
        
        if (this.isPaused) {
            // Resume typing
            this.isPaused = false;
            this.pauseBtn.textContent = 'Pause';
            this.showStatus('Typing resumed!', 'success');
            this.typeNextCharacter();
        } else {
            // Pause typing
            this.isPaused = true;
            this.pauseBtn.textContent = 'Resume';
            this.showStatus('Typing paused!', 'warning');
            clearTimeout(this.typingInterval);
        }
    }

    reset() {
        this.stopTyping();
        this.currentIndex = 0;
        this.displayText.textContent = '';
        this.updateDisplay();
        this.resetStatistics();
        this.showStatus('Reset complete!', 'success');
    }

    clear() {
        this.stopTyping();
        this.textInput.value = '';
        this.displayText.textContent = '';
        this.updateDisplay();
        this.resetStatistics();
        this.showStatus('Cleared!', 'success');
    }

    stopTyping() {
        this.isTyping = false;
        this.isPaused = false;
        clearTimeout(this.typingInterval);
        clearTimeout(this.pauseTimeout);
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.resetBtn.disabled = false;
        this.pauseBtn.textContent = 'Pause';
    }

    finishTyping() {
        this.stopTyping();
        this.addToHistory();
        this.showStatus('Typing completed!', 'success');
        
        if (this.autoRepeat) {
            this.pauseTimeout = setTimeout(() => {
                this.reset();
                this.startTyping();
            }, this.pauseDuration);
        }
    }

    updateDisplay() {
        // Apply effect classes
        this.displayText.className = '';
        if (this.effectType !== 'typewriter') {
            this.displayText.classList.add(`effect-${this.effectType}`);
        }
        
        // Apply text color and font size
        this.displayText.style.color = this.textColor;
        this.displayText.style.fontSize = `${this.fontSize}px`;
        
        this.updateCursor();
    }

    updateCursor() {
        if (this.cursorStyle === 'none') {
            this.cursor.style.display = 'none';
        } else {
            this.cursor.style.display = 'inline';
            this.cursor.textContent = this.cursorStyle;
        }
    }

    updateStatistics() {
        const characters = this.currentIndex;
        const words = this.text.substring(0, this.currentIndex).split(/\s+/).filter(word => word.length > 0).length;
        const elapsedTime = (Date.now() - this.startTime) / 1000;
        const wpm = elapsedTime > 0 ? Math.round((words / elapsedTime) * 60) : 0;
        
        this.charactersTyped.textContent = characters;
        this.wordsTyped.textContent = words;
        this.typingTime.textContent = `${elapsedTime.toFixed(1)}s`;
        this.wpm.textContent = wpm;
    }

    resetStatistics() {
        this.charactersTyped.textContent = '0';
        this.wordsTyped.textContent = '0';
        this.typingTime.textContent = '0s';
        this.wpm.textContent = '0';
    }

    addToHistory() {
        const historyItem = {
            text: this.text,
            timestamp: new Date().toLocaleString(),
            characters: this.text.length,
            words: this.text.split(/\s+/).filter(word => word.length > 0).length,
            effect: this.effectType,
            speed: this.typingSpeed
        };
        
        this.history.unshift(historyItem);
        if (this.history.length > 10) {
            this.history.pop();
        }
        
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-text">${item.text.substring(0, 50)}${item.text.length > 50 ? '...' : ''}</div>
                <div class="history-meta">
                    <span>${item.timestamp}</span>
                    <span>${item.characters} chars</span>
                    <span>${item.words} words</span>
                    <span>${item.effect}</span>
                </div>
            `;
            
            historyItem.addEventListener('click', () => {
                this.textInput.value = item.text;
                this.showStatus('History item loaded!', 'success');
            });
            
            this.historyList.appendChild(historyItem);
        });
    }

    saveSettings() {
        const settings = {
            typingSpeed: this.typingSpeed,
            pauseDuration: this.pauseDuration,
            autoRepeat: this.autoRepeat,
            effectType: this.effectType,
            cursorStyle: this.cursorStyle,
            textColor: this.textColor,
            fontSize: this.fontSize
        };
        
        localStorage.setItem('autoTextEffectSettings', JSON.stringify(settings));
        this.showStatus('Settings saved!', 'success');
    }

    loadSettings() {
        const saved = localStorage.getItem('autoTextEffectSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                
                this.typingSpeed = settings.typingSpeed || 100;
                this.pauseDuration = settings.pauseDuration || 2000;
                this.autoRepeat = settings.autoRepeat || false;
                this.effectType = settings.effectType || 'typewriter';
                this.cursorStyle = settings.cursorStyle || '|';
                this.textColor = settings.textColor || '#ffffff';
                this.fontSize = settings.fontSize || 24;
                
                // Update UI elements
                this.typingSpeedSlider.value = this.typingSpeed;
                this.speedValue.textContent = `${this.typingSpeed}ms`;
                this.pauseDurationSlider.value = this.pauseDuration;
                this.pauseValue.textContent = `${this.pauseDuration}ms`;
                this.autoRepeatSelect.value = this.autoRepeat.toString();
                this.effectTypeSelect.value = this.effectType;
                this.cursorStyleSelect.value = this.cursorStyle;
                this.textColorPicker.value = this.textColor;
                this.fontSizeSlider.value = this.fontSize;
                this.fontSizeValue.textContent = `${this.fontSize}px`;
                
                this.updateDisplay();
                this.showStatus('Settings loaded!', 'success');
            } catch (error) {
                this.showStatus('Error loading settings!', 'error');
            }
        } else {
            this.showStatus('No saved settings found!', 'warning');
        }
    }

    exportText() {
        const text = this.displayText.textContent;
        if (!text) {
            this.showStatus('No text to export!', 'error');
            return;
        }
        
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'typed-text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showStatus('Text exported!', 'success');
    }

    showStatus(message, type = 'info') {
        // Remove existing status messages
        const existingStatus = document.querySelector('.status-message');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        // Create new status message
        const status = document.createElement('div');
        status.className = `status-message ${type}`;
        status.textContent = message;
        
        // Insert after the container
        const container = document.querySelector('.container');
        container.parentNode.insertBefore(status, container.nextSibling);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (status.parentNode) {
                status.remove();
            }
        }, 3000);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AutoTextEffect();
}); 
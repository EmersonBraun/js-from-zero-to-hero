// DOM Elements
const textDisplay = document.getElementById('textDisplay');
const textContent = document.getElementById('textContent');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const customInput = document.getElementById('customInput');
const customBtn = document.getElementById('customBtn');
const charactersTyped = document.getElementById('charactersTyped');
const wordsTyped = document.getElementById('wordsTyped');
const timeElapsed = document.getElementById('timeElapsed');

// Text options
const textOptions = [
    "Welcome to the Auto Text Effect! This is a typing animation that simulates real-time text input.",
    "JavaScript is a powerful programming language that makes web pages interactive and dynamic.",
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet.",
    "Programming is the art of telling another human being what one wants the computer to do.",
    "In the world of technology, the only constant is change. Keep learning and stay curious!"
];

// Animation state
let currentText = textOptions[0];
let currentIndex = 0;
let isPlaying = false;
let animationId = null;
let startTime = null;
let totalCharacters = 0;
let totalWords = 0;

// Event Listeners
playBtn.addEventListener('click', startAnimation);
pauseBtn.addEventListener('click', pauseAnimation);
resetBtn.addEventListener('click', resetAnimation);
speedSlider.addEventListener('input', updateSpeed);
customBtn.addEventListener('click', setCustomText);

// Initialize text options
function initTextOptions() {
    const textSelector = document.getElementById('textSelector');
    
    textOptions.forEach((text, index) => {
        const option = document.createElement('div');
        option.className = 'text-option';
        option.textContent = text.substring(0, 50) + '...';
        option.dataset.index = index;
        
        if (index === 0) {
            option.classList.add('active');
        }
        
        option.addEventListener('click', () => selectText(index));
        textSelector.appendChild(option);
    });
}

// Select text option
function selectText(index) {
    // Update active option
    document.querySelectorAll('.text-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-index="${index}"]`).classList.add('active');
    
    // Set new text
    currentText = textOptions[index];
    resetAnimation();
}

// Set custom text
function setCustomText() {
    const customText = customInput.value.trim();
    
    if (customText === '') {
        showMessage('Please enter some text', 'error');
        return;
    }
    
    currentText = customText;
    resetAnimation();
    showMessage('Custom text set successfully!', 'success');
}

// Start animation
function startAnimation() {
    if (isPlaying) return;
    
    isPlaying = true;
    startTime = Date.now();
    
    // Update button states
    playBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    
    // Start typing animation
    typeNextCharacter();
}

// Type next character
function typeNextCharacter() {
    if (!isPlaying || currentIndex >= currentText.length) {
        if (currentIndex >= currentText.length) {
            isPlaying = false;
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        }
        return;
    }
    
    // Add next character
    textContent.textContent = currentText.substring(0, currentIndex + 1);
    currentIndex++;
    
    // Update statistics
    updateStats();
    
    // Schedule next character
    const speed = parseInt(speedSlider.value);
    const delay = 1000 / speed; // Convert speed to milliseconds
    
    animationId = setTimeout(typeNextCharacter, delay);
}

// Pause animation
function pauseAnimation() {
    isPlaying = false;
    
    // Update button states
    playBtn.disabled = false;
    pauseBtn.disabled = true;
    
    // Clear timeout
    if (animationId) {
        clearTimeout(animationId);
        animationId = null;
    }
}

// Reset animation
function resetAnimation() {
    // Stop animation
    pauseAnimation();
    
    // Reset state
    currentIndex = 0;
    textContent.textContent = '';
    startTime = null;
    
    // Update button states
    playBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    
    // Reset statistics
    updateStats();
}

// Update speed
function updateSpeed() {
    const speed = speedSlider.value;
    speedValue.textContent = speed + ' WPM';
    
    // If animation is running, restart with new speed
    if (isPlaying) {
        pauseAnimation();
        startAnimation();
    }
}

// Update statistics
function updateStats() {
    const currentTextLength = textContent.textContent.length;
    const currentWords = textContent.textContent.split(/\s+/).filter(word => word.length > 0).length;
    
    charactersTyped.textContent = currentTextLength;
    wordsTyped.textContent = currentWords;
    
    if (startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timeElapsed.textContent = elapsed + 's';
    } else {
        timeElapsed.textContent = '0s';
    }
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
            case ' ':
                e.preventDefault();
                if (isPlaying) {
                    pauseAnimation();
                } else {
                    startAnimation();
                }
                break;
            case 'r':
                e.preventDefault();
                resetAnimation();
                break;
        }
    }
});

// Initialize app
function init() {
    initTextOptions();
    updateSpeed();
    updateStats();
    
    // Set initial button states
    playBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
}

// Start the app
init(); 
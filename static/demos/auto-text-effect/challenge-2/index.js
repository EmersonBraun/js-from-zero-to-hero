// DOM Elements
const textInput = document.getElementById('textInput');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const effectSelect = document.getElementById('effectSelect');
const colorPicker = document.getElementById('colorPicker');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeValue = document.getElementById('fontSizeValue');
const fontFamilySelect = document.getElementById('fontFamilySelect');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const randomBtn = document.getElementById('randomBtn');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const textDisplay = document.getElementById('textDisplay');
const cursor = document.getElementById('cursor');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const animationTime = document.getElementById('animationTime');
const effectCount = document.getElementById('effectCount');

// Animation state
let isAnimating = false;
let isPaused = false;
let currentIndex = 0;
let animationInterval;
let startTime;
let effectsUsed = 0;
let currentText = '';
let currentEffect = 'typewriter';

// Event Listeners
startBtn.addEventListener('click', startAnimation);
pauseBtn.addEventListener('click', pauseAnimation);
resetBtn.addEventListener('click', resetAnimation);
randomBtn.addEventListener('click', randomEffect);
saveBtn.addEventListener('click', saveSettings);
loadBtn.addEventListener('click', loadSettings);

speedSlider.addEventListener('input', updateSpeed);
fontSizeSlider.addEventListener('input', updateFontSize);
colorPicker.addEventListener('input', updateColor);
fontFamilySelect.addEventListener('change', updateFontFamily);
effectSelect.addEventListener('change', updateEffect);

// Effect buttons
document.querySelectorAll('.effect-btn').forEach(btn => {
    btn.addEventListener('click', () => applyCustomEffect(btn.dataset.effect));
});

// Preset buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
});

// Initialize
function init() {
    updateSpeed();
    updateFontSize();
    updateColor();
    updateFontFamily();
    updateStats();
    loadSettings();
}

// Start animation
function startAnimation() {
    if (isAnimating && !isPaused) return;
    
    currentText = textInput.value.trim();
    if (!currentText) {
        showMessage('Please enter some text', 'error');
        return;
    }
    
    if (isPaused) {
        // Resume animation
        isPaused = false;
        pauseBtn.textContent = 'Pause';
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        return;
    }
    
    // Start new animation
    isAnimating = true;
    isPaused = false;
    currentIndex = 0;
    startTime = Date.now();
    effectsUsed++;
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    
    textDisplay.textContent = '';
    textDisplay.className = 'text-display';
    
    // Apply current effect
    currentEffect = effectSelect.value;
    applyEffect(currentEffect);
    
    // Start animation interval
    const speed = parseInt(speedSlider.value);
    animationInterval = setInterval(() => {
        if (!isPaused) {
            animateText();
        }
    }, speed);
    
    showMessage('Animation started!', 'success');
}

// Animate text
function animateText() {
    if (currentIndex >= currentText.length) {
        completeAnimation();
        return;
    }
    
    const char = currentText[currentIndex];
    textDisplay.textContent += char;
    currentIndex++;
    
    updateStats();
    
    // Apply character effects
    applyCharacterEffect(char);
}

// Apply effect based on selection
function applyEffect(effect) {
    textDisplay.className = `text-display ${effect}`;
    
    switch (effect) {
        case 'typewriter':
            // Default typewriter effect
            break;
        case 'glitch':
            applyGlitchEffect();
            break;
        case 'matrix':
            applyMatrixEffect();
            break;
        case 'bounce':
            applyBounceEffect();
            break;
        case 'fade':
            applyFadeEffect();
            break;
        case 'rainbow':
            applyRainbowEffect();
            break;
        case 'wave':
            applyWaveEffect();
            break;
        case 'random':
            applyRandomEffect();
            break;
    }
}

// Apply custom effects
function applyCustomEffect(effect) {
    textDisplay.className = `text-display ${effect}`;
    effectsUsed++;
    updateStats();
    showMessage(`${effect.charAt(0).toUpperCase() + effect.slice(1)} effect applied!`, 'info');
}

// Apply presets
function applyPreset(preset) {
    const presets = {
        classic: {
            effect: 'typewriter',
            speed: 150,
            color: '#2e647a',
            fontSize: 32,
            fontFamily: 'Roboto'
        },
        cyberpunk: {
            effect: 'glitch',
            speed: 100,
            color: '#00ff00',
            fontSize: 28,
            fontFamily: 'Courier New'
        },
        elegant: {
            effect: 'fade',
            speed: 200,
            color: '#d4af37',
            fontSize: 36,
            fontFamily: 'Georgia'
        },
        funky: {
            effect: 'rainbow',
            speed: 120,
            color: '#ff6b6b',
            fontSize: 30,
            fontFamily: 'Arial'
        },
        minimal: {
            effect: 'typewriter',
            speed: 180,
            color: '#333',
            fontSize: 24,
            fontFamily: 'Arial'
        },
        retro: {
            effect: 'matrix',
            speed: 80,
            color: '#00ff00',
            fontSize: 26,
            fontFamily: 'Courier New'
        }
    };
    
    const presetData = presets[preset];
    if (presetData) {
        effectSelect.value = presetData.effect;
        speedSlider.value = presetData.speed;
        colorPicker.value = presetData.color;
        fontSizeSlider.value = presetData.fontSize;
        fontFamilySelect.value = presetData.fontFamily;
        
        updateSpeed();
        updateColor();
        updateFontSize();
        updateFontFamily();
        updateEffect();
        
        effectsUsed++;
        updateStats();
        showMessage(`${preset.charAt(0).toUpperCase() + preset.slice(1)} preset applied!`, 'success');
    }
}

// Character effects
function applyCharacterEffect(char) {
    const effects = ['bounce', 'fade', 'wave', 'glitch'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    
    if (Math.random() < 0.1) { // 10% chance
        const span = document.createElement('span');
        span.textContent = char;
        span.className = `char-effect ${randomEffect}`;
        textDisplay.appendChild(span);
    }
}

// Special effects
function applyGlitchEffect() {
    setInterval(() => {
        if (isAnimating && !isPaused) {
            textDisplay.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                textDisplay.style.transform = 'translate(0, 0)';
            }, 50);
        }
    }, 200);
}

function applyMatrixEffect() {
    textDisplay.style.textShadow = '0 0 10px #00ff00';
}

function applyBounceEffect() {
    textDisplay.style.animation = 'bounce 0.5s ease-in-out';
}

function applyFadeEffect() {
    textDisplay.style.opacity = '0';
    textDisplay.style.animation = 'fadeIn 0.5s ease-in forwards';
}

function applyRainbowEffect() {
    textDisplay.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
    textDisplay.style.backgroundSize = '400% 400%';
    textDisplay.style.webkitBackgroundClip = 'text';
    textDisplay.style.webkitTextFillColor = 'transparent';
    textDisplay.style.animation = 'rainbow 2s ease-in-out infinite';
}

function applyWaveEffect() {
    textDisplay.style.animation = 'wave 1s ease-in-out infinite';
}

function applyRandomEffect() {
    const effects = ['glitch', 'bounce', 'fade', 'wave', 'rainbow'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    applyEffect(randomEffect);
}

// Pause animation
function pauseAnimation() {
    if (!isAnimating) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    startBtn.disabled = !isPaused;
    
    showMessage(isPaused ? 'Animation paused' : 'Animation resumed', 'info');
}

// Reset animation
function resetAnimation() {
    isAnimating = false;
    isPaused = false;
    currentIndex = 0;
    
    clearInterval(animationInterval);
    
    textDisplay.textContent = '';
    textDisplay.className = 'text-display';
    textDisplay.style = '';
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    
    updateStats();
    showMessage('Animation reset', 'info');
}

// Complete animation
function completeAnimation() {
    isAnimating = false;
    isPaused = false;
    
    clearInterval(animationInterval);
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    const duration = Math.floor((Date.now() - startTime) / 1000);
    showMessage(`Animation completed in ${duration} seconds!`, 'success');
}

// Random effect
function randomEffect() {
    const effects = ['typewriter', 'glitch', 'matrix', 'bounce', 'fade', 'rainbow', 'wave'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    
    effectSelect.value = randomEffect;
    updateEffect();
    
    effectsUsed++;
    updateStats();
    showMessage(`Random effect: ${randomEffect}`, 'info');
}

// Update controls
function updateSpeed() {
    const speed = speedSlider.value;
    speedValue.textContent = `${speed}ms`;
}

function updateFontSize() {
    const size = fontSizeSlider.value;
    fontSizeValue.textContent = `${size}px`;
    textDisplay.style.fontSize = `${size}px`;
}

function updateColor() {
    const color = colorPicker.value;
    textDisplay.style.color = color;
}

function updateFontFamily() {
    const font = fontFamilySelect.value;
    textDisplay.style.fontFamily = font;
}

function updateEffect() {
    currentEffect = effectSelect.value;
    if (isAnimating) {
        applyEffect(currentEffect);
    }
}

// Update statistics
function updateStats() {
    charCount.textContent = textDisplay.textContent.length;
    wordCount.textContent = textDisplay.textContent.split(/\s+/).filter(word => word.length > 0).length;
    effectCount.textContent = effectsUsed;
    
    if (startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        animationTime.textContent = `${elapsed}s`;
    }
}

// Save/Load settings
function saveSettings() {
    const settings = {
        text: textInput.value,
        speed: speedSlider.value,
        effect: effectSelect.value,
        color: colorPicker.value,
        fontSize: fontSizeSlider.value,
        fontFamily: fontFamilySelect.value,
        effectsUsed: effectsUsed
    };
    
    localStorage.setItem('autoTextSettings', JSON.stringify(settings));
    showMessage('Settings saved!', 'success');
}

function loadSettings() {
    const saved = localStorage.getItem('autoTextSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        
        textInput.value = settings.text || '';
        speedSlider.value = settings.speed || 150;
        effectSelect.value = settings.effect || 'typewriter';
        colorPicker.value = settings.color || '#2e647a';
        fontSizeSlider.value = settings.fontSize || 32;
        fontFamilySelect.value = settings.fontFamily || 'Roboto';
        effectsUsed = settings.effectsUsed || 0;
        
        updateSpeed();
        updateColor();
        updateFontSize();
        updateFontFamily();
        updateStats();
        
        showMessage('Settings loaded!', 'info');
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
    
    .char-effect {
        display: inline-block;
        animation: charBounce 0.3s ease-in-out;
    }
    
    @keyframes charBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    
    .char-effect.bounce {
        animation: charBounce 0.3s ease-in-out;
    }
    
    .char-effect.fade {
        animation: charFade 0.3s ease-in-out;
    }
    
    @keyframes charFade {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    .char-effect.wave {
        animation: charWave 0.5s ease-in-out;
    }
    
    @keyframes charWave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
    }
    
    .char-effect.glitch {
        animation: charGlitch 0.2s ease-in-out;
    }
    
    @keyframes charGlitch {
        0% { transform: translate(0); }
        25% { transform: translate(-1px, 1px); }
        50% { transform: translate(1px, -1px); }
        75% { transform: translate(-1px, -1px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (isAnimating && !isPaused) {
                    pauseAnimation();
                } else if (isAnimating && isPaused) {
                    pauseAnimation();
                } else {
                    startAnimation();
                }
                break;
            case 'r':
                e.preventDefault();
                resetAnimation();
                break;
            case 's':
                e.preventDefault();
                saveSettings();
                break;
            case 'l':
                e.preventDefault();
                loadSettings();
                break;
        }
    } else {
        switch (e.key) {
            case ' ':
                e.preventDefault();
                if (isAnimating) {
                    pauseAnimation();
                } else {
                    startAnimation();
                }
                break;
            case 'r':
                if (!e.ctrlKey && !e.metaKey) {
                    randomEffect();
                }
                break;
        }
    }
});

// Initialize the app
init(); 
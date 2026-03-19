// DOM Elements
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const settingsBtn = document.getElementById('settingsBtn');
const gameArea = document.getElementById('gameArea');
const gameOverlay = document.getElementById('gameOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayMessage = document.getElementById('overlayMessage');
const overlayBtn = document.getElementById('overlayBtn');
const settingsPanel = document.getElementById('settingsPanel');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');

// Game info elements
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const levelElement = document.getElementById('level');
const livesElement = document.getElementById('lives');

// Stats elements
const insectsCaughtElement = document.getElementById('insectsCaught');
const insectsEscapedElement = document.getElementById('insectsEscaped');
const accuracyElement = document.getElementById('accuracy');
const highScoreElement = document.getElementById('highScore');

// Settings elements
const gameTimeSlider = document.getElementById('gameTime');
const gameTimeValue = document.getElementById('gameTimeValue');
const insectSpeedSlider = document.getElementById('insectSpeed');
const insectSpeedValue = document.getElementById('insectSpeedValue');
const insectSpawnRateSlider = document.getElementById('insectSpawnRate');
const insectSpawnRateValue = document.getElementById('insectSpawnRateValue');
const soundEnabledCheckbox = document.getElementById('soundEnabled');
const difficultySelect = document.getElementById('difficulty');

// Game state
let gameState = {
    isPlaying: false,
    isPaused: false,
    score: 0,
    time: 30,
    level: 1,
    lives: 3,
    insectsCaught: 0,
    insectsEscaped: 0,
    gameTimer: null,
    spawnTimer: null,
    insects: [],
    settings: {
        gameTime: 30,
        insectSpeed: 5,
        insectSpawnRate: 5,
        soundEnabled: true,
        difficulty: 'medium'
    }
};

// Insect types
const insectTypes = [
    { type: 'fly', emoji: '🪰', points: 10, speed: 1 },
    { type: 'mosquito', emoji: '🦟', points: 15, speed: 1.2 },
    { type: 'spider', emoji: '🕷️', points: 20, speed: 0.8 },
    { type: 'beetle', emoji: '🪲', points: 25, speed: 0.6 }
];

// Event Listeners
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
resetBtn.addEventListener('click', resetGame);
settingsBtn.addEventListener('click', toggleSettings);
saveSettingsBtn.addEventListener('click', saveSettings);
overlayBtn.addEventListener('click', startGame);

// Settings event listeners
gameTimeSlider.addEventListener('input', updateGameTime);
insectSpeedSlider.addEventListener('input', updateInsectSpeed);
insectSpawnRateSlider.addEventListener('input', updateInsectSpawnRate);

// Initialize
function init() {
    loadSettings();
    loadHighScore();
    updateDisplay();
    showOverlay('Ready to Play?', 'Click Start to begin catching insects!');
}

// Start game
function startGame() {
    if (gameState.isPlaying && !gameState.isPaused) return;
    
    if (gameState.isPaused) {
        // Resume game
        gameState.isPaused = false;
        pauseBtn.textContent = 'Pause';
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        hideOverlay();
        return;
    }
    
    // Start new game
    gameState.isPlaying = true;
    gameState.isPaused = false;
    gameState.score = 0;
    gameState.time = gameState.settings.gameTime;
    gameState.level = 1;
    gameState.lives = 3;
    gameState.insectsCaught = 0;
    gameState.insectsEscaped = 0;
    
    // Clear existing insects
    clearInsects();
    
    // Update UI
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    hideOverlay();
    
    // Start timers
    startGameTimer();
    startSpawnTimer();
    
    updateDisplay();
    showMessage('Game started!', 'success');
}

// Pause game
function pauseGame() {
    if (!gameState.isPlaying) return;
    
    gameState.isPaused = !gameState.isPaused;
    
    if (gameState.isPaused) {
        pauseBtn.textContent = 'Resume';
        startBtn.disabled = false;
        clearTimers();
        showOverlay('Game Paused', 'Click Resume to continue!');
    } else {
        pauseBtn.textContent = 'Pause';
        startBtn.disabled = true;
        startGameTimer();
        startSpawnTimer();
        hideOverlay();
    }
    
    showMessage(gameState.isPaused ? 'Game paused' : 'Game resumed', 'info');
}

// Reset game
function resetGame() {
    gameState.isPlaying = false;
    gameState.isPaused = false;
    gameState.score = 0;
    gameState.time = gameState.settings.gameTime;
    gameState.level = 1;
    gameState.lives = 3;
    gameState.insectsCaught = 0;
    gameState.insectsEscaped = 0;
    
    clearTimers();
    clearInsects();
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    
    updateDisplay();
    showOverlay('Ready to Play?', 'Click Start to begin catching insects!');
    showMessage('Game reset', 'info');
}

// Game timer
function startGameTimer() {
    gameState.gameTimer = setInterval(() => {
        if (!gameState.isPaused) {
            gameState.time--;
            updateDisplay();
            
            if (gameState.time <= 0) {
                endGame();
            }
        }
    }, 1000);
}

// Spawn timer
function startSpawnTimer() {
    const spawnInterval = 2000 - (gameState.settings.insectSpawnRate * 150);
    gameState.spawnTimer = setInterval(() => {
        if (!gameState.isPaused && gameState.isPlaying) {
            spawnInsect();
        }
    }, spawnInterval);
}

// Spawn insect
function spawnInsect() {
    const insectType = insectTypes[Math.floor(Math.random() * insectTypes.length)];
    const insect = createInsect(insectType);
    
    gameArea.appendChild(insect.element);
    gameState.insects.push(insect);
    
    // Start insect movement
    moveInsect(insect);
    
    // Set escape timer
    setTimeout(() => {
        if (insect.element.parentNode && !insect.caught) {
            insectEscaped(insect);
        }
    }, 5000 - (gameState.settings.insectSpeed * 400));
}

// Create insect element
function createInsect(insectType) {
    const element = document.createElement('div');
    element.className = `insect ${insectType.type}`;
    element.innerHTML = insectType.emoji;
    element.style.fontSize = '24px';
    
    // Random position
    const maxX = gameArea.offsetWidth - 40;
    const maxY = gameArea.offsetHeight - 40;
    element.style.left = Math.random() * maxX + 'px';
    element.style.top = Math.random() * maxY + 'px';
    
    // Click event
    element.addEventListener('click', () => catchInsect(insectType, element));
    
    return {
        element: element,
        type: insectType,
        caught: false,
        x: parseFloat(element.style.left),
        y: parseFloat(element.style.top),
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
    };
}

// Move insect
function moveInsect(insect) {
    if (!gameState.isPlaying || gameState.isPaused || insect.caught) return;
    
    const speed = gameState.settings.insectSpeed * 0.5;
    const maxX = gameArea.offsetWidth - 40;
    const maxY = gameArea.offsetHeight - 40;
    
    insect.x += insect.dx * speed;
    insect.y += insect.dy * speed;
    
    // Bounce off walls
    if (insect.x <= 0 || insect.x >= maxX) {
        insect.dx *= -1;
        insect.x = Math.max(0, Math.min(maxX, insect.x));
    }
    if (insect.y <= 0 || insect.y >= maxY) {
        insect.dy *= -1;
        insect.y = Math.max(0, Math.min(maxY, insect.y));
    }
    
    insect.element.style.left = insect.x + 'px';
    insect.element.style.top = insect.y + 'px';
    
    // Continue movement
    requestAnimationFrame(() => moveInsect(insect));
}

// Catch insect
function catchInsect(insectType, element) {
    if (!gameState.isPlaying || gameState.isPaused) return;
    
    const insect = gameState.insects.find(i => i.element === element);
    if (!insect || insect.caught) return;
    
    insect.caught = true;
    element.classList.add('caught');
    
    // Update score
    const points = insectType.points * gameState.level;
    gameState.score += points;
    gameState.insectsCaught++;
    
    // Create particle effect
    createParticleEffect(element);
    
    // Remove insect after animation
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
            gameState.insects = gameState.insects.filter(i => i !== insect);
        }
    }, 300);
    
    // Check for level up
    if (gameState.insectsCaught % 10 === 0) {
        levelUp();
    }
    
    updateDisplay();
    showMessage(`+${points} points!`, 'success');
    
    // Play sound
    if (gameState.settings.soundEnabled) {
        playSound('catch');
    }
}

// Insect escaped
function insectEscaped(insect) {
    if (insect.caught) return;
    
    insect.element.classList.add('escaped');
    gameState.insectsEscaped++;
    gameState.lives--;
    
    // Remove insect after animation
    setTimeout(() => {
        if (insect.element.parentNode) {
            insect.element.parentNode.removeChild(insect.element);
            gameState.insects = gameState.insects.filter(i => i !== insect);
        }
    }, 500);
    
    updateDisplay();
    
    if (gameState.lives <= 0) {
        endGame();
    } else {
        showMessage('Insect escaped!', 'error');
    }
}

// Level up
function levelUp() {
    gameState.level++;
    showMessage(`Level ${gameState.level}!`, 'success');
    
    // Increase difficulty
    if (gameState.level % 3 === 0) {
        gameState.settings.insectSpeed = Math.min(10, gameState.settings.insectSpeed + 1);
        updateInsectSpeed();
    }
}

// End game
function endGame() {
    gameState.isPlaying = false;
    gameState.isPaused = false;
    
    clearTimers();
    clearInsects();
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    
    // Check for high score
    const currentHighScore = parseInt(localStorage.getItem('insectGameHighScore') || '0');
    if (gameState.score > currentHighScore) {
        localStorage.setItem('insectGameHighScore', gameState.score.toString());
        showOverlay('New High Score!', `Congratulations! You scored ${gameState.score} points!`);
    } else {
        showOverlay('Game Over!', `Final Score: ${gameState.score} points`);
    }
    
    updateDisplay();
    saveGameStats();
}

// Clear timers
function clearTimers() {
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
    }
    if (gameState.spawnTimer) {
        clearInterval(gameState.spawnTimer);
        gameState.spawnTimer = null;
    }
}

// Clear insects
function clearInsects() {
    gameState.insects.forEach(insect => {
        if (insect.element.parentNode) {
            insect.element.parentNode.removeChild(insect.element);
        }
    });
    gameState.insects = [];
}

// Create particle effect
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const gameRect = gameArea.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = (rect.left - gameRect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top - gameRect.top + rect.height / 2) + 'px';
        
        gameArea.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 500);
    }
}

// Update display
function updateDisplay() {
    scoreElement.textContent = gameState.score;
    timeElement.textContent = gameState.time;
    levelElement.textContent = gameState.level;
    livesElement.textContent = gameState.lives;
    
    insectsCaughtElement.textContent = gameState.insectsCaught;
    insectsEscapedElement.textContent = gameState.insectsEscaped;
    
    const totalAttempts = gameState.insectsCaught + gameState.insectsEscaped;
    const accuracy = totalAttempts > 0 ? Math.round((gameState.insectsCaught / totalAttempts) * 100) : 0;
    accuracyElement.textContent = accuracy + '%';
    
    highScoreElement.textContent = localStorage.getItem('insectGameHighScore') || '0';
}

// Show overlay
function showOverlay(title, message) {
    overlayTitle.textContent = title;
    overlayMessage.textContent = message;
    gameOverlay.style.display = 'flex';
}

// Hide overlay
function hideOverlay() {
    gameOverlay.style.display = 'none';
}

// Toggle settings
function toggleSettings() {
    settingsPanel.classList.toggle('active');
}

// Save settings
function saveSettings() {
    gameState.settings.gameTime = parseInt(gameTimeSlider.value);
    gameState.settings.insectSpeed = parseInt(insectSpeedSlider.value);
    gameState.settings.insectSpawnRate = parseInt(insectSpawnRateSlider.value);
    gameState.settings.soundEnabled = soundEnabledCheckbox.checked;
    gameState.settings.difficulty = difficultySelect.value;
    
    localStorage.setItem('insectGameSettings', JSON.stringify(gameState.settings));
    showMessage('Settings saved!', 'success');
}

// Load settings
function loadSettings() {
    const saved = localStorage.getItem('insectGameSettings');
    if (saved) {
        gameState.settings = { ...gameState.settings, ...JSON.parse(saved) };
    }
    
    // Update UI
    gameTimeSlider.value = gameState.settings.gameTime;
    gameTimeValue.textContent = gameState.settings.gameTime + 's';
    
    insectSpeedSlider.value = gameState.settings.insectSpeed;
    insectSpeedValue.textContent = gameState.settings.insectSpeed;
    
    insectSpawnRateSlider.value = gameState.settings.insectSpawnRate;
    insectSpawnRateValue.textContent = gameState.settings.insectSpawnRate;
    
    soundEnabledCheckbox.checked = gameState.settings.soundEnabled;
    difficultySelect.value = gameState.settings.difficulty;
}

// Load high score
function loadHighScore() {
    const highScore = localStorage.getItem('insectGameHighScore') || '0';
    highScoreElement.textContent = highScore;
}

// Save game stats
function saveGameStats() {
    const stats = {
        score: gameState.score,
        insectsCaught: gameState.insectsCaught,
        insectsEscaped: gameState.insectsEscaped,
        level: gameState.level,
        date: new Date().toISOString()
    };
    
    const gameHistory = JSON.parse(localStorage.getItem('insectGameHistory') || '[]');
    gameHistory.push(stats);
    
    // Keep only last 10 games
    if (gameHistory.length > 10) {
        gameHistory.shift();
    }
    
    localStorage.setItem('insectGameHistory', JSON.stringify(gameHistory));
}

// Settings update functions
function updateGameTime() {
    gameTimeValue.textContent = gameTimeSlider.value + 's';
}

function updateInsectSpeed() {
    insectSpeedValue.textContent = insectSpeedSlider.value;
}

function updateInsectSpawnRate() {
    insectSpawnRateValue.textContent = insectSpawnRateSlider.value;
}

// Play sound
function playSound(type) {
    // Simple sound implementation
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'catch') {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
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
            case 'Enter':
                e.preventDefault();
                if (gameState.isPlaying && !gameState.isPaused) {
                    pauseGame();
                } else if (gameState.isPlaying && gameState.isPaused) {
                    pauseGame();
                } else {
                    startGame();
                }
                break;
            case 'r':
                e.preventDefault();
                resetGame();
                break;
            case 's':
                e.preventDefault();
                toggleSettings();
                break;
        }
    } else {
        switch (e.key) {
            case ' ':
                e.preventDefault();
                if (gameState.isPlaying) {
                    pauseGame();
                } else {
                    startGame();
                }
                break;
            case 'Escape':
                if (gameState.isPlaying) {
                    pauseGame();
                }
                break;
        }
    }
});

// Initialize the game
init(); 
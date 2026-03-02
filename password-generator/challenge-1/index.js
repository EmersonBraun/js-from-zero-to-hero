// DOM Elements
const passwordDisplay = document.getElementById('passwordDisplay');
const passwordText = document.getElementById('passwordText');
const copyBtn = document.getElementById('copyBtn');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');
const passwordsGenerated = document.getElementById('passwordsGenerated');
const historyList = document.getElementById('historyList');

// Password options
const options = {
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols')
};

// Character sets
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// State
let currentPassword = '';
let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];
let generatedCount = parseInt(localStorage.getItem('generatedCount')) || 0;

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
clearBtn.addEventListener('click', clearPassword);
copyBtn.addEventListener('click', copyPassword);
lengthSlider.addEventListener('input', updateLength);

// Initialize
function init() {
    updateLength();
    updateStats();
    renderHistory();
    generatePassword(); // Generate initial password
}

// Update length display
function updateLength() {
    const length = lengthSlider.value;
    lengthValue.textContent = length;
}

// Generate password
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const selectedOptions = getSelectedOptions();
    
    if (selectedOptions.length === 0) {
        showMessage('Please select at least one character type', 'error');
        return;
    }
    
    let password = '';
    let availableChars = '';
    
    // Build character pool based on selected options
    selectedOptions.forEach(option => {
        availableChars += charSets[option];
    });
    
    // Generate password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }
    
    // Ensure at least one character from each selected type
    selectedOptions.forEach(option => {
        if (!password.includes(charSets[option].charAt(0))) {
            const randomChar = charSets[option].charAt(Math.floor(Math.random() * charSets[option].length));
            const randomPosition = Math.floor(Math.random() * password.length);
            password = password.substring(0, randomPosition) + randomChar + password.substring(randomPosition + 1);
        }
    });
    
    currentPassword = password;
    passwordText.textContent = password;
    
    // Update strength meter
    updateStrengthMeter(password);
    
    // Add to history
    addToHistory(password);
    
    // Update stats
    generatedCount++;
    updateStats();
    
    // Save to localStorage
    localStorage.setItem('generatedCount', generatedCount.toString());
    
    showMessage('Password generated successfully!', 'success');
}

// Get selected options
function getSelectedOptions() {
    const selected = [];
    Object.keys(options).forEach(key => {
        if (options[key].checked) {
            selected.push(key);
        }
    });
    return selected;
}

// Update strength meter
function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    const strengthFill = strengthBar.querySelector('.strength-fill');
    
    // Remove existing classes
    strengthFill.className = 'strength-fill';
    
    // Add appropriate class and update label
    switch (strength.level) {
        case 'weak':
            strengthFill.classList.add('weak');
            strengthLabel.textContent = 'Weak Password';
            break;
        case 'fair':
            strengthFill.classList.add('fair');
            strengthLabel.textContent = 'Fair Password';
            break;
        case 'good':
            strengthFill.classList.add('good');
            strengthLabel.textContent = 'Good Password';
            break;
        case 'strong':
            strengthFill.classList.add('strong');
            strengthLabel.textContent = 'Strong Password';
            break;
    }
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Determine level
    let level;
    if (score <= 2) level = 'weak';
    else if (score <= 4) level = 'fair';
    else if (score <= 6) level = 'good';
    else level = 'strong';
    
    return { level, score, feedback };
}

// Copy password to clipboard
async function copyPassword() {
    if (!currentPassword) {
        showMessage('No password to copy', 'error');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(currentPassword);
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
        }, 2000);
        
        showMessage('Password copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy password:', err);
        showMessage('Failed to copy password', 'error');
    }
}

// Clear password
function clearPassword() {
    currentPassword = '';
    passwordText.textContent = '';
    strengthBar.querySelector('.strength-fill').className = 'strength-fill';
    strengthLabel.textContent = 'Password Strength';
    showMessage('Password cleared', 'info');
}

// Add password to history
function addToHistory(password) {
    const timestamp = new Date().toLocaleString();
    const historyItem = { password, timestamp };
    
    passwordHistory.unshift(historyItem);
    
    // Keep only last 10 passwords
    if (passwordHistory.length > 10) {
        passwordHistory = passwordHistory.slice(0, 10);
    }
    
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    renderHistory();
}

// Render password history
function renderHistory() {
    if (passwordHistory.length === 0) {
        historyList.innerHTML = '<div style="color: #fff; text-align: center; opacity: 0.7;">No passwords generated yet</div>';
        return;
    }
    
    historyList.innerHTML = passwordHistory.map(item => `
        <div class="history-item">
            <div class="history-password">${item.password}</div>
            <button class="history-copy" onclick="copyHistoryPassword('${item.password}')">Copy</button>
        </div>
    `).join('');
}

// Copy password from history
async function copyHistoryPassword(password) {
    try {
        await navigator.clipboard.writeText(password);
        showMessage('Password copied from history!', 'success');
    } catch (err) {
        console.error('Failed to copy password from history:', err);
        showMessage('Failed to copy password', 'error');
    }
}

// Update statistics
function updateStats() {
    passwordsGenerated.textContent = generatedCount;
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
            case 'g':
                e.preventDefault();
                generatePassword();
                break;
            case 'c':
                e.preventDefault();
                copyPassword();
                break;
            case 'x':
                e.preventDefault();
                clearPassword();
                break;
        }
    }
});

// Initialize the app
init(); 
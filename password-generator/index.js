document.addEventListener('DOMContentLoaded', function() {
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');
    const passwordLength = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    // Checkbox elements
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const numbers = document.getElementById('numbers');
    const symbols = document.getElementById('symbols');
    const excludeSimilar = document.getElementById('excludeSimilar');

    // Character sets
    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    // Similar characters to exclude
    const similarChars = 'l1IO0';

    // Update length display
    passwordLength.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // Generate password
    function generatePassword() {
        let chars = '';
        let password = '';

        // Build character set based on selected options
        if (uppercase.checked) chars += charSets.uppercase;
        if (lowercase.checked) chars += charSets.lowercase;
        if (numbers.checked) chars += charSets.numbers;
        if (symbols.checked) chars += charSets.symbols;

        // Check if at least one option is selected
        if (chars === '') {
            alert('Please select at least one character type!');
            return;
        }

        // Exclude similar characters if option is selected
        if (excludeSimilar.checked) {
            chars = chars.split('').filter(char => !similarChars.includes(char)).join('');
        }

        // Generate password
        const length = parseInt(passwordLength.value);
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }

        // Ensure password contains at least one character from each selected type
        if (uppercase.checked && !/[A-Z]/.test(password)) {
            password = replaceRandomChar(password, charSets.uppercase);
        }
        if (lowercase.checked && !/[a-z]/.test(password)) {
            password = replaceRandomChar(password, charSets.lowercase);
        }
        if (numbers.checked && !/[0-9]/.test(password)) {
            password = replaceRandomChar(password, charSets.numbers);
        }
        if (symbols.checked && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
            password = replaceRandomChar(password, charSets.symbols);
        }

        passwordOutput.value = password;
        updateStrengthMeter(password);
    }

    // Replace a random character in password with one from the specified set
    function replaceRandomChar(password, charSet) {
        const randomIndex = Math.floor(Math.random() * password.length);
        const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
        return password.substring(0, randomIndex) + randomChar + password.substring(randomIndex + 1);
    }

    // Calculate password strength
    function calculateStrength(password) {
        let score = 0;
        let feedback = [];

        // Length contribution
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;

        // Character variety contribution
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        // Deduct points for common patterns
        if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
        if (/123|abc|qwe/i.test(password)) score -= 1; // Common sequences

        return Math.max(0, Math.min(4, score));
    }

    // Update strength meter
    function updateStrengthMeter(password) {
        const strength = calculateStrength(password);
        
        // Remove all strength classes
        strengthFill.classList.remove('weak', 'medium', 'strong', 'very-strong');
        
        // Add appropriate class and update text
        if (strength === 0 || strength === 1) {
            strengthFill.classList.add('weak');
            strengthText.textContent = 'Weak';
        } else if (strength === 2) {
            strengthFill.classList.add('medium');
            strengthText.textContent = 'Medium';
        } else if (strength === 3) {
            strengthFill.classList.add('strong');
            strengthText.textContent = 'Strong';
        } else {
            strengthFill.classList.add('very-strong');
            strengthText.textContent = 'Very Strong';
        }
    }

    // Copy password to clipboard
    async function copyToClipboard() {
        if (!passwordOutput.value) {
            passwordOutput.placeholder = 'Generate a password first!';
            return;
        }

        try {
            await navigator.clipboard.writeText(passwordOutput.value);
            copyBtn.classList.add('copied');
            copyBtn.textContent = '✓';

            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.textContent = '📋';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy password:', err);
        }
    }

    // Clear password
    function clearPassword() {
        passwordOutput.value = '';
        strengthFill.classList.remove('weak', 'medium', 'strong', 'very-strong');
        strengthText.textContent = 'Medium';
    }

    // Event listeners
    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearPassword);

    // Generate password on Enter key
    passwordOutput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generatePassword();
        }
    });

    // Auto-generate when options change
    [uppercase, lowercase, numbers, symbols, excludeSimilar].forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (passwordOutput.value) {
                generatePassword();
            }
        });
    });

    // Auto-generate when length changes
    passwordLength.addEventListener('input', function() {
        if (passwordOutput.value) {
            generatePassword();
        }
    });

    // Generate initial password
    generatePassword();
}); 
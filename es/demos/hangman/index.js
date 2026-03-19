document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('hangmanCanvas');
    const ctx = canvas.getContext('2d');
    const wordDisplay = document.getElementById('wordDisplay');
    const keyboard = document.getElementById('keyboard');
    const livesDisplay = document.getElementById('lives');
    const scoreDisplay = document.getElementById('score');
    const newGameBtn = document.getElementById('newGameBtn');
    const hintBtn = document.getElementById('hintBtn');

    // Game state
    let currentWord = '';
    let guessedLetters = new Set();
    let lives = 6;
    let score = 0;
    let gameOver = false;

    // Word list
    const words = [
        'JAVASCRIPT', 'PROGRAMMING', 'DEVELOPER', 'COMPUTER', 'ALGORITHM',
        'FUNCTION', 'VARIABLE', 'ARRAY', 'OBJECT', 'CLASS',
        'METHOD', 'PROPERTY', 'EVENT', 'CALLBACK', 'PROMISE',
        'ASYNC', 'AWAIT', 'MODULE', 'PACKAGE', 'LIBRARY'
    ];

    // Initialize game
    function initGame() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters.clear();
        lives = 6;
        gameOver = false;
        
        drawHangman();
        displayWord();
        createKeyboard();
        updateDisplay();
        
        // Clear any existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    // Draw hangman
    function drawHangman() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        
        // Base
        ctx.beginPath();
        ctx.moveTo(50, 250);
        ctx.lineTo(250, 250);
        ctx.stroke();
        
        // Vertical pole
        ctx.beginPath();
        ctx.moveTo(100, 250);
        ctx.lineTo(100, 50);
        ctx.stroke();
        
        // Top
        ctx.beginPath();
        ctx.moveTo(100, 50);
        ctx.lineTo(200, 50);
        ctx.stroke();
        
        // Rope
        ctx.beginPath();
        ctx.moveTo(200, 50);
        ctx.lineTo(200, 80);
        ctx.stroke();
        
        // Draw body parts based on lives
        if (lives < 6) {
            // Head
            ctx.beginPath();
            ctx.arc(200, 100, 20, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        if (lives < 5) {
            // Body
            ctx.beginPath();
            ctx.moveTo(200, 120);
            ctx.lineTo(200, 180);
            ctx.stroke();
        }
        
        if (lives < 4) {
            // Left arm
            ctx.beginPath();
            ctx.moveTo(200, 140);
            ctx.lineTo(170, 160);
            ctx.stroke();
        }
        
        if (lives < 3) {
            // Right arm
            ctx.beginPath();
            ctx.moveTo(200, 140);
            ctx.lineTo(230, 160);
            ctx.stroke();
        }
        
        if (lives < 2) {
            // Left leg
            ctx.beginPath();
            ctx.moveTo(200, 180);
            ctx.lineTo(170, 220);
            ctx.stroke();
        }
        
        if (lives < 1) {
            // Right leg
            ctx.beginPath();
            ctx.moveTo(200, 180);
            ctx.lineTo(230, 220);
            ctx.stroke();
        }
    }

    // Display word with underscores
    function displayWord() {
        wordDisplay.innerHTML = '';
        for (let letter of currentWord) {
            const letterDiv = document.createElement('div');
            letterDiv.className = 'letter';
            if (guessedLetters.has(letter)) {
                letterDiv.textContent = letter;
                letterDiv.classList.add('revealed');
            } else {
                letterDiv.textContent = '_';
            }
            wordDisplay.appendChild(letterDiv);
        }
    }

    // Create keyboard
    function createKeyboard() {
        keyboard.innerHTML = '';
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        letters.forEach(letter => {
            const key = document.createElement('button');
            key.className = 'key';
            key.textContent = letter;
            key.addEventListener('click', () => guessLetter(letter));
            keyboard.appendChild(key);
        });
    }

    // Guess a letter
    function guessLetter(letter) {
        if (gameOver || guessedLetters.has(letter)) return;
        
        guessedLetters.add(letter);
        const key = Array.from(keyboard.children).find(k => k.textContent === letter);
        
        if (currentWord.includes(letter)) {
            key.classList.add('correct');
            if (checkWin()) {
                endGame(true);
            }
        } else {
            key.classList.add('wrong');
            lives--;
            drawHangman();
            
            if (lives <= 0) {
                endGame(false);
            }
        }
        
        key.classList.add('used');
        displayWord();
        updateDisplay();
    }

    // Check if player won
    function checkWin() {
        return currentWord.split('').every(letter => guessedLetters.has(letter));
    }

    // End game
    function endGame(won) {
        gameOver = true;
        
        const message = document.createElement('div');
        message.className = `message ${won ? 'win' : 'lose'}`;
        
        if (won) {
            score += 10;
            message.textContent = `Congratulations! You won! The word was "${currentWord}"`;
        } else {
            message.textContent = `Game Over! The word was "${currentWord}"`;
        }
        
        wordDisplay.parentNode.insertBefore(message, wordDisplay.nextSibling);
        updateDisplay();
    }

    // Update display
    function updateDisplay() {
        livesDisplay.textContent = lives;
        scoreDisplay.textContent = score;
    }

    // Show hint
    function showHint() {
        if (gameOver) return;
        
        const unguessedLetters = currentWord.split('').filter(letter => !guessedLetters.has(letter));
        if (unguessedLetters.length > 0) {
            const randomLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
            guessLetter(randomLetter);
        }
    }

    // Event listeners
    newGameBtn.addEventListener('click', initGame);
    hintBtn.addEventListener('click', showHint);

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (gameOver) return;
        
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key) && !guessedLetters.has(key)) {
            guessLetter(key);
        }
    });

    // Initialize first game
    initGame();
}); 
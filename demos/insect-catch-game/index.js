class InsectCatchGame {
    constructor() {
        this.selectedInsect = null;
        this.score = 0;
        this.time = 0;
        this.gameInterval = null;
        this.insectInterval = null;
        this.isPlaying = false;
        
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        this.gameIntro = document.getElementById('gameIntro');
        this.gameScreen = document.getElementById('gameScreen');
        this.gameOver = document.getElementById('gameOver');
        this.gameArea = document.getElementById('gameArea');
        this.message = document.getElementById('message');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.timeDisplay = document.getElementById('timeDisplay');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.finalScore = document.getElementById('finalScore');
        this.finalTime = document.getElementById('finalTime');
        this.insectOptions = document.querySelectorAll('.insect-option');
    }

    addEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
        
        this.insectOptions.forEach(option => {
            option.addEventListener('click', () => this.selectInsect(option));
        });
    }

    selectInsect(option) {
        // Remove previous selection
        this.insectOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selection to clicked option
        option.classList.add('selected');
        this.selectedInsect = option.dataset.insect;
        
        // Enable start button
        this.startBtn.disabled = false;
        this.startBtn.style.opacity = '1';
    }

    startGame() {
        if (!this.selectedInsect) {
            alert('Please select an insect first!');
            return;
        }

        this.gameIntro.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameOver.style.display = 'none';
        
        this.score = 0;
        this.time = 0;
        this.isPlaying = true;
        
        this.updateDisplay();
        this.startTimer();
        this.createInsect();
        
        // Hide message after 2 seconds
        setTimeout(() => {
            this.message.style.display = 'none';
        }, 2000);
    }

    startTimer() {
        this.gameInterval = setInterval(() => {
            this.time++;
            this.updateDisplay();
        }, 1000);
    }

    createInsect() {
        if (!this.isPlaying) return;

        const insect = document.createElement('div');
        insect.className = 'insect';
        insect.style.left = Math.random() * (this.gameArea.offsetWidth - 60) + 'px';
        insect.style.top = Math.random() * (this.gameArea.offsetHeight - 60) + 'px';
        
        const img = document.createElement('img');
        img.src = `https://cdn-icons-png.flaticon.com/512/1995/199557${this.getInsectImageIndex()}.png`;
        img.alt = this.selectedInsect;
        
        insect.appendChild(img);
        this.gameArea.appendChild(insect);

        insect.addEventListener('click', () => this.catchInsect(insect));

        // Remove insect after 2 seconds if not caught
        setTimeout(() => {
            if (insect.parentNode) {
                insect.remove();
            }
        }, 2000);

        // Create next insect after random delay
        const delay = Math.random() * 1000 + 500; // 500ms to 1500ms
        setTimeout(() => this.createInsect(), delay);
    }

    getInsectImageIndex() {
        const insectMap = {
            'fly': '4',
            'mosquito': '5', 
            'spider': '6',
            'roach': '7'
        };
        return insectMap[this.selectedInsect] || '4';
    }

    catchInsect(insect) {
        if (!this.isPlaying) return;

        this.score++;
        this.updateDisplay();
        
        insect.classList.add('caught');
        
        setTimeout(() => {
            if (insect.parentNode) {
                insect.remove();
            }
        }, 300);
    }

    updateDisplay() {
        this.timeDisplay.textContent = this.time;
        this.scoreDisplay.textContent = this.score;
    }

    endGame() {
        this.isPlaying = false;
        clearInterval(this.gameInterval);
        clearInterval(this.insectInterval);
        
        this.finalScore.textContent = this.score;
        this.finalTime.textContent = this.time;
        
        this.gameScreen.style.display = 'none';
        this.gameOver.style.display = 'block';
    }

    restartGame() {
        this.endGame();
        this.startGame();
    }

    playAgain() {
        this.gameOver.style.display = 'none';
        this.gameIntro.style.display = 'block';
        
        // Reset insect selection
        this.insectOptions.forEach(opt => opt.classList.remove('selected'));
        this.selectedInsect = null;
        this.startBtn.disabled = true;
        this.startBtn.style.opacity = '0.5';
        
        // Clear game area
        const insects = this.gameArea.querySelectorAll('.insect');
        insects.forEach(insect => insect.remove());
        
        // Show message again
        this.message.style.display = 'block';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new InsectCatchGame();
    
    // Disable start button initially
    game.startBtn.disabled = true;
    game.startBtn.style.opacity = '0.5';
}); 
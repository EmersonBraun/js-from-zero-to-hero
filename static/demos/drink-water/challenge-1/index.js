class DrinkWater {
    constructor() {
        this.dailyGoal = 2000; // ml
        this.glassSize = 250; // ml
        this.totalGlasses = 0;
        this.totalWater = 0;
        this.currentCupLevel = 0;
        this.today = new Date().toDateString();
        this.history = this.loadHistory();
        
        this.init();
    }
    
    init() {
        this.loadTodayData();
        this.setupEventListeners();
        this.updateUI();
        this.createGlasses();
    }
    
    setupEventListeners() {
        document.getElementById('drinkBtn').addEventListener('click', () => {
            this.drinkWater();
        });
        
        document.getElementById('refillBtn').addEventListener('click', () => {
            this.refillCup();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetDay();
        });
        
        document.getElementById('historyBtn').addEventListener('click', () => {
            this.showHistory();
        });
        
        document.getElementById('notificationClose').addEventListener('click', () => {
            this.hideNotification();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.drinkWater();
                    break;
                case 'r':
                case 'R':
                    this.refillCup();
                    break;
                case 'Escape':
                    this.hideNotification();
                    break;
            }
        });
    }
    
    drinkWater() {
        if (this.currentCupLevel <= 0) {
            this.showNotification('Cup is empty! Refill first.', 'warning');
            return;
        }
        
        const amountToDrink = Math.min(this.currentCupLevel, this.glassSize);
        this.currentCupLevel -= amountToDrink;
        
        if (this.currentCupLevel <= 0) {
            this.totalGlasses++;
            this.totalWater += amountToDrink;
            this.showNotification(`Great! You drank ${amountToDrink}ml of water!`, 'success');
            this.updateGlasses();
        } else {
            this.totalWater += amountToDrink;
            this.showNotification(`You drank ${amountToDrink}ml of water!`, 'success');
        }
        
        this.updateUI();
        this.saveTodayData();
        this.animateCup();
    }
    
    refillCup() {
        this.currentCupLevel = this.glassSize;
        this.updateUI();
        this.showNotification('Cup refilled! Ready to drink.', 'info');
        this.animateCup();
    }
    
    resetDay() {
        if (confirm('Are you sure you want to reset today\'s progress?')) {
            this.totalGlasses = 0;
            this.totalWater = 0;
            this.currentCupLevel = 0;
            this.updateUI();
            this.updateGlasses();
            this.saveTodayData();
            this.showNotification('Day reset successfully!', 'info');
        }
    }
    
    updateUI() {
        // Update stats
        document.getElementById('totalGlasses').textContent = this.totalGlasses;
        document.getElementById('totalWater').textContent = this.totalWater;
        
        const progress = Math.min((this.totalWater / this.dailyGoal) * 100, 100);
        document.getElementById('goalProgress').textContent = `${Math.round(progress)}%`;
        
        // Update cup
        document.getElementById('cupAmount').textContent = `${this.glassSize}ml`;
        
        const waterLevel = (this.currentCupLevel / this.glassSize) * 100;
        document.getElementById('water').style.height = `${waterLevel}%`;
        document.getElementById('waterLevel').textContent = `${Math.round(waterLevel)}%`;
        
        // Update progress color
        const progressElement = document.getElementById('goalProgress');
        if (progress >= 100) {
            progressElement.style.color = '#4CAF50';
        } else if (progress >= 75) {
            progressElement.style.color = '#FF9800';
        } else {
            progressElement.style.color = '#4CAF50';
        }
    }
    
    createGlasses() {
        const glassesContainer = document.getElementById('glasses');
        glassesContainer.innerHTML = '';
        
        const maxGlasses = Math.ceil(this.dailyGoal / this.glassSize);
        
        for (let i = 0; i < maxGlasses; i++) {
            const glass = document.createElement('div');
            glass.className = 'glass';
            glass.textContent = `${this.glassSize}ml`;
            
            if (i < this.totalGlasses) {
                glass.classList.add('filled');
            }
            
            glass.addEventListener('click', () => {
                this.toggleGlass(i);
            });
            
            glassesContainer.appendChild(glass);
        }
    }
    
    updateGlasses() {
        const glasses = document.querySelectorAll('.glass');
        
        glasses.forEach((glass, index) => {
            if (index < this.totalGlasses) {
                glass.classList.add('filled');
                glass.classList.add('glass-fill');
                setTimeout(() => glass.classList.remove('glass-fill'), 600);
            } else {
                glass.classList.remove('filled');
            }
        });
    }
    
    toggleGlass(index) {
        if (index < this.totalGlasses) {
            // Remove glass
            this.totalGlasses--;
            this.totalWater = Math.max(0, this.totalWater - this.glassSize);
            this.showNotification(`Removed ${this.glassSize}ml from your daily intake`, 'info');
        } else if (index === this.totalGlasses) {
            // Add glass
            this.totalGlasses++;
            this.totalWater += this.glassSize;
            this.showNotification(`Added ${this.glassSize}ml to your daily intake`, 'success');
        }
        
        this.updateUI();
        this.updateGlasses();
        this.saveTodayData();
    }
    
    showHistory() {
        const historyData = this.history[this.today] || { glasses: 0, water: 0 };
        const message = `Today's History:\nGlasses: ${historyData.glasses}\nWater: ${historyData.water}ml\nGoal: ${this.dailyGoal}ml`;
        
        alert(message);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }
    
    hideNotification() {
        const notification = document.getElementById('notification');
        notification.classList.remove('show');
    }
    
    animateCup() {
        const cup = document.getElementById('cup');
        cup.classList.add('water-splash');
        setTimeout(() => {
            cup.classList.remove('water-splash');
        }, 500);
    }
    
    saveTodayData() {
        const todayData = {
            glasses: this.totalGlasses,
            water: this.totalWater,
            timestamp: Date.now()
        };
        
        this.history[this.today] = todayData;
        localStorage.setItem('drinkWaterHistory', JSON.stringify(this.history));
    }
    
    loadTodayData() {
        const todayData = this.history[this.today];
        if (todayData) {
            this.totalGlasses = todayData.glasses || 0;
            this.totalWater = todayData.water || 0;
        }
    }
    
    loadHistory() {
        const saved = localStorage.getItem('drinkWaterHistory');
        return saved ? JSON.parse(saved) : {};
    }
    
    // Public methods for external access
    getStats() {
        return {
            totalGlasses: this.totalGlasses,
            totalWater: this.totalWater,
            dailyGoal: this.dailyGoal,
            progress: Math.min((this.totalWater / this.dailyGoal) * 100, 100),
            currentCupLevel: this.currentCupLevel,
            glassSize: this.glassSize
        };
    }
    
    getHistory() {
        return this.history;
    }
    
    setDailyGoal(goal) {
        this.dailyGoal = goal;
        this.createGlasses();
        this.updateUI();
        this.saveTodayData();
    }
    
    setGlassSize(size) {
        this.glassSize = size;
        this.createGlasses();
        this.updateUI();
        this.saveTodayData();
    }
}

// Initialize the drink water tracker
let drinkWater;

document.addEventListener('DOMContentLoaded', () => {
    drinkWater = new DrinkWater();
    
    // Make it globally accessible for debugging
    window.drinkWater = drinkWater;
    
    console.log('Drink Water Challenge 1 initialized');
    console.log('Controls: Space (drink), R (refill), Escape (close notification)');
    console.log('Click glasses to add/remove from daily intake');
}); 
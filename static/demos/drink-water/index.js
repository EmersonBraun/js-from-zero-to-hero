document.addEventListener('DOMContentLoaded', function() {
    const totalGlasses = document.getElementById('totalGlasses');
    const totalWater = document.getElementById('totalWater');
    const goalProgress = document.getElementById('goalProgress');
    const dailyGoal = document.getElementById('dailyGoal');
    const glassSize = document.getElementById('glassSize');
    const reminderInterval = document.getElementById('reminderInterval');
    const cupAmount = document.getElementById('cupAmount');
    const cup = document.getElementById('cup');
    const water = document.getElementById('water');
    const waterLevel = document.getElementById('waterLevel');
    const drinkBtn = document.getElementById('drinkBtn');
    const refillBtn = document.getElementById('refillBtn');
    const glasses = document.getElementById('glasses');
    const resetBtn = document.getElementById('resetBtn');
    const historyBtn = document.getElementById('historyBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const notificationClose = document.getElementById('notificationClose');

    let waterData = {
        totalGlasses: 0,
        totalWater: 0,
        dailyGoal: 2000,
        glassSize: 250,
        cupLevel: 100,
        glasses: [],
        history: [],
        reminderInterval: 60
    };

    let reminderTimer = null;

    // Initialize
    loadData();
    updateDisplay();
    createGlasses();
    setupReminders();

    // Load data from localStorage
    function loadData() {
        const saved = localStorage.getItem('waterData');
        if (saved) {
            const savedData = JSON.parse(saved);
            // Check if it's a new day
            const today = new Date().toDateString();
            const lastDate = savedData.lastDate;
            
            if (lastDate === today) {
                waterData = { ...waterData, ...savedData };
            } else {
                // New day, save to history and reset
                if (savedData.totalWater > 0) {
                    saveToHistory(savedData);
                }
                waterData.lastDate = today;
            }
        } else {
            waterData.lastDate = new Date().toDateString();
        }
    }

    // Save data to localStorage
    function saveData() {
        localStorage.setItem('waterData', JSON.stringify(waterData));
    }

    // Save to history
    function saveToHistory(data) {
        const historyEntry = {
            date: data.lastDate,
            totalGlasses: data.totalGlasses,
            totalWater: data.totalWater,
            dailyGoal: data.dailyGoal,
            goalAchieved: data.totalWater >= data.dailyGoal
        };
        
        waterData.history.push(historyEntry);
        
        // Keep only last 30 days
        if (waterData.history.length > 30) {
            waterData.history.shift();
        }
        
        localStorage.setItem('waterHistory', JSON.stringify(waterData.history));
    }

    // Update display
    function updateDisplay() {
        totalGlasses.textContent = waterData.totalGlasses;
        totalWater.textContent = waterData.totalWater;
        
        const progress = Math.min((waterData.totalWater / waterData.dailyGoal) * 100, 100);
        goalProgress.textContent = Math.round(progress) + '%';
        
        // Update cup level
        const cupLevelPercent = (waterData.cupLevel / 100) * 100;
        water.style.height = cupLevelPercent + '%';
        waterLevel.textContent = Math.round(cupLevelPercent) + '%';
        
        // Update cup amount
        const currentAmount = Math.round((waterData.cupLevel / 100) * waterData.glassSize);
        cupAmount.textContent = currentAmount + 'ml';
        
        // Check if goal is reached
        if (waterData.totalWater >= waterData.dailyGoal) {
            goalProgress.parentElement.classList.add('goal-reached');
            showNotification('🎉 Daily goal achieved! Great job staying hydrated!');
        } else {
            goalProgress.parentElement.classList.remove('goal-reached');
        }
        
        updateGlasses();
    }

    // Create glasses display
    function createGlasses() {
        glasses.innerHTML = '';
        const maxGlasses = Math.ceil(waterData.dailyGoal / waterData.glassSize);
        
        for (let i = 0; i < maxGlasses; i++) {
            const glass = document.createElement('div');
            glass.className = 'glass empty';
            glass.textContent = i + 1;
            glass.addEventListener('click', () => drinkGlass(i));
            glasses.appendChild(glass);
        }
    }

    // Update glasses display
    function updateGlasses() {
        const glassElements = glasses.querySelectorAll('.glass');
        glassElements.forEach((glass, index) => {
            if (index < waterData.totalGlasses) {
                glass.classList.remove('empty');
                glass.classList.add('filled');
            } else {
                glass.classList.remove('filled');
                glass.classList.add('empty');
            }
        });
    }

    // Drink water
    function drinkWater() {
        if (waterData.cupLevel > 0) {
            const amount = Math.min(waterData.cupLevel, 25); // Drink 25% at a time
            waterData.cupLevel -= amount;
            
            // Add visual feedback
            cup.classList.add('drinking');
            setTimeout(() => {
                cup.classList.remove('drinking');
            }, 500);
            
            updateDisplay();
            saveData();
            
            showNotification(`💧 Drank ${Math.round(amount / 100 * waterData.glassSize)}ml of water!`);
        } else {
            showNotification('🥤 Cup is empty! Refill it first.');
        }
    }

    // Drink specific glass
    function drinkGlass(glassIndex) {
        if (glassIndex < waterData.totalGlasses) {
            // Remove this glass
            waterData.totalGlasses--;
            waterData.totalWater -= waterData.glassSize;
            updateDisplay();
            saveData();
            showNotification('🗑️ Removed glass from today\'s count');
        } else {
            // Add this glass
            waterData.totalGlasses++;
            waterData.totalWater += waterData.glassSize;
            updateDisplay();
            saveData();
            showNotification(`💧 Added ${waterData.glassSize}ml glass!`);
        }
    }

    // Refill cup
    function refillCup() {
        waterData.cupLevel = 100;
        updateDisplay();
        saveData();
        showNotification('🚰 Cup refilled! Ready to drink.');
    }

    // Reset day
    function resetDay() {
        if (confirm('Are you sure you want to reset today\'s progress?')) {
            waterData.totalGlasses = 0;
            waterData.totalWater = 0;
            waterData.cupLevel = 100;
            updateDisplay();
            saveData();
            showNotification('🔄 Day reset! Fresh start for hydration.');
        }
    }

    // Show history
    function showHistory() {
        if (waterData.history.length === 0) {
            alert('No history available yet. Keep drinking water to build your history!');
            return;
        }
        
        let historyText = 'Water Drinking History:\n\n';
        waterData.history.slice(-7).reverse().forEach(entry => {
            const status = entry.goalAchieved ? '✅' : '❌';
            historyText += `${entry.date}: ${entry.totalWater}ml / ${entry.dailyGoal}ml ${status}\n`;
        });
        
        alert(historyText);
    }

    // Show settings
    function showSettings() {
        const settingsText = `
Current Settings:
• Daily Goal: ${waterData.dailyGoal}ml
• Glass Size: ${waterData.glassSize}ml
• Reminder Interval: ${waterData.reminderInterval} minutes

You can change these settings using the controls above.
        `;
        alert(settingsText);
    }

    // Setup reminders
    function setupReminders() {
        if (reminderTimer) {
            clearInterval(reminderTimer);
        }
        
        if (waterData.reminderInterval > 0) {
            reminderTimer = setInterval(() => {
                showNotification('💧 Time to drink water! Stay hydrated!');
            }, waterData.reminderInterval * 60 * 1000);
        }
    }

    // Show notification
    function showNotification(message) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    // Event listeners
    drinkBtn.addEventListener('click', drinkWater);
    refillBtn.addEventListener('click', refillCup);
    resetBtn.addEventListener('click', resetDay);
    historyBtn.addEventListener('click', showHistory);
    settingsBtn.addEventListener('click', showSettings);
    notificationClose.addEventListener('click', () => {
        notification.classList.remove('show');
    });

    // Settings change listeners
    dailyGoal.addEventListener('change', function() {
        waterData.dailyGoal = parseInt(this.value);
        createGlasses();
        updateDisplay();
        saveData();
        showNotification('🎯 Daily goal updated!');
    });

    glassSize.addEventListener('change', function() {
        waterData.glassSize = parseInt(this.value);
        createGlasses();
        updateDisplay();
        saveData();
        showNotification('🥤 Glass size updated!');
    });

    reminderInterval.addEventListener('change', function() {
        waterData.reminderInterval = parseInt(this.value);
        setupReminders();
        saveData();
        showNotification('⏰ Reminder settings updated!');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                drinkWater();
                break;
            case 'r':
            case 'R':
                if (e.ctrlKey) {
                    e.preventDefault();
                    refillCup();
                }
                break;
            case 'Escape':
                resetDay();
                break;
        }
    });

    // Auto-save on page unload
    window.addEventListener('beforeunload', saveData);

    // Periodic auto-save
    setInterval(saveData, 30000); // Save every 30 seconds
}); 
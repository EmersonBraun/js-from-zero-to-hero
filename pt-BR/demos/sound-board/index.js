document.addEventListener('DOMContentLoaded', function() {
    const volumeControl = document.getElementById('volumeControl');
    const volumeValue = document.getElementById('volumeValue');
    const categorySelect = document.getElementById('categorySelect');
    const soundGrid = document.getElementById('soundGrid');
    const stopAllBtn = document.getElementById('stopAllBtn');
    const randomBtn = document.getElementById('randomBtn');
    const loopBtn = document.getElementById('loopBtn');

    let masterVolume = 0.5;
    let currentCategory = 'all';
    let isLoopEnabled = false;
    let currentlyPlaying = null;
    let loopingSounds = new Set();

    // Sound database with categories and icons
    const sounds = [
        { name: 'Rain', category: 'nature', icon: '🌧️', url: 'https://www.soundjay.com/misc/sounds/rain-01.mp3' },
        { name: 'Thunder', category: 'nature', icon: '⛈️', url: 'https://www.soundjay.com/misc/sounds/thunder-01.mp3' },
        { name: 'Ocean Waves', category: 'nature', icon: '🌊', url: 'https://www.soundjay.com/misc/sounds/ocean-wave-1.mp3' },
        { name: 'Forest Birds', category: 'nature', icon: '🐦', url: 'https://www.soundjay.com/misc/sounds/birds-1.mp3' },
        { name: 'Piano', category: 'instruments', icon: '🎹', url: 'https://www.soundjay.com/misc/sounds/piano-1.mp3' },
        { name: 'Guitar', category: 'instruments', icon: '🎸', url: 'https://www.soundjay.com/misc/sounds/guitar-1.mp3' },
        { name: 'Drum Beat', category: 'instruments', icon: '🥁', url: 'https://www.soundjay.com/misc/sounds/drum-1.mp3' },
        { name: 'Violin', category: 'instruments', icon: '🎻', url: 'https://www.soundjay.com/misc/sounds/violin-1.mp3' },
        { name: 'Door Bell', category: 'effects', icon: '🔔', url: 'https://www.soundjay.com/misc/sounds/doorbell-1.mp3' },
        { name: 'Phone Ring', category: 'effects', icon: '📞', url: 'https://www.soundjay.com/misc/sounds/phone-ring-1.mp3' },
        { name: 'Footsteps', category: 'effects', icon: '👣', url: 'https://www.soundjay.com/misc/sounds/footsteps-1.mp3' },
        { name: 'Clock Tick', category: 'effects', icon: '⏰', url: 'https://www.soundjay.com/misc/sounds/clock-tick-1.mp3' },
        { name: 'Dog Bark', category: 'animals', icon: '🐕', url: 'https://www.soundjay.com/misc/sounds/dog-bark-1.mp3' },
        { name: 'Cat Meow', category: 'animals', icon: '🐱', url: 'https://www.soundjay.com/misc/sounds/cat-meow-1.mp3' },
        { name: 'Horse Neigh', category: 'animals', icon: '🐎', url: 'https://www.soundjay.com/misc/sounds/horse-1.mp3' },
        { name: 'Cow Moo', category: 'animals', icon: '🐄', url: 'https://www.soundjay.com/misc/sounds/cow-1.mp3' }
    ];

    // Audio context for better audio handling
    let audioContext;
    let audioBuffers = new Map();

    // Initialize audio context
    async function initAudio() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            await loadAudioBuffers();
        } catch (error) {
            console.log('Audio context not supported, using fallback');
            createSoundButtons();
        }
    }

    // Load audio buffers
    async function loadAudioBuffers() {
        for (const sound of sounds) {
            try {
                const response = await fetch(sound.url);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                audioBuffers.set(sound.name, audioBuffer);
            } catch (error) {
                console.log(`Failed to load audio for ${sound.name}:`, error);
            }
        }
        createSoundButtons();
    }

    // Create sound buttons
    function createSoundButtons() {
        soundGrid.innerHTML = '';
        
        const filteredSounds = currentCategory === 'all' 
            ? sounds 
            : sounds.filter(sound => sound.category === currentCategory);

        filteredSounds.forEach(sound => {
            const button = document.createElement('button');
            button.className = 'sound-btn';
            button.setAttribute('data-category', sound.category);
            button.setAttribute('data-sound', sound.name);
            
            button.innerHTML = `
                <div class="icon">${sound.icon}</div>
                <div class="name">${sound.name}</div>
                <div class="category">${sound.category}</div>
            `;
            
            button.addEventListener('click', () => playSound(sound));
            soundGrid.appendChild(button);
        });
    }

    // Play sound
    function playSound(sound) {
        if (audioContext && audioBuffers.has(sound.name)) {
            playWithAudioContext(sound);
        } else {
            playWithAudioElement(sound);
        }
    }

    // Play using Audio Context (better quality)
    function playWithAudioContext(sound) {
        const audioBuffer = audioBuffers.get(sound.name);
        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();
        
        source.buffer = audioBuffer;
        source.loop = loopingSounds.has(sound.name);
        
        gainNode.gain.value = masterVolume;
        
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        source.start(0);
        
        // Update UI
        updateButtonState(sound.name, true);
        
        if (!source.loop) {
            source.onended = () => {
                updateButtonState(sound.name, false);
            };
        }
        
        currentlyPlaying = source;
    }

    // Play using Audio Element (fallback)
    function playWithAudioElement(sound) {
        const audio = new Audio(sound.url);
        audio.volume = masterVolume;
        audio.loop = loopingSounds.has(sound.name);
        
        audio.play().then(() => {
            updateButtonState(sound.name, true);
            
            if (!audio.loop) {
                audio.onended = () => {
                    updateButtonState(sound.name, false);
                };
            }
        }).catch(error => {
            console.log('Audio playback failed:', error);
            // Create a simple beep sound as fallback
            createBeepSound(sound);
        });
        
        currentlyPlaying = audio;
    }

    // Create simple beep sound as fallback
    function createBeepSound(sound) {
        if (audioContext) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(masterVolume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
            updateButtonState(sound.name, true);
            setTimeout(() => updateButtonState(sound.name, false), 500);
        }
    }

    // Update button visual state
    function updateButtonState(soundName, isPlaying) {
        const button = document.querySelector(`[data-sound="${soundName}"]`);
        if (button) {
            button.classList.toggle('playing', isPlaying);
            button.classList.toggle('looping', loopingSounds.has(soundName));
        }
    }

    // Stop all sounds
    function stopAllSounds() {
        if (currentlyPlaying) {
            if (currentlyPlaying.stop) {
                currentlyPlaying.stop();
            } else if (currentlyPlaying.pause) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
            }
            currentlyPlaying = null;
        }
        
        // Reset all button states
        document.querySelectorAll('.sound-btn').forEach(button => {
            button.classList.remove('playing', 'looping');
        });
        
        loopingSounds.clear();
    }

    // Play random sound
    function playRandomSound() {
        const filteredSounds = currentCategory === 'all' 
            ? sounds 
            : sounds.filter(sound => sound.category === currentCategory);
        
        if (filteredSounds.length > 0) {
            const randomSound = filteredSounds[Math.floor(Math.random() * filteredSounds.length)];
            playSound(randomSound);
        }
    }

    // Toggle loop mode
    function toggleLoop() {
        isLoopEnabled = !isLoopEnabled;
        loopBtn.classList.toggle('active', isLoopEnabled);
        
        if (isLoopEnabled) {
            // Enable loop for currently playing sound
            if (currentlyPlaying) {
                const soundName = getCurrentSoundName();
                if (soundName) {
                    loopingSounds.add(soundName);
                    updateButtonState(soundName, true);
                }
            }
        } else {
            // Disable all loops
            loopingSounds.clear();
            document.querySelectorAll('.sound-btn').forEach(button => {
                button.classList.remove('looping');
            });
        }
    }

    // Get current sound name
    function getCurrentSoundName() {
        const playingButton = document.querySelector('.sound-btn.playing');
        return playingButton ? playingButton.getAttribute('data-sound') : null;
    }

    // Update master volume
    function updateVolume() {
        masterVolume = volumeControl.value / 100;
        volumeValue.textContent = volumeControl.value + '%';
        
        if (currentlyPlaying && currentlyPlaying.volume !== undefined) {
            currentlyPlaying.volume = masterVolume;
        }
    }

    // Filter by category
    function filterByCategory() {
        currentCategory = categorySelect.value;
        createSoundButtons();
    }

    // Event listeners
    volumeControl.addEventListener('input', updateVolume);
    categorySelect.addEventListener('change', filterByCategory);
    stopAllBtn.addEventListener('click', stopAllSounds);
    randomBtn.addEventListener('click', playRandomSound);
    loopBtn.addEventListener('click', toggleLoop);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                if (currentlyPlaying) {
                    stopAllSounds();
                } else {
                    playRandomSound();
                }
                break;
            case 'Escape':
                stopAllSounds();
                break;
            case 'l':
            case 'L':
                toggleLoop();
                break;
        }
    });

    // Initialize
    initAudio();
}); 
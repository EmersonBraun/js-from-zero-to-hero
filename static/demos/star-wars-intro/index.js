document.addEventListener('DOMContentLoaded', function() {
    const introText = document.getElementById('introText');
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.getElementById('speedValue');
    const colorSelect = document.getElementById('colorSelect');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const crawlText = document.getElementById('crawlText');

    let isPlaying = false;
    let animationDuration = 60; // Default duration in seconds

    // Initialize
    updateCrawlText();
    updateSpeed();

    // Update crawl text
    function updateCrawlText() {
        const text = introText.value;
        const color = colorSelect.value;
        
        crawlText.textContent = text;
        crawlText.style.color = color;
    }

    // Update speed
    function updateSpeed() {
        const speed = parseInt(speedControl.value);
        speedValue.textContent = speed;
        
        // Calculate animation duration based on speed (1-10)
        // Speed 1 = slowest (120s), Speed 10 = fastest (30s)
        animationDuration = 120 - (speed - 1) * 10;
        
        if (isPlaying) {
            restartAnimation();
        }
    }

    // Play animation
    function playAnimation() {
        if (!isPlaying) {
            isPlaying = true;
            crawlText.classList.add('playing');
            crawlText.style.animationDuration = animationDuration + 's';
            playBtn.disabled = true;
            pauseBtn.disabled = false;
        }
    }

    // Pause animation
    function pauseAnimation() {
        if (isPlaying) {
            isPlaying = false;
            crawlText.classList.add('paused');
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }

    // Reset animation
    function resetAnimation() {
        isPlaying = false;
        crawlText.classList.remove('playing', 'paused');
        crawlText.style.animation = 'none';
        playBtn.disabled = false;
        pauseBtn.disabled = true;
        
        // Force reflow to reset animation
        crawlText.offsetHeight;
    }

    // Restart animation with new settings
    function restartAnimation() {
        if (isPlaying) {
            resetAnimation();
            setTimeout(() => {
                playAnimation();
            }, 100);
        }
    }

    // Event listeners
    playBtn.addEventListener('click', playAnimation);
    pauseBtn.addEventListener('click', pauseAnimation);
    resetBtn.addEventListener('click', resetAnimation);

    // Update text when textarea changes
    introText.addEventListener('input', updateCrawlText);

    // Update speed when slider changes
    speedControl.addEventListener('input', updateSpeed);

    // Update color when select changes
    colorSelect.addEventListener('change', updateCrawlText);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                if (isPlaying) {
                    pauseAnimation();
                } else {
                    playAnimation();
                }
                break;
            case 'r':
            case 'R':
                resetAnimation();
                break;
        }
    });

    // Auto-play when text changes significantly
    let textChangeTimeout;
    introText.addEventListener('input', function() {
        clearTimeout(textChangeTimeout);
        textChangeTimeout = setTimeout(() => {
            if (isPlaying) {
                restartAnimation();
            }
        }, 1000);
    });
}); 
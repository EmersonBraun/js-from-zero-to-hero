document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    const currentSlideElement = document.getElementById('currentSlide');
    const totalSlidesElement = document.getElementById('totalSlides');
    const slideTitleElement = document.getElementById('slideTitle');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const transitionSpeed = document.getElementById('transitionSpeed');
    const speedValue = document.getElementById('speedValue');
    const autoPlay = document.getElementById('autoPlay');
    const transitionType = document.getElementById('transitionType');

    let currentSlide = 0;
    let isPlaying = true;
    let autoPlayInterval;
    let transitionDuration = 5;
    let transitionEffect = 'fade';
    let slideOrder = [];

    // Initialize
    initializeSlider();
    createDots();
    updateSlideInfo();
    startAutoPlay();

    // Initialize slider
    function initializeSlider() {
        totalSlidesElement.textContent = slides.length;
        
        // Create slide order array
        slideOrder = Array.from({ length: slides.length }, (_, i) => i);
        
        // Set initial transition duration
        updateTransitionSpeed();
        
        // Preload images
        preloadImages();
    }

    // Create navigation dots
    function createDots() {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === currentSlide) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Update dots
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Update slide information
    function updateSlideInfo() {
        currentSlideElement.textContent = currentSlide + 1;
        const currentSlideContent = slides[currentSlide].querySelector('.slide-content h2');
        slideTitleElement.textContent = currentSlideContent ? currentSlideContent.textContent : '';
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex === currentSlide) return;
        
        const direction = slideIndex > currentSlide ? 1 : -1;
        changeSlide(direction, slideIndex);
    }

    // Change slide
    function changeSlide(direction = 1, targetSlide = null) {
        const previousSlide = currentSlide;
        
        if (targetSlide !== null) {
            currentSlide = targetSlide;
        } else {
            currentSlide = (currentSlide + direction + slides.length) % slides.length;
        }
        
        // Apply transition effect
        applyTransitionEffect(previousSlide, currentSlide, direction);
        
        // Update UI
        updateSlides();
        updateDots();
        updateSlideInfo();
        
        // Restart auto play if it was running
        if (isPlaying) {
            restartAutoPlay();
        }
    }

    // Apply transition effect
    function applyTransitionEffect(previousSlide, newSlide, direction) {
        const prevSlide = slides[previousSlide];
        const newSlideElement = slides[newSlide];
        
        // Remove all transition classes
        slides.forEach(slide => {
            slide.classList.remove('slide-transition', 'slide-left', 'slide-right', 'zoom-transition', 'zoom-out', 'zoom-in');
        });
        
        switch (transitionEffect) {
            case 'slide':
                prevSlide.classList.add('slide-transition', direction > 0 ? 'slide-left' : 'slide-right');
                newSlideElement.classList.add('slide-transition', direction > 0 ? 'slide-right' : 'slide-left');
                break;
            case 'zoom':
                prevSlide.classList.add('zoom-transition', 'zoom-out');
                newSlideElement.classList.add('zoom-transition', 'zoom-in');
                break;
            case 'fade':
            default:
                // Default fade transition is handled by CSS
                break;
        }
    }

    // Update slides display
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }

    // Next slide
    function nextSlide() {
        changeSlide(1);
    }

    // Previous slide
    function prevSlide() {
        changeSlide(-1);
    }

    // Start auto play
    function startAutoPlay() {
        if (autoPlay.value === 'true' && isPlaying) {
            autoPlayInterval = setInterval(nextSlide, transitionDuration * 1000);
        }
    }

    // Stop auto play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Restart auto play
    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Toggle play/pause
    function togglePlayPause() {
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
        
        if (isPlaying) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }
    }

    // Toggle fullscreen
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
            fullscreenBtn.textContent = 'Exit Fullscreen';
        } else {
            document.exitFullscreen();
            fullscreenBtn.textContent = 'Fullscreen';
        }
    }

    // Shuffle slides
    function shuffleSlides() {
        // Fisher-Yates shuffle algorithm
        for (let i = slideOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [slideOrder[i], slideOrder[j]] = [slideOrder[j], slideOrder[i]];
        }
        
        // Go to first slide in new order
        currentSlide = slideOrder[0];
        updateSlides();
        updateDots();
        updateSlideInfo();
        
        showNotification('🎲 Slides shuffled!');
    }

    // Update transition speed
    function updateTransitionSpeed() {
        transitionDuration = parseInt(transitionSpeed.value);
        speedValue.textContent = transitionDuration + 's';
        
        if (isPlaying) {
            restartAutoPlay();
        }
    }

    // Preload images
    function preloadImages() {
        slides.forEach(slide => {
            const backgroundImage = slide.style.backgroundImage;
            if (backgroundImage) {
                const url = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
                const img = new Image();
                img.src = url;
            }
        });
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    playPauseBtn.addEventListener('click', togglePlayPause);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    shuffleBtn.addEventListener('click', shuffleSlides);
    
    transitionSpeed.addEventListener('input', updateTransitionSpeed);
    autoPlay.addEventListener('change', function() {
        if (this.value === 'true' && isPlaying) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }
    });
    
    transitionType.addEventListener('change', function() {
        transitionEffect = this.value;
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case ' ':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'f':
            case 'F':
                if (e.ctrlKey) {
                    e.preventDefault();
                    toggleFullscreen();
                }
                break;
            case 's':
            case 'S':
                if (e.ctrlKey) {
                    e.preventDefault();
                    shuffleSlides();
                }
                break;
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }

    // Fullscreen change event
    document.addEventListener('fullscreenchange', function() {
        if (document.fullscreenElement) {
            document.body.classList.add('fullscreen');
        } else {
            document.body.classList.remove('fullscreen');
            fullscreenBtn.textContent = 'Fullscreen';
        }
    });

    // Auto-save settings
    function saveSettings() {
        const settings = {
            transitionDuration,
            autoPlay: autoPlay.value,
            transitionEffect,
            isPlaying
        };
        localStorage.setItem('sliderSettings', JSON.stringify(settings));
    }

    function loadSettings() {
        const saved = localStorage.getItem('sliderSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            transitionSpeed.value = settings.transitionDuration || 5;
            autoPlay.value = settings.autoPlay || 'true';
            transitionType.value = settings.transitionEffect || 'fade';
            isPlaying = settings.isPlaying !== false;
            
            updateTransitionSpeed();
            playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
        }
    }

    // Load settings on page load
    loadSettings();

    // Save settings on change
    transitionSpeed.addEventListener('change', saveSettings);
    autoPlay.addEventListener('change', saveSettings);
    transitionType.addEventListener('change', saveSettings);
    playPauseBtn.addEventListener('click', saveSettings);
}); 
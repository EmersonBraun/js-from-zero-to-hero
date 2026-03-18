class BackgroundSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.isPlaying = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.updateSlideInfo();
        this.setupEventListeners();
        this.startAutoPlay();
    }
    
    createDots() {
        const dotsContainer = document.getElementById('dotsContainer');
        
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                this.goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.prevSlide();
        });
        
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Control buttons
        document.getElementById('playPauseBtn').addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            this.toggleFullscreen();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    this.nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'f':
                case 'F':
                    this.toggleFullscreen();
                    break;
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides) return;
        
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[this.currentSlide].classList.add('active');
        
        // Update slide info
        this.updateSlideInfo();
        
        // Reset autoplay timer
        this.resetAutoPlay();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }
    
    updateSlideInfo() {
        const currentSlideElement = document.getElementById('currentSlide');
        const totalSlidesElement = document.getElementById('totalSlides');
        const slideTitleElement = document.getElementById('slideTitle');
        
        currentSlideElement.textContent = this.currentSlide + 1;
        totalSlidesElement.textContent = this.totalSlides;
        
        const currentSlideContent = this.slides[this.currentSlide].querySelector('.slide-content h2');
        slideTitleElement.textContent = currentSlideContent ? currentSlideContent.textContent : '';
    }
    
    togglePlayPause() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (this.isPlaying) {
            this.pauseAutoPlay();
            playPauseBtn.textContent = 'Play';
        } else {
            this.startAutoPlay();
            playPauseBtn.textContent = 'Pause';
        }
    }
    
    startAutoPlay() {
        this.isPlaying = true;
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        this.isPlaying = false;
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        if (this.isPlaying) {
            this.pauseAutoPlay();
            this.startAutoPlay();
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Utility methods
    getCurrentSlideData() {
        const currentSlide = this.slides[this.currentSlide];
        const title = currentSlide.querySelector('.slide-content h2')?.textContent || '';
        const description = currentSlide.querySelector('.slide-content p')?.textContent || '';
        const backgroundImage = currentSlide.style.backgroundImage;
        
        return {
            index: this.currentSlide,
            title,
            description,
            backgroundImage
        };
    }
    
    // Public method to get slider statistics
    getStats() {
        return {
            totalSlides: this.totalSlides,
            currentSlide: this.currentSlide + 1,
            isPlaying: this.isPlaying,
            autoPlayDelay: this.autoPlayDelay
        };
    }
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const slider = new BackgroundSlider();
    
    // Make slider globally accessible for debugging
    window.backgroundSlider = slider;
    
    // Add some console info
    console.log('Background Slider Challenge 1 initialized');
    console.log('Controls: Arrow keys, Space (play/pause), F (fullscreen)');
    console.log('Touch/swipe support enabled');
}); 
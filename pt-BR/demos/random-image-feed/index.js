class RandomImageFeed {
    constructor() {
        this.accessKey = 'demo'; // In production, use your Unsplash API key
        this.baseUrl = 'https://api.unsplash.com';
        this.images = [];
        this.currentPage = 1;
        this.isListView = false;
        this.currentSearch = '';
        this.currentCategory = '';
        this.currentOrientation = '';
        
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.randomBtn = document.getElementById('randomBtn');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.orientationFilter = document.getElementById('orientationFilter');
        this.imageDisplay = document.getElementById('imageDisplay');
        this.imageGrid = document.getElementById('imageGrid');
        this.imagesContainer = document.getElementById('imagesContainer');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
        this.listViewBtn = document.getElementById('listViewBtn');
        this.gridViewBtn = document.getElementById('gridViewBtn');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.retryBtn = document.getElementById('retryBtn');
        this.imageModal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.imageInfo = document.getElementById('imageInfo');
        this.closeModal = document.getElementById('closeModal');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.shareBtn = document.getElementById('shareBtn');
    }

    addEventListeners() {
        this.searchBtn.addEventListener('click', () => this.searchImages());
        this.randomBtn.addEventListener('click', () => this.getRandomImage());
        this.categoryFilter.addEventListener('change', () => this.applyFilters());
        this.orientationFilter.addEventListener('change', () => this.applyFilters());
        this.listViewBtn.addEventListener('click', () => this.toggleView('list'));
        this.gridViewBtn.addEventListener('click', () => this.toggleView('grid'));
        this.loadMoreBtn.addEventListener('click', () => this.loadMoreImages());
        this.retryBtn.addEventListener('click', () => this.retry());
        this.closeModal.addEventListener('click', () => this.closeImageModal());
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.shareBtn.addEventListener('click', () => this.shareImage());
        
        // Enter key support
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchImages();
        });
        
        // Close modal on outside click
        this.imageModal.addEventListener('click', (e) => {
            if (e.target === this.imageModal) this.closeImageModal();
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeImageModal();
        });
    }

    async searchImages() {
        const query = this.searchInput.value.trim();
        if (!query) {
            this.showError('Please enter a search term');
            return;
        }

        this.currentSearch = query;
        this.currentPage = 1;
        await this.fetchImages();
    }

    async getRandomImage() {
        try {
            this.showLoading();
            this.hideError();
            
            // For demo purposes, we'll use a curated collection
            const response = await fetch(`${this.baseUrl}/photos/random?client_id=${this.accessKey}&count=1`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch random image');
            }
            
            const images = await response.json();
            if (images.length > 0) {
                this.displaySingleImage(images[0]);
            } else {
                this.showError('No random image found');
            }
            
            this.hideLoading();
        } catch (error) {
            this.showError('Error getting random image. Please try again.');
            this.hideLoading();
        }
    }

    async applyFilters() {
        this.currentCategory = this.categoryFilter.value;
        this.currentOrientation = this.orientationFilter.value;
        this.currentPage = 1;
        await this.fetchImages();
    }

    async fetchImages() {
        try {
            this.showLoading();
            this.hideError();
            
            let url = `${this.baseUrl}/photos?client_id=${this.accessKey}&page=${this.currentPage}&per_page=12`;
            
            if (this.currentSearch) {
                url = `${this.baseUrl}/search/photos?client_id=${this.accessKey}&query=${encodeURIComponent(this.currentSearch)}&page=${this.currentPage}&per_page=12`;
            }
            
            if (this.currentOrientation) {
                url += `&orientation=${this.currentOrientation}`;
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            
            const data = await response.json();
            const images = this.currentSearch ? data.results : data;
            
            if (this.currentPage === 1) {
                this.images = images;
            } else {
                this.images = [...this.images, ...images];
            }
            
            this.renderImages();
            this.hideLoading();
        } catch (error) {
            this.showError('Error loading images. Please try again.');
            this.hideLoading();
        }
    }

    async loadMoreImages() {
        this.currentPage++;
        await this.fetchImages();
    }

    displaySingleImage(image) {
        this.imageDisplay.innerHTML = this.createImageCard(image, true);
        this.imageGrid.style.display = 'none';
        this.imageDisplay.style.display = 'block';
    }

    renderImages() {
        if (this.images.length === 0) {
            this.imagesContainer.innerHTML = '<p style="text-align: center; color: #fff; opacity: 0.7;">No images found</p>';
            this.imageGrid.style.display = 'block';
            this.imageDisplay.style.display = 'none';
            return;
        }

        const imagesHtml = this.images.map(image => this.createImageCard(image)).join('');
        this.imagesContainer.innerHTML = imagesHtml;
        this.imageGrid.style.display = 'block';
        this.imageDisplay.style.display = 'none';
        
        // Add click listeners to image cards
        this.addImageClickListeners();
    }

    createImageCard(image, isSingle = false) {
        const imageUrl = image.urls?.regular || image.urls?.small || 'https://via.placeholder.com/400x300?text=No+Image';
        const title = image.description || image.alt_description || 'Untitled';
        const author = image.user?.name || 'Unknown';
        const likes = image.likes || 0;
        const downloads = image.downloads || 0;
        
        const cardClass = isSingle ? 'image-card single-image' : 'image-card';
        const listClass = this.isListView ? 'list-view' : '';
        
        return `
            <div class="${cardClass} ${listClass}" data-image='${JSON.stringify(image).replace(/'/g, "&apos;")}'>
                <div class="image-wrapper">
                    <img src="${imageUrl}" alt="${title}" loading="lazy">
                </div>
                <div class="image-info">
                    <div class="image-title">${title}</div>
                    <div class="image-author">By ${author}</div>
                    <div class="image-stats">
                        <span>❤️ ${likes}</span>
                        <span>⬇️ ${downloads}</span>
                    </div>
                </div>
            </div>
        `;
    }

    addImageClickListeners() {
        const imageCards = document.querySelectorAll('.image-card');
        imageCards.forEach(card => {
            card.addEventListener('click', () => {
                const imageData = JSON.parse(card.dataset.image);
                this.openImageModal(imageData);
            });
        });
    }

    openImageModal(image) {
        const imageUrl = image.urls?.full || image.urls?.regular || 'https://via.placeholder.com/800x600?text=No+Image';
        const title = image.description || image.alt_description || 'Untitled';
        const author = image.user?.name || 'Unknown';
        const likes = image.likes || 0;
        const downloads = image.downloads || 0;
        const location = image.location?.title || 'Unknown location';
        
        this.modalImage.src = imageUrl;
        this.modalImage.alt = title;
        
        this.imageInfo.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Photographer:</strong> ${author}</p>
            <p><strong>Location:</strong> ${location}</p>
            <div class="image-stats">
                <span>❤️ ${likes} likes</span>
                <span>⬇️ ${downloads} downloads</span>
            </div>
        `;
        
        this.imageModal.style.display = 'flex';
        this.currentModalImage = image;
    }

    closeImageModal() {
        this.imageModal.style.display = 'none';
        this.currentModalImage = null;
    }

    async downloadImage() {
        if (!this.currentModalImage) return;
        
        try {
            const imageUrl = this.currentModalImage.links?.download || this.currentModalImage.urls?.full;
            if (!imageUrl) {
                alert('Download link not available');
                return;
            }
            
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `image-${this.currentModalImage.id}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Failed to download image');
        }
    }

    shareImage() {
        if (!this.currentModalImage) return;
        
        const imageUrl = this.currentModalImage.urls?.regular;
        const title = this.currentModalImage.description || 'Check out this amazing image!';
        
        if (navigator.share) {
            navigator.share({
                title: title,
                url: imageUrl
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(imageUrl).then(() => {
                alert('Image URL copied to clipboard!');
            });
        }
    }

    toggleView(view) {
        this.isListView = view === 'list';
        
        this.listViewBtn.classList.toggle('active', this.isListView);
        this.gridViewBtn.classList.toggle('active', !this.isListView);
        
        this.imagesContainer.classList.toggle('list-view', this.isListView);
        
        if (this.images.length > 0) {
            this.renderImages();
        }
    }

    retry() {
        if (this.currentSearch) {
            this.searchImages();
        } else {
            this.getRandomImage();
        }
    }

    showLoading() {
        this.loading.style.display = 'block';
        this.imageDisplay.style.display = 'none';
        this.imageGrid.style.display = 'none';
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    showError(message) {
        this.errorMessage.style.display = 'block';
        document.getElementById('errorText').textContent = message;
        this.imageDisplay.style.display = 'none';
        this.imageGrid.style.display = 'none';
    }

    hideError() {
        this.errorMessage.style.display = 'none';
    }
}

// Initialize Random Image Feed
let randomImageFeed;

document.addEventListener('DOMContentLoaded', () => {
    randomImageFeed = new RandomImageFeed();
}); 
// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const randomBtn = document.getElementById('randomBtn');
const imageGrid = document.getElementById('imageGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const imagesLoaded = document.getElementById('imagesLoaded');
const favoritesCount = document.getElementById('favoritesCount');

// API Configuration
const UNSPLASH_API_KEY = 'YOUR_UNSPLASH_API_KEY'; // Replace with your API key
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// State
let currentPage = 1;
let currentQuery = '';
let isLoading = false;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let loadedImages = 0;

// Event Listeners
searchBtn.addEventListener('click', searchImages);
randomBtn.addEventListener('click', loadRandomImages);
loadMoreBtn.addEventListener('click', loadMoreImages);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchImages();
    }
});

// Initialize
function init() {
    updateStats();
    loadRandomImages();
}

// Search images
async function searchImages() {
    const query = searchInput.value.trim();
    
    if (!query) {
        showMessage('Please enter a search term', 'error');
        return;
    }
    
    currentQuery = query;
    currentPage = 1;
    loadedImages = 0;
    
    showLoading();
    
    try {
        const images = await fetchImages(query, currentPage);
        displayImages(images);
        updateStats();
    } catch (error) {
        showError('Failed to load images. Please try again.');
        console.error('Error:', error);
    }
}

// Load random images
async function loadRandomImages() {
    currentQuery = '';
    currentPage = 1;
    loadedImages = 0;
    
    showLoading();
    
    try {
        const images = await fetchRandomImages(currentPage);
        displayImages(images);
        updateStats();
    } catch (error) {
        showError('Failed to load random images. Please try again.');
        console.error('Error:', error);
    }
}

// Load more images
async function loadMoreImages() {
    if (isLoading) return;
    
    currentPage++;
    isLoading = true;
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'Loading...';
    
    try {
        let images;
        if (currentQuery) {
            images = await fetchImages(currentQuery, currentPage);
        } else {
            images = await fetchRandomImages(currentPage);
        }
        
        appendImages(images);
        updateStats();
    } catch (error) {
        showError('Failed to load more images. Please try again.');
        console.error('Error:', error);
    } finally {
        isLoading = false;
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Load More';
    }
}

// Fetch images from Unsplash
async function fetchImages(query, page = 1) {
    const url = `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=12&client_id=${UNSPLASH_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }
    
    const data = await response.json();
    return data.results;
}

// Fetch random images from Unsplash
async function fetchRandomImages(page = 1) {
    const url = `${UNSPLASH_BASE_URL}/photos/random?count=12&client_id=${UNSPLASH_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Failed to fetch random images');
    }
    
    const data = await response.json();
    return data;
}

// Display images
function displayImages(images) {
    if (images.length === 0) {
        imageGrid.innerHTML = '<div class="error-message">No images found. Try a different search term.</div>';
        return;
    }
    
    imageGrid.innerHTML = images.map(image => createImageCard(image)).join('');
    loadedImages += images.length;
    
    // Show/hide load more button
    loadMoreBtn.style.display = images.length === 12 ? 'block' : 'none';
}

// Append images (for load more)
function appendImages(images) {
    if (images.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    const imageCards = images.map(image => createImageCard(image)).join('');
    imageGrid.insertAdjacentHTML('beforeend', imageCards);
    loadedImages += images.length;
    
    // Show/hide load more button
    loadMoreBtn.style.display = images.length === 12 ? 'block' : 'none';
}

// Create image card
function createImageCard(image) {
    const isFavorite = favorites.some(fav => fav.id === image.id);
    
    return `
        <div class="image-card" data-id="${image.id}">
            <div class="image-container">
                <img src="${image.urls.regular}" alt="${image.alt_description || 'Image'}" class="image" loading="lazy">
                <div class="image-overlay">
                    <div class="image-actions">
                        <button class="action-btn" onclick="downloadImage('${image.links.download}', '${image.alt_description || 'image'}')">
                            Download
                        </button>
                        <button class="action-btn ${isFavorite ? 'favorited' : ''}" onclick="toggleFavorite('${image.id}')">
                            ${isFavorite ? '❤️' : '🤍'} ${isFavorite ? 'Remove' : 'Favorite'}
                        </button>
                    </div>
                </div>
            </div>
            <div class="image-info">
                <div class="image-title">${image.alt_description || 'Untitled'}</div>
                <div class="image-meta">
                    <span class="image-author">By ${image.user.name}</span>
                    <span class="image-likes">
                        <span class="like-icon">❤️</span>
                        ${image.likes}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Toggle favorite
function toggleFavorite(imageId) {
    const imageCard = document.querySelector(`[data-id="${imageId}"]`);
    const favoriteBtn = imageCard.querySelector('.action-btn:last-child');
    
    const existingIndex = favorites.findIndex(fav => fav.id === imageId);
    
    if (existingIndex !== -1) {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        favoriteBtn.innerHTML = '🤍 Favorite';
        favoriteBtn.classList.remove('favorited');
        showMessage('Removed from favorites', 'info');
    } else {
        // Add to favorites
        const imageData = {
            id: imageId,
            url: imageCard.querySelector('.image').src,
            title: imageCard.querySelector('.image-title').textContent,
            author: imageCard.querySelector('.image-author').textContent.replace('By ', ''),
            timestamp: new Date().toISOString()
        };
        
        favorites.unshift(imageData);
        favoriteBtn.innerHTML = '❤️ Remove';
        favoriteBtn.classList.add('favorited');
        showMessage('Added to favorites', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateStats();
    renderFavorites();
}

// Download image
async function downloadImage(downloadUrl, filename) {
    try {
        const response = await fetch(downloadUrl);
        const blob = await response.blob();
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename || 'image'}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showMessage('Image download started', 'success');
    } catch (error) {
        showError('Failed to download image');
        console.error('Download error:', error);
    }
}

// Show loading state
function showLoading() {
    imageGrid.innerHTML = '<div class="loading">Loading images...</div>';
}

// Show error message
function showError(message) {
    imageGrid.innerHTML = `<div class="error-message">${message}</div>`;
}

// Update statistics
function updateStats() {
    imagesLoaded.textContent = loadedImages;
    favoritesCount.textContent = favorites.length;
}

// Render favorites section
function renderFavorites() {
    const favoritesSection = document.getElementById('favorites');
    
    if (favorites.length === 0) {
        favoritesSection.style.display = 'none';
        return;
    }
    
    favoritesSection.style.display = 'block';
    
    const favoritesGrid = document.getElementById('favoritesGrid');
    favoritesGrid.innerHTML = favorites.slice(0, 8).map(fav => `
        <div class="favorite-item">
            <img src="${fav.url}" alt="${fav.title}" class="favorite-image">
            <div class="favorite-info">
                <div>${fav.title}</div>
                <div>By ${fav.author}</div>
            </div>
        </div>
    `).join('');
}

// Show message
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: #fff;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            messageDiv.style.backgroundColor = '#4caf50';
            break;
        case 'error':
            messageDiv.style.backgroundColor = '#f44336';
            break;
        case 'info':
            messageDiv.style.backgroundColor = '#2196f3';
            break;
        default:
            messageDiv.style.backgroundColor = '#2e647a';
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .action-btn.favorited {
        background: #ffebee !important;
        color: #f44336 !important;
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'f':
                e.preventDefault();
                searchInput.focus();
                break;
            case 'r':
                e.preventDefault();
                loadRandomImages();
                break;
        }
    }
});

// Initialize the app
init(); 
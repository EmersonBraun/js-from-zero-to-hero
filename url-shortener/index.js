class URLShortener {
    constructor() {
        this.urls = this.loadURLs();
        this.baseUrl = window.location.origin + window.location.pathname;
        
        this.initializeElements();
        this.addEventListeners();
        this.renderURLHistory();
    }

    initializeElements() {
        this.longUrlInput = document.getElementById('longUrl');
        this.customAliasInput = document.getElementById('customAlias');
        this.shortenBtn = document.getElementById('shortenBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.resultSection = document.getElementById('resultSection');
        this.shortenedUrlInput = document.getElementById('shortenedUrl');
        this.copyBtn = document.getElementById('copyBtn');
        this.originalUrlSpan = document.getElementById('originalUrl');
        this.clickCountSpan = document.getElementById('clickCount');
        this.createdDateSpan = document.getElementById('createdDate');
        this.urlList = document.getElementById('urlList');
    }

    addEventListeners() {
        this.shortenBtn.addEventListener('click', () => this.shortenURL());
        this.clearBtn.addEventListener('click', () => this.clearForm());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        
        // Enter key support
        this.longUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.shortenURL();
        });
        
        this.customAliasInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.shortenURL();
        });
    }

    generateShortCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    validateCustomAlias(alias) {
        if (!alias) return true;
        const aliasRegex = /^[a-zA-Z0-9-_]+$/;
        return aliasRegex.test(alias) && alias.length >= 3;
    }

    shortenURL() {
        const longUrl = this.longUrlInput.value.trim();
        const customAlias = this.customAliasInput.value.trim();

        // Validate input
        if (!longUrl) {
            this.showError('Please enter a URL');
            return;
        }

        if (!this.validateURL(longUrl)) {
            this.showError('Please enter a valid URL');
            return;
        }

        if (customAlias && !this.validateCustomAlias(customAlias)) {
            this.showError('Custom alias must be 3-20 characters and contain only letters, numbers, hyphens, and underscores');
            return;
        }

        // Check if custom alias already exists
        if (customAlias && this.urls.some(url => url.shortCode === customAlias)) {
            this.showError('This custom alias is already taken');
            return;
        }

        // Generate short code
        let shortCode = customAlias || this.generateShortCode();
        
        // Ensure unique short code
        while (!customAlias && this.urls.some(url => url.shortCode === shortCode)) {
            shortCode = this.generateShortCode();
        }

        // Create URL object
        const urlObj = {
            id: Date.now(),
            originalUrl: longUrl,
            shortCode: shortCode,
            shortUrl: `${this.baseUrl}#${shortCode}`,
            clicks: 0,
            created: new Date().toISOString()
        };

        // Add to storage
        this.urls.unshift(urlObj);
        this.saveURLs();
        this.renderURLHistory();

        // Show result
        this.showResult(urlObj);
    }

    showResult(urlObj) {
        this.shortenedUrlInput.value = urlObj.shortUrl;
        this.originalUrlSpan.textContent = urlObj.originalUrl;
        this.clickCountSpan.textContent = urlObj.clicks;
        this.createdDateSpan.textContent = new Date(urlObj.created).toLocaleDateString();
        
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    showError(message) {
        alert(message); // In a real app, you'd use a better error display
    }

    copyToClipboard() {
        this.shortenedUrlInput.select();
        this.shortenedUrlInput.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            this.copyBtn.textContent = 'Copied!';
            this.copyBtn.classList.add('copied');
            
            setTimeout(() => {
                this.copyBtn.textContent = 'Copy';
                this.copyBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            // Fallback for modern browsers
            navigator.clipboard.writeText(this.shortenedUrlInput.value).then(() => {
                this.copyBtn.textContent = 'Copied!';
                this.copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    this.copyBtn.textContent = 'Copy';
                    this.copyBtn.classList.remove('copied');
                }, 2000);
            });
        }
    }

    clearForm() {
        this.longUrlInput.value = '';
        this.customAliasInput.value = '';
        this.resultSection.style.display = 'none';
        this.longUrlInput.focus();
    }

    renderURLHistory() {
        if (this.urls.length === 0) {
            this.urlList.innerHTML = '<p style="opacity: 0.7; text-align: center;">No URLs shortened yet</p>';
            return;
        }

        this.urlList.innerHTML = this.urls.slice(0, 10).map(url => `
            <div class="url-item">
                <div class="url-item-header">
                    <a href="${url.shortUrl}" class="short-url" target="_blank" onclick="urlShortener.incrementClicks('${url.id}')">
                        ${url.shortUrl}
                    </a>
                    <div class="url-stats">
                        <span>${url.clicks} clicks</span>
                        <span>${new Date(url.created).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="original-url">${url.originalUrl}</div>
            </div>
        `).join('');
    }

    incrementClicks(urlId) {
        const url = this.urls.find(u => u.id === urlId);
        if (url) {
            url.clicks++;
            this.saveURLs();
            this.renderURLHistory();
        }
    }

    loadURLs() {
        try {
            const stored = localStorage.getItem('shortenedUrls');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    saveURLs() {
        try {
            localStorage.setItem('shortenedUrls', JSON.stringify(this.urls));
        } catch (error) {
            console.error('Failed to save URLs:', error);
        }
    }

    // Handle hash-based redirects
    handleRedirect() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const url = this.urls.find(u => u.shortCode === hash);
            if (url) {
                this.incrementClicks(url.id);
                window.location.href = url.originalUrl;
            }
        }
    }
}

// Initialize URL shortener
let urlShortener;

document.addEventListener('DOMContentLoaded', () => {
    urlShortener = new URLShortener();
    urlShortener.handleRedirect();
});

// Handle hash changes for redirects
window.addEventListener('hashchange', () => {
    if (urlShortener) {
        urlShortener.handleRedirect();
    }
}); 
class URLShortener {
    constructor() {
        this.urls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
        this.currentId = this.urls.length > 0 ? Math.max(...this.urls.map(u => u.id)) + 1 : 1;
        
        this.initializeElements();
        this.bindEvents();
        this.updateStats();
        this.renderHistory();
    }

    initializeElements() {
        this.longUrlInput = document.getElementById('longUrl');
        this.customAliasInput = document.getElementById('customAlias');
        this.expiryDateInput = document.getElementById('expiryDate');
        this.shortenBtn = document.getElementById('shortenBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.resultSection = document.getElementById('resultSection');
        this.shortUrlInput = document.getElementById('shortUrl');
        this.copyBtn = document.getElementById('copyBtn');
        this.originalUrl = document.getElementById('originalUrl');
        this.createdDate = document.getElementById('createdDate');
        this.expiryInfo = document.getElementById('expiryInfo');
        this.clickCount = document.getElementById('clickCount');
        this.urlList = document.getElementById('urlList');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.totalUrls = document.getElementById('totalUrls');
        this.totalClicks = document.getElementById('totalClicks');
        this.activeUrls = document.getElementById('activeUrls');
        this.expiredUrls = document.getElementById('expiredUrls');
    }

    bindEvents() {
        this.shortenBtn.addEventListener('click', () => this.shortenURL());
        this.clearBtn.addEventListener('click', () => this.clearForm());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.exportBtn.addEventListener('click', () => this.exportData());
        
        // Set minimum date for expiry
        const today = new Date().toISOString().split('T')[0];
        this.expiryDateInput.min = today;
    }

    shortenURL() {
        const longUrl = this.longUrlInput.value.trim();
        const customAlias = this.customAliasInput.value.trim();
        const expiryDate = this.expiryDateInput.value;

        // Validation
        if (!this.isValidURL(longUrl)) {
            alert('Please enter a valid URL');
            return;
        }

        if (customAlias && !this.isValidAlias(customAlias)) {
            alert('Alias can only contain letters, numbers, hyphens, and underscores');
            return;
        }

        if (customAlias && this.isAliasTaken(customAlias)) {
            alert('This alias is already taken. Please choose another one.');
            return;
        }

        // Create short URL
        const shortCode = customAlias || this.generateShortCode();
        const shortUrl = `https://short.ly/${shortCode}`;
        
        const urlData = {
            id: this.currentId++,
            originalUrl: longUrl,
            shortUrl: shortUrl,
            shortCode: shortCode,
            alias: customAlias,
            created: new Date().toISOString(),
            expiry: expiryDate || null,
            clicks: 0,
            isActive: true
        };

        this.urls.push(urlData);
        this.saveToStorage();
        this.showResult(urlData);
        this.updateStats();
        this.renderHistory();
        this.clearForm();
    }

    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    isValidAlias(alias) {
        return /^[a-zA-Z0-9-_]+$/.test(alias);
    }

    isAliasTaken(alias) {
        return this.urls.some(url => url.shortCode === alias);
    }

    generateShortCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    showResult(urlData) {
        this.shortUrlInput.value = urlData.shortUrl;
        this.originalUrl.textContent = urlData.originalUrl;
        this.createdDate.textContent = new Date(urlData.created).toLocaleDateString();
        this.expiryInfo.textContent = urlData.expiry ? new Date(urlData.expiry).toLocaleDateString() : 'Never';
        this.clickCount.textContent = urlData.clicks;
        
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    copyToClipboard() {
        const url = this.shortUrlInput.value;
        const originalText = this.copyBtn.textContent;
        navigator.clipboard.writeText(url).then(() => {
            this.copyBtn.textContent = '✓ Copied!';
            this.copyBtn.style.background = '#28a745';

            setTimeout(() => {
                this.copyBtn.textContent = originalText;
                this.copyBtn.style.background = '#28a745';
            }, 2000);
        }).catch(() => {
            this.copyBtn.textContent = 'Failed to copy';
            setTimeout(() => {
                this.copyBtn.textContent = originalText;
            }, 2000);
        });
    }

    clearForm() {
        this.longUrlInput.value = '';
        this.customAliasInput.value = '';
        this.expiryDateInput.value = '';
        this.resultSection.style.display = 'none';
    }

    renderHistory() {
        this.urlList.innerHTML = '';
        
        if (this.urls.length === 0) {
            this.urlList.innerHTML = '<p style="text-align: center; opacity: 0.7;">No URLs shortened yet.</p>';
            return;
        }

        this.urls.forEach(url => {
            const urlItem = this.createUrlItem(url);
            this.urlList.appendChild(urlItem);
        });
    }

    createUrlItem(url) {
        const item = document.createElement('div');
        item.className = 'url-item';
        
        const isExpired = url.expiry && new Date(url.expiry) < new Date();
        const statusClass = isExpired ? 'expired' : 'active';
        
        item.innerHTML = `
            <div class="url-item-header">
                <div class="short-url">${url.shortUrl}</div>
                <div class="url-actions">
                    <button class="action-btn" onclick="urlShortener.copyUrl('${url.shortUrl}')" title="Copy">📋</button>
                    <button class="action-btn" onclick="urlShortener.deleteUrl(${url.id})" title="Delete">🗑️</button>
                </div>
            </div>
            <div class="url-details">
                <div class="url-detail">
                    <span class="label">Original URL:</span>
                    <span class="value">${this.truncateUrl(url.originalUrl)}</span>
                </div>
                <div class="url-detail">
                    <span class="label">Created:</span>
                    <span class="value">${new Date(url.created).toLocaleDateString()}</span>
                </div>
                <div class="url-detail">
                    <span class="label">Expires:</span>
                    <span class="value">${url.expiry ? new Date(url.expiry).toLocaleDateString() : 'Never'}</span>
                </div>
                <div class="url-detail">
                    <span class="label">Clicks:</span>
                    <span class="value">${url.clicks}</span>
                </div>
                <div class="url-detail">
                    <span class="label">Status:</span>
                    <span class="value ${statusClass}">${isExpired ? 'Expired' : 'Active'}</span>
                </div>
            </div>
        `;
        
        return item;
    }

    truncateUrl(url) {
        return url.length > 50 ? url.substring(0, 50) + '...' : url;
    }

    copyUrl(shortUrl) {
        navigator.clipboard.writeText(shortUrl).then(() => {
            // Visual feedback
            const event = new CustomEvent('showNotification', {
                detail: { message: 'URL copied to clipboard!' }
            });
            document.dispatchEvent(event);
        });
    }

    deleteUrl(id) {
        if (confirm('Are you sure you want to delete this URL?')) {
            this.urls = this.urls.filter(url => url.id !== id);
            this.saveToStorage();
            this.updateStats();
            this.renderHistory();
        }
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all URLs? This action cannot be undone.')) {
            this.urls = [];
            this.currentId = 1;
            this.saveToStorage();
            this.updateStats();
            this.renderHistory();
        }
    }

    exportData() {
        const dataStr = JSON.stringify(this.urls, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `url-shortener-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    updateStats() {
        const now = new Date();
        const activeUrls = this.urls.filter(url => 
            !url.expiry || new Date(url.expiry) > now
        );
        const expiredUrls = this.urls.filter(url => 
            url.expiry && new Date(url.expiry) <= now
        );
        const totalClicks = this.urls.reduce((sum, url) => sum + url.clicks, 0);

        this.totalUrls.textContent = this.urls.length;
        this.totalClicks.textContent = totalClicks;
        this.activeUrls.textContent = activeUrls.length;
        this.expiredUrls.textContent = expiredUrls.length;
    }

    saveToStorage() {
        localStorage.setItem('shortenedUrls', JSON.stringify(this.urls));
    }

    // Simulate click tracking (in a real app, this would be handled server-side)
    trackClick(shortCode) {
        const url = this.urls.find(u => u.shortCode === shortCode);
        if (url) {
            url.clicks++;
            this.saveToStorage();
            this.updateStats();
            this.renderHistory();
        }
    }
}

// Initialize the app
let urlShortener;
document.addEventListener('DOMContentLoaded', () => {
    urlShortener = new URLShortener();
});

// Add notification system
document.addEventListener('showNotification', (e) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = e.detail.message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .expired { color: #dc3545; }
    .active { color: #28a745; }
`;
document.head.appendChild(style); 
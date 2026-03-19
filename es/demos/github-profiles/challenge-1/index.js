// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const profileCard = document.getElementById('profileCard');
const profileAvatar = document.getElementById('profileAvatar');
const profileName = document.getElementById('profileName');
const profileUsername = document.getElementById('profileUsername');
const profileBio = document.getElementById('profileBio');
const profileStats = document.getElementById('profileStats');
const profileLinks = document.getElementById('profileLinks');
const reposSection = document.getElementById('reposSection');
const reposTitle = document.getElementById('reposTitle');
const reposGrid = document.getElementById('reposGrid');

// GitHub API Configuration
const GITHUB_API_BASE = 'https://api.github.com';

// State
let currentUser = null;
let userRepos = [];

// Event Listeners
searchBtn.addEventListener('click', searchUser);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchUser();
    }
});

// Search GitHub user
async function searchUser() {
    const username = searchInput.value.trim();
    
    if (!username) {
        showMessage('Please enter a GitHub username', 'error');
        return;
    }
    
    showLoading();
    
    try {
        // Fetch user data
        const userData = await fetchUserData(username);
        currentUser = userData;
        
        // Fetch user repositories
        const reposData = await fetchUserRepos(username);
        userRepos = reposData;
        
        // Display user profile
        displayProfile(userData, reposData);
        
        showMessage('Profile loaded successfully!', 'success');
        
    } catch (error) {
        if (error.message === 'User not found') {
            showError('User not found. Please check the username and try again.');
        } else {
            showError('Failed to load profile. Please try again.');
        }
        console.error('Error:', error);
    }
}

// Fetch user data from GitHub API
async function fetchUserData(username) {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('User not found');
        }
        throw new Error('Failed to fetch user data');
    }
    
    return await response.json();
}

// Fetch user repositories from GitHub API
async function fetchUserRepos(username) {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=10`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch repositories');
    }
    
    return await response.json();
}

// Display user profile
function displayProfile(user, repos) {
    // Update profile information
    profileAvatar.src = user.avatar_url;
    profileAvatar.alt = `${user.name || user.login}'s avatar`;
    profileName.textContent = user.name || user.login;
    profileUsername.textContent = `@${user.login}`;
    profileBio.textContent = user.bio || 'No bio available';
    
    // Update profile statistics
    profileStats.innerHTML = `
        <div class="stat-item">
            <span class="stat-number">${user.public_repos}</span>
            <span class="stat-label">Repositories</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">${user.public_gists}</span>
            <span class="stat-label">Gists</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">${user.followers}</span>
            <span class="stat-label">Followers</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">${user.following}</span>
            <span class="stat-label">Following</span>
        </div>
    `;
    
    // Update profile links
    profileLinks.innerHTML = '';
    
    if (user.html_url) {
        profileLinks.innerHTML += `
            <a href="${user.html_url}" target="_blank" class="profile-link">
                📁 GitHub Profile
            </a>
        `;
    }
    
    if (user.blog) {
        profileLinks.innerHTML += `
            <a href="${user.blog.startsWith('http') ? user.blog : 'https://' + user.blog}" target="_blank" class="profile-link blog">
                🌐 Blog
            </a>
        `;
    }
    
    if (user.twitter_username) {
        profileLinks.innerHTML += `
            <a href="https://twitter.com/${user.twitter_username}" target="_blank" class="profile-link twitter">
                🐦 Twitter
            </a>
        `;
    }
    
    if (user.company) {
        profileLinks.innerHTML += `
            <a href="https://github.com/search?q=org:${user.company}" target="_blank" class="profile-link">
                🏢 ${user.company}
            </a>
        `;
    }
    
    // Display repositories
    displayRepositories(repos);
    
    // Show the profile card
    profileCard.style.display = 'block';
}

// Display repositories
function displayRepositories(repos) {
    if (repos.length === 0) {
        reposSection.innerHTML = '<p style="color: #666; text-align: center;">No public repositories found.</p>';
        return;
    }
    
    reposTitle.textContent = `Recent Repositories (${repos.length})`;
    
    reposGrid.innerHTML = repos.map(repo => `
        <div class="repo-item">
            <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
            <p class="repo-description">${repo.description || 'No description available'}</p>
            <div class="repo-meta">
                ${repo.language ? `
                    <div class="repo-language">
                        <span class="language-color" style="background: ${getLanguageColor(repo.language)}"></span>
                        ${repo.language}
                    </div>
                ` : ''}
                <div class="repo-stats">
                    ⭐ ${repo.stargazers_count}
                </div>
                <div class="repo-stats">
                    🍴 ${repo.forks_count}
                </div>
                <div class="repo-stats">
                    📅 ${formatDate(repo.updated_at)}
                </div>
            </div>
        </div>
    `).join('');
}

// Get language color (simplified version)
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C#': '#178600',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Vue': '#2c3e50',
        'React': '#61dafb',
        'Angular': '#dd0031'
    };
    
    return colors[language] || '#2e647a';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Today';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}

// Show loading state
function showLoading() {
    profileCard.style.display = 'none';
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading profile...';
    
    // Remove any existing loading or error messages
    const existingLoading = document.querySelector('.loading');
    const existingError = document.querySelector('.error-message');
    if (existingLoading) existingLoading.remove();
    if (existingError) existingError.remove();
    
    profileCard.parentNode.insertBefore(loadingDiv, profileCard);
}

// Show error message
function showError(message) {
    profileCard.style.display = 'none';
    
    // Remove any existing loading or error messages
    const existingLoading = document.querySelector('.loading');
    const existingError = document.querySelector('.error-message');
    if (existingLoading) existingLoading.remove();
    if (existingError) existingError.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    profileCard.parentNode.insertBefore(errorDiv, profileCard);
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
        }
    }
});

// Initialize with a default user (optional)
function init() {
    // You can set a default user to search on page load
    // searchInput.value = 'octocat';
    // searchUser();
}

// Start the app
init(); 
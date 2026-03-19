// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const pokemonCard = document.getElementById('pokemonCard');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonId = document.getElementById('pokemonId');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonStats = document.getElementById('pokemonStats');

// Pokemon type colors
const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

// Event Listeners
searchBtn.addEventListener('click', searchPokemon);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});

// Search Pokemon function
async function searchPokemon() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        showError('Please enter a Pokemon name or ID');
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        
        const pokemon = await response.json();
        displayPokemon(pokemon);
        
    } catch (error) {
        showError('Pokemon not found. Please try again.');
        console.error('Error:', error);
    }
}

// Display Pokemon data
function displayPokemon(pokemon) {
    // Set Pokemon image
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default || 
                    pokemon.sprites.front_default;
    pokemonImage.src = imageUrl;
    pokemonImage.alt = pokemon.name;
    
    // Set Pokemon name and ID
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonId.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
    
    // Set Pokemon types
    pokemonTypes.innerHTML = '';
    pokemon.types.forEach(type => {
        const typeBadge = document.createElement('span');
        typeBadge.className = 'type-badge';
        typeBadge.textContent = type.type.name;
        typeBadge.style.backgroundColor = typeColors[type.type.name] || '#A8A878';
        pokemonTypes.appendChild(typeBadge);
    });
    
    // Set Pokemon stats
    pokemonStats.innerHTML = '';
    const stats = [
        { name: 'HP', value: pokemon.stats[0].base_stat },
        { name: 'Attack', value: pokemon.stats[1].base_stat },
        { name: 'Defense', value: pokemon.stats[2].base_stat },
        { name: 'Speed', value: pokemon.stats[5].base_stat }
    ];
    
    stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-label">${stat.name}</div>
            <div class="stat-value">${stat.value}</div>
        `;
        pokemonStats.appendChild(statItem);
    });
    
    // Show the card
    pokemonCard.style.display = 'block';
    
    // Add animation
    pokemonCard.style.opacity = '0';
    pokemonCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        pokemonCard.style.transition = 'all 0.5s ease';
        pokemonCard.style.opacity = '1';
        pokemonCard.style.transform = 'translateY(0)';
    }, 100);
}

// Show loading state
function showLoading() {
    pokemonCard.style.display = 'none';
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Searching for Pokemon...';
    
    // Remove any existing loading or error messages
    const existingLoading = document.querySelector('.loading');
    const existingError = document.querySelector('.error-message');
    if (existingLoading) existingLoading.remove();
    if (existingError) existingError.remove();
    
    pokemonCard.parentNode.insertBefore(loadingDiv, pokemonCard);
}

// Show error message
function showError(message) {
    pokemonCard.style.display = 'none';
    
    // Remove any existing loading or error messages
    const existingLoading = document.querySelector('.loading');
    const existingError = document.querySelector('.error-message');
    if (existingLoading) existingLoading.remove();
    if (existingError) existingError.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    pokemonCard.parentNode.insertBefore(errorDiv, pokemonCard);
}

// Random Pokemon function (bonus feature)
function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokemon in the API
    searchInput.value = randomId;
    searchPokemon();
}

// Add random button functionality if it exists
const randomBtn = document.getElementById('randomBtn');
if (randomBtn) {
    randomBtn.addEventListener('click', getRandomPokemon);
}

// Initialize with a default Pokemon (Pikachu)
window.addEventListener('load', () => {
    searchInput.value = 'pikachu';
    searchPokemon();
}); 
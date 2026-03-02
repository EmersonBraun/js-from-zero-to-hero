class Pokedex {
    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2';
        this.currentPokemon = null;
        this.pokemonList = [];
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.totalPages = 1;
        this.isListView = false;
        
        this.initializeElements();
        this.addEventListeners();
        this.loadInitialData();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.randomBtn = document.getElementById('randomBtn');
        this.typeFilter = document.getElementById('typeFilter');
        this.pokemonDisplay = document.getElementById('pokemonDisplay');
        this.pokemonGrid = document.getElementById('pokemonGrid');
        this.pokemonList = document.getElementById('pokemonList');
        this.pagination = document.getElementById('pagination');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
        this.listViewBtn = document.getElementById('listViewBtn');
        this.gridViewBtn = document.getElementById('gridViewBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentPageSpan = document.getElementById('currentPage');
        this.totalPagesSpan = document.getElementById('totalPages');
        this.retryBtn = document.getElementById('retryBtn');
    }

    addEventListeners() {
        this.searchBtn.addEventListener('click', () => this.searchPokemon());
        this.randomBtn.addEventListener('click', () => this.getRandomPokemon());
        this.typeFilter.addEventListener('change', () => this.filterByType());
        this.listViewBtn.addEventListener('click', () => this.toggleView('list'));
        this.gridViewBtn.addEventListener('click', () => this.toggleView('grid'));
        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());
        this.retryBtn.addEventListener('click', () => this.loadInitialData());
        
        // Enter key support
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchPokemon();
        });
    }

    async loadInitialData() {
        try {
            this.showLoading();
            await this.loadPokemonList();
            this.hideLoading();
        } catch (error) {
            this.showError('Failed to load Pokémon data. Please try again.');
        }
    }

    async loadPokemonList() {
        const offset = (this.currentPage - 1) * this.itemsPerPage;
        const response = await fetch(`${this.baseUrl}/pokemon?limit=${this.itemsPerPage}&offset=${offset}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon list');
        }
        
        const data = await response.json();
        this.totalPages = Math.ceil(data.count / this.itemsPerPage);
        
        // Load detailed data for each Pokémon
        const pokemonPromises = data.results.map(pokemon => this.getPokemonDetails(pokemon.name));
        this.pokemonList = await Promise.all(pokemonPromises);
        
        this.renderPokemonGrid();
        this.updatePagination();
    }

    async getPokemonDetails(nameOrId) {
        try {
            const response = await fetch(`${this.baseUrl}/pokemon/${nameOrId}`);
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            
            const data = await response.json();
            return {
                id: data.id,
                name: data.name,
                types: data.types.map(type => type.type.name),
                stats: data.stats.map(stat => ({
                    name: stat.stat.name,
                    value: stat.base_stat
                })),
                sprites: data.sprites,
                height: data.height,
                weight: data.weight,
                abilities: data.abilities.map(ability => ability.ability.name)
            };
        } catch (error) {
            console.error(`Error fetching Pokémon ${nameOrId}:`, error);
            return null;
        }
    }

    async searchPokemon() {
        const query = this.searchInput.value.trim().toLowerCase();
        if (!query) {
            this.loadInitialData();
            return;
        }

        try {
            this.showLoading();
            this.hideError();
            
            const pokemon = await this.getPokemonDetails(query);
            if (pokemon) {
                this.displayPokemon(pokemon);
            } else {
                this.showError('Pokémon not found. Please try a different name or number.');
            }
            
            this.hideLoading();
        } catch (error) {
            this.showError('Error searching for Pokémon. Please try again.');
            this.hideLoading();
        }
    }

    async getRandomPokemon() {
        try {
            this.showLoading();
            this.hideError();
            
            // Get total count first
            const response = await fetch(`${this.baseUrl}/pokemon?limit=1`);
            const data = await response.json();
            const totalCount = data.count;
            
            // Generate random ID
            const randomId = Math.floor(Math.random() * totalCount) + 1;
            const pokemon = await this.getPokemonDetails(randomId);
            
            if (pokemon) {
                this.displayPokemon(pokemon);
            } else {
                this.showError('Failed to get random Pokémon. Please try again.');
            }
            
            this.hideLoading();
        } catch (error) {
            this.showError('Error getting random Pokémon. Please try again.');
            this.hideLoading();
        }
    }

    async filterByType() {
        const selectedType = this.typeFilter.value;
        if (!selectedType) {
            this.loadInitialData();
            return;
        }

        try {
            this.showLoading();
            this.hideError();
            
            const response = await fetch(`${this.baseUrl}/type/${selectedType}`);
            if (!response.ok) {
                throw new Error('Failed to fetch type data');
            }
            
            const data = await response.json();
            const pokemonPromises = data.pokemon.slice(0, 20).map(p => this.getPokemonDetails(p.pokemon.name));
            this.pokemonList = await Promise.all(pokemonPromises);
            
            this.renderPokemonGrid();
            this.hideLoading();
        } catch (error) {
            this.showError('Error filtering by type. Please try again.');
            this.hideLoading();
        }
    }

    // NOTE: innerHTML is used here with data from the PokeAPI. While this API returns
    // controlled data, in production always sanitize external content to prevent XSS.
    // Prefer textContent for plain text or use a sanitization library for HTML content.
    displayPokemon(pokemon) {
        this.currentPokemon = pokemon;
        this.pokemonDisplay.innerHTML = this.createPokemonCard(pokemon);
        this.pokemonGrid.style.display = 'none';
        this.pagination.style.display = 'none';
        this.pokemonDisplay.style.display = 'block';
    }

    createPokemonCard(pokemon) {
        const imageUrl = pokemon.sprites.other['official-artwork'].front_default || 
                        pokemon.sprites.front_default || 
                        'https://via.placeholder.com/200x200?text=No+Image';
        
        const typesHtml = pokemon.types.map(type => 
            `<span class="type-badge type-${type}">${type}</span>`
        ).join('');
        
        const statsHtml = pokemon.stats.map(stat => `
            <div class="stat-item">
                <div class="stat-label">${stat.name.replace('-', ' ')}</div>
                <div class="stat-value">${stat.value}</div>
            </div>
        `).join('');
        
        return `
            <div class="pokemon-card">
                <div class="pokemon-image">
                    <img src="${imageUrl}" alt="${pokemon.name}" onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
                </div>
                <div class="pokemon-info">
                    <div class="pokemon-name">${pokemon.name}</div>
                    <div class="pokemon-number">#${pokemon.id.toString().padStart(3, '0')}</div>
                    <div class="pokemon-types">${typesHtml}</div>
                </div>
                <div class="pokemon-stats">${statsHtml}</div>
                <div class="pokemon-details">
                    <p><strong>Height:</strong> ${pokemon.height / 10}m</p>
                    <p><strong>Weight:</strong> ${pokemon.weight / 10}kg</p>
                    <p><strong>Abilities:</strong> ${pokemon.abilities.join(', ')}</p>
                </div>
            </div>
        `;
    }

    renderPokemonGrid() {
        if (this.pokemonList.length === 0) {
            this.pokemonList.innerHTML = '<p style="text-align: center; color: #fff; opacity: 0.7;">No Pokémon found</p>';
            return;
        }

        const pokemonHtml = this.pokemonList
            .filter(pokemon => pokemon !== null)
            .map(pokemon => this.createPokemonListItem(pokemon))
            .join('');
        
        this.pokemonList.innerHTML = pokemonHtml;
        this.pokemonGrid.style.display = 'block';
        this.pokemonDisplay.style.display = 'none';
    }

    createPokemonListItem(pokemon) {
        const imageUrl = pokemon.sprites.front_default || 
                        'https://via.placeholder.com/60x60?text=No+Image';
        
        const typesHtml = pokemon.types.map(type => 
            `<span class="type-badge type-${type}">${type}</span>`
        ).join('');
        
        if (this.isListView) {
            return `
                <div class="pokemon-list-item" onclick="pokedex.displayPokemon(${JSON.stringify(pokemon).replace(/"/g, '&quot;')})">
                    <img src="${imageUrl}" alt="${pokemon.name}" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'">
                    <div class="info">
                        <div class="name">${pokemon.name}</div>
                        <div class="number">#${pokemon.id.toString().padStart(3, '0')}</div>
                        <div class="types">${typesHtml}</div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="pokemon-card" onclick="pokedex.displayPokemon(${JSON.stringify(pokemon).replace(/"/g, '&quot;')})">
                    <div class="pokemon-image">
                        <img src="${imageUrl}" alt="${pokemon.name}" onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
                    </div>
                    <div class="pokemon-info">
                        <div class="pokemon-name">${pokemon.name}</div>
                        <div class="pokemon-number">#${pokemon.id.toString().padStart(3, '0')}</div>
                        <div class="pokemon-types">${typesHtml}</div>
                    </div>
                </div>
            `;
        }
    }

    toggleView(view) {
        this.isListView = view === 'list';
        
        this.listViewBtn.classList.toggle('active', this.isListView);
        this.gridViewBtn.classList.toggle('active', !this.isListView);
        
        this.pokemonList.classList.toggle('list-view', this.isListView);
        
        if (this.pokemonList.length > 0) {
            this.renderPokemonGrid();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadPokemonList();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.loadPokemonList();
        }
    }

    updatePagination() {
        this.currentPageSpan.textContent = this.currentPage;
        this.totalPagesSpan.textContent = this.totalPages;
        
        this.prevBtn.disabled = this.currentPage === 1;
        this.nextBtn.disabled = this.currentPage === this.totalPages;
        
        this.pagination.style.display = 'block';
    }

    showLoading() {
        this.loading.style.display = 'block';
        this.pokemonDisplay.style.display = 'none';
        this.pokemonGrid.style.display = 'none';
        this.pagination.style.display = 'none';
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    showError(message) {
        this.errorMessage.style.display = 'block';
        document.getElementById('errorText').textContent = message;
        this.pokemonDisplay.style.display = 'none';
        this.pokemonGrid.style.display = 'none';
        this.pagination.style.display = 'none';
    }

    hideError() {
        this.errorMessage.style.display = 'none';
    }
}

// Initialize Pokedex
let pokedex;

document.addEventListener('DOMContentLoaded', () => {
    pokedex = new Pokedex();
}); 
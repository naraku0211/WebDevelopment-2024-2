// Get the container element from the HTML where all Pokémon cards will be displayed
const poke_container = document.getElementById('poke-container')

// Total number of Pokémon to fetch from the API
const pokemon_count = 200

// Object that maps Pokémon types to their corresponding background color
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

// Get an array of all the main Pokémon types (the keys of the `colors` object)
const main_types = Object.keys(colors)

// Function to fetch all Pokémon data from 1 to the specified count
const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i) // Wait for each Pokémon to be fetched before continuing
    }
}

// Function to fetch a single Pokémon's data using its ID
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}` // API endpoint for a specific Pokémon
    const res = await fetch(url) // Fetch the data from the API
    const data = await res.json() // Convert the response to JSON
    createPokemonCard(data) // Create a visual card for the Pokémon
}

// Function to create a card for each Pokémon and add it to the DOM
const createPokemonCard = (pokemon) => {
    // Create a new div element for the Pokémon card
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon') // Add a CSS class to the element

    // Capitalize the first letter of the Pokémon's name
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    // Format the Pokémon ID to always be 3 digits (e.g., 001, 045, 150)
    const id = pokemon.id.toString().padStart(3, '0')

    // Get all the types of the Pokémon
    const poke_types = pokemon.types.map(type => type.type.name)
    // Find the first matching type from the main_types list
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    // Get the background color based on the type
    const color = colors[type]

    // Set the background color of the Pokémon card
    pokemonEl.style.backgroundColor = color

    // HTML structure for the Pokémon card
    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `

    // Insert the inner HTML into the newly created element
    pokemonEl.innerHTML = pokemonInnerHTML

    // Append the Pokémon card to the main container in the HTML
    poke_container.appendChild(pokemonEl)
}

// Start fetching and displaying Pokémon when the script runs
fetchPokemons()

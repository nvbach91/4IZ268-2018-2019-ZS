//var pokemonForm = document.getElementById('pokemon-form');
//var heading = document.querySelector('#heading');
//console.log(heading);
//heading.innerText = 'Hi Pokemon';


var pokemonForm = document.querySelector('#pokemon-form');
var pokemonNameInput = document.querySelector('#pokemon-name-input');
var pokemonList = document.querySelector('#pokemon-list');
var pokemonCall = document.querySelector('#pokemon-text');
var checkPokemons = function (name) {
    // check if pokemon already exists
    var existingPokemons = document.querySelectorAll('.pokemon-name');
    for (var i = 0; i < existingPokemons.length; i++) {
        var pokemon = existingPokemons[i];
        //console.log(pokemon.innerText);
        if (name.toLowerCase().trim() === pokemon.innerText.toLowerCase().trim()) {
            return true;
        }
    }
    return false;
};
var createPokemon = function (pokemonName) {
    var newPokemon = document.createElement('li');
    newPokemon.classList.add('pokemon');

    var pokemonImage = document.createElement('div');
    pokemonImage.classList.add('pokemon-image');
    pokemonImage.style.backgroundImage = 'url(https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/' + pokemonName.toLowerCase() + '.png)';

    var newPokemonName = document.createElement('div');
    newPokemonName.classList.add('pokemon-name');
    newPokemonName.innerText = pokemonName;
    newPokemonName.addEventListener('click', function () {
        pokemonCall.innerText = pokemonName + ', I choose you! :]';
    });

    var newPokemonWeight = document.createElement('div');
    newPokemonWeight.classList.add('pokemon-weight');
    
    var loader = document.createElement('div');
    loader.classList.add('loader');

    newPokemon.appendChild(loader);
    newPokemon.appendChild(newPokemonWeight);

    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase() + '/').then(function (resp) {
        return resp.json();
    }).then(function (resp) {
        newPokemon.removeChild(loader);
        newPokemonWeight.innerText = resp.weight;
    });

    var newPokemonDelete = document.createElement('button');
    newPokemonDelete.classList.add('pokemon-delete');
    newPokemonDelete.innerText = 'Bye';
    newPokemonDelete.addEventListener('click', function () {
        pokemonList.removeChild(newPokemon);
        pokemonCall.innerText = 'Bye bye, ' + pokemonName + '! :(';
    });

    newPokemon.appendChild(pokemonImage);
    newPokemon.appendChild(newPokemonName);
    newPokemon.appendChild(newPokemonDelete);

    return newPokemon;
};
pokemonForm.addEventListener('submit', function (e) {
    e.preventDefault();
    pokemonNameInput.value.split(',').forEach(function (pokemonName) {
        var pokemonAlreadyExists = checkPokemons(pokemonName);
        if (pokemonAlreadyExists) {
            alert('Pokemon already exists!');
            return false;
        }
        addPokemonToList(pokemonName);
    });
});
var addPokemonToList = function (pokemonName) {
    var newPokemon = createPokemon(pokemonName);
    pokemonList.appendChild(newPokemon);
};











addPokemonToList('Pikachu');
addPokemonToList('Charmander');

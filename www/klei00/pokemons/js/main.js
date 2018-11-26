//var heading = document.querySelector('#heading');
//console.log(heading);
var pokemonForm = document.querySelector('#pokemon-form');
var pokemonNameInput = document.querySelector('#pokemon-input');
var pokemonList = document.querySelector('#pokemon-list');
var pokemonCall = document.querySelector('#pokemon-call');
var checkPokemons = function (name) {
    var existingPokemons = document.querySelectorAll('.pokemon-name');
    for (var i = 0; i < existingPokemons.length; i++) {
        var pokemon = existingPokemons[i];
        if (name.toLowerCase().trim() === pokemon.innerHTML.toLowerCase().trim()) {
            return true;
        }
    }
    return false;
};
var createPokemon = function (pokemonName) {
    var newPokemon = document.createElement('li');
    newPokemon.classList.add('pokemon');

    /*var pokemonImage = document.createElement('div');
    pokemonIage.classList.add('pokemon-image');
    pokemonImage.style.backgroundImage = 'https://img.pokemondb.net/sprites/sun-moon/icon/pidgeotto.png';*/

    var newPokemonName = document.createElement('div');
    newPokemonName.classList.add('pokemon-name');
    newPokemonName.innerText = pokemonName;
    newPokemonName.addEventListener('click', function () {
        pokemonCall.innerText = pokemonName + ', I choose you!';
    })

    var newPokemonDelete = document.createElement('button');
    newPokemonDelete.classList.add('pokemon-delete');
    newPokemonDelete.innerText = 'Bye';
    newPokemonDelete.addEventListener('click', function () {
        pokemonList.removeChild(newPokemon);
        pokemonCall.innerText = 'Bye bye, ' + pokemonName + '!';
    });

    newPokemon.appendChild(newPokemonName);
    newPokemon.appendChild(newPokemonDelete);
    return newPokemon;
}
pokemonForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var pokemonName = pokemonNameInput.value;
    var pokemonAlreadyExists = checkPokemons(pokemonName);
    if (pokemonAlreadyExists) {
        alert('Pokemon already exists!');
        return false;
    }
    /*
    https://pokemondb.net/pokedex/charizard
    var newPokemon = '<li class="pokemon">' +
        '<div class="pokemon-name">' + pokemonName + '</div>' +
        '<button class="pokemon-delete">Bye</button>' +
        '</li>;';
    pokemonList.innerHTML += newPokemon;*/
    addPokemonToList(pokemonName);

});
var addPokemonToList = function (pokemonName) {
    var newPokemon = createPokemon(pokemonName);
    pokemonList.appendChild(newPokemon);
}

addPokemonToList('Pikachu');
addPokemonToList('Eevee');

var pokemonImage = '' + pokemonName + '.png';
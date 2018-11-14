/*console.log(pokemonForm);
var heading = document.getElementById('heading');
console.log(heading)

console.log(heading.innerHTML)
heading.innerText = 'My best pokemons'; */

var pokemonNameInput = document.querySelector('#pokemon-name-input');
var pokemonForm = document.querySelector('#pokemon-form');
var pokemonList = document.querySelector('#pokemon-list');

var checkPokemons = function (name) {
    var existingPokemons = document.querySelectorAll('.pokemon-name');
    // existingPokemons.innerText;
    for (var i = 0; i < existingPokemons.length; i++) {
        var pokemon = existingPokemons[i];
        if (name.toLowerCase().trim() === pokemon.innerText.toLowerCase().trim()) {
            return true;
        }
    }
    return false;
};

var addPokemon = function (pokemonName) {
    var pokemonAlreadyExists = checkPokemons(pokemonName);
    if (pokemonAlreadyExists) {
        alert('You already have that pokemon ' + pokemonName);
        return false;
    }
    var newPokemon =
    '<li class="pokemon">' +
    '<div class="pokemon-name">' + pokemonName +  '</div>' +
    '<button class="pokemon-delete">Bey</button>' +
'</li>';
pokemonList.innerHTML += newPokemon;
};

pokemonForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var pokemonNames = pokemonNameInput.value;
    pokemonNames.split(',').forEach(function (pokemonName){
        addPokemon(pokemonName);
    });
    pokemonNameInput.value = '';
});
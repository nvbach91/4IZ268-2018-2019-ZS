//var heading = document.querySelector('#heading');
//console.log(heading);
var pokemonForm = document.querySelector('#pokemon-form');
var pokemonNameInput = document.querySelector('#pokemon-input');
var pokemonList = document.querySelector('#pokemon-list');
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

pokemonForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var pokemonName = pokemonNameInput.value;
    var pokemonAlreadyExists = checkPokemons(pokemonName);
    if (pokemonAlreadyExists) {
        alert('Pokemon already exists!');
        return false;
    }
    var newPokemon = '<li class="pokemon">' +
        '<div class="pokemon-name">' + pokemonName + '</div>' +
        '<button class="pokemon-delete">Bye</button>' +
        '</li>;';
    pokemonList.innerHTML += newPokemon;
})
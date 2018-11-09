//var pokemonForm = document.getElementById('pokemon-form');
//var heading = document.querySelector('#heading');
//console.log(heading);
//heading.innerText = 'Hi Pokemon';


var pokemonForm = document.querySelector('#pokemon-form');
var pokemonNameInput = document.querySelector('#name-input');
var pokemonList = document.querySelector('#pokemon-list');
var checkPokemons = function (name) {
    // check if pokemon already exists
    var existingPokemons = document.querySelectorAll('.pokemon-name');
    for (var i = 0; i < existingPokemons.length; i++) {
        var pokemon = existingPokemons[i];
        //console.log(pokemon.innerText);
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
    var newPokemon =
        '<li class="pokemon">' +
        '<div class="pokemon-name">' + pokemonName + '</div>' +
        '<button class="pokemon-delete">Bye</button>' +
        '</li>';
    pokemonList.innerHTML += newPokemon;
});

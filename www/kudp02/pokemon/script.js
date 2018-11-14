/*
var PokemonForm = document.getElementById('pokemon-form');
console.log(PokemonForm);

var heading = document.getElementById('heading');
heading.innerText = 'My best pokemons'; */

var pokemonNameInput = document.querySelector('#pokemon-name-input');
var pokemonForm = document.querySelector('#pokemon-form');
var pokemonList = document.querySelector('#pokemon-list')

pokemonForm.addEventListener('submit', function (e) {
    e.preventDefault();

var pokemonName = pokemonNameInput.value;
    var newPokemon =
        '<li class="pokemon">' + 
            '<div class="pokemon-name">' + pokemonName + '</div>' +
            '<button class="pokemon-delete">Bye</button>' +
        '</li>'
    pokemonList.innerHTML += newPokemon;
});
/* var pokemonForm = document.getElementById('pokemon-form');
var heading = document.getElementById('heading');

console.log(heading.innerHTML);
heading.innerHTML= 'My best pokemons'; */

var pokemonNameInput = document.getElementById('pokemon-name-input');
var pokemonForm = document.getElementById('pokemon-form');
var pokemonList = document.getElementById('pokemon-list');

pokemonForm.addEventListener('submit', function (e) {
    e.preventDefault();

    console.log("submitted");
    var pokemonName = pokemonNameInput.value;

    var newPokemon =
    '<li class="pokemon">'
    '        <div class="pokemon-name">' + pokemonName + '</div>' +
    '        <button class="pokeon-delete">Bye</button>' +
    '    </li>'

    pokemonList.innerHTML += newPokemon;
});
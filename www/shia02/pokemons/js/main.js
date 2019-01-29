/*console.log(pokemonForm);
var heading = document.getElementById('heading');
console.log(heading)

console.log(heading.innerHTML)
heading.innerText = 'My best pokemons'; */

var pokemonNameInput = document.querySelector('#pokemon-name-input');
var pokemonForm = document.querySelector('#pokemon-form');  // formular
var pokemonList = document.querySelector('#pokemon-list');
var pokemonText = document.querySelector('#pokemon-text');

var checkPokemons = function (name) {                                       // poravnani jmen, jestli uz existuje, vrati true, jinak false 
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

var createPokemons = function(pokemonName) {
    //DOM metody
    var newPokemon = document.createElement('li');
    newPokemon.classList.add('pokemon');

    var newPokemonName = document.createElement('div');
    newPokemonName.classList.add('pokemon-name');
    newPokemonName.innerText = pokemonName;

    var pokemonDelete = document.createElement('button');
    pokemonDelete.classList.add('pokemon-delete');
    pokemonDelete.innerText = 'Bye';

    // vkladani div do li, button do li
    newPokemon.appendChild(newPokemonName);
    newPokemon.appendChild(pokemonDelete);

    newPokemonName.addEventListener('click', function () {
        pokemonText.innerText = 'I choose you, ' + pokemonName + '!';
    });

    pokemonDelete.addEventListener('click', function () {
        pokemonList.removeChild(newPokemon);
        pokemonText.innerText = 'Bye bye ' + pokemonName + ' :(';
    });

    return newPokemon;
};

var addPokemon = function (pokemonName) {
    var pokemonAlreadyExists = checkPokemons(pokemonName);          // pokud existuje uz v seznamu, zovrazit hlasku, a dal nepokracujeme
    if (pokemonAlreadyExists) {
        alert('You already have that pokemon ' + pokemonName);
        return false;
    }

    var newPokemon = createPokemons(pokemonName);    
    pokemonList.appendChild(newPokemon);        
};

pokemonForm.addEventListener('submit', function (e) {    // jakmile stiskneme tlacitko, submitne
    e.preventDefault();
    var pokemonNames = pokemonNameInput.value;      // pokud jmen vic, roydelili jsme je carkou, a pridali se vic pokemonu
    pokemonNames.split(',').forEach(function (pokemonName){
        addPokemon(pokemonName);
    });
    pokemonNameInput.value = '';        // smazani inputu
});
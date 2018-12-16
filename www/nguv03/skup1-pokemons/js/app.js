//var pokemonForm = document.getElementById('pokemon-form');
//var heading = $('#heading');
//console.log(heading);
//heading.text('Hi Pokemon';


var pokemonForm = $('#pokemon-form');
var pokemonNameInput = $('#name-input');
var pokemonList = $('#pokemon-list');
var pokemonCall = $('#pokemon-text');
var checkPokemons = function (name) {
    // check if pokemon already exists
    var existingPokemons = $('.pokemon-name');
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
    var newPokemon = $('<li>').addClass('pokemon');

    var pokemonImage = $('<div>').addClass('pokemon-image');
    pokemonImage.css('background-image', 'url(https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/' + pokemonName.toLowerCase() + '.png)');

    var newPokemonName = $('<div>').addClass('pokemon-name').text(pokemonName).click(function () {
        pokemonCall.text(pokemonName + ', I choose you! :]');
    });

    var newPokemonWeight = $('<div>').addClass('pokemon-weight');
    
    var loader = $('<div>').addClass('loader');
    newPokemon.append(loader).append(newPokemonWeight);

    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase() + '/').then(function (resp) {
        return resp.json();
    }).then(function (resp) {
        loader.remove();
        newPokemonWeight.text(resp.weight);
    });

    var newPokemonDelete = $('<button>').addClass('pokemon-delete').text('Bye').click(function () {
        newPokemon.remove();
        pokemonCall.text('Bye bye, ' + pokemonName + '! :(');
    });

    newPokemon.append(pokemonImage);
    newPokemon.append(newPokemonName);
    newPokemon.append(newPokemonDelete);

    return newPokemon;
};
pokemonForm.submit(function (e) {
    e.preventDefault();
    pokemonNameInput.val().split(',').forEach(function (pokemonName) {
        var pokemonAlreadyExists = checkPokemons(pokemonName.trim());
        if (pokemonAlreadyExists) {
            alert('Pokemon already exists!');
            return false;
        }
        addPokemonToList(pokemonName.trim());
    });
});
var addPokemonToList = function (pokemonName) {
    var newPokemon = createPokemon(pokemonName);
    pokemonList.append(newPokemon);
};











addPokemonToList('Pikachu');
addPokemonToList('Charmander');

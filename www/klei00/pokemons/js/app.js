var pokemonForm = $('#pokemon-form');
var pokemonNameInput = $('#pokemon-input');
var pokemonList = $('#pokemon-list');
var pokemonCall = $('#pokemon-call');

var checkPokemons = function (name) {
    var existingPokemons = $('.pokemon-name');
    for (var i = 0; i < existingPokemons.size(); i++) {
        var pokemon = existingPokemons.get(i);
        if (name.toLowerCase().trim() === pokemon.innerHTML.toLowerCase().trim()) {
            return true;
        }
    }
    return false;
};

var createPokemon = function (pokemonName) {
    var newPokemon = $('<li>').addClass('pokemon');
    var newPokemonName = $('<div>').addClass('pokemon-name').text(pokemonName);

    newPokemonName.click(function () {
        pokemonCall.text(pokemonName + ', I choose you!');
    })

    var newPokemonDelete = $('<button>').addClass('pokemon-delete').text('Bye');
    newPokemonDelete.click(function () {
        newPokemon.remove();
        pokemonCall.text('Bye bye, ' + pokemonName + '!');
    });

    newPokemon.append(newPokemonName);
    newPokemon.append(newPokemonDelete);

    var loader = $('<div>').addClass('loader');
    newPokemon.append(loader);

    var pokemonUrl = 'http://pokeapi.salestock.net/api/v2/pokemon/' + pokemonName.toLowerCase() + '/';
    $.getJSON(pokemonUrl).done(function (response) {
        loader.remove();
        var pokemonData = response;
        var pokemonWeight = $('<div>').addClass('pokemon-weight').text(pokemonData.weight);
        newPokemonName.after(pokemonWeight);
    })

    return newPokemon;
}

pokemonForm.submit(function (e) {
    e.preventDefault();
    var pokemonName = pokemonNameInput.val();
    var pokemonAlreadyExists = checkPokemons(pokemonName);
    if (pokemonAlreadyExists) {
        alert('Pokemon already exists!');
        return false;
    }
    addPokemonToList(pokemonName);
});

var addPokemonToList = function (pokemonName) {
    var newPokemon = createPokemon(pokemonName);
    pokemonList.append(newPokemon);
}

addPokemonToList('Pikachu');
addPokemonToList('Eevee');
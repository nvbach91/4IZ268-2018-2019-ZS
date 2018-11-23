var pokemonForm = document.querySelector('#pokemon-form');
var addButton = document.querySelector('#add-button');
var pokemonInput = document.querySelector('#pokemon-name');
var pokemonList = document.querySelector('#pokemon-list');
var selectedPokemon = document.querySelector('#selected-pokemon');

var fetchPokemonStats = function (pokemonName, statsContainer, loader) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase() + '/');
  xhr.addEventListener('load', function () {
    var data = JSON.parse(xhr.responseText);
    //console.log(data);
    var id = document.createElement('p');
    id.innerHTML = 'ID: <strong>' + data.id + '</strong>';
    var height = document.createElement('p');
    height.innerHTML = 'Height: <strong>' + data.height + '</strong>';
    var weight = document.createElement('p');
    weight.innerHTML = 'Height: <strong>' + data.weight + '</strong>';
    var type = document.createElement('p');
    var pokemonTypes = data.types.map(function (type) {
      return type.type.name;
    }).join(', ')
    type.innerHTML = 'Type(s): <strong>' + pokemonTypes + '</strong>';
    
    statsContainer.appendChild(id);
    statsContainer.appendChild(type);
    statsContainer.appendChild(height);
    statsContainer.appendChild(weight);

    statsContainer.removeChild(loader);
  });
  xhr.addEventListener('error', function (e) {
    console.error('XHR error', e);
  });
  xhr.send();
};

var createNewPokemon = function(name) {
  var pokemon = document.createElement('li');
  pokemon.classList.add('pokemon');
  
  var pokemonImage = document.createElement('div');
  pokemonImage.classList.add('pokemon-image');
  pokemonImage.style.backgroundImage = 'url(https://img.pokemondb.net/artwork/' + name.toLowerCase() + '.jpg)'

  var loader = document.createElement('div');
  loader.classList.add('loader');

  var pokemonStats = document.createElement('div');
  pokemonStats.classList.add('pokemon-stats');
  pokemonStats.appendChild(loader);
  fetchPokemonStats(name, pokemonStats, loader);

  var pokemonRow1 = document.createElement('div');
  pokemonRow1.classList.add('pokemon-row');
  var pokemonRow2 = document.createElement('div');
  pokemonRow2.classList.add('pokemon-row');

  var pokemonName = document.createElement('div');
  pokemonName.classList.add('pokemon-name');
  pokemonName.innerText = name;
  pokemonName.addEventListener('click', function() {
    var existingPokemons = document.querySelectorAll('.pokemon-name');
    existingPokemons.forEach(function(existingPokemon) {
      existingPokemon.classList.remove('selected');
    });
    this.classList.toggle('selected');
    selectedPokemon.innerText = name + ', I choose you! :)';
  });

  var deleteButton = document.createElement('button');
  deleteButton.classList.add('pokemon-delete');
  deleteButton.innerText = 'Bye';
  deleteButton.addEventListener('click', function() {
    this.parentNode.parentNode.parentNode.removeChild(pokemon);
    selectedPokemon.innerText = 'Bye bye, ' + name + ' :\'(';
  });

  pokemonRow1.appendChild(pokemonStats);
  pokemonRow1.appendChild(pokemonImage);
  pokemonRow2.appendChild(pokemonName);
  pokemonRow2.appendChild(deleteButton);
  pokemon.appendChild(pokemonRow1);
  pokemon.appendChild(pokemonRow2);

  return pokemon;
};

var addPokemon = function(newPokemonName) {
  // checking if the input is empty
  if (!newPokemonName) {
    alert('Please enter a pokemon name');
    return false;
  }

  // checking if the pokemon is already in the list
  var existingPokemonNames = document.querySelectorAll('.pokemon-name');
  for (var i = 0; i < existingPokemonNames.length; i++) {
    var existingPokemonName = existingPokemonNames[i].innerText;
    if (newPokemonName.toLowerCase() === existingPokemonName.toLowerCase()) {
      alert('Pokemon ' + newPokemonName + ' already exists!');
      return false;
    }
  }

  // create the pokemon item
  var newPokemon = createNewPokemon(newPokemonName);

  // append it to the list
  pokemonList.appendChild(newPokemon);

  // reset the input
  pokemonInput.value = '';
};

pokemonForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var newPokemonName = pokemonInput.value;
  addPokemon(newPokemonName);
});

addPokemon('Pikachu');
addPokemon('Charmander');
addPokemon('Bulbasaur');
addPokemon('Squirtle');

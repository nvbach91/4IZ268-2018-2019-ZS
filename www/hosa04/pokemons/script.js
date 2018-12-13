var pokemonForm = document.querySelector('#pokemon-form');
var addButton = document.querySelector('#add-button');
var pokemonInput = document.querySelector('#pokemon-name');
var pokemonList = document.querySelector('#pokemon-list');
var selectedPokemon = document.querySelector('#selected-pokemon');

var createNewPokemon = function(name) {
 
  var pokemon = document.createElement('li');
  pokemon.classList.add('pokemon');

 var pokemonName = document.createElement('div');
  pokemonName.classList.add('pokemon-name');
  pokemonName.innerText = name;
  pokemonName.addEventListener('click', function(){

  var existingPokemons = document.querySelectorAll('.pokemon');
  existingPokemons.forEach(function(existingPokemon){
          
    existingPokemon.classList.remove('selected');
  });
  this.classList.toggle('selected');
  selectedPokemon.innerText = name + ', I choose you!';

});

      var deleteButton = document.createElement('button');
        deleteButton.classList.add('pokemon-delete');
        deleteButton.innerText = 'Bye';
        deleteButton.addEventListener('click', function() {
          this.parentNode.parentNode.removeChild(pokemon);
          selectedPokemon.innerText = 'Bye bye, ' + name;
        });

          pokemon.appendChild(pokemonName);
          pokemon.appendChild(deleteButton);

         return pokemon;

  };

var addPokemon = function(newPokemonName) {
  if (!newPokemonName) {
    alert('Please enter a pokemon name');
    return false;
  }


var existingPokemonNames = document.querySelectorAll('.pokemon-name');
for (var i = 0; i < existingPokemonNames.length; i++) {
  var existingPokemonName = existingPokemonNames[i].innerText;
  if (newPokemonName.toLowerCase() === existingPokemonName.toLowerCase()){
    alert('Pokemon' + newPokemonName + ' already exists');
    
    return false;
  } 
}

  var newPokemon = createNewPokemon(newPokemonName);
  pokemonList.appendChild(newPokemon);
  pokemonInput.value = '';
};

pokemonForm.addEventListener('submit', function(e){
  e.preventDefault();
  var newPokemonName = pokemonInput.value;
  addPokemon(newPokemonName);

});

addPokemon('Pikachu');
addPokemon('Charmander');
addPokemon('Bulbasaur');
addPokemon('Squirtle');
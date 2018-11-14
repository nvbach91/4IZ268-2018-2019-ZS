var pokemonForm = document.getElementById('pokemonform');
var pokemonNameInput = document.querySelector('#pokename');
pokemonForm.addEventListener('submit', function (e) {
   e.preventDefault();



   var pokemonList = document.querySelector('#pokemon-list');

   var pokemonName = pokemonNameInput.value;
   var newPokemon = '<li class="pokemon">' +
      '<div class="pokemon-name">' + pokemonName +
      '<button class="pokemon-delete">Bye</button>' +
      '</li >';
   pokemonList.innerHTML += newPokemon;

});
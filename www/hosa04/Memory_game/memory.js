var gameField = document.querySelector('#game-field');
var pointsContainer = document.querySelector('#points');

var cities = ['Reykjavik','Akureyri','Hafnarfjörður','Kópavogur','Keflavík','Selfoss','Húsavík','Akranes','Ísafjörður','Garðabær'];
    cities = [].concat(cities, cities);
    cities.sort(function() {
        return 0.4 - Math.random();
    });


var variableCard1 = null;
var variableCard2 = null;
var points = 0;
var totalCardsRevealed = 0;


var bindCard = function(card) {
  card.addEventListener('click', function() {

    if (card.classList.contains('revealed')) {
      return false;
    }

    if (variableCard1 && variableCard2) {
      return false;
    }
    card.classList.add('revealed');

    if (!variableCard1) {
        variableCard1 = card;
      return false;
    }

    variableCard2 = card;

    if (variableCard1.innerText === variableCard2.innerText) {
      points++;
      totalCardsRevealed  += 2;
      variableCard1 = null;
      variableCard2 = null;
        if (totalCardsRevealed  === cities.length) {
            setTimeout(function() {
            alert('You won! You have scored amazing ' + points + ' points');
            }, 1000);
        }

    } else {
      points--;
      if (points < 0) {
        points = 0;
      }
  
      setTimeout(function() {
        variableCard1.classList.remove('revealed');
        variableCard2.classList.remove('revealed');
        variableCard1 = null;
        variableCard2 = null;
      }, 1000);

    }

    pointsContainer.innerText = points;
  });

};

var addCard = function(name) {
  var card = document.createElement('div');
  card.classList.add('card');
  card.innerText = name;
  bindCard(card);
  gameField.appendChild(card);
};

cities.forEach(function(city) {
  addCard(city);
});


var cities = ['Madrid', 'Helsinki', 'Hanoi', 'Peking', 'Havana', 'Moscow', 'Hamburg', 'Paris', 'Mexico city', 'Ottawa'];
cities = cities.concat(cities);
cities.sort(function() {
  return Math.random() - 0.8;
});

var firstCard = null;
var secondCard = null;
var revealedCards = 0;
var points = 0;

var gameField = document.querySelector('#game-field');
var pointsCounter = document.querySelector('#points');

var flipCard = function(card) {
  card.addEventListener('click', function() {
    if (card.classList.contains('flipped')) {
      return false;
    }
    if (firstCard && secondCard) {
      return false;
    }
    card.classList.add('flipped');
    if (!firstCard) {
      firstCard = card;
      return false;
    }
    secondCard = card;
    if (firstCard.innerText === secondCard.innerText) {
      points++;
      firstCard = null;
      secondCard = null;
      flippedCards += 2;
      if (flippedCards === cities.length)
      setTimeout(function() {
        alert('Vyhrál jsi');}, 500);
    }
    else {
      setTimeout(function() {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null;
        secondCard = null;
      }, 500);
    }
    pointsCounter.innerText = points;
  });
};
var addCard = function(name) {
  var card = document.createElement('div');
  card.classList.add('card');
  card.innerText = name;
  flipCard(card);
  gameField.appendChild(card);
};

cities.forEach(function(city) {
  addCard(city);
});



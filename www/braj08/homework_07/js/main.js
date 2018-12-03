var points = 0;
var revealedCards = 0;
var field = document.querySelector('#game-field');
var textPoints = document.querySelector('#points');
var background = document.body;
var cardOne = null;
var cardTwo = null;
var audioCorrect = new Audio('src/audio_correct.mp3');
var audioWrong = new Audio('src/audio_wrong.mp3');



var cities = ['Prague', 'Barcelona', 'Rome', 'Warsaw', 'New York',
               'Oslo', 'Stockholm', 'Berlin', 'London', 'Dublin'];
cities = cities.concat(cities);
cities.sort(function() {
  return 0.5 - Math.random();
});

var pexeso = function(card) {
  card.addEventListener('click', function(){
    if (card.classList.contains('revealed')) {
      return false;
    }
    if (cardOne && cardTwo) {
      return false;
    }
    card.classList.add('revealed');
    if (cardOne === null) {
      cardOne = card;
      return false;
    }
    cardTwo = card;
    if (cardOne.innerText === cardTwo.innerText) {
      points++;
      revealedCards +=2;
      cardOne = null;
      cardTwo = null;
      changeBG('correct');
      audioCorrect.currentTime = 2;
      audioCorrect.volume = 0.3;
      audioCorrect.play();
      if (revealedCards === cities.length) {
        alert('YOU WON! Total number of points: ' + points + '!');

      }
    } else {
      points--;
      changeBG('wrong');
      audioWrong.currentTime = 1.5;
      audioWrong.volume = 0.1;
      audioWrong.play();
      cardOne.classList.add('wrong');
      cardTwo.classList.add('wrong');      
      if (points < 0) {
        points = 0;
      }
      setTimeout(function() {
        cardOne.classList.remove('wrong');
        cardTwo.classList.remove('wrong');
        cardOne.classList.remove('revealed');
        cardTwo.classList.remove('revealed');
        cardOne = null;
        cardTwo = null;
        audioCorrect.pause();
        audioWrong.pause();
      }, 2000);
    }
    textPoints.innerText = points;
  })
}; 

var createCard = function (cardName) {
  var newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.innerText = cardName;
  pexeso(newCard);
  field.appendChild(newCard);
}

cities.forEach(function(city) {
  createCard(city);
});

var changeBG = function(changeTo) {
  background.classList.add(changeTo);
  setTimeout(function() {
    background.classList.remove(changeTo);
  }, 2000);
};





var gameField = document.querySelector('#game-field');
var pointsCounter = document.querySelector('#points');

var points = 0;
var turnedCards = 0;
var turnedCardsCount = 0;
var firstCard = null;
var secondCard = null;

var cities = ['Prague', 'Bratislava', 'Vienna', 'Berlin', 'Paris', 'Madrid', 'London', 'Amsterdam', 'Brussels', 'Budapest'];
cities = cities.concat(cities);
cities.sort(function () {
    return 0.5 - Math.random();
});


var newgame = function () {
    for (var i = 0; i < cities.length; i++) {
        addcard(cities[i]);
    }
};

var addcard = function (city) {
    var newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerHTML = city;
    cardFunction(newCard);
    gameField.appendChild(newCard);
}

var nullfunc = function () {
    pointsCounter.innerHTML = points;
    firstCard.classList.remove('revealed');
    secondCard.classList.remove('revealed');
    firstCard = null;
    secondCard = null;
    turnedCards = 0;
}

var cardFunction = function (card) {
    card.addEventListener('click', function () {
        //console.log(card.innerHTML);
        if (turnedCards === 0) {
            card.classList.add('revealed');
            firstCard = card;
            turnedCards = 1;
            return false;
        }

        if (turnedCards === 1) {
            card.classList.add('revealed');
            secondCard = card;
            turnedCards = 2;
            if (firstCard.innerHTML === secondCard.innerHTML) {
                points += 1;
                pointsCounter.innerHTML = points;
                turnedCardsCount += 2;
                turnedCards = 0;
            } else {
                if (points > 0) {
                    points -= 1;
                }
                setTimeout(nullfunc, 3000);
                return false;
            }

        }

        if (turnedCards === 2) {
            return false;
        }

        if (turnedCardsCount === cities.length) {
            alert('Gratulujeme, vyhrál jste hru s' + points + '-ti body!!! :)');
        }
    });
};

newgame();
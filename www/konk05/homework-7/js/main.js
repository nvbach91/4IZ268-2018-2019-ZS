var cities = ['Reykjavik', 'Copenhagen', 'Amsterdam', 'Berlin', 'Rome', 'Paris', 'Oslo', 'Budapest', 'London', 'Vienna'];
cities = cities.concat(cities);
cities.sort(function () {
    return 0.5 - Math.random();
});

var gameField = document.querySelector('#game-field');
var pointsCounter = document.querySelector('#points');

var points = 0;
var firstCard = null;
var secondCard = null;
var nRevealed = 0;

var bindCard = function (card) {
    card.addEventListener('click', function () {
        if (card.classList.contains('revealed')) {
            return false;
        }

        if (firstCard && secondCard) {
            return false;
        }

        card.classList.add('revealed');

        if (!firstCard) {
            firstCard = card;
            return false;
        }

        secondCard = card;

        if (firstCard.innerText === secondCard.innerText) {
            points++;
            nRevealed += 2;
            firstCard = null;
            secondCard = null;
            if (nRevealed === cities.length) {
                alert('You win! Score: ' + points);
            }
        }
        else {
            if (points > 0) {
                points--;
            }
            setTimeout(function () {
                secondCard.innerText = null;
                firstCard.innerText = null;
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
        pointsCounter.innerText = points;
    });
};

var addCard = function (name) {
    var card = document.createElement('button');
    card.classList.add('card');
    card.onclick = function () {
        if (card.classList.contains('revealed')) {
            return false;
        }
        if (firstCard && secondCard) {
            return false;
        }
        card.innerText = name;
    }
    bindCard(card);
    gameField.appendChild(card);
};

cities.forEach(function (city) {
    addCard(city);
});
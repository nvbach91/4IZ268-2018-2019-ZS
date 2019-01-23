var cities = ['Prague', 'Paris', 'Berlin', 'Madrid', 'London', 'Stockholm', 'Bratislava', 'Rome', 'Wien', 'Budapest'];
cities = cities.concat(cities);
cities.sort(function () {
    return 0.5 - Math.random();
});

var firstCard = null;
var secondCard = null;
var points = 0;
var nCardsRevealed = 0;
var gameField = document.querySelector('#game-field');
var pointsContainer = document.querySelector('#points');

var bindCard = function (card) {
    card.addEventListener('click', function () {
        // if this card is already opened, do nothing
        if (card.classList.contains('revealed')) {
            return false;
        }
        // if we have two opened cards, do nothing
        if (firstCard && secondCard) {
            return false;
        }
        // open the card
        card.classList.add('revealed');

        // assign the first opened card to the firstCard and do nothing else
        if (!firstCard) {
            firstCard = card;
            return false;
        }

        // assign the second opened card to the secondCard variable
        secondCard = card;

        // now we have both cards opened, it is time to check their names
        // if they match, add a point and keep track of the current number of opened cards
        // if all cards are opened, the game ends in one second
        if (firstCard.innerText === secondCard.innerText) {
            points++;
            nCardsRevealed += 2;
            firstCard = null;
            secondCard = null;
            if (nCardsRevealed === cities.length) {
                setTimeout(function () {
                    alert('Gratulujem, zvíťazil si! Počet bodov: ' + points);
                }, 1000);
            }
            // if the cards don't match, decrement one point and reset it to 0 if the points are negative
        } else {
            points--;
            if (points < 0) {
                points = 0;
            }
            // the anter one second, flip both cards back to hide its value
            // and also reset the card variables
            setTimeout(function () {
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
        // set the current points value on the page
        pointsContainer.innerText = points;
    });
};

// create a DOM element with a text inside and append it to the playing field
var addCard = function (name) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    bindCard(card);
    gameField.appendChild(card);
};

// append all cards according to the cities array
cities.forEach(function (city) {
    addCard(city);
});
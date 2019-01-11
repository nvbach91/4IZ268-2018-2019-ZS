

var gameField = document.querySelector('#game-field');
var pointsOnScreen = document.querySelector('#points');

// výběr hráče
var cardOne = null;
var cardTwo = null;

//bodování
var playerPoints = 0;
var openedCards = 0;

// pole měst
var cities = ['Barcelona', 'Tokyo', 'Madrid', 'Beijing', 'The Hague', 'Lima', 'Vatican', 'Rome', 'Gouda', 'Dubai'];
// 2x pole měst
cities = cities.concat(cities);
// promíchání
cities.sort(function () {
    return 0.5 - Math.random();
});

//
var turnCards = function (card) {

    card.addEventListener('click', function () {
        //dvě otočené karty
        if (card.classList.contains('opened')) {
            return false;
        }

        if (cardOne && cardTwo) {
            return false;
        }

        card.classList.add('opened');


        if (!cardOne) {
            cardOne = card;
            return false;
        }

        cardTwo = card;

        //porovnání textu na kartách
        if (cardOne.innerText === cardTwo.innerText) {
            playerPoints++;
            openedCards += 2;
            cardOne = null;
            cardTwo = null;
            //kontrola, zda není konec hry
            if (openedCards === cities.length) {

                if (playerPoints < 0) {
                    alert('Game over, you suck.');
                }

                if (playerPoints > 0) {
                    alert('Game over, congratulations!');
                }
                document.location.reload();

            }
        } else {
            playerPoints--;

            setTimeout(function () {
                cardOne.classList.remove('opened');
                cardTwo.classList.remove('opened');
                cardOne = null;
                cardTwo = null;
            }, 500);

        }

        pointsOnScreen.innerText = playerPoints;
    });
};


// tvorba kontejneru div pro kartu s názvem
var createCard = function (text) {
    // div
    var card = document.createElement('div');

    // vrací název města uvnitř karty 
    card.innerText = text;

    // seznam karet
    card.classList.add('card');

    turnCards(card);

    // přidat do divu gamefield
    gameField.appendChild(card);

};


// udělat karty podle pole
cities.forEach(function (city) { createCard(city) });
//deklarace proměnných 
var card1 = null;
var card2 = null;
var score = 0;
var cardsFlipped = 0;

var cars = ['Škoda', 'Audi', 'BMW', 'Citroen', 'Chrysler', 'Chevrolet', 'Ford', 'Kia', 'Hyundai', 'Ferrari'];
cars = cars.concat(cars);
cars.sort(function () {
    return 0.5 - Math.random();
});

var gameArea = document.getElementById('gameArea');
var scoreText = document.getElementById('score');

var assignCards = function (card) {
    if (!card1) { //pokud ještě není přiřazena první karta, tak ji přiřaď
        card1 = card;
        return false;
    }
    card2 = card;// jinak přiřaď druhou
};

var resetCardProperties = function () {
    setTimeout(function () {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
    }, 500);
};

var checkIfWin = function () {
    if (cardsFlipped === 20) {
        setTimeout(function () {
            alert('You WON! Your score is: ' + score + '!');
        }, 500);
    }
};

var increaseScore = function () {
    score++;
    cardsFlipped = cardsFlipped + 2;
    card1 = null;
    card2 = null;
};

var decreaseScore = function () {
    score--;
    if (score < 0) {
        score = 0;
    }
};

var checkCardLabelsIfEqual = function (card) {
    if (card1.innerText === card2.innerText) {
        increaseScore();
        checkIfWin();
    } else {
        decreaseScore();
        resetCardProperties();
    }
};

var createCard = function (carName) { //vytváří div (kartu) a přidává ho do herního plánu
    var card = document.createElement('div');
    card.innerText = carName;
    card.classList.add('card');
    //přidání listenera na kliknutí
    card.addEventListener('click', function () {
        if ((card1 && card2) || (card.classList.contains('flipped'))) { //pokud 2 otoceny nebo pokud se snazim otocit jiz otocenou, tak nic
            return false;
        }
        else {
            card.classList.add('flipped'); // jinak otoč
        }
        assignCards(card);
        checkCardLabelsIfEqual();
        scoreText.innerText = score;// nastav aktualni score na hernim plánu
    });
    gameArea.appendChild(card); // přidá kartu do herního plánu
};

cars.forEach(function (car) { createCard(car); }); // vytvoří všechny karty z jednotlivých názvů v poli
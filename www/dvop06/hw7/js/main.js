//elements already created in html
var gameField = document.getElementById("game-field");
var points = document.getElementById("points");

//array of cities + shuffle 
var cities = ['London', 'Prague', 'Reykyavik', 'Detroit', 'Astana', 'Riyadh', 'Bratislava', 'Rome', 'Seoul', 'Grozny'];
cities = cities.concat(cities);
cities.sort(function () {
    return .5 - Math.random();
});

//inicialization of other variables
var pointsCount = 0;
var firstCard = null;
var secondCard = null;
var cardsRevealed = 0;


var bindCard = function (card) {
    card.addEventListener('click', function () {

        //defining constraints - same card click, both cards revealed
        if (card.classList.contains("revealed")) {
            return false;
        }

        if (firstCard && secondCard) {
            return false;
        }

        //revealing card
        card.classList.add("revealed");

        //assigning cards to variables
        if (!firstCard) {
            firstCard = card;
            return false;
        } else {
            secondCard = card;
        }

        //processing the game based on pairs check
        //cards match - adding points, counting revealed cards, checking game over, reseting revealed cards
        if (firstCard.innerText === secondCard.innerText) {
            pointsCount++;
            cardsRevealed++
            firstCard = null;
            secondCard = null;

            if (cardsRevealed === (cities.length / 2)) {
                setTimeout(function () { alert("You have won. You scored " + pointsCount + " points, out of " + (cities.length / 2) + " possible."); }, 1000);
            }

            //cards don't match - removing points(min 0), reseting revealed cards 
        } else {
            pointsCount--;
            if (pointsCount < 0) {
                pointsCount = 0;
            }
            setTimeout(function () {
                firstCard.classList.remove("revealed");
                secondCard.classList.remove("revealed");
                firstCard = null;
                secondCard = null;
            }, 1000);
        }

        //updating points visible to player 
        points.innerText = pointsCount;
    });
};

//creating card
var createCard = function (name) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.innerText = name;
    bindCard(card);
    gameField.appendChild(card);

};

//adding city name to a card
cities.forEach(function (city) {
    createCard(city);
});
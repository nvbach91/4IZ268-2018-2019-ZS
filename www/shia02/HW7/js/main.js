var gameField = document.querySelector('#game-field');
var points = document.querySelector('#points');

var numberOfPoints = 0;
var foundCitiesCount = 0;

var firstClickedCard = null;
var secondClickedCard = null;

var cities = ['Prague', 'Moscow', 'Brussels', 'Dublin', 'London', 'Havana', 'Monaco', 'Oslo', 'Paris', 'Rome'];
cities = cities.concat(cities);
cities.sort(function () {
    return 0.5 - Math.random();
});

var incrementPoints = function() {
    numberOfPoints++;

    points.innerText = numberOfPoints;
};

var decrementPoints = function() {
    if (numberOfPoints >= 1) {
        numberOfPoints--;
    }

    points.innerText = numberOfPoints;
};

var createCard = function (name) {
    var card = document.createElement('div');
    card.classList.add('card');

    var span = document.createElement('span');
    span.innerText = name;
    span.hidden = true;

    card.addEventListener('click', function() {    
        // if clicked on same card two times => ignore
        if (card === firstClickedCard) {
            return;
        }

        if (card.classList.contains('revealed')) {
            return;
        }

        // someone clicked for the first time on a card
        if (firstClickedCard === null) {
            span.hidden = false;

            firstClickedCard = card;
            firstClickedCard.classList.add('revealed');
        }
        // someone clicked on a second card
        else if (secondClickedCard === null) {
            span.hidden = false;

            secondClickedCard = card;
            secondClickedCard.classList.add('revealed');

            var firstSpan = firstClickedCard.children[0];
            var firstText = firstSpan.innerText;
            var secondText = span.innerText;

            if (firstText === secondText) {
                incrementPoints();

                foundCitiesCount++;

                firstClickedCard = null;
                secondClickedCard = null;

                if (foundCitiesCount === cities.length / 2) {
                    var totalPoints = document.createElement('div');
                    totalPoints.innerHTML = "<h3>Your total points: " + numberOfPoints + "</h3>";  
                    totalPoints.classList.add('clear');
                    
                    gameField.parentNode.insertBefore(totalPoints, gameField.nextSibling);
                }
            }
            else {
                decrementPoints();

                setTimeout(function() {
                    firstSpan.hidden = true;
                    span.hidden = true;

                    firstClickedCard.classList.remove('revealed');
                    secondClickedCard.classList.remove('revealed');

                    firstClickedCard = null;
                    secondClickedCard = null;
                }, 1000);
            }
        }
    });


    card.appendChild(span);
    return card;
};

var createRow = function () {
    var row = document.createElement('div');
    row.classList.add('row');
    return row;
};

// create game field
var cellsOnRowCount = 5;
var rowsCount = cities.length / cellsOnRowCount;
for (var i = 0; i < rowsCount; i++) {
    var row = createRow();

    for (var j = 0; j < cellsOnRowCount; j++) {
        var cityIndex = i * cellsOnRowCount + j;
        var city = cities[cityIndex];

        var card = createCard(city);
        
        row.appendChild(card);
    }

    gameField.appendChild(row);
}

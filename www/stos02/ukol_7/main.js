var cities = ['London', 'Paris', 'Roma', 'Malaga', 'Seville', 'Neapol', 'Brno', 'Madrid', 'Prague', 'Rimini'];
cities = cities.concat(cities);  //spojení dvou nebo více polí.
cities.sort(function () {        //náhodně třídění
    return 0.5 - Math.random();
});

var firstCard = null;
var secondCard = null;
var points = 0;
var cardsShowed = 0;


var gameField = document.querySelector('#game-field');
var pointsBox = document.querySelector('#points');


var compareCard = function (card) {
    card.addEventListener('click', function () {

        if (card.classList.contains('showed') || (firstCard && secondCard)) {   // pokud je karta v seznamu odkrytých karet, nedělej nic
            return false;                              //pokud je první i druhá otočená- nic se nestane (return false), karty mají jinak hodnotu null
        }

        card.classList.add('showed');    // přidej do seznamu odkrytých karet

        if (!firstCard) {                   //pokud neexistuje první karta,tak jí přiřaď "aktuálně otočenou" kartu a nic nedělej
            firstCard = card;
            return false;
        }

        secondCard = card;                  // proběhne pokud první karat mám kartu. -> druhé kartě se přiřadí "aktuálně otočená" karta


        // máme obě karty otočené a musíme porovnat, zda se shodují

        if (firstCard.innerText === secondCard.innerText) {           //pokud se texty shodují:
            points++;
            cardsShowed += 2;
            firstCard = null;
            secondCard = null;

            if (cardsShowed === cities.length) {
                setTimeout(function () {
                    alter('Congratulations! You are winner! Your points are: ' + points);
                }, 1000);
            }
        }
        else {
            points--;

            if (points < 0) {          // hráč nemůže mít záporné body
                points = 0;
            }

            setTimeout(function () {
                firstCard.classList.remove('showed');        //první kartu odstraníme ze seznamu odkrytých karet
                secondCard.classList.remove('showed');
                firstCard = null;              //nastav jim hodnotu null
                secondCard = null;
            }, 1000);
        }
        pointsBox.innerText = points;        //zobrazí aktuální body na stránce 
    });
};

var addCard = function (name) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    compareCard(card);
    gameField.appendChild(card);
};


cities.forEach(function (city) {            //připojit všehny města
    addCard(city);
});

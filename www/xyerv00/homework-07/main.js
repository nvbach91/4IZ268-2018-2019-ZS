var cities = ['Praha', 'Brno', 'Hradec Králové', 'Plzeň', 'Olomouc', 'Opava', 'Karlovy Vary', 'České Budějovice', 'Náchod', 'Nymburk' ];
cities = cities.concat(cities);
cities.sort(function() { return .5 - Math.random(); });

var selectedA, selectedB;
var rootElement = document.getElementById('game-play');
var points = document.getElementById('score');
var score = 0;

//funkce po kliknutí na kartu

var onClick = function(event) {

    //kontrola, zda nemáme již otevřené nějaké karty a pokud ano, tak je "zavřeme"

    if (selectedA != null && selectedB != null) {
        selectedB.classList.remove("opened");
        selectedA.classList.remove("opened");
        selectedA.innerText = "";
        selectedB.innerText = "";
        selectedA = null;
        selectedB = null;

        return;
    }
    //propsání názvu města na kartu

    event.target.innerText = event.target.myText;

    //přiřazení stylu pro otevřenou kartu

    event.target.classList.add('opened');

    //uložení otevřené karty do pomocné proměnné

    if (!selectedA) {
        selectedA = event.target;
    } else {
        selectedB = event.target;
    }

    //porovnání karet

    if (selectedA != null && selectedB != null) {
        if (selectedA.myText == selectedB.myText) {
            score++;
            points.innerText = score;
            selectedA = null;
            selectedB = null;
        }
    }
    
}

//generování hracích karet do hracího pole

for (i=0; i<20; i++) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = "";
    card.addEventListener('click', onClick);
    card.myText = cities[i];
    rootElement.appendChild(card);
}



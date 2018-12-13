/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 *
 * Vytvořte zjednodušenou hru Pexeso pro jednoho hráče čistě pomocí JavaScriptu a CSS pro stylování
 * (tj. nebudete šahat do výchozího HTML souboru).
 * Hra bude spočívat v postupném otáčení karet. V každém tahu hráč otočí postpně dvě karty a
 * pokud se shodují, přičte si jeden bod a karty zůstanou odhalené. Pokud se neshodují, tak
 * se karty vrátí do původního neodhaleného stavu a hráči se odečte jeden bod. Počet bodů nesmí být
 * záporný.
 *
 * Obsahem karet budou anglické názvy měst po celém světě: třeba Prague, London, Paris, Moscow,
 * California, Vancouver, Sydney... a podle nich také budete porovnávat shody. Na herní plochu
 * umístěte alespoň 20 karet (tj. do 5 sloupců a 4 řádky, vždy sudý počet). Po kliknutí se karta
 * otočí (tj. stačí aby  byl vidět obsah karty, tj, název města, nemusíte dělat animace).
 *
 * Hra skončí ve chvíli, kdy jsou všechny karty odhaleny a v tu chvíli se uživateli zobrazí celkový
 * počet bodů.
 *
 * Používejte vanila JavaScript - to jsme brali na cvičení. Nepoužívejte žádnou knihovnu.
 *
 * Návod:
 * - Vložte na stránku nějaký kontejner pro karty
 * - Nadefinujte seznam měst do pole.
 * - Naduplikujte seznam měst aby každé město tam bylo dvakrát a aby hra byla zajímavější, při každé
 *   inicializaci hry zamíchejte pořadí měst pomocí metody sort() takto
 * ```js
 * var cities = ['Barcelona', 'Dortmund', 'Madrid', 'Turin', ...];
 * cities = cities.concat(cities);
 * cities.sort(function() { return .5 - Math.random(); });
 * ```
 * - Vytvořte funkci, která bude mít na starost vytvořit jednu kartu.
 *     - document.createElement(...)
 *     - element.classList.add(...)
 *     - element.innerText = ...
 *     - element.addEventListener(...)
 *     - viditelnost obsahu karty naimplemenujte dle libosti, třeba to bude
 *         - pomocí barvy písmena a pozadí, pak jenom změníte barvu jednoho z nich
 *         - pomocí vnořeného elementu, který by měl visibility nebo display none, atd.
 * - Pomocí této funkce budete vytvářet 20+ karet v cyklu podle seznamu měst a přitom je
 *   budete vkládat do kontejneru karet
 * - Pro porovnání obsahu karet můžete použít dvě globální proměnné, které se budou měnit dle stavu hry, tj.
 *   hodnoty těchto proměnných se budou měnit v závislosti na otevřených kartách. Např. když kliknete na
 *   první kartu tak se přiřadí do první proměnné. Když kliknete na druhou kartu, tak se přiřadí do druhé
 *   proměnné a pak je budete porovnávat jejich obsah. Po skončení tahu se obě proměnné resetují
 *   a začne nový tah.
 * - Uživatel může otočit maximálně dvě karty najednou.
 */

var gameField = document.querySelector('#game-field');
var pointsContainer = document.querySelector('#points');

var cities = ['London', 'Berlin', 'Prague', 'Vienna', 'Florence', 'Rome', 'Manchester', 'Paris', 'Barcelona', 'Oslo'];
cities = cities.concat(cities);
cities.sort(function () {
    return 0.5 - Math.random();
});

var points = 0;
var firstCard = "";
var secondCard = "";
var nCards = cities.length;
var nRevealedCards = 0;

var chooseCard = function (card) {
    card.addEventListener('click', function () {
        if ((secondCard && firstCard) || card.classList.contains('revealed')) {
            return false;
        }

        card.classList.add('revealed');

        if (firstCard === "") {
            firstCard = card;
            return false;
        }

        secondCard = card;
        getPoints();
        isEnd();
    });
};

var getPoints = function () {
    if (firstCard.innerText === secondCard.innerText) {
        points++;
        nRevealedCards += 2;
        firstCard = "";
        secondCard = "";
    }

    else {
        if (points > 0) {
            points--
        }
        setTimeout(function () {
            firstCard.classList.remove('revealed');
            secondCard.classList.remove('revealed');
            firstCard = "";
            secondCard = "";
        }, 1000);
    }

    pointsContainer.innerText = points;
};

var isEnd = function () {
    if (nRevealedCards === nCards) {
        if (points <= 5) {
            alert('Nic moc, získal jsi: ' + points + '/' + nCards / 2 + ' bodů');
        }

        else alert('Dobrá práce, získal jsi: ' + points + '/' + nCards / 2 + ' bodů');
    }
};

///////////////////////
var createCard = function (city) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = city;
    gameField.appendChild(card);
    chooseCard(card);
};

cities.forEach(function (city) {
    createCard(city);
});
///////////////////////
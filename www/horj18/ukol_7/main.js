

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
var pointsOutput = document.querySelector('#points');
var points = pointsOutput.innerText;

var cardOne = null;
var cardTwo = null;


var pokemons = ['Charizard', 'Dratini', 'Snorlax', 'Tyranitar', 'Gyarados', 'Golem', 'Aerodactyl', 'Makuhita', 'Gengar', 'Vaporeon'];
var pokemonLeft = pokemons.length;
pokemons = pokemons.concat(pokemons);
pokemons.sort(function () {
    return 0.5 - Math.random();
});


var validate = function () {
    if (cardOne.innerText === cardTwo.innerText) {
        correct();
    } else {
        wrong();
    }
};

var correct = function() {
    points++;
        pokemonLeft--;
        cardOne = null;
        cardTwo = null;
        if (pokemonLeft === 0) {
            setTimeout(function () {
                alert('Congratulations! You have completed the game with ' + points + ' points');
            }, 500);
        }
};

var wrong = function() {
    if (points > 0) {
        points--;
    }
    setTimeout(function () {
        cardOne.classList.remove('revealed');
        cardTwo.classList.remove('revealed');
        cardOne = null;
        cardTwo = null;
    }, 700);
}
var guess = function (card) {
    card.addEventListener('click', function () {
        if (card.classList.contains('revealed')) {
            return;
        }
        if ((cardOne !== null) && (cardTwo !== null)) {
            return;
        }
        card.classList.add('revealed');
        if (cardOne === null) {
            cardOne = card;
            return;
        } else { cardTwo = card; }
        validate();
        pointsOutput.innerText = points;
    });
}

var loadCard = function (name) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    gameField.appendChild(card);
    guess(card);
}

pokemons.forEach(function (pokemon) {
    loadCard(pokemon);
});
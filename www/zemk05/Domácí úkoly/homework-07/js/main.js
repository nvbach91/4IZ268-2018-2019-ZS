/*
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


/*Když hra začne, promíchají se karty. */
var cities = ['London', 'Dublin', 'New York', 'Lisabon', 'Rome', 'Prague', 'Berlin', 'Paris', 'Sydney', 'Canberra'];
cities = cities.concat(cities);
cities.sort(function () {
    return 0.5 - Math.random();
});

/*Deklarace proměnných pexesa */
var firstCard = null;
var secondCard = null;
var revealedCards = 0;
var points = 0;
var nextMoving = true;

/*Propojení html prvků s proměnnými */
var gameField = document.querySelector('#game-field');
var pointsField = document.querySelector('#points');

/*Vytvoření funkce timeru na úspěšný konec hry. */
var ending = function () {
    alert('Congratulations! Your score is ' + points + ' points.');
}
/*Vytvoření funkce timeru na resetování tahu. */
var reset = function () {
    firstCard.classList.remove('revealed');
    secondCard.classList.remove('revealed');
    firstCard = null;
    secondCard = null;
    nextMoving = true;
}
/*for each cyklus na přidání měst do karet */
var beginning = function (){
    for (var i = 0; i < cities.length; i++) {
        createCard(cities[i]);
    }
}
/*Přidání karet s městy na hrací pole*/
var createCard = function (cities) {
    var newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerText = cities;
    newCard.addEventListener('click', function (e) {
        e.preventDefault();
        //pokud nová karta obsahuje třídu revealed a zároveň se může otočit (nemáme dosud dvě karty otočené)
        if (!newCard.classList.contains('revealed') && nextMoving) {
            turnOver(newCard);
        }
    });
    gameField.appendChild(newCard);
}
/*Otáčení karet*/
var turnOver = function (card) {
    //přidám vlastnost otočení
    card.classList.add('revealed');
    //ptám se, pokud je proměnná určená pro první kartu prázdná, pokud není, vkládám do druhé proměnné
    if (firstCard !== null) {
        secondCard = card;
        if (firstCard.innerText === secondCard.innerText) {
            //vyhrává tah
            points++;
            revealedCards += 2;
            firstCard = null;
            secondCard = null;
        } else {
            //prohrává tah
            points--;
            if (points < 0) {
                points = 0;
            }
            nextMove = false;
            setTimeout(reset, 1000);
        }
        //zobrazení počtu bodů na obrazovce
        pointField.innerText = points;
    } else {
        firstCard = card;
    }
    //pokud jsme uhádli všechny karty, hra končí
    if (revealedCards === cities.length) {
        setTimeout(ending, 1000);
    }
}
beginning();

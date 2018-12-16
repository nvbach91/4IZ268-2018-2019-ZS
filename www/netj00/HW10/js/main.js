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

var champions = ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "AurelionSol", "Azir",
    "Bard", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Chogath", "Corki", "Darius", "Diana",
    "Draven", "DrMundo", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank",
    "Garen", "Gnar", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Illaoi", "Irelia", "Ivern", "Janna", "JarvanIV",
    "Jax", "Jayce", "Jhin", "Jinx", "Kaisa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn",
    "Kennen", "Khazix", "Kindred", "Kled", "KogMaw", "Leblanc", "LeeSin", "Leona", "Lissandra", "Lucian", "Lulu", "Lux",
    "Malphite", "Malzahar", "Maokai", "MasterYi", "MissFortune", "MonkeyKing", "Mordekaiser", "Morgana", "Nami", "Nasus",
    "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Quinn", "Rakan",
    "Rammus", "RekSai", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen", "Shyvana", "Singed",
    "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Syndra", "TahmKench", "Taliyah", "Talon", "Taric", "Teemo",
    "Thresh", "Tristana", "Trundle", "Tryndamere", "TwistedFate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar",
    "Velkoz", "Vi", "Viktor", "Vladimir", "Volibear", "Warwick", "Xayah", "Xerath", "XinZhao", "Yasuo", "Yorick", "Zac",
    "Zed", "Ziggs", "Zilean", "Zoe", "Zyra"];

var cards = [];
var eGame = document.getElementById("game-field");
var ePoints = document.getElementById("points");
var flippedCard1;
var flippedCard2;
var score = 50;

// --------------------------------------------------------------------------------------------------------------------


function populateCards() {
    let tempChampions = champions.slice(0);
    for (let n = 0; n < 10; n++) {
        let random = Math.floor(Math.random() * tempChampions.length);
        cards.push(tempChampions[random]);
        cards.push(tempChampions[random]);
        tempChampions.splice(random, 1);
    }
}

function shuffleArray(array) {
    return array.sort(function () {
        return 0.5 - Math.random();
    });
}

function createCardElement(id) {
    let elementGame = document.createElement("div");
    elementGame.classList.add("card");
    elementGame.id = id;
    elementGame.addEventListener("click", cardsClick);
    eGame.appendChild(elementGame);
}

function cardsClick(e) {
    if (e.target.classList.contains("revealed"))
        return;
    if (flippedCard1 && flippedCard2)
        compareCards();
    if (flippedCard1) {
        flippedCard2 = e.target;
        hadWon();
    }
    else
        flippedCard1 = e.target;
    e.target.innerText = cards[e.target.id];
    e.target.classList.add("revealed");
}

function populateGameField() {
    for (let i = 0; i < cards.length; i++) {
        createCardElement(i);
    }
}

function compareCards() {
    if (flippedCard1.innerText !== flippedCard2.innerText) {
        flippedCard1.innerText = "";
        flippedCard2.innerText = "";
        flippedCard1.classList.remove("revealed");
        flippedCard2.classList.remove("revealed");
        score--;
    }
    else {
        score++;
    }
    ePoints.innerText = score;
    flippedCard1 = null;
    flippedCard2 = null;
}

function hadWon() {
    let revealedCards = eGame.getElementsByClassName("revealed");
    console.log(revealedCards.length);
    if (revealedCards.length >= 19) {
        score++;
        alert("Congratulations! You have won some weird pexeso... but was it worth your time? Anyway here is your score: " + score);
    }
}

function init(){
    champions = shuffleArray(champions);
    populateCards();
    cards = shuffleArray(cards);
    populateGameField();
}


// -------------------------------------------main---------------------------------------------------------------------

init();
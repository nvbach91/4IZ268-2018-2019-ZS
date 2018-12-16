/* Pexeso or simply Pairs.
Vytvořte zjednodušenou hru Pexeso pro jednoho hráče čistě pomocí JavaScriptu a CSS pro stylování (tj. nebudete šahat na výchozí HTML soubor).

Hra bude spočívat v postupném otáčení karet. V každém tahu hráč otočí postupně dvě karty a pokud se shodují, přičte si jeden bod a karty zůstanou odhalené. Pokud se neshodují, tak se karty vrátí do původního neodhaleného stavu a hráči se odečte jeden bod. Počet bodů nesmí být záporný.

Karty budou obsahovat anglické názvy měst po celém světě: třeba Prague, London, Paris, Moscow, California, Vancouver, Sydney... a podle nich také budete porovnávat shody. Alternativně můžete tam dát třeba názvy států, názvy rostlin, názvy vlaků, názvy ulic, názvy zvířat, názvy firem, jména fotbalistů, jména pokémonů, ... prostě cokoliv, ale musí to být jedno téma.

Na herní plochu umístěte alespoň 20 karet (tj. do 5 sloupců a 4 řádky, a to vždy sudý počet) v náhodném pořadí.

Po kliknutí se karta otočí (tj. stačí aby byl vidět obsah karty, tj. název města, nemusíte dělat animace). Hra skončí ve chvíli, kdy jsou všechny karty odhaleny a uživateli se zobrazí celkový počet bodů.

Používejte pouze Vanilla JavaScript, případně ES6, ES7. Pokud někdo chce používat jQuery, tak ať mi předem napíše do mailu.
 */
var cars = [
  'BMW',
  'Audi',
  'Opel',
  'Mercedes',
  'Citroen',
  'Peugeot',
  'Fiat',
  'Porsche',
  'Škoda',
  'Renault'
]
cars = cars.concat(cars)
cars.sort(function () {
  return 0.5 - Math.random()
})
var firstCard = null
var secondCard = null
var score = 0
var cardsRevealed = 0

var gameField = document.querySelector('#game-field')
var points = document.querySelector('#game-points')

var bindCard = function (card) {
  card.addEventListener('click', function () {
    if (card.classList.contains('revealed')) {
      return false
    }

    if (firstCard && secondCard) {
      return false
    }

    card.classList.add('revealed')

    if (!firstCard) {
      firstCard = card
      return false
    } else {
      secondCard = card
    }

    if (firstCard.innerText === secondCard.innerText) {
      score++
      cardsRevealed++
      firstCard = null
      secondCard = null

      if (cardsRevealed === cars.length / 2) {
        setTimeout(function () {
          alert(
            'Konec hry. Tvoje skore je:' +
              score +
              ' Bodu z ' +
              cars.length / 2 +
              ' možných'
          )
        }, 150)
      }
    } else {
      score--

      if (score < 0) {
        score = 0
      }
      setTimeout(function () {
        firstCard.classList.remove('revealed')
        secondCard.classList.remove('revealed')
        firstCard = null
        secondCard = null
      }, 750)
    }

    points.innerText = score
  })
}

var createCard = function (name) {
  var card = document.createElement('div')
  card.classList.add('card')
  card.innerText = name
  bindCard(card)
  gameField.appendChild(card)
}

cars.forEach(function (cars) {
  createCard(cars)
})

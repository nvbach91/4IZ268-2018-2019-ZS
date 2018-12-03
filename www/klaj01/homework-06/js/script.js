/**
 * Long live Sparta! Vytvořte funkci, která vyřeší Caesarovu širfu. Funkce dostane 
 * na vstup zašifrovaný text a také hodnotu, která byla použita při šifrování, a pak 
 * vrátí dešifrovaný text. Předpokládejte pouze anglickou abecedu s velkými 
 * písmeny, ostatní znaky ignorujte. Poté v konzoli dešifrujte/dešiftujte následující texty.
 * 
 * key used - encrypted text
 *       19 - MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG
 *        5 - YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW
 *       12 - M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ
 * 
 * Následně vytvořte uživatelské rozhraní, ve kterém bude možné zadat zmíněné dvě 
 * vstupní hodnoty (zašifrovaný text a použitý klíč) a po kliknutí na tlačítko 
 * "Decipher!" se na určeném místě zobrazí dešifrovaný text. Rozhraní také vhodně
 * nastylujte.
 */

var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var shiftChar = function (char, shift) {
    var indexOfChar = alphabet.indexOf(char);
    if (indexOfChar === -1) {
        return char;
    }

    var shiftedIndexOfChar = indexOfChar + shift;

    if (shiftedIndexOfChar >= alphabet.length) {
        shiftedIndexOfChar -= alphabet.length;
    } else if (shiftedIndexOfChar < 0) {
        shiftedIndexOfChar = alphabet.length + shiftedIndexOfChar;
    }
    return alphabet.charAt(shiftedIndexOfChar);
};

var shiftString = function (string, shift) {
    var res = '';
    for (var i = 0; i < string.length; i++) {
        res += shiftChar(string.charAt(i), shift);
    }
    return res;
};

var caesarDecipher = function (cipherText, usedKey) {
    var shift = alphabet.length - usedKey;
    var result = shiftString(cipherText, shift, alphabet);
    console.log(result);
    return result;
};

var caesarForm = document.querySelector('#decoder-form');
var cipherTextInput = document.querySelector('#text-input');
var cipherKeyInput = document.querySelector('#decode-key');
var decipheredTextDisplay = document.querySelector('#decoded-text');

caesarForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var cipherText = cipherTextInput.value;
    var cipherKey = cipherKeyInput.value;
    if (!cipherText || !cipherKey) {
        alert('Please enter both information');
        return false;
    }
    var decipheredText = caesarDecipher(cipherText, parseInt(cipherKey));
    decipheredTextDisplay.innerHTML = decipheredText;
});

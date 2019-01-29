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

var shiftChar = function (c, shift) {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
    var index = alphabet.indexOf(c);
    if (index > -1) {
        index -= shift;
        while (index < 0) {
            index += alphabet.length;
        }
        return alphabet.charAt(index);
    }
    return c;
};

var shiftString = function (str, shift) {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    var stringToDecipher = str;
    var decipheredString = "";
    for (var i = 0; i < stringToDecipher.length; i++) {
        var charToDecipher = stringToDecipher.charAt(i);
        decipheredString += shiftChar(charToDecipher, shift);
    }
    return decipheredString;
};
var caesarDecipher = function (cipherText, usedKey) {
    // your implementation goes here
    var result = shiftString(cipherText, usedKey);
    return result;
};

var form = document.querySelector('#decipher-form');
var textInput = document.querySelector('#text-input');
var keyInput = document.querySelector('#key-input');
var resultArea = document.querySelector('#result');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var insertedText = textInput.value;
    var insertedKey = keyInput.value;

    if (insertedText === "") {
        alert('The text to decipher must be filled out!')
        return false;
    }
    if (insertedKey === "") {
        alert('The key must be filled out!')
        return false;
    }
    if (isNaN(insertedKey)) {
        alert('The key must be a number!')
        return false;
    }
    if (insertedKey < 0) {
        alert('The key cannot be a negative number!');
        return false;
    }
    var result = caesarDecipher(insertedText.toUpperCase(), insertedKey);
    resultArea.innerHTML = result;
})


// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);
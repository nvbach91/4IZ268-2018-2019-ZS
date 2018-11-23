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

var DecipherTextPart = document.querySelector('#to_decipher');
var DeciIndexPart = document.querySelector('#deci_index');
var OutputPart = document.querySelector('#output');
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var shiftChar = function (c, shift) {
    var position = alphabet.indexOf(c.toUpperCase());
    if (position === -1) {
        return c;
    }
    position -= shift;
    if (position < 0) {
        position += 26;

    }
    return alphabet.charAt(position);
};

var shiftString = function (str, shift) {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
        arr[i] = shiftChar(str.charAt(i), shift);
    };
    return arr.join("");
    /*var arr = str.split("")
    var i;
    for (var i = 0; i < arr.length; i++) {
        arr[i] = shiftChar(arr[i], shift);
    };
    return arr.join("");*/
}

var caesarDecipher = function (cipherText, usedKey) {
    var arr = cipherText.split()
    for (var i = 0; i < arr.length; i++) {
        arr[i] = shiftString(arr[i], usedKey);
    };
    return arr.join(" ");
};

deci_form.addEventListener('submit', function (e) {
    e.preventDefault();
    var DecipherText = DecipherTextPart.value;
    var DeciIndex = DeciIndexPart.value;
    var Deciphered = caesarDecipher(DecipherText, DeciIndex)
    OutputPart.innerHTML = Deciphered;
});


// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));
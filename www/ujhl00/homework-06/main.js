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

// albert einstein
//caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);
// john archibald wheeler
//caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);
// charles darwin
//caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

var caesarForm = document.querySelector('#caesar');
var cipherTextInput = document.querySelector('#text');
var cipherKeyInput = document.querySelector('#key');
var decipheredTextDisplay = document.querySelector('#deciphered-text');

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
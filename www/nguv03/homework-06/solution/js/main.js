
//jednoduchý posun písmen o jedno + vrátit hodnotu

var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var shiftChar = function (char, shift) {
    var indexOfChar = alphabet.indexOf(char);
    if (indexOfChar === -1) {
        return char;
    }


//po XYZ začít znovu u ABC (asi pomocí odečtení zpátky na 0)

    var shiftedIndexOfChar = indexOfChar + shift;
    
    if (shiftedIndexOfChar >= alphabet.length) {
        shiftedIndexOfChar -= alphabet.length;
    } else if (shiftedIndexOfChar < 0) {
        shiftedIndexOfChar = alphabet.length + shiftedIndexOfChar;
    }
    return alphabet.charAt(shiftedIndexOfChar);
};


//volá opakovaně funkci pro každé písmenko + vypisuje hodnotu

var shiftString = function (string, shift) {
    var res = '';
    for (var i = 0; i < string.length; i++) {
        res += shiftChar(string.charAt(i), shift);
    }
    return res;
};




//přijímá šifrovaný text a používá klíč (klíč je kalkul posunu) (je to jakoby opak shiftu) na dešifraci

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




//pro grafické rozhraní


var caesarForm = document.querySelector('#caesar-form');
var cipherTextInput = document.querySelector('#cipher-text');
var cipherKeyInput = document.querySelector('#cipher-key');
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
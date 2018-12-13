var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

//rozpoznávání nového písmenka

var shiftChar = function (c, shift){
    var indexofChar = alphabet.indexOf(c);
    var shiftedcharIndex = indexofChar + shift;
    

    var shiftedindexofChar = indexofChar + shift;

    if (shiftedindexofChar >= alphabet.length){
        shiftedindexofChar -= alphabet.length
    } else if(shiftedindexofChar < 0){
        shiftedindexofChar = alphabet.length + shiftedindexofChar;
    }
    return alphabet.charAt(shiftedindexofChar)

};


var shiftString = function (string, shift){
    var res = '';
    for (var i=0; i < string.length; i++){
        res += shiftChar(string.charAt(i), shift);
    }
    console.log(res);
    return res;
};

var caesarDecipher = function(cipherText, usedKey){
    var shift = alphabet.length - usedKey;
    var result = shiftString(cipherText, shift, alphabet);
    console.log(result)
    return result;
};

//graphics

var caesarForm = document.querySelector('#caesar-form');
var cipherTextInput = document.querySelector('#cipher-text');
var cipherKeyInput = document.querySelector('#cipher-key')
var decipheredTextDisplay = document.querySelector('#deciphered-text');

caesarForm.addEventListener('submit', function(e){
 e.preventDefault();
 var cipherText = cipherTextInput.value;
 var cipherKey = cipherKeyInput.value;
 if (!cipherText || !cipherKey) {
     alert('Please enter both values');
     return false;
 }

 var decipheredText = caesarDecipher(cipherText, parseInt(cipherKey));
 decipheredTextDisplay.innerHTML = decipheredText;
});

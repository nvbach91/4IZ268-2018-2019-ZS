var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//65-90



var shiftChar = function (c, shift) {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result

    var char = alphabet.indexOf(c);
    if (char === -1) {
        return c;
    };


    char -= shift;
    if (char < 0) {
        char += 26;

    }

    return alphabet.charAt(char);
};


var shiftString = function (str, shift) {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    var output = "";

    for (var i = 0; i < str.length; i++) {
        output += shiftChar(str.charAt(i), shift);
    };

    return output;
}

var caesarDecipher = function (cipherText, usedKey) {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there

    var output = shiftString(cipherText, usedKey);
    return output;
};


//Proč mi to nejde !! problém s getelement ? 
//document.getElements('decipher-button').addEventListener('click', function () { alert('hello!'); });


var cipher = document.querySelector(".cipher-input");
var key = document.querySelector(".key-input");
var outputText = document.querySelector(".output");

var cesar = function () {

    var c = cipher.value;
    var k = key.value;


    var decipher = caesarDecipher(c, k);

    outputText.innerHTML = decipher;
};







// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);
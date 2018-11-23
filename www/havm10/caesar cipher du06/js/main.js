var inputText = document.querySelector('#input-text');
var inputShift = document.querySelector('#input-shift');
var decryptionForm = document.querySelector('#decryption-form');
var outputText = document.querySelector('#output-text');


var decryption = function (ordinalChar) {
    var validateShift = loadShift(inputShift.value);
    var moduloShift = validateShift % 26;
    var decryptedOrdinalChar = ordinalChar - moduloShift;

    if (decryptedOrdinalChar < 65) {
        decryptedOrdinalChar = decryptedOrdinalChar + 26;
    }
    return String.fromCharCode(decryptedOrdinalChar);
}

/**zajistni ze se načtou pouze cisla*/
var loadShift = function (shift) {
    var completeShift = ""
    for (var i = 0; i < shift.length; i++) {
        var ordinalChar = shift.charCodeAt(i);
        console.log(ordinalChar);
        if (ordinalChar > 47 && ordinalChar < 58) {
            console.log(shift);
            var a = String.fromCharCode(ordinalChar);
            completeShift = completeShift + a;
        }
    }
    return completeShift;
}

var loadText = function (encrypted) {
    var string = encrypted.toUpperCase();
    var decrypted = "";
    for (var i = 0; i < string.length; i++) {
        var ordinalChar = string.charCodeAt(i);
        if (ordinalChar > 64 && ordinalChar < 91) {
            var a = decryption(ordinalChar);
            decrypted = decrypted + a;
        }

        /**navic aby slo pridat do textu mezeru */
        if (ordinalChar === 32) {
            decrypted = decrypted + " ";
        }
    }
    return decrypted;
}

decryptionForm.addEventListener('submit', function (e) {
    outputText.innerText = "";
    e.preventDefault();
    var decryptedOutput = loadText(inputText.value);
    outputText.innerText += decryptedOutput;
})
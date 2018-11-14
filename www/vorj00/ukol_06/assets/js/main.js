/* fce převzata: https://stackoverflow.com/questions/24597634/how-to-generate-an-array-of-alphabet-in-jquery */

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

const alphabetUpper = genCharArray('A', 'Z'); // ["A", ..., "Z"]

function caesar(key, text){
    let decrypted = "";
    let textChars = text.split("");

    textChars.forEach(char => {
        if(alphabetUpper.includes(char)){
            let charIndex = alphabetUpper.indexOf(char);
            let charDecrypted = charIndex - key;
            
            if(charDecrypted >= 0){
                decrypted += alphabetUpper[charDecrypted]
            } else {
                decrypted += alphabetUpper[charDecrypted + alphabetUpper.length];
            }
        } else {
            decrypted += char;
        }
    });
    
    return decrypted;
}

console.log(caesar(19, "MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG"))
console.log(caesar(5, "YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW"))
console.log(caesar(12, "M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ"))

const form = document.querySelector("#js-form");
const inputText = document.querySelector("#js-text");
const inputKey = document.querySelector("#js-key")

const resultText = document.querySelector("#js-result");

form.addEventListener("submit", function(e){
    e.preventDefault();

    textValue = inputText.value;
    keyValue = inputKey.value;

    console.log(textValue,keyValue);
    

    let result = caesar(keyValue, textValue);
    resultText.innerHTML = result;
})
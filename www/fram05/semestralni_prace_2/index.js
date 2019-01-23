const charSets = {
    "lowercase": "abcdefghijklmnopqrstuvwxyz",
    "uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "numbers": "1234567890",
    "others": "@/\\()-*+#&"
};
const form = document.getElementById("password-generator");
const submitButton = document.querySelector("#password-generator button[type='submit']");
submitButton.focus();
form.addEventListener("submit", function (ev) {
    // Prevent sending of the form
    ev.preventDefault();

    const passwordLength = document.getElementById("password-length").value;

    // get all option inputs
    const options = document.querySelectorAll(".input-box input");
    var passwordCharsSet = "";

    // if they are selected, add charset by input name to final set
    options.forEach(option => {
        if (option.checked) {
            passwordCharsSet += charSets[option.getAttribute("value")]
        }
    });

    // generate final password
    const password = generatePassword(passwordCharsSet, passwordLength);

    // render password to DOM
    document.querySelector("#generated-password input").value = password;
});

function generatePassword(chars, length) {
    var password = "";
    for (var i = 0; i < length; i++) {
        password += chars[getRandomInt(chars.length)];
    }
    return password;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


const input = document.getElementById("hash-input");
const result = document.getElementById("hash-result");


const md5 = new Hashes.MD5;
const sha1 = new Hashes.SHA1;
const sha256 = new Hashes.SHA256;
const sha512 = new Hashes.SHA512;

document.getElementById("hash-md5").addEventListener("click", ev => result.value = createHash(input.value, md5.hex));
document.getElementById("hash-sha1").addEventListener("click", ev => result.value = createHash(input.value, sha1.hex));
document.getElementById("hash-sha256").addEventListener("click", ev => result.value = createHash(input.value, sha256.hex));
document.getElementById("hash-sha512").addEventListener("click", ev => result.value = createHash(input.value, sha512.hex));



function createHash(text, hashFunction) {
    return text != "" ? hashFunction(text) : "";
}
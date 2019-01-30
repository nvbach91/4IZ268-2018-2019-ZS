function copy() {
    var copyText = document.getElementById("hash-result");
    copyText.select();
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
}
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
    const password1 = generatePassword(passwordCharsSet, passwordLength);
    const password2 = generatePassword(passwordCharsSet, passwordLength);
    const password3 = generatePassword(passwordCharsSet, passwordLength);
    const password4 = generatePassword(passwordCharsSet, passwordLength);
    const password5 = generatePassword(passwordCharsSet, passwordLength);
    // render password to DOM
    document.querySelector("#generated-password1 input").value = password1;
    document.querySelector("#generated-password2 input").value = password2;
    document.querySelector("#generated-password3 input").value = password3;
    document.querySelector("#generated-password4 input").value = password4;
    document.querySelector("#generated-password5 input").value = password5;
});

function generatePassword(chars, length) {
    var password = "";
    for (var i = 0; i < length; i++) {
        password += chars[getRandomInt(chars.length)];
    }


    showMailModal();



    return password;
}




var clientId = '980441235767-inqc3re5c2f030nodoqpp9pbe0ork7s1.apps.googleusercontent.com';
var apiKey = 'AIzaSyCvPbh_f_-J3Fto0awQ3o1d7-j6b-2zspc';
var scopes =
    ['https://www.googleapis.com/auth/gmail.send'];

function handleAuthClick() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
    }, handleAuthResult);
    return false;
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {

        gapi.client.load('gmail', 'v1', "").then(() => {


            sendMessage({
                'To': $("#mail-name").val(),
                'Subject': 'HAHA'
            }, "Your passwords are: " + createStringFromPasswords() + ".", "");
            closeMailModal();
        });
    } else {
        $(".mail-modal__container").children().remove();
        $(".mail-modal__container").html("<button id='authorize-button'>Autorize</button>")
        $('#authorize-button').removeClass("hidden");
        $('#authorize-button').on('click', function () {
            handleAuthClick();
        });
    }
}


function createStringFromPasswords() {
    var string = "";
    var counter = 0;
    const inputs = document.querySelectorAll("#password-generator input[type='text']");
    inputs.forEach(input => {
        string += input.value;
        counter++;
        if (counter < inputs.length) string += ", ";
    });
    return string;
}

function sendMessage(headers_obj, message, callback) {
    var email = '';
    for (var header in headers_obj)
        email += header += ": " + headers_obj[header] + "\r\n";
    email += "\r\n" + message;
    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });
    return sendRequest.execute(callback);
}


function showMailModal() {
    if (document.querySelector(".mail-modal")) return false;

    const modal = document.createElement("DIV");
    modal.classList.add("mail-modal");

    const container = document.createElement("DIV");
    container.classList.add("mail-modal__container");

    const heading = document.createElement("P");
    heading.innerText = "Would you like the passwords to be send to your e-mail adress?";
    heading.classList.add("mail-modal__heading");

    const yesButton = document.createElement("BUTTON");
    yesButton.classList.add("button");
    yesButton.setAttribute("id", "mail-yes");
    yesButton.innerText = "YES";

    yesButton.addEventListener("click", ev => {

        $(".mail-modal__container").children().remove();
        $(".mail-modal__container").html("<p>Please insert e-mail, where passwords should be sended:<input type='text' id='mail-name' /></p><button id='submit-mail-name'>Send</button>");

        document.getElementById("submit-mail-name").addEventListener("click", ev => {
            gapi.client.setApiKey(apiKey);
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: true
            }, handleAuthResult);
        });


    });

    const noButton = document.createElement("BUTTON");
    noButton.classList.add("button");
    noButton.setAttribute("id", "mail-no");
    noButton.innerText = "NO";
    noButton.addEventListener("click", ev => {
        closeMailModal();
    });

    container.appendChild(heading);
    container.appendChild(noButton);
    container.appendChild(yesButton);

    modal.appendChild(container);


    document.querySelector("body").appendChild(modal);
}

function closeMailModal() {
    if (!document.querySelector(".mail-modal")) return false;

    document.querySelector("body").removeChild(document.querySelector(".mail-modal"));
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

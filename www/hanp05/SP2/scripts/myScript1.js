/*FB JavaScript SDK*/

/*přiřazuje html elementy k proměnným*/
var postTxt;
var checkBoxContainer = document.querySelector("#checkBoxContainer");
var checkBoxForm = document.querySelector("#checkBoxForm");
var groups;
var errorOccurred = false;
var messageSent = false;
var atLeastOneChecked;
var mainLoader = document.querySelector("#loader");
var postSend;
var shareBtn = document.querySelector('#shareBtn');;
var loginBtn = document.querySelector('#fbLoginButton');
var fbStatus = document.querySelector('#fbStatus');
var textarea = document.querySelector('#textarea');
var checkValidityBtn = document.querySelector('#checkValidityBtn');

var userName;
var pathToProfilePhoto;
var profilePhoto = document.querySelector('#profilePhoto');
var userNameElement = document.querySelector('#userName');
var profileRow = document.querySelector('.profileRow');

/*přiřazuje eventy k příslušným html elementům*/
shareBtn.addEventListener("click", postFb);
loginBtn.addEventListener("click", loginFb);
textarea.addEventListener("click", resetIndicators);

/*Základní napojení FB api */
window.fbAsyncInit = function () {
    FB.init({
        appId: '360643444726398',
        xfbml: true,
        version: 'v3.2'
    });
    FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*zjišťuje status připojení na FB*/
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        getUserInfo();

        $(fbStatus).html("Povolen přístup na FB");
        $(loginBtn).hide();
        $(shareBtn).show();
        findGroups();
    } else if (response.status === 'not_authorized') {
        $(fbStatus).html("Nepovolen přístup na FB");
        $(shareBtn).hide();
    } else {
        $(fbStatus).html("Nepřihlášen na FB");
        $(shareBtn).hide();

    }
}

/* zjistí informace o profilu*/
function getUserInfo() {
    getUserName();
    getProfilePicture();
}

function getProfilePicture() {
    FB.api(
        '/me/picture',
        'GET',
        { "redirect": "false" },
        function (response) {
            pathToProfilePhoto = response.data.url;
            $(profilePhoto).attr("src", pathToProfilePhoto);
            $(profilePhoto).show();
        }
    );


}

function getUserName() {
    FB.api(
        '/me?fields=id,name',
        'GET',
        { "redirect": "false" },
        function (response) {
            userName = response.name;
            $(userNameElement).html(userName);
        }
    );
}

/*reaguje na tlačítko login a přes fb api jej řeší*/
function loginFb() {
    FB.login(function (response) {
        statusChangeCallback(response)
    }, { scope: 'email,user_likes,publish_to_groups' });
}
/*kontroluje, aby textarea nebyla prázdná*/
function checkIfEmpty() {
    if (!postTxt) {
        checkValidityBtn.click();
        return true;
    } else {
        return false;
    }
}

function checkIfOnlyWhitespaces() {
    postTxt = postTxt.replace(/^\s+/, '').replace(/\s+$/, '');
    if (!postTxt) {
        window.alert("Nepoužívej pouze bílé znaky!")
    }
}

/*zjistí jaké fb skupiny (checkboxy) uživatel zaškrtl a u nich spustí proces odesílání příspěvku*/
function postFb() {
    atLeastOneChecked = false;
    saveTextareaToVar();
    if (checkIfEmpty()) { return; };
    groups = document.forms['checkBoxForm'].elements['fbGroup'];
    for (var i = 0, len = groups.length; i < len; i++) {
        if (groups[i].checked) {
            // if checked ...
            atLeastOneChecked = true;
            sendToGroup(groups[i].value);
        }
    }

    if (!atLeastOneChecked) {
        window.alert("Vyber aspoň jednu Facebook skupinu, kterou spravuješ.");
        return;
    }
}

/*přes fb api odesílá obsah textboxu na fb skupinu s id předaným parametrem*/
function sendToGroup(groupId) {
    FB.api(
        "/" + groupId + "/feed",
        "POST",
        {
            "message": postTxt
        },
        function (response) {
            if (response && !response.error) {
                messageSent = true;
                var succesCheckBoxLabel = $("#label" + groupId);
                $(succesCheckBoxLabel).css({ 'color': 'green', 'font-weight': '600' });
                $(succesCheckBoxLabel).html($(succesCheckBoxLabel).html() + " &#10004");
            }

            if (response.error) {
                var errorCheckBoxLabel = $("#label" + groupId);
                $(errorCheckBoxLabel).css({ 'color': 'red', 'font-weight': '600' });
                $(errorCheckBoxLabel).html($(errorCheckBoxLabel).html() + " &#10006");
                checkIfOnlyWhitespaces();
            }
        }
    );
}

/*pomocí fb api zjišťuje u jakých skupin je uživatel adminem a podle toho pak vytváří checkboxy*/
function findGroups() {
    $("#formHeading").show();
    $(mainLoader).show();
    FB.api(

        "/me/groups",
        function (response) {

            if (response && !response.error) {
                for (var l = response.data.length, i = 0; i < l; i++) {
                    var obj = response.data[i];
                    createCheckBox(obj.name, obj.id);

                }
            }
            $(mainLoader).hide();
        },
        { admin_only: true },
    );
}

/*vytváří checkboxy fb skupin, které spravuje daný uživatel a ke kterým udělil oprávnění*/
function createCheckBox(name, value) {
    var row = document.createElement('div');
    row.className = "row";

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "fbGroup";
    checkbox.value = value;
    checkbox.id = value;
    checkbox.className = "groupCheckBox";

    var label = document.createElement('label')
    label.htmlFor = value;
    label.id = "label" + value;
    label.appendChild(document.createTextNode(name));

    checkBoxForm.appendChild(checkbox);
    checkBoxForm.appendChild(label);
}

/*ukládá obsah texboxu do proměnné*/
function saveTextareaToVar() {
    postTxt = textarea.value;
}

/* Resetuje stavy indikátorů (zelená/červená) po odeslání messege na FB skupiny. Spustí se při opětovném kliknutí na textarea po tom, co již byl odeslán nějaký příspěvek. */
function resetIndicators() {
    if (messageSent) {
        if (confirm("Přejete si vymazat obsah textového pole?")) {
            setDefaultStyleOfIndicators();
            $(textarea).val('');
        } else {
            setDefaultStyleOfIndicators();
        }
        messageSent = false;
    }
}

function setDefaultStyleOfIndicators() {
    $(checkBoxForm).contents().css({ 'color': 'black', 'font-weight': 'normal' });
}


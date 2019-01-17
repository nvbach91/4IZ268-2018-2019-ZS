/*FB JavaScript SDK*/

/*přiřazuje html elementy k proměnným*/
var postTxt;
var checkBoxContainer = document.querySelector("#checkBoxContainer");
var checkBoxForm = document.querySelector("#checkBoxForm");
var groups;
var errorOccurred = false;
var atLeastOneChecked;
var mainLoader  = document.querySelector("#loader");
var postSend;
var shareBtn = document.querySelector('#shareBtn');;
var loginBtn = document.querySelector('#fbLoginButton');
var fbStatus = document.querySelector('#fbStatus');

/*přiřazuje eventy k příslušným html elementům*/
shareBtn.addEventListener("click", postFb);
loginBtn.addEventListener("click", loginFb);


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
        console.log("přihlášen a autorizován");
        innerHTML = "Povolen přístup na FB";
        loginBtn.style.display = "none";
        shareBtn.style.display = 'inline';
        findGroups();
    } else if (response.status === 'not_authorized') {
        fbStatus.innerHTML = "Nepovolen přístup na FB";
        shareBtn.style.display = 'none';
        console.log("přihlášen ale neautorizován");
    } else {
        fbStatus.innerHTML = "Nepřihlášen na FB";
        shareBtn.style.display = 'none';
        
    }
}

/*reaguje na tlačítko login a přes fb api jej řeší*/
function loginFb() {
    console.log("Login přes custom tlačítko");
    FB.login(function (response) {
        statusChangeCallback(response)
    }, { scope: 'email,user_likes,publish_to_groups' });
}
/*kontroluje, aby textarea nebyla prázdná*/
function checkIfEmpty() {
    if (postTxt === "") {
        window.alert("Nejdříve vyplň zprávu, která se má odeslat na Facebook.")
        return true;
    } else {
        return false;
    }
}

/*zjistí jaké fb skupiny (checkboxy) uživatel zaškrtl a u nich spustí proces odesílání příspěvku*/
function postFb() {
    atLeastOneChecked = false;
    saveTextareaToVar();
    if (checkIfEmpty()) { return };
    groups = document.forms['checkBoxForm'].elements['fbGroup'];
    for (var i = 0, len = groups.length; i < len; i++) {
        if (groups[i].checked) {
            // if checked ...
            atLeastOneChecked = true;

            console.log(groups[i].value);
            sendToGroup(groups[i].value);
        }
    }
    console.log("1")


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
            console.log("2")
            if (response && !response.error) {
                var succesCheckBoxLabel = document.querySelector("#label" + groupId);
                succesCheckBoxLabel.style.cssText = "color:green;font-weight:600;";
                succesCheckBoxLabel.innerHTML = succesCheckBoxLabel.innerHTML + " &#10004"
            }

            if (response.error) {
                var errorCheckBoxLabel = document.querySelector("#label" + groupId);
                errorCheckBoxLabel.style.cssText = "color:red;font-weight:600;";
                errorCheckBoxLabel.innerHTML = errorCheckBoxLabel.innerHTML + " &#10006"
            }
        }
    );
}

/*pomocí fb api zjišťuje u jakých skupin je uživatel adminem a podle toho pak vytváří checkboxy*/
function findGroups() {
    mainLoader.style.display = "block";
    document.querySelector("#formHeading").style.display = "block";

    FB.api(

        "/me/groups",
        function (response) {

            if (response && !response.error) {
                for (var l = response.data.length, i = 0; i < l; i++) {
                    var obj = response.data[i];
                    createCheckBox(obj.name, obj.id);

                }
            }
            mainLoader.style.display = "none";
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
    postTxt = document.querySelector('#textarea').value;
    console.log("Odesílám: " + postTxt);
}


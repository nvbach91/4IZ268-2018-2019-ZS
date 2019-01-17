/*FB JavaScript SDK*/
var postTxt;
var checkBoxContainer;
var checkBoxForm;
var groups;
var errorOccurred = false;
var atLeastOneChecked;
var mainLoader;
var postSend;
var obj;

window.fbAsyncInit = function () {
    FB.init({
        appId: '245822489648720',
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
        // document.querySelector('.fb-login-button').style.display = "none";
        document.querySelector('.btn-primary').disabled = false;

        // document.querySelector('#shareBtn').style.display = 'inline';
        // findGroups();
    } else if (response.status === 'not_authorized') {
        // document.querySelector('#fbStatus').innerHTML = "Nepovolen přístup na FB";
        // document.querySelector('#shareBtn').style.display = 'none';
        console.log("přihlášen ale neautorizován");
    } else {
        // document.querySelector('#fbStatus').innerHTML = "Nepřihlášen na FB";
        // document.querySelector('#shareBtn').style.display = 'none';
        console.log("nepřihlášen");
    }
}

/*reaguje na tlačítko login a přes fb api jej řeší*/
function loginFb() {
    console.log("Login přes custom tlačítko");
    FB.login(function (response) {
        statusChangeCallback(response)
    }, { scope: 'email,user_likes,publish_to_groups' });
    findGroups();
}
/*kontroluje, aby textarea nebyla prázdná*/
function checkIfEmpty() {
    if (!postTxt) {
        window.alert("Nejdříve vyplň zprávu, která se má odeslat na Facebook.")
        return true;
    } else {
        return false;
    }
}

/*zjistí jaké fb skupiny (checkboxy) uživatel zaškrtl a u nich spustí proces odesílání příspěvku*/
function postFb() {
    saveTextareaToVar();
    if (checkIfEmpty()) { return };
    console.log("1");
    console.log(obj);
    console.log(obj.id);
    sendToGroup(obj.id);
    for (var i = 0, len = obj.length; i < len; i++) {
        console.log("posted to group" + obj[i].id);    
        sendToGroup(obj[i].id);
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
                console.log("OK");
            }

            if (response.error) {
                console.log("Nope");
            }
        }
    );
}

/*pomocí fb api zjišťuje u jakých skupin je uživatel adminem a podle toho pak vytváří checkboxy*/
function findGroups() {
    FB.api(
        "/me/groups",
        function (response) {
            if (response && !response.error) {
                for (var l = response.data.length, i = 0; i < l; i++) {
                    obj = response.data[i];
                    // createCheckBox(obj.name, obj.id);
                    console.log(obj.name);
                    console.log(obj.id);
                }
            }
        },
        { admin_only: true },
    );
}

/*ukládá obsah texboxu do proměnné*/
function saveTextareaToVar() {
    postTxt = document.querySelector('#textarea').value;
    console.log("Odesílám: " + postTxt);
}

/*přiřazuje html elementy k proměnným*/
checkBoxContainer = document.querySelector("#checkBoxContainer");
checkBoxForm = document.querySelector("#checkBoxForm");
mainLoader = document.querySelector("#loader");

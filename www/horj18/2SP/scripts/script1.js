var postTxt;
var checkBoxContainer;
var checkBoxForm;
var groups;
var errorOccurred = false;
var atLeastOneChecked;
var mainLoader;
var postSend;
var groups;
var groupName;
var groupId;


/*přiřazuje html elementy k proměnným*/
var loginBtn = document.querySelector("#loginBtn");
var shareBtn = document.querySelector("#shareBtn");
var modalGroupBody = document.querySelector("#modalGroupBody")
var sendBtn = document.querySelector("#sendBtn");



/*přiřazuje html elementy k proměnným*/
loginBtn.addEventListener("click", loginFb);
shareBtn.addEventListener("click", sharePost);

sendBtn.addEventListener("click", postToGroups);

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


/*Status pripojeni FB uzivatele*/
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log("přihlášen a autorizován");
        $('#loginModal').modal('hide');
        shareBtn.disabled = false;
        loadGroups();
    } else if (response.status === 'not_authorized') {
        console.log("přihlášen ale neautorizován");
        $('#loginModal').modal('show');
    } else {
        console.log("nepřihlášen");
        $('#loginModal').modal('show');
    }
}

/*login FB a jeho obsluha*/
function loginFb() {
    console.log("Login přes custom tlačítko");
    FB.login(function (response) {
        statusChangeCallback(response)
    }, { scope: 'email,user_likes,publish_to_groups' });
}

function sharePost() {
    $('#groupModal').modal('show');
    console.log("share button clicked");
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
function postToGroups() {
    var checkedGroups = $("#modalGroupBody input:checked");
    saveTextareaToVar();
    if (checkIfEmpty()) { return };
    console.log("1");
    checkedGroups.each(function(){
        var $this = $(this);
        sendToGroup($this.attr("id"));
        console.log("sent"+$this.attr("id"));
    });

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

function TEST() {
    var IDs = [];
    var x = $("#modalGroupBody input:checked")
    console.log("start");
    x.each(function(){
        var $this = $(this);
        IDs.push($this.attr("id"));
    });
    $(sendBtn).text("odeslano");
    console.log(IDs);
}

function checkChecked() {
    console.log("click");
    var n = $("#modalGroupBody input:checked").length;
    if (n > 0) {
        sendBtn.disabled = false;
    } else if (n === 0) {
        sendBtn.disabled = true;
    }
}

/*pomocí fb api zjišťuje u jakých skupin je uživatel adminem a podle toho pak vytváří checkboxy*/
function loadGroups() {
    FB.api(
        "/me/groups",
        function (response) {
            if (response && !response.error) {
                for (var l = response.data.length, i = 0; i < l; i++) {
                    groups = response.data[i];
                    createGroupChoice(groups.name, groups.id);
                    console.log(groups.name);
                    console.log(groups.id);
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

function createGroupChoice(groupName, groupId) {
    $(modalGroupBody).append($("<div></div>", { class: "row" }), [$('<input />', { type: "checkbox", id: groupId, class: "chckBox" }).on("click", checkChecked), $('<label />', { text: groupName, value: groupId })]);
}



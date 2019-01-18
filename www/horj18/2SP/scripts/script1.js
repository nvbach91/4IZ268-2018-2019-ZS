/*deklarance proměnných*/
var groups;
var groupName;
var groupId;

/*přiřazení elementů do proměnných*/
var loginBtn = document.querySelector("#loginBtn");
var shareBtn = document.querySelector("#shareBtn");
var modalGroupBody = document.querySelector("#modalGroupBody")
var sendBtn = document.querySelector("#sendBtn");
var textA = document.querySelector("#textarea");

/*přiřazení funkcí k elementům*/
loginBtn.addEventListener("click", loginFb);
shareBtn.addEventListener("click", sharePost);
sendBtn.addEventListener("click", changeBtn);

/*FB API*/
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


/*status pripojeni FB uzivatele*/
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        /*Načítá skupiny, zavírá okno*/
        $('#loginModal').modal('hide');
        shareBtn.disabled = false;
        loadGroups();
        $('[data-toggle="popover"]').popover();
    } else if (response.status === 'not_authorized') {
        /*Vyžaduje autorizaci aplikace*/
        $('#loginModal').modal('show');
    } else {
        /*Vyžaduje přihlášení uživatele*/
        $('#loginModal').modal('show');
    }
}

/*příhlášení/autorizace přes FB API*/
function loginFb() {
    console.log("Login přes custom tlačítko");
    FB.login(function (response) {
        statusChangeCallback(response)
    }, { scope: 'email,user_likes,publish_to_groups' });
}

/*obsluha tlačítka pro sdílení*/
function sharePost() {
    postTxt = document.querySelector('#textarea').value.trim();
    if (validateTxt()) {
        $('#groupModal').modal('show');
        $("#modalGroupBody input:checkbox").prop("checked", false);
        sendBtn.disabled = true;
    } else {
        $("#textarea").popover("show");
        setTimeout(function() { 
            $('#textarea').popover("hide"); 
        }, 4000);
        return;
    }
}

/*kontroluje zaškrtlé chceckboxy a následně odešle příspěvek*/
function selectGroups() {
    var checkedGroups = $("#modalGroupBody input:checked");
    checkedGroups.each(function () {
        var $this = $(this);
        sendToGroup($this.attr("id"));
    });

}

/*facebook API odesílá příspěvek a kontroluje úspěšnost*/
function sendToGroup(groupId) {
    FB.api(
        "/" + groupId + "/feed",
        "POST",
        {
            "message": postTxt
        },
        function (response) {
            if (response && !response.error) {
                $("[value=" + groupId + "]").css('color', 'green').css("font-weight", "bold");
            }
            if (response.error) {
                $("[value=" + groupId + "]").css('color', 'red').css("font-weight", "bold");
            }
        }
    );
}

/*kontroluje zda je alespoň jedna skupina vybrána*/
function checkChecked() {
    var n = $("#modalGroupBody input:checked").length;
    if (n > 0) {
        sendBtn.disabled = false;
    } else if (n === 0) {
        sendBtn.disabled = true;
    }
}

/*mění talčítko pro odeslání, přebarvuje zpět skupiny, spouští funkci postToGroups*/
function changeBtn() {
    var $this = $(this);
    if ($this.text() === "Odeslat") {
        selectGroups();
        $this.text("Zavřít");
        $this.removeClass("btn btn-success");
        $this.addClass("btn btn-danger");
        
    } else {
        $this.text("Odeslat");
        $('#groupModal').modal('hide');
        $this.removeClass("btn btn-danger");
        $this.addClass("btn btn-success");
        var checkedGroups = $("#modalGroupBody label");
        checkedGroups.each(function () {
            var $this = $(this);
            $($this).css('color', 'black').css("font-weight", "normal");
        });
        $(textA).val('');
        sendBtn.disabled = true;
    }
}

/*facebook API, načítá skupiny (admin_only: true znamená, že načítá pouze skupiny s administrátorskými právy*/
function loadGroups() {
    FB.api(
        "/me/groups",
        function (response) {
            if (response && !response.error) {
                for (var l = response.data.length, i = 0; i < l; i++) {
                    groups = response.data[i];
                    createGroupChoice(groups.name, groups.id);
                }
            }
        },
        { admin_only: true },
    );
}

/*vytváří skupinové Checkboxy s popisky*/
function createGroupChoice(groupName, groupId) {
    $(modalGroupBody).append($("<div></div>", { class: "row" }), [$('<input />', { type: "checkbox", id: groupId, class: "chckBox" }).on("click", checkChecked), $('<label />', { text: groupName, value: groupId })]);
}

/*validace vstupu do textarea*/
function validateTxt() {
    var validationTxt = postTxt.replace(/\s/g, '');
    if (validationTxt) {
        return true;
    } else {
        return false;
    }
}



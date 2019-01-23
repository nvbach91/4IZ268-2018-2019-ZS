/*deklarance proměnných*/
var groups;
var groupName;
var groupId;
var postTxt;

/*přiřazení elementů do proměnných*/
var loginBtn = $("#loginBtn");
var shareBtn = $("#shareBtn");
var modalGroup = $("#groupModal");
var modalGroupBody = $("#modalGroupBody");
var sendBtn = $("#sendBtn");
var textA = $("#textarea");
var logoutBtn = $("#logoutBtn");
var loader = $("#loadingModal");
var modalLogin = $("#loginModal")
var modalGrouplCloseBtn = $("#closeModalGroupBtn");

/*přiřazení funkcí k elementům*/
loginBtn.on("click", loginFb);
shareBtn.on("click", sharePost);
sendBtn.on("click", changeBtn);
logoutBtn.on("click", logout);
modalGrouplCloseBtn.on("click", closeGroupModal);

/*nacita loader ihned po nacteni stranky*/
$(document).ready(function() {
    loader.modal("show");
});

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
}(document, "script", "facebook-jssdk"));

/*Obsluhuje odhlaseni uzivatele pres FB API*/
function logout() {
    loader.modal("show");
    shareBtn.prop("disabled", true);
    logoutBtn.prop("disabled", true);
    textA.val("");
    $("#modalGroupBody label").remove();
    $("#modalGroupBody input").remove();
    FB.getLoginStatus(function (response) {
        FB.api("/me/permissions", "delete", function (response) {
            loader.modal("hide");
            modalLogin.modal("show");
        });
    });

}

/*status pripojeni FB uzivatele*/
function statusChangeCallback(response) {
    if (response.status === "connected") {
        /*Načítá skupiny, profilovy obrazek, zavírá okno*/
        loader.modal("hide");
        modalLogin.modal("hide");
        shareBtn.prop("disabled", false);
        logoutBtn.prop("disabled", false);
        loadGroups();
        $('[data-toggle="popover"]').popover();
        FB.api(
            "/me/",
            "GET",
            { "redirect": "false" },
            function (response) {
                var test = response;
                $("#userName").text(test.name);
            }
        );
        FB.api(
            "/me/picture/",
            "GET",
            { "redirect": "false" },
            function (response) {
                var test = response.data;
                $("#profilePic").attr("src", test.url);
            }
        );
    } else if (response.status === "not_authorized") {
        /*Vyžaduje autorizaci aplikace*/
        loader.modal("hide");
        modalLogin.modal("show");
    } else {
        /*Vyžaduje přihlášení uživatele*/
        loader.modal("hide");
        modalLogin.modal("show");
    }
}

/*příhlášení/autorizace přes FB API*/
function loginFb() {
    FB.login(function (response) {
        statusChangeCallback(response)
    }, { scope: "email,user_likes,publish_to_groups,manage_pages,publish_pages" });
}

/*obsluha tlačítka pro sdílení*/
function sharePost() {
    postTxt = textA.val().trim();
    if (validateTxt()) {
        modalGrouplCloseBtn.show();
        var checkedGroups = $("#modalGroupBody label");
        checkedGroups.each(function () {
            var $this = $(this);
            $this.css("color", "black").css("font-weight", "normal");
        });
        $("#modalGroupBody input:checkbox").prop("checked", false);
        $(".link-post").css("display","none");
        modalGroup.modal("show");
        sendBtn.prop("disabled", true);
    } else {
        textA.popover("show");
        setTimeout(function () {
            textA.popover("hide");
        }, 4000);
        return;
    }
}

/*kontroluje zaškrtlé chceckboxy a následně odešle příspěvek*/
function selectGroups() {
    var checkedGroups = $("#modalGroupBody input:checked");
    checkedGroups.each(function () {
        var $this = $(this);
        $("#loader_" + $this.attr("id")).css("display", "block");
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
                var postId = response.id;
                postId = postId.substring(postId.indexOf("_") + 1)
                $("[value=" + groupId + "]").css("color", "green").css("font-weight", "bold");
                $("#loader_" + groupId).css("display", "none");
                $("#link_" + groupId).attr("href","https://www.facebook.com/groups/"+groupId+"/permalink/"+postId+"/").css("display","block");
            }
            if (response.error) {
                $("[value=" + groupId + "]").css("color", "red").css("font-weight", "bold");
                $("#loader_" + groupId).css("display", "none");
            }
        }
    );
}

/*kontroluje zda je alespoň jedna skupina vybrána*/
function checkChecked() {
    var n = $("#modalGroupBody input:checked").length;
    if (n > 0) {
        sendBtn.prop("disabled", false);
    } else if (n === 0) {
        sendBtn.prop("disabled", true);
    }
}

/*funkce zaviraciho tlacitka*/
function closeGroupModal() {
    $("#modalGroupBody input:checkbox").prop("checked", false);
    modalGroup.modal("hide");
}

/*mění talčítko pro odeslání, přebarvuje zpět skupiny, spouští funkci postToGroups*/
function changeBtn() {
    var $this = $(this);
    if ($this.text() === "Odeslat") {
        selectGroups();
        $this.text("Zavřít");
        $this.removeClass("btn btn-success");
        $this.addClass("btn btn-danger");
        modalGrouplCloseBtn.hide();

    } else {
        modalGroup.modal("hide");
        $this.text("Odeslat");
        $this.removeClass("btn btn-danger");
        $this.addClass("btn btn-success");
        textA.val("");
        sendBtn.prop("disabled", true);
    }
}

/*facebook API, načítá skupiny (admin_only: true znamená, že načítá pouze skupiny s administrátorskými právy*/
function loadGroups() {
    FB.api(
        "/me/groups",
        function (response) {
            if (response && !response.error) {
                createGroupChoice(response);
            }
        },
        { admin_only: true },
    );
}

/*vytváří skupinové Checkboxy s popisky*/
function createGroupChoice(response) {
    for (var l = response.data.length, i = 0; i < l; i++) {
        groups = response.data[i];
        modalGroupBody.append($("<div></div>", { class: "row" }),
            [$("<input />", { type: "checkbox", id: groups.id, class: "chckBox" }).on("click", checkChecked),
            $("<label />", { text: groups.name, value: groups.id, for: groups.id, class: "group-label"}),
            $("<a></a>", {id: "link_"+groups.id, class: "link-post", text: "Odkaz na příspěvek", target: "blank" }),
            $("<div></div>", { id: "loader_" + groups.id, class: "loader-mini-test" })]);
    }
}

/*validace vstupu do textarea*/
function validateTxt() {
    var validationTxt = postTxt.trim();
    if (validationTxt) {
        return true;
    } else {
        return false;
    }
}


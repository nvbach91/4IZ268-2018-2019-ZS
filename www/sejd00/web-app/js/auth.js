var tokenNew;
var client_id = `62bd4a1225cc4f0097def241e69b2ad6`;
//var redirect_uri = `http://localhost:5500/4IZ268-2018-2019-ZS/www/sejd00/web-app/index.html`;
var redirect_uri = `https://fcp.vse.cz/4IZ268/2018-2019-ZS/www/sejd00/web-app/`;
var hash = window.location.hash;
var buttonVisibility = document.getElementById("logout");
var token = localStorage.getItem("token");

var urlLogin = `https://www.instagram.com/oauth/authorize/?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;



function authenticate() {
    window.open(urlLogin, "_self");
}


if (localStorage.getItem('token')) {
    tokenNew = localStorage.getItem('token');
}

if (hash) {
    var cleanHash = hash.replace('#', '').split('=')

    if (cleanHash[0] === "access_token") {
        tokenNew = cleanHash[1]
    }
    localStorage.setItem('token', tokenNew)
}

var logout = function () {
    //https://stackoverflow.com/a/28422498
    $("body").append('<img id="img_logout" src="http://instagram.com/accounts/logout/" width="0" height="0" />');
    $("#img_logout").remove();
    localStorage.clear();
    indicators.innerHTML = "";
    posts.innerHTML = "";
    label.innerHTML = "Uživatel odhlášen."
    token = null;
    // window.open("index.html");
};

var auth = $('#auth').click(authenticate);
var logout = $('#logout').click(logout);
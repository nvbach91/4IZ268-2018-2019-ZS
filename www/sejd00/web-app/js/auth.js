var urlLogin = `https://www.instagram.com/oauth/authorize/?client_id=62bd4a1225cc4f0097def241e69b2ad6&response_type=token&redirect_uri=http://127.0.0.1:5500/4IZ268-2018-2019-ZS/www/sejd00/web-app/index.html`;
var tokenNew;
var hash = window.location.hash;


function authenticate() {
    window.open(urlLogin);
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
};

var auth = $('#auth').click(authenticate);
var logout = $('#logout').click(logout);

var SITE_URL = 'http://127.0.0.1:5500/search.html';
function onLoaded() {

    if (location.search.indexOf('access_token') > 0) {
        Auth.parseResponse(location);
        window.location = SITE_URL;
        return;
    }
}

var Auth = {

    parseResponse: function (url) {
        var hash = url.hash;
        var response = this._parseHash(hash);
        if (response != null) {
            localStorage.setItem('token', response['access_token']);
            var now = Date.now();
            var expiresAt = now + parseInt(response['expires_in'], 10) * 1000;
            localStorage.setItem('token_expires_at', expiresAt);
        }
    },

    _parseHash: function (hash) {
        if (!hash) {
            return null;
        }

        hash = window.location.hash.substr(1); //url of the current page
        arHash = hash.split('='); //this creates an array with key ([0] element) and value ([1] element)
        parsed = arHash[1]; //recieve value


        return parsed;

    }

}
$(document).ready(onLoaded());
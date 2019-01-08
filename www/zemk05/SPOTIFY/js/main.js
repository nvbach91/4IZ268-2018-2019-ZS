



/*----------------------Gain an access token---------------------- */

var CLIENT_ID = "9ed280f473334a61ad254a84e0ec0593";
var REDIRECT_URI = "http://localhost:5500/www/zemk05/SPOTIFY/";
var CLIENT_SECRET = "e2baae4150c74acb88658037b30bfd4d";
var STATE_KEY = 'spotify_auth_state';
var options = {};

submitButton = document.getElementById('submit-btn');
loginButton = document.getElementById('login-btn');
var hash = window.location.hash.substring(1);

var params = {}
hash.split('&').map(hk => {
    let temp = hk.split('=');
    params[temp[0]] = temp[1]
});

var state = params.state;
var userID = null;
var accessToken = params.access_token;
var errMessage = $('.error').text("Chyba přihlášení, zkuste to znovu.");
var logoutButton = $('<input type="button" value="Odhlášení uživatele" id="logout"/>');

$(document).ready(function () {
    var currentUrl = window.location.href;
    if (currentUrl.includes("#access_token=") && currentUrl.includes("&token_type=") && currentUrl.includes("&expires_in=") && currentUrl.includes("&state=")) {
        var stateLocal = localStorage.getItem(STATE_KEY);
        if (accessToken) {
            if (state === null || state !== stateLocal) {
                return errMessage;
            }
            else {
                options = {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }
            }
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (response) {
                    userID = response.id;
                    if (userID) {
                        $('#login-btn').remove();
                        $('.error').text('');

                        $('.message').text('Uživatel @' + response.display_name + ' byl úspěšně přihlášen.');
                        $(".intro").append(logoutButton);
                    }
                    else {
                        return errMessage;
                    }
                },
                error: function () {
                    alert("Chyba spojení. Prosíme, přihlašte se znovu.");
                }
            });
        }
    }
});



/*----------------------Login to Spotify---------------------- */

$('#login-btn').click(function () {
    if (accessToken && userID) {
        return $('.message').text('Uživatel už je přihlášen.');
    }

    function generatorString(length) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var text = '';

        for (var i = 0; i < length; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return text;
    };
    var stateValue = generatorString(16);
    localStorage.setItem(STATE_KEY, stateValue);

    // otevře přihlašovací okno do spotify a získá access token
    var scope = 'user-read-email user-read-private';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(CLIENT_ID);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
    url += '&state=' + encodeURIComponent(stateValue);
    window.location = url;
});
/*----------------------Logout from Spotify---------------------- */


/*----------------------Search an item in Spotify database---------------------- */
var errFoundedMessage = $('.error').text('Nebyl nalezen žádný výsledek.');
var header = $('.closed');
var resultsBody = $('.results-body');
$('#submit-btn').click(function () {
    function searchTracks() {
        var query = $("#searched-text").val().replace(/ /g, '+');
        if (query === "") {
            return errFoundedMessage;
        }
        else {
            $.ajax({
                url: "https://api.spotify.com/v1/search?q=" + query + "&type=track",
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (data) {
                    resultsBody.empty();
                    header.removeClass();
                    $('.message-results').text('Nalezeno ' + data.tracks.total + ' výsledků.');
                    var resultsHead = $(".results-head");
                    var resultsHeadName = $('<div>').addClass("header-result").text("Název");
                    var resultsHeadArtist = $('<div>').addClass("header-result").text("Autor");
                    var resultsHeadAlbum = $('<div>').addClass("header-result").text("Album");
                    resultsHead.append(resultsHeadName).append(resultsHeadArtist).append(resultsHeadAlbum);

                    for (var i = 0; i < 20; i++) {
                        var resultsRow = $('<div>').addClass('result-row');
                        var resultName = $('<div>').addClass('result-name');
                        var resultArtist = $('<div>').addClass('result-artist');
                        var resultAlbum = $('<div>').addClass('result-album');
                        var addingButton = $('<button>').addClass('add-button').text('Přidat');
                        resultName.append([data.tracks.items[i].name]);
                        resultArtist.append([data.tracks.items[i].artists[0].name]);
                        resultAlbum.append([data.tracks.items[i].album.name]);
                        resultsRow.append($('<hr>')).append(resultName).append(resultArtist).append(resultAlbum).append(addingButton);
                        resultsBody.append(resultsRow);
                        let resultArray = data.tracks.items[i];
                        addingButton.click(function () {
                            addToPlaylist(resultArray);
                        });
                    }
                },
                error: function () {
                    alert("Chyba spojení. Prosíme, přihlašte se znovu.");
                }
            });
        }
    }
    searchTracks();
});

/*----------------------Control of added track---------------------- */
var trackExists = function (idField) {
    var existingTrack = idField;
    for (var i = 0; i < existingTrack.length; i++) {
        var song = existingTrack.get(i);
        if (id === song.innerHTML) {
            return true;
        }
    }
    return false;
}

/*----------------------Add a result to my playlist---------------------- */
var playlistBody = $(".playlist-body");

function addToPlaylist(resultArray) {
    var playlistHead = $(".playlist-head");
    var playlistHeadName = $('<div>').addClass("header-playlist").text("Název");
    var playlistHeadArtist = $('<div>').addClass("header-playlist").text("Autor");
    var playlistHeadAlbum = $('<div>').addClass("header-playlist").text("Album");
    playlistHead.append(playlistHeadName).append(playlistHeadArtist).append(playlistHeadAlbum);

    var playlistRow = $('<div>').addClass('playlist-row');
    var idField = $('<div>').addClass("closed").text(resultArray.id);
    var nameTrack = $('<div>').addClass('playlist-name').text(resultArray.name);
    var nameArtist = $('<div>').addClass('playlist-artist').text(resultArray.artists[0].name);
    var nameAlbum = $('<div>').addClass('playlist-album').text(resultArray.album.name);
    var deleteButton = $('<button>').addClass('delete-button').text('Odebrat');
    if (nameAlbum === undefined) {
        album = 'Neznámé';
    } else {
        nameAlbum;
    }
    playlistRow.append(idField).append(nameTrack).append(nameArtist).append(nameAlbum).append(deleteButton);
    playlistBody.append(playlistRow);
    localStorage.setItem(playlistRow, playlistBody);

    deleteButton.click(function () {
        playlistRow.remove();
        /*
        if (playlistRow.length === 0) {
            playlistHead.removeClass();
            playlistHead.addClass("closed");
            playlistBody = $('<div>').addClass("info").text("Zde se nenachází žádné skladby");
        }
        */
    });
}





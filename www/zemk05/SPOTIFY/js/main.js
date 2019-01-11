
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
            //create a loader during ajax response loading
            $(document).ajaxStart(function () {
                $(".loader").remove();
                var loader = $('<div>').addClass('loader');
                $('.message').append(loader);
                $(".loader").show();
            }).ajaxStop(function () {
                $(".loader").hide();
            });
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


/*----------------------Search an item in Spotify database---------------------- */
var errFoundedMessage = $('.error').text('Nebyl nalezen žádný výsledek.');
var resultsHeader = $('#resultsTable');
var resultsBody = $('.results-body');
var resultsHead = $(".results-head");
var offset = 0;


$('#submit-btn').click(function () {
    function searchTracks() {
        var query = $("#searched-text").val().replace(/ /g, '+');
        if (query === "") {
            return $('.error').text('Nebyl nalezen žádný výsledek.');
        }
        else {
            $.ajax({
                url: 'https://api.spotify.com/v1/search?q=' + query + '&offset=' + offset + '&type=track',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (data) {
                    resultsHeader.removeClass();
                    resultsHead.empty();
                    resultsBody.empty();
                    $('.message-results').text('Nalezeno ' + data.tracks.total + ' výsledků.');

                    var resultsHeadName = $('<div>').addClass("header-result").text("Název");
                    var resultsHeadArtist = $('<div>').addClass("header-result").text("Autor");
                    var resultsHeadAlbum = $('<div>').addClass("header-result").text("Album");
                    resultsHead.append(resultsHeadName).append(resultsHeadArtist).append(resultsHeadAlbum);

                    //console.log(data.tracks.items);

                    for (var i = 0; i < data.tracks.items.length; i++) {
                        var resultsRow = $('<div>').addClass('result-row');

                        var previewUrl = data.tracks.items[i].preview_url;

                        if(previewUrl === null) {
                            var resultAudio = $('<div>').addClass('result-id');
                        }
                        else {
                            var resultAudio = $('<audio controls>').addClass('result-audio').attr('src', previewUrl);
                        }

                        var imageUrl = data.tracks.items[i].album.images[2].url;
                        var resultImage = $('<img>').addClass('result-image').attr('src', imageUrl);
                        let resultID = $('<div>').addClass('result-id').addClass("closed");
                        var resultName = $('<div>').addClass('result-name');
                        var resultArtist = $('<div>').addClass('result-artist');
                        var resultAlbum = $('<div>').addClass('result-album');
                        var addingButton = $('<button>').addClass('add-button').text('Přidat');

                        resultID.text([data.tracks.items[i].id]);
                        resultName.append([data.tracks.items[i].name]);
                        resultArtist.append([data.tracks.items[i].artists[0].name]);
                        resultAlbum.append([data.tracks.items[i].album.name]);
                        resultsRow.append($('<hr>')).append(resultAudio).append(resultImage).append(resultID).append(resultName).append(resultArtist).append(resultAlbum).append(addingButton);
                        resultsBody.append(resultsRow);
                        let resultArray = data.tracks.items[i];
                        addingButton.click(function () {
                            trackExists(resultArray, resultID);
                        });
                    }
                    //STRÁNKOVÁNÍ
                    var pageLimit = 20;
                    var totalRecord = data.tracks.total;
                    var prevButton = $('<button>').addClass('prev-button').text('Předchozí');
                    var nextButton = $('<button>').addClass('next-button').text('Následující');
                    resultsBody.append(prevButton).append(nextButton);
                    $('.prev-button').click(function () {
                        if (data.tracks.previous === null) {
                            alert('Toto je první stránka výsledků.');
                        }
                        else {
                            offset = offset - pageLimit;
                            searchTracks();
                            $('html,body').scrollTop(0);
                        }
                    });
                    $('.next-button').click(function () {
                        if (offset < totalRecord) {
                            offset = offset + pageLimit;
                            searchTracks();
                            $('html,body').scrollTop(0);
                        }
                        else {
                            if (data.tracks.next === null) {
                                alert('Toto je poslední stránka výsledků.');
                            }
                        }
                    });
                },
                error: function () {
                    alert('Chyba spojení. Prosíme, přihlašte se znovu.');
                }
            });
        }
    }
    searchTracks();
});


//Zmáčknutí klávesy enter
$('#searched-text').keyup(function (event) {
    if (event.keyCode === 13) {
        $('#submit-btn').click();
    }
});

/*----------------------Control of added track---------------------- */
function trackExists(resultArray, resultID) {
    var placed = false;
    if ($('.playlist-id').length) {
        $('.playlist-id').each(function () {
            if ($(this).text() === resultID.text()) {
                alert('Tato skladba se již nachází ve tvém playlistu.');
                placed = true;
            }
        });
    }
    if (!placed) {
        addToPlaylist(resultArray);
    }
}

/*----------------------Add a result to my playlist---------------------- */
var playlistBody = $('.playlist-body');
var playlistHead = $('.playlist-head');
var playlistHeader = $('#myPlaylist');

function addToPlaylist(resultArray) {
    playlistHead.empty();
    var playlistHeadName = $('<div>').addClass('header-playlist').text('Název');
    var playlistHeadArtist = $('<div>').addClass('header-playlist').text('Autor');
    var playlistHeadAlbum = $('<div>').addClass('header-playlist').text('Album');
    playlistHead.append(playlistHeadName).append(playlistHeadArtist).append(playlistHeadAlbum);

    var playlistRow = $('<div>').addClass('playlist-row');
    var imageField = $('<img>').addClass('playlist-image').attr('src', resultArray.album.images[2].url);


    if(resultArray.preview_url === null) {
        var previewField = $('<div>').addClass('playlist-preview');
    }
    else {
        var previewField = $('<audio controls>').addClass('playlist-audio').attr('src', resultArray.preview_url);
    }

    var idField = $('<div>').addClass('closed').addClass('playlist-id').text(resultArray.id);
    var nameTrack = $('<div>').addClass('playlist-name').text(resultArray.name);
    var nameArtist = $('<div>').addClass('playlist-artist').text(resultArray.artists[0].name);
    var nameAlbum = $('<div>').addClass('playlist-album').text(resultArray.album.name);
    var deleteButton = $('<button>').addClass('delete-button').text('Odebrat');
    if (nameAlbum === undefined) {
        album = 'Neznámé';
    } else {
        nameAlbum;
    }
    playlistRow.append($('<hr>')).append(previewField).append(imageField).append(idField).append(nameTrack).append(nameArtist).append(nameAlbum).append(deleteButton);
    playlistBody.append(playlistRow);

    deleteButton.click(function () {
        playlistRow.remove();
    });
}




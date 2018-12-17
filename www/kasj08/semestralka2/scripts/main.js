var API_ID = 'd1c9a91ea65443af90946fde02fdda64';
var API_SECRET = '26bbf4fad9384fd4bb3543649ade8b05';
var REDIRECT_URI = 'http://localhost:5500';
var STATE_KEY = 'spotify_auth_state';

var userAccess = null;
var userID = null;
var userCountry = null;
var userAlbums = [];

var lastAlbumsCount = 0;
var lastAlbumsCurrent = 0;

var options = {};

/* došlo k přihlášení uživatele */
$(document).ready(function () {
    var currentUrl = window.location.href;
    if (currentUrl.includes("access_denied")) {
        // nesouhlasil s podmínkami
        $('.error').text('Failed to login, you must accept the premissions.');
    }
    else if (currentUrl.includes("?error")) {
        // nastala chyba
        $('.error').text('Failed to login, please try it again.');
    }
    else if (currentUrl.includes("#access_token=") && currentUrl.includes("&token_type=") && currentUrl.includes("&expires_in=") && currentUrl.includes("&state=")) {
        // úspěšné přihlášení

        // rozdělí získanou adresu a získá z ní parametry
        var params = getHashParams();
        userAccess = params.access_token;

        // získá hodnotu navrácenou ze spotify
        var state = params.state;
        // získá hodnotu úloženou v úložišti
        var storedState = localStorage.getItem(STATE_KEY);

        if (userAccess) {
            // existuje user access
            if (state == null || state !== storedState) {
                // a nezískal jsem hodnotu ze spotify loginu nebo se neshoduje s uloženou v místním úložišti = chyba
                $('.error').text('Failed to login, please try it again.');
            }
            else {
                options = {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + userAccess
                    }
                };
                // získám informace o uživateli
                $.ajax({
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + userAccess
                    },
                    success: function (response) {
                        userID = response.id;
                        if (userID) {
                            // úspěšně získané informace o uživateli
                            $('#login-button').remove();
                            $('.error').text('');

                            $('#login').html('Logged in as "' + response.display_name + '"');
                            $('#login').attr('title', 'Click to logout');
                            $('#login').attr('href', '');
                            $('.message').text('User @' + response.display_name + ' has been successfully logged in.');

                            userCountry = response.country;
                            // získám umělce, které uživatel sleduje
                            $('.message').text('Please wait: Getting list of your followed artists...');
                            GetUserArtists('https://api.spotify.com/v1/me/following?type=artist&limit=50');
                        }
                        else {
                            // nezískal jsem user id
                            $('.error').text('Failed to login, please try it again.');
                        }
                    },
                    error: function () {
                        $('.error').text('Failed to login, please try it again.');
                    }
                });
            }
        }
        else {
            // nezískal jsem user access
            $('.error').text('Failed to login, please try it again.');
        }
        // odstraním z úložiště
        localStorage.removeItem(STATE_KEY);

        function getHashParams() {
            var hashParams = {};
            var e, r = /([^&;=]+)=?([^&;]*)/g,
                q = window.location.hash.substring(1);
            while (e = r.exec(q)) {
                hashParams[e[1]] = decodeURIComponent(e[2]);
            }
            return hashParams;
        }
    }
});

/* kliknutí na tlačítko přihlášení */
$('.login').click(function () {
    if (userAccess && userID) {
        // uživatel je přihlášen
        return;
    }
    userID = null;
    userAccess = null;
    // zapíše do lokálního úložiště náhodnou hodnotu
    var stateValue = generateRandomString(16);
    localStorage.setItem(STATE_KEY, stateValue);

    // otevře přihlašovací okno do spotify a získá access token
    var scope = 'user-follow-read user-read-private';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(API_ID);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
    url += '&state=' + encodeURIComponent(stateValue);
    window.location = url;

    function generateRandomString(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
});

/* získá z api json se seznamem umělců, které uživatel sleduje */
function GetUserArtists(fetchUrl) {
    fetch(fetchUrl, options)
        .then(response => response.json())
        .then(json => {
            // možné chyby
            if (json.error) {
                if (json.error.status == 429) {
                    // chyba api - moc dotazů
                    setTimeout(GetUserArtists(fetchUrl), 100);
                }
                else {
                    ShowError('API Error', 'Failed to get list of your followed artists: ' + json.error.message + '.');
                }
                return;
            }
            var artists = json.artists.items;
            if (!artists) {
                ShowError('No albums', 'Cannot get any album, because you are not following any artist.');
                return;
            }
            if (artists.length < 1) {
                ShowError('No albums', 'Cannot get any album, because you are not following any artist.');
                return;
            }

            if (json.artists.next) {
                // pokud existuje další stránka seznamu umělců, získám další seznam
                for (let index = 0; index < artists.length; index++) {
                    // projde získané umělce a získá jejich alba
                    GetArtistAlbums(artists[index], false);
                }
                GetUserArtists(json.artists.next);
            }
            else {
                // neexistuje další stránka umělců
                lastAlbumsCurrent = 0;
                lastAlbumsCount = artists.length;
                for (let index = 0; index < artists.length; index++) {
                    GetArtistAlbums(artists[index], true);
                }
            }
        });
}

function ShowAlbums() {
    // jedná se o poslední stránku umělců

    // přičtu aktuální počet úspěšně získaných posledních albumů
    lastAlbumsCurrent++;
    if (lastAlbumsCount != lastAlbumsCurrent) {
        // ještě jsem neprošel všechny interprety
        return;
    }

    // úspěšně jsem získal ze spotify interprety z poslední stránky
    // zobrazím alba
    if (!userAlbums) {
        ShowError('No albums', 'Cannot get any album, because you are following only artists without albums.');
        return;
    }
    if (userAlbums.length < 1) {
        ShowError('No albums', 'Cannot get any album, because you are following only artists without albums.');
        return;
    }

    // zobrazím roky vydaných alb umělců v menu
    $('.title').text('All released albums');
    AddMenuYears();
    // získám rok a měsíc nejnovějšího alba
    var date = userAlbums[0].release.split('-');
    var year = date[0];
    var month = date[1];
    // zobrazení v menu
    $('#' + year).addClass("current-year");
    $('#m' + year).addClass("selected-month");
    $('#' + date[0] + '-' + date[1]).addClass("current-month");
    // zobrazení albumů
    ViewAlbums(year, month);
    $('.message').remove();
}

/* získá z api json seznam alb jednotlivých umělců */
function GetArtistAlbums(artist, lastCheck) {
    if (!artist) {
        ShowError('Error', 'Failed to get artist albums.');
        return;
    }

    $('.message').text('Please wait: Getting albums from artist ' + artist.name + '...');
    var fetchUrl = 'https://api.spotify.com/v1/artists/' + artist.id + '/albums?offset=0&limit=50&include_groups=album&market=' + userCountry;

    fetch(fetchUrl, options)
        .then(response => response.json())
        .then(json => {
            // možné chyby
            if (json.error) {
                if (json.error.status == 429) {
                    // chyba api - moc dotazů
                    setTimeout(GetArtistAlbums(artist, lastCheck), 100);
                }
                else {
                    ShowError('Please wait: Getting albums from artist ' + artist.name + '...', 'Failed to get albums from artist ' + artist.name + ': ' + json.error.message);
                }
                return;
            }
            var albums = json.items;
            if (!albums) {
                if (lastCheck) {
                    // jedná se o poslední stránku umělců
                    ShowAlbums();
                }
                return;
            }
            if (albums.length < 1) {
                if (lastCheck) {
                    // jedná se o poslední stránku umělců
                    ShowAlbums();
                }
                return;
            }

            for (let index = 0; index < albums.length; index++) {
                // projde nově získané alba
                const newAlbum = albums[index];
                var added = false;
                for (let index2 = 0; index2 < userAlbums.length; index2++) {
                    // projde již získaná alba
                    if (newAlbum.id == userAlbums[index2].id) {
                        // nové album již bylo přidáno do seznamu dřive
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    // pokud nebylo přidáno již dříve

                    // získá všechny umělce alba a zapíše je do stringu s oddělovači
                    var artists = newAlbum.artists;
                    var artistsString = artists[0].name;
                    for (let index = 1; index < artists.length - 1; index++) {
                        artistsString += ', ' + artists[index].name;
                    }
                    if (artists.length > 1) {
                        artistsString += ' & ' + artists[artists.length - 1].name;
                    }

                    // vytvoří objekt nového alba
                    var newAlbumObject = {
                        id: newAlbum.id,
                        name: newAlbum.name,
                        artists: artistsString,
                        release: newAlbum.release_date,
                        cover: newAlbum.images[1].url
                    };

                    // uloží ho do seznamu všech alb
                    userAlbums.push(newAlbumObject);
                }
            }
            // seřadí seznam alb podle data vydání alba od nejnovějších po nejstarší
            userAlbums.sort(function (a, b) {
                var keyA = new Date(a.release);
                var keyB = new Date(b.release);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
            if (lastCheck) {
                // jedná se o poslední stránku umělců
                ShowAlbums();
            }
        })
}

/* menu - klknutí na rok */
$(document).on('click', '.year', function (e) {
    // odstraní třídy vybraného roku a skrytí jeho měsíce
    // přidá třídy vybraného roku a zobrazení jeho měsíců
    var year = e.currentTarget.id;
    $('.year').removeClass("selected-year");
    $('#' + year).addClass("selected-year");

    $('.months').removeClass("selected-month");
    $('#m' + year).addClass("selected-month");
    if (year == 0) {
        $('.year').removeClass("current-year");
        $('.month').removeClass("selected-month");
        $('.month').removeClass("current-month");
        $('#' + year).addClass("current-year");
        ViewAlbums(0, 0);
    }
});

/* menu - kliknutí na měsíc */
$(document).on('click', '.month', function (e) {
    // získám rok a měsíc z id
    var id = e.currentTarget.id;
    var idSplit = id.split('-');
    var year = idSplit[0];
    var month = idSplit[1];
    if (month == 'all') {
        month = 0;
    }
    else if (month == 'undefined') {
        month = -1;
    }
    // odstraní třídy vybraného a aktuálního roku
    $('.year').removeClass("selected-year");
    $('.year').removeClass("current-year");
    $('#' + year).addClass("current-year");

    // odstraní třídy vybraného a aktuálního měsíce
    $('.month').removeClass("selected-month");
    $('.month').removeClass("current-month");
    $('#' + id).addClass("current-month");

    // zobrazí alba vybraného měsíce
    ViewAlbums(year, month);
});

/* kliknutí na album - zobrazení přehrávače alba */
$(document).on('click', '.album', function (e) {
    var albumDiv = '#' + e.currentTarget.id;

    if ($(albumDiv).find('.album-player').length > 0) {
        // již je zobrazený přehrávač = odstraním ho
        $(albumDiv).children('.album-player').remove();
    }
    else {
        // zobrazím přehrávač alba
        var player = '<iframe class="album-player" src="https://open.spotify.com/embed/album/' + e.currentTarget.id + '" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
        $(albumDiv).append(player);
    }
});

/* menu - přidání roků */
function AddMenuYears() {
    var years = [];
    if (userAlbums.length < 60) {
        years.push('all');
    }
    userAlbums.forEach(album => {
        // projde získané alba a získá z nich rok
        var date = album.release.split('-');
        var year = date[0];
        if (!years.includes(year)) {
            years.push(year);
        }
    });
    years.forEach(year => {
        // pro každý získaný rok, získám měsíce
        AddMenuMonths(year);
    });
}

/* menu - přidání měsíců */
function AddMenuMonths(yearToAdd) {
    if (yearToAdd == 'all') {
        $('.years').append('<li><a class="year" id="' + 0 + '">' + 'all' + '</a></li>');
        return;
    }
    var months = [];
    var undefined = false; // měsíc není ve spotify vyplněn
    months.push('all');
    userAlbums.forEach(album => {
        // projde získané alba a získá z nich rok a měsíc
        var date = album.release.split('-');
        var year = date[0];
        if (year == yearToAdd) {
            // rok se shoduje
            var month = date[1];
            if (!months.includes(month)) {
                // měsíc nebyl ještě přidán
                if (!month) {
                    undefined = true;
                }
                else {
                    months.push(month);
                }
            }
        }
    });
    if (undefined) {
        // měsíc není ve spotify vyplněn
        months.push("undefined");
    }
    // přidá rok do menu
    $('.years').append('<li><a class="year" id="' + yearToAdd + '" title="Click to view months in ' + yearToAdd + '">' + yearToAdd + '</a></li>');
    // přidá měsíce vybraného roku do menu
    $('nav').append('<ul class="months" id="m' + yearToAdd + '"></ul>');
    var rokDiv = $('#m' + yearToAdd);
    months.forEach(month => {
        if (month == 'all') {
            rokDiv.append('<li><a class="month" id="' + yearToAdd + '-' + month + '" title="Click to view all released albums in ' + yearToAdd + '">' + month + '</a></li>');
        }
        else if (month == 'undefined') {
            rokDiv.append('<li><a class="month" id="' + yearToAdd + '-' + month + '" title="Click to view released albums in ' + yearToAdd + ' with undefined month">' + month + '</a></li>');
        }
        else {
            rokDiv.append('<li><a class="month" id="' + yearToAdd + '-' + month + '" title="Click to view released albums in ' + yearToAdd + '-' + month + '">' + month + '</a></li>');
        }
    });
}

/* zobrazení albumů z vybraného měsíce a roku */
function ViewAlbums(year, month) {
    // odstraním alba z jiného roku nebo měsíce
    $('.albums').empty();
    if (year < 1) {
        // zobrazuji všechny alba
        $('.title').text('All albums releases');
    }
    else if (month == 0) {
        // zobrazuji alba ve vybraném roce
        $('.title').text('Released albums in ' + year);
    }
    else if (month < 0) {
        // zobrazuji alba ve vybraném měsíci, který není ve spotify vyplněn
        $('.title').text('Released albums in ' + year + ' with undefined month');
    }
    else {
        // zobrazuji alba ve vybraném měsíci
        $('.title').text('Released albums in ' + year + '-' + month);
    }
    userAlbums.forEach(album => {
        // projdu získaná alba a získám měsíc a rok
        var realese = album.release.split('-');
        var albumYear = realese[0];
        var albumMonth = realese[1];
        if ((year < 1) || (year == albumYear)) {
            // zobrazuji všechna alba nebo se jedná o vybraný rok
            if ((month == 0) || (month == albumMonth) || (month < 0 && !albumMonth)) {
                // zobrazuji alba ve vybraném roce nebo se jedná o správný měsíc
                // získám div a zobrazím ho
                var artistDiv = '<div class="album" id="' + album.id + '" title="View tracklist"><div class="album-flex"><div class="album-img"><img src="' + album.cover + '"></img></div><div class="album-info"><h2>' + album.name + '</h2><h3>' + album.artists + '</h3><p>' + album.release + '</p></div></div></div>';
                $('.albums').append(artistDiv);
            }
        }
    });
}

/* posunutí stránky dolů */
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        // poloha je níže než 20px, zobrazím posunovník nahoru
        document.getElementById("top").style.display = "block";
    }
    else {
        document.getElementById("top").style.display = "none";
    }
};

/* kliknutí na posunovník nahoru */
$('#top').click(function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

function ShowError(title, error) {
    $('.title').text(title);
    if ($('.error').text()) {
        error = $('.error').text() + '<br>' + error;
    }
    $('.error').html(error);
    $('.message').remove();
}

/**
 * Webová aplikace pro správu seznamu oblíbených písniček aplikace Spotify
 */

//Definice selektorů
var loginButton = $('#login_button');
var resultInfo = $('#result_info');
var foundTracks = $('#result_enum');
var info = $('#info');
var search = $('#search');
var favoriteTracks = $('#favorite');
var loader = $('<div>').addClass('loader');



//Rozdělení URL na části a rozdělení do parametrů
var params = {}
var hash = window.location.hash.substring(1);
hash.split('&').map(hk => {
    let temp = hk.split('=');
    params[temp[0]] = temp[1]
});


//Definice základních proměnných
var searchValue;
var url;
var accessToken = params.access_token;
var state = params.state;
var stateKey = 'spotify_auth_state';
var clientId = 'bd8138fa0b1640b297139a6b30482253';
var redirectURI = "https://fcp.vse.cz/4IZ268/2018-2019-ZS/www/dusv03/SP2";
var resFavOb = {};


// Po načtení stránky ověří zda je uživatel přihlášen a zda je k dispozici access token
$(document).ready(function () {
    var currentUrl = window.location.href;
    if (currentUrl.includes("#access_token=")) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                for (var member in resFavOb) delete resfavOb[member];
                loginButton.remove();
                info.empty();
                fillInfo(response);
                fillSearch();
            },
            error: function () {
                alert("Chyba spojení. Prosíme, přihlašte se znovu.");
            }
        });
    }
});



//Přihlášení u účtu Spotify     
loginButton.click(function () {

    //Služí ke generování náhodného stringu pro proměnnou state
    function stringGenerator(length) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var text = '';
        for (var i = 0; i < length; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return text;
    };

    // vytvoření hodnoty state a její uložení do lokálního úložiště
    var stateValue = stringGenerator(16);
    localStorage.setItem(stateKey, stateValue);


    // otevření přihlašovacího okna do spotify pro získání access tokenu
    var scope = 'user-read-email user-read-private';
    var url = 'https://accounts.spotify.com/authorize?response_type=token&client_id=' + encodeURIComponent(clientId) + '&client_id=' +
        encodeURIComponent(scope) + '&redirect_uri=' + encodeURIComponent(redirectURI) + '&state=' + encodeURIComponent(stateValue);
    window.location = url;
});

// Po přihlášení vyplní informační část pro uživatele
var fillInfo = function (response) {
    var html = `Přihlášení uživatele ${response.display_name} proběhlo úspěšně. 
             <br> 
             Vítejte v aplikaci VSEMusicBox !
             <br>
             Nyní můžete vyhledávat písničky.`;
    info.html(html);
};

//Po přihlášení vyplní formulář pro hledání písniček
var fillSearch = function () {
    var html = `<form id="search_form">
         <input id="search_input"></input>
         <button type="submit" id="search_button">Hledat</button>
         </form>`;

    search.html(html);
};


// Po úpravě na obhajobě nefunguje - EventListener není funkce v jQuery
$('#search_form').addEventListener("submit", function () {
    if (!$('#search_input').val()) {
        alert("Musíte zadat jméno písničky, kterou chcete vyhledat");
        return false;
    } else {
        var searchValue = $('#search_input').val();
    };

    var adSearchValue = adjustSearchValue(searchValue);
    var url = 'https://api.spotify.com/v1/search?q=' + adSearchValue.toLowerCase() + '&type=track';
    resultInfo.html('Vyhledávám !');

    // Dotaz na spotify kvůli zjištění přihlášeného uživatele
    $.ajax({
        url: url,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
        success: function (result) {
            foundTracks.empty();
            foundTracks.append(loader);
            resultInfo.html(returnInfo(result.tracks.total));
            renderFound(result);
        },
        error: function () {
            resultInfo.html('Písnička s požadovaným názvem nebyla nalezena !');
        }
    });
});

// Vyhledá písničky jejichž název se shoduje s vyhledaným výrazem.
/*$(document).on('click', '#search_button', function () {
    if (!$('#search_input').val()) {
        alert("Musíte zadat jméno písničky, kterou chcete vyhledat");
        return false;
    } else {
        var searchValue = $('#search_input').val();
    };
 
    var adSearchValue = adjustSearchValue(searchValue);
    var url = 'https://api.spotify.com/v1/search?q=' + adSearchValue.toLowerCase() + '&type=track';
    resultInfo.html('Vyhledávám !');
 
    // Dotaz na spotify kvůli zjištění přihlášeného uživatele
    $.ajax({
        url: url,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
        success: function (result) {
            foundTracks.empty();
            foundTracks.append(loader);
            resultInfo.html(returnInfo(result.tracks.total));
            renderFound(result);
        },
        error: function () {
            resultInfo.html('Písnička s požadovaným názvem nebyla nalezena !');
        }
    });
});*/

// Vypíše informace o nalezených výsledcích
var returnInfo = function (number) {
    if (number === 1) {
        return 'Byl nalezen pouze 1 výsledek.';
    };
    if (number < 5) {
        return 'Byly nalezeny ' + number + ' výsledky.';
    } else {
        return 'Bylo nalezeno celkem ' + number + ' výsledků.';
    };

}

// Přizpůsobí zadanou hodnotu aby odpovídala formátu query Spotify API
var adjustSearchValue = function (searchValue) {
    if (searchValue.includes(" ")) {
        var arr = searchValue.split();
        return arr.join("%20");
        //// encodeURIComponent
    }
    else {
        return searchValue;
    };
}

// Po vyhledání vypíše nalezené písničky do zadané části
var renderFound = function (result) {
    foundTracks.empty();
    var html = "";
    var results = result.tracks.total;
    for (var i = 0; i < results; i++) {// nevhodne pojmenovani promenne
        foundTracks.append(renderSong(result, i));
        var addingButton = $('<button>').addClass('add_button').text('Přidat do playlistu');
        var cursong = $('#' + result.tracks.items[i].id);
        var resObject = result.tracks.items[i];
        $(cursong).append(addingButton);
        addingButton.click(function () {
            addToFavorite(resObject);
        });
    }

    /*foundTracks.html(html);*/
};


// Vypíše písničku zadanou indexem (předaný od rodičovský funkce)
var renderSong = function (result, i) {
    var imgurl = result.tracks.items[i].album.images[1].url;
    var html = `<div class="song" id="${result.tracks.items[i].id}">
     <img class="result_img" src="${imgurl}">
     <div class="result_no"> #${i + 1}</div>
     <div class="result_name">Song name: ${result.tracks.items[i].name}</div>
     <div class="result_artist">Artist: ${result.tracks.items[i].artists[0].name}</div>
     <div class="result_album">Album: ${result.tracks.items[i].album.name}</div>
     <div class="result_year">Rok vydání: ${result.tracks.items[i].album.release_date.substr(0, 4)}</div>
     <audio class"audio_preview" controls><source src="${result.tracks.items[i].preview_url}"></audio>
     </div>`;

    /* Alternativní varianta přidání tlačítka přímo do html kódu písničky */
    /*<button class="add_button"> Přidat do playlistu</button>*/
    return html;
};

// přidá vybranou písničku do playlistu
var addToFavorite = function (resObject) {
    if (checkSong(resObject.id)) {
        var html = `<div class="song" id="${resObject.id}">
     <div class="result_name">Song name: ${resObject.name}</div>
     <div class="result_artist">Artist: ${resObject.artists[0].name}</div>
     <div class="result_album">Album: ${resObject.album.name}</div>
     <div class="result_year">Rok vydání: ${resObject.album.release_date.substr(0, 4)}</div>
     <audio class"audio_preview" controls><source src="${resObject.preview_url}"></audio>
     </div>`

        $('#favorite_enum').append(html);
        resFavOb[resObject.id] = true;
        /*var deleteButton = $('<button>').addClass('del_button').text('Odebrat z playlistu');
        $('#' + resObject.id).append(deleteButton);
        deleteButton.click(function () {
            deleteFromFavorite(resObject);
        });*/
    }
    else {
        alert("Vybraná písnička se již v playlistu nachází !");
        return false;
    }
}

// Zkontroluje zda písnička se zadaným id již není v playlistu
var checkSong = function (id) {
    return (!resFavOb[id]);

    /*
    if (resFavOb.length === 0) {
        return true;
    }
    for (i = 0; i < resFavOb.length; i++) {
        if (id === resFavOb[i]) {
            return false;
        }
    }
    return true;*/
}

// Funkce odstraňující písničku z playlistu po kliknutí
var deleteFromFavorite = function (resObject) {
    // TO BE DONE
}






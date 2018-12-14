/*
FUNKCIONALITY:
- přístup k json
- vyhledání textu v databázi, tlačítko Submit
- autorizace
- vypsání výsledků na stránku
- přidání daných skladeb na stránku do playlistu
- modifikace playlistu (název)
- odstranění skladeb z playlistu
*/
/*----------------------Hide a music form(reveal until the access token is granted)---------------------- */


/*----------------------Gain an access token---------------------- */
(function() {
    
    function login(callback) {
        var CLIENT_ID = "9ed280f473334a61ad254a84e0ec0593";
        var REDIRECT_URI = "https://fcp.vse.cz/";
        function getLoginURL(scopes) {
            return "https://accounts.spotify.com/authorize?client_id=" + CLIENT_ID +
              "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
              "&scope=" + encodeURIComponent(scopes.join(" ")) +
              "&response_type=token";
        }
        
        var url = getLoginURL([
            "user-read-email"
        ]);
        
        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);
    
        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            if (hash.type == "access_token") {
                callback(hash.access_token);
            }
        }, false);
        
        var w = window.open(url,
                            "Spotify",
                            "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left
                           );
    }
    //toto už nefunguje:
    var query = $("#searched-text").val().replace(/ /g, '+');
    var type = $("input:checked", "#search-place").val();
    function searchSpotifyData(accessToken) {
        return $.ajax({
            url: "https://api.spotify.com/v1/search?q=" + query + "&type=" + type, 
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        });
    }
/*-----------Show results in the database template------------------- */
//DEKLARACE VÝSLEDKŮ
   /*
   var addButton = $("<div>").addClass('add-button').text('Přidat');
   var loginButton = document.querySelector("#login-btn");
   */


var resultField;
var resultRow = $("<div>").addClass("result-row");
var submitButton = document.querySelector("#submit-btn");

submitButton.addEventListener("click",function() {
        login(function(accessToken) {
            searchSpotifyData(accessToken)
                .then(function(response) {
                    loginButton.style.display = "none";
                    var result = $('<div>').addClass('result').html(artists.toUpperCase() + ':<br>' + item.volumeInfo.title);
                    resultRow.append($('<hr>')).append(result);
                    resultField.append(resultRow); 
                });
            });
    });
    
})();


/*----------------------Funkce zobraz výsledky---------------------- */


/*----------------------Ověřování---------------------- */
//EXISTENCE SKLADBY V PLAYLISTU
var songExist = function (id) {
    var existingSong = $('#id');
    for (var s = 0; s < existingSong.length; s++) {
        var song = existingSong.get(s);
        if (id === song.innerHTML) {
            return true;
        }
    }
    return false;
}
//OVĚŘENÍ PODMÍNKY, PŘIDÁNÍ NOVÉ SKLADBY
var addingButton = $('<div>').addClass('add-button').text('Přidat');
var id;
var name;
var artist;
var album;


if (songExist(id)) {
    addingButton.addClass("add-new");
}
addingButton.click(function () {
    if (songExist(id)) {
        alert('Tato skladba se již nachází ve tvém playlistu.');
    } else {
        addToPlaylist(id, artist, name, album);
        addingButton.addClass("add-founded");
    }
});
/*----------------------Add a song to my playlist---------------------- */

/*----------------------Create a loader-------------------------------- */

/*
var result = $('<div>').addClass('result').html(artists.toUpperCase() + ':<br>' + item.volumeInfo.title);
resultRow.append($('<hr>')).append(image).append(result).append(addButton);
resultField.append(resultRow); 
*/
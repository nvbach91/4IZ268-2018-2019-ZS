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


/*----------------------Gain an access token---------------------- */

var CLIENT_ID = "9ed280f473334a61ad254a84e0ec0593";
var REDIRECT_URI = "https://fcp.vse.cz/";
//var scopes="user-read-private user-read-email";

(function() {

    function gainAccess(callback) {
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

    var query = $("#searched-text").val().replace(/ /g, '+');
    var type = $("input:checked", "#search-place").val();
    function searchData(accessToken) {
        return $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) { 
                    return "https://api.spotify.com/v1/search?q=" + query +
                      "&type=" + type;
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
            gainAccess(function(accessToken) {});
            searchData(function(accessToken) {});
        });
    })();

/*-----------Show results in the database template------------------- *




/*----------------------Funkce zobraz výsledky---------------------- */


/*----------------------Ověřování---------------------- */
//EXISTENCE SKLADBY V PLAYLISTU

//OVĚŘENÍ PODMÍNKY, PŘIDÁNÍ NOVÉ SKLADBY

/*----------------------Add a song to my playlist---------------------- */

/*----------------------Create a loader-------------------------------- */

<<<<<<< HEAD
=======
var CLIENT_ID = "9ed280f473334a61ad254a84e0ec0593";
var REDIRECT_URI = "https://fcp.vse.cz/";
$.ajax({
    method: 'GET', 
    url: "https://accounts.spotify.com/authorize?client_id=" + CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
    "&scope=" + encodeURIComponent(scopes.join(" ")) +
    "&response_type=token",
    success: function (resp) {
        
    },
  });
  $.ajax(
  {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data: {
      "grant_type":    "authorization_code",
      "code":          code,
      "redirect_uri":  myurl,
      "client_secret": mysecret,
      "client_id":     myid,
    },
    success: function(result) {
      // handle result...
    },
  });
>>>>>>> 4f61e3d4bb3468a6d660a8ad483cd0bbeeae21bf

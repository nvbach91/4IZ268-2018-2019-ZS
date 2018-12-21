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

//var scopes="user-read-private user-read-email";

function submit(callback) {
    var CLIENT_ID = "9ed280f473334a61ad254a84e0ec0593";
    var REDIRECT_URI = "http://localhost:5500/www/zemk05/SPOTIFY/";
    function getLoginURL(scopes) {
        return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
                '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
                '&scope=' + encodeURIComponent(scopes.join(' ')) +
                '&response_type=token';
            }
        var url = getLoginURL(['user-read-email']);
        var w = window.open(url,"_self");

}
submitButton = document.getElementById('submit-btn');
var query = $("#searched-text").val().replace(/ /g, '+');
var type = $("input:checked", "#search-place").val();
//var accessToken=window.location.hash
var hash = window.location.hash.substring(1);
    var params = {}
    hash.split('&').map(hk => { 
      let temp = hk.split('='); 
        params[temp[0]] = temp[1] 
    });
    console.log(params);
    var accessToken=params.access_token;
    //params.access_token
submitButton.addEventListener('click', function() {
     submit(function(accessToken) {});
     function searchData(accessToken) {
        return $.ajax({
            url: "https://api.spotify.com/v1/search?q=" + query + "&type=" + type,
            error: function (error) {
                console.log(arguments);
                alert(" Can't do because: " + error);
            },
            success: function(response) {
                console.log(response.data);
            }
        });
        
    }
    submit();
    searchData();
});
            
/*  
    var resultField;
    var resultRow = $("<div>").addClass("result-row");
    
*/
/*-----------Show results in the database template------------------- */
//DEKLARACE VÝSLEDKŮ
   /*
   var addButton = $("<div>").addClass('add-button').text('Přidat');
   var loginButton = document.querySelector("#login-btn");
   */


/*----------------------Funkce zobraz výsledky---------------------- */


/*----------------------Ověřování---------------------- */
//EXISTENCE SKLADBY V PLAYLISTU

//OVĚŘENÍ PODMÍNKY, PŘIDÁNÍ NOVÉ SKLADBY

/*----------------------Add a song to my playlist---------------------- */

/*----------------------Create a loader-------------------------------- */


/**
 * Webová aplikace pro správu seznamu oblíbených písniček aplikace Spotify
 */


/* Definice datového typu app*/
var App = App || {};


/*Definice selektorů*/

App.searchForm = $('#search-form');
App.searchInput = $('#search-input');
App.foundTracks = $('#results');
App.favoriteTracks = $('#favorite');
App.loader = $('<div>').addClass('loader');

/*Definice základních proměnných*/

var searchValue;
App.client_id = 'bd8138fa0b1640b297139a6b30482253';
App.client_secret = 'ca6649f032bd40919b33f39c42392cdd';
App.baseApiUrl = 'https://api.spotify.com';
var searchValue;
App.authorizationURL = 'https://accounts.spotify.com/api/token';


App.renderFound = function (result) {
    // TO BE DONE
    var html;
    App.foundTracks.html(html);
};

App.init = function () {

    App.searchForm.submit(function (e) {
        e.preventDefault();
        var searchValue = App.searchInput.val();

        if (!searchValue) {
            App.foundTracks.html('<p>Musíte zadat jméno písničky, kterou chcete vyhledat</p>');
            return false;
        }

        var adSearchValue = App.adjustSearchValue(searchValue);
        var url = App.baseApiUrl + '/v1/search?type=track&q=' + adSearchValue;

        App.foundTracks.empty();
        App.foundTracks.append(App.loader);

        /*$.ajax({ 
            type : "GET", 
            url : "authorizationURL", 
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', '[your-api-key]');},
            success : function(result) { 
                //set your variable to the result 
            }, 
            error : function(result) { 
              //handle the error 
            } 
          }); */


        /*var spotifyQueryRequest = $.ajax({

            type: "GET",

            dataType: 'json',

            url: url

        });*/

        $.post({
            url: App.authorizationURL,
            headers: {
                'Authorization': 'Basic ' + (App.client_id + ':' + App.client_secret).toString('base64'),
            },
            data: {
                grant_type: 'client_credentials',

            },
            callback: '?',
            dataType: 'jsonp',
        }).done(function (list) {
            App.renderFound(result);
            App.fetchfavoriteTracks(user.login);
        }).fail(function () {
            App.foundTracks.html('<p>Písnička s požadovaným názvem nebyla nalezena !</p>');
        });

        /*$.post(App.authorizationURL,data:{'grant_type':'client_credential'}, App.fetchTracks());*/
    });
};

App.adjustSearchValue = function (searchVal) {
    var arr = searchVal.split();
    return arr.join("%20")
}

$(document).ready(function () {
    App.init();
});
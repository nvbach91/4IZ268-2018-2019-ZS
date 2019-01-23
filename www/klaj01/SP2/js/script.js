
const apiKey = '43a8e73f86bfd09392311e55fd784c43ae5aced8';

const searchURL = 'https://www.giantbomb.com/api/search/';
const twitchClientId = 'uv11n4zns54ctbu5u5ih3muz6u9urb';

var myGameJson;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

var favoriteGames = [];



var today = dd + '.' + mm + '.' + yyyy;

document.getElementById("topGamesLink").innerHTML = "Nejsledovanější hry k" + ": " + "<strong>" + today + "</strong>";


$("#refresh-button").click(function () {
  document.location.reload();
});

function getData(searchTerm, callback) {
  const settings = {
    url: searchURL,
    data: {
      api_key: apiKey,
      query: `"${searchTerm}"`,
      format: "jsonp",
      resources: "game",
      limit: 10
    },
    type: "GET",
    dataType: "jsonp",
    crossDomain: true,
    jsonp: "json_callback",
    error: function () { alert('Nastal problém s načítáním externích dat') },
    success: callback,
  };
  $.ajax(settings);
}

function renderGame(result) {
  var game = $(`
  <div class="box"> 
	<div> <img class="gameimg" src= "${result.image.medium_url}"> <div>
		<div class="gamename"> <p class="gameTitle"> ${result.name} </p> </div>
		<div> <p class="decker">${result.deck}<p> </div>
		<div class="siteLink"> <a href="${
    result.site_detail_url
    }"class="gamelink" target="_blank">Více informací</a> </div>
     <button class="favoritegame">Přidat do oblíbených</button>	  
  `);
  // game.find(".favoritegame");
  // var favoriteGame = game.find(".favoritegame");
  // favoriteGame.click(function () {
  //favoriteGames.push().JSON.stringify(favoriteGames).load(result.name);
  //});
  return game;
}


$(document).ready(function () {
  $.ajax({
    url: "https://api.twitch.tv/kraken/games/top",
    type: "GET",
    data: {
      limit: 21
    },
    headers: {
      "Client-ID": twitchClientId
    },
    error: function () { alert('Nastal problém s načítáním externích dat') },
    success: function (data) {
      myGameJsonp = data;
      for (var i = 0; i < myGameJsonp.top.length; i++) {
        $("<a href='https://www.twitch.tv/directory/game/"
          + encodeURIComponent(myGameJsonp.top[i].game.name)
          + "' class='list-group-item1' target='_blank'>" + '<span class="gamename">' + [i + 1] + '. '
          + myGameJsonp.top[i].game.name + '</span>' + '<img class="gameimage" src="' + myGameJsonp.top[i].game.box.small + 'alt="Gameimg">' + "</a>").hide().appendTo('#topGamesList').fadeIn(3000);
      }
    }
  })
})


function displayGame(data) {
  const searchResults = data.results.map(renderGame);

  if (searchResults.length == 0) {
    $(`#errorMessage`).removeClass("hide");
  } else if (searchResults.length > 0) {
    $(`#errorMessage`).addClass("hide");
    $(`.flex-container`).html(searchResults);
    timeinInitial();
  }
}

function watchSubmit() {
  $("form").submit(function (event) {
    timeoutBackground();
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find("#searchText");
    let query = queryTarget.val();
    queryTarget.val("");
    getData(query, displayGame);
    timeinBackground();
  });
}
$(watchSubmit);

/* Animace karet */
function timeoutBackground() {
  $(".backgroundImage").fadeOut(1000, function () {
    $(this).remove();
  });
}

function timeinBackground() {
  $(".box").fadeOut(1300, function () { });
}

function timeinInitial() {
  $(`.box`)
    .hide()
    .fadeIn(1500);
}
function restartPage() {
  document.location.reload();
}

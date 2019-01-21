"use strict";

const apiKey = `43a8e73f86bfd09392311e55fd784c43ae5aced8`;

const searchURL = `https://www.giantbomb.com/api/search/`;

function getData(searchTerm, callback) {
  const settings = {
    url: searchURL,
    data: {
      api_key: apiKey,
      query: `"${searchTerm}"`,
      format: "jsonp",
      resources: "game",
      limit: 9
    },
    type: "GET",
    dataType: "jsonp",
    crossDomain: true,
    jsonp: "json_callback",
    success: callback,
  };
  $.ajax(settings);
}

function renderGame(result) {
  return `
  <div class="box"> 
	<div> <img class="gameimg" src= "${result.image.medium_url}"> <div>
		<div class="gamename"> <p class="gameTitle"> ${result.name} </p> </div>
		<div> <p class="decker">${result.deck}<p> </div>
		<div class="siteLink"> <a href="${
    result.site_detail_url
    }"target="_blank">Více informací</a> </div>
		  </div>
		  
	`;
}

$.ajax({
  url: "https://api.twitch.tv/kraken/games/top",
  type: "GET",
  data: {
    limit: 10
  },
  headers: {
    Accept: "application/vnd.twitchtv.v5+json",
    "Client-ID": "uv11n4zns54ctbu5u5ih3muz6u9urb"
  },
  success: function (datatopplayed) {
    console.log(datatopplayed);
    $.each(datatopplayed.games, function () {
      console.log(this.name);
      opt.append(new Option(this.name, this.name));
    });
  }
});

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

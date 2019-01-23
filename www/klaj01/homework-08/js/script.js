var App = App || {};
const apiKey = `43a8e73f86bfd09392311e55fd784c43ae5aced8`;

const searchURL = `https://www.giantbomb.com/api/search/`;
App.renderUser = function(user) {
  var html = `
  <div class="box"> 
	<div> <img src= "${result.image.medium_url}"> <div>
		<div> <p class="gameTitle"> ${result.name} </p> </div>
		<div> <p class="deckER">${result.deck}<p> </div>
		<div class="siteLink"> <a href="${
      result.site_detail_url
    }"target="_blank">Check It Out</a> </div>
		  </div>
`;
  $("#profile").html(html);
};
App.fetchRepositories = function(username) {
  var url = App.baseApiUrl + "/users/" + username + "/repos/";
  var repos = $("#repos");
  repos.empty();
  repos.append($('<div class="loader"></div>'));
  $.ajax({
    url: url,
    data: {
      client_id: App.client_id,
      client_secret: App.client_secret
    }
  }).done(function(repositories) {
    $('<div class="loader"></div>').remove();
    repositories.forEach(function(repository) {
      html = `
            <li class="repository">
              <div class="repo-url"><a href="${repository.html_url}">${
        repository.html_url
      }</a></div>
            </li>
          `;
    });
    $("#repos")
      .empty()
      .append(html);
  });
};
App.init = function() {
  $("#search-form").submit(function(e) {
    e.preventDefault();
    if (!$("#search-input").val()) {
      return false;
    }
    var url = App.baseApiUrl + "/users/" + $("#search-input").val();
    $("#profile").empty();
    $("#profile").append($('<div class="loader"></div>'));
    $.ajax({
      url: url,
      data: {
        client_id: App.client_id,
        client_secret: App.client_secret
      }
    })
      .done(function(user) {
        App.renderUser(user);
        App.fetchRepositories(user.login);
      })
      .fail(function() {
        $("#profile").html("<p>User not found</p>");
      });
  });
};
$(document).ready(function() {
  App.init();
});

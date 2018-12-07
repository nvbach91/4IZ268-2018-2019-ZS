/**
 * Git The Hub
 */

var App = App || {};
// INSERT CLIENT ID FROM GITHUB
App.client_id = '248e90c1e8e75a696626';
// INSERT CLIENT SECRET FROM GITHUB
App.client_secret = 'ac7652120d5103e5ea1a3612aeec262644006cb4';
App.baseApiUrl = 'https://api.github.com';


App.renderUser = function (user) {
  var html = `
    <div class="info">
      <div class="avatar" style="background-image: url(${user.avatar_url})"> </div>
      <div class="info login"> Login :${user.login}</div>
      <div class="info bio"> Company :${user.company || " "}</div>
      <div class="info location"> Location :${user.location || " "}</div>
      <div class="info bio"> Bio :${user.bio || " "}</div>
      <div class="info email"> Email :${user.email || " "}</div>
      <div class="info followers"> Followers :${user.followers || " "}</div>
      <div class="info registred"> Registred :${user.created_at || " "}</div >
      <div class="info url"> <a href = "${user.html_url || " "}">${user.html_url || " "}</div>
    </div >
  `;

  App.userProfile.html(html);

};


App.fetchRepositories = function (a) {

  var login = App.searchInput.val();
  var urlrep = App.baseApiUrl + '/users/' + login + '/repos';
  App.repositories.empty();

  $.getJSON(urlrep).done(function (repositories) {
    var repos = `<p>This user has ${repositories.length || " "} repositories</p>`;

    repositories.forEach(function (repository) {
      repos +=
        `<li class ="repo"> 
        <div class ="repo-name">${repository.name}</div>
        <div class ="repo-url"><a href="${repository.html_url}">${repository.html_url}</a></div>
      </li>
    `;
    });


    App.repositories.html(repos);
  });


};




App.init = function () {
  App.searchInput = $('#search-input');
  App.searchForm = $('#search-form');
  App.userProfile = $('#user-profile');
  App.repositories = $('#repositories');

  App.searchForm.submit(function (e) {
    e.preventDefault();
    var searchInput = App.searchInput.val();
    if (!App.searchInput) { return false; }

    var url = App.baseApiUrl + '/users/' + searchInput + '?client_id=' + App.client_id + '&client_secret=' + App.client_secret;
    App.userProfile.empty();

    $.getJSON(url).done(function (user) {
      App.renderUser(user);
      App.fetchRepositories(user.login);
    }).fail(function () {
      App.userProfile.html('<p>User not found</p>');
    });


  }
  )
};


$(document).ready(function () {
  App.init();
});
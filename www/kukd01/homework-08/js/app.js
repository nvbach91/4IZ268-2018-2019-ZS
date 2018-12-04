/**
 * Git The Hub
 */

var App = App || {};
// INSERT CLIENT ID FROM GITHUB
App.client_id = '248e90c1e8e75a696626';
// INSERT CLIENT SECRET FROM GITHUB
App.client_secret = 'ac7652120d5103e5ea1a3612aeec262644006cb4';
App.baseApiUrl = 'https://api.github.com';

//searchValue z search - input

/*var url = baseApiUrl + '/users/' + searchValue + '?client_id=' + client_id + '&client_secret=' + client_secret;
$.getJSON(url).done(function (user) {
  renderUser(user);
  fetchRepositories(user.login);
}).fail(function () {
  $('#user-profile').html('<p>User not found</p>');
});*/

App.renderUser = function (user) {
  App.html = `
    <div class="info">
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

  App.userProfile.html(App.html);


};

App.fetchRepositories = function (username) {

};

App.init = function () {
  App.searchValue = $('#search-input');
  App.formButton = $('#search-form');
  App.userProfile = $('#user-profile');

  App.formButton.submit(function (e) {
    e.preventDefault();
    var searchValue = App.searchValue.val(); //Proč tady musím použít tuto funkci a nemohu vzít rovnou hodnotu ze selectoru - searchValue ? 
    if (!App.searchValue) { return false; }

    var url = App.baseApiUrl + '/users/' + searchValue + '?client_id=' + App.client_id + '&client_secret=' + App.client_secret;
    App.userProfile.empty();
    //Tohle musí volat asi až v Ajax done ? 
    $.getJSON(url).done(function (user) {
      App.renderUser(user);
      // fetchRepositories(user.login);
    }).fail(function () {
      $('#user-profile').html('<p>User not found</p>');
    });

  }
  )
};


$(document).ready(function () {
  App.init();
});
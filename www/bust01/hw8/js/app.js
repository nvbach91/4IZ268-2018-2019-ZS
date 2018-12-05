/**
 * Git The Hub
 */

var App = App || {};
// INSERT CLIENT ID FROM GITHUB
App.client_id = 'b829208bba619271c3c6';
// INSERT CLIENT SECRET FROM GITHUB
App.client_secret = '7e38404ca4ef780e0e45da5dd78c8b912a22ae30';
App.baseApiUrl = 'https://api.github.com';
App.renderUser = function(user) {
    var infoDet = `<div class="info">
        <div class="info-name">${user.name || ''}</div>
        <div class="info-main">
          <div class="avatar" style="background-image: url(${user.avatar_url})"></div>
          <div class="info-figures">
            <div class="info-login">Login:<strong>${user.login}</strong></div>
            <div class="info-company">Company:<strong>${user.company || ''}</strong></div>
            <div class="info-location">Location:<strong>${user.location || ''}</strong></div>
            <div class="info-bio">Bio:<strong>${user.bio || ''}</strong></div>
            <div class="info-email">Email:<strong>${user.email || ''}</strong></div>
            <div class="info-followers">Followers:<strong>${user.followers || ''}</strong></div>
            <div class="info-created">Created:<strong>${user.created_at || ''}</strong></div>
            <div class="info-profile"><a href="${user.html_url || ''}">${user.html_url || ''}</a></div>
          </div>
        </div>
        <div class="info-odkaz"><a href="${user.html_url || ''}" target="_blank">View profile</a></div>
      </div>`;
    App.userProfile.html(infoDet);
  }; 
App.fetchRepositories = function(username) {
  App.repositoriesField.empty();
  App.repositoriesField.append(App.loader);
  var url = App.baseApiUrl + '/users/' + username + '/repos';
  var ajxRep = $.ajax({
    url: url,
    datatype: 'JSON',
    data: {
      client_id: App.client_id,
      client_secret: App.client_secret,
    },
  })
  ajxRep.done(function(repositories) {
    App.loader.remove();
    if(repositories.length == 1){
    var html = `<p>This user has ${repositories.length} repository</p>`;
    }
    else {
      var html = `<p>This user has ${repositories.length} repositories</p>`;
    }
    repositories.forEach(function(repository) {
      html += `<li class="repository">
    <div class="name">${repository.name}</div>
    <div class="url"><a href="${repository.html_url}">${repository.html_url}</a></div>
  </li>`;
    });
    App.repositoriesField.empty().append(html);
  })
};
App.init = function() {
  App.searchForm.submit(function(e) {
    e.preventDefault();
    var searchValue = App.searchInput.val();
    App.userProfile.append(App.loader);
    if (!searchValue) {
      App.userProfile.empty();
      alert("Nebyl zadán název uživatele.")
      return false;
    }
    var url = App.baseApiUrl + '/users/' + searchValue + '?client_id=' + App.client_id + '&client_secret=' + App.client_secret;
  var ajxUser = $.getJSON(url);
  ajxUser.done(function(user) {
   App.renderUser(user);
   App.fetchRepositories(user.login);
  })
  ajxUser.fail(function() {
  var html = `<div>User not found</div>`;
  App.userProfile.html(html);
  var htmlrep = `<div>No repositories</div>`;
  App.repositoriesField.empty().html(htmlrep);
    });
  });
};
$(document).ready(function() {
  App.userProfile = $('#user-profile');
  App.searchInput = $('#search-input');
  App.searchForm = $('#search-form');
  App.repositoriesField = $('#repositories');
  App.loader = $('<div class="loader"></div>');
  App.init();
});

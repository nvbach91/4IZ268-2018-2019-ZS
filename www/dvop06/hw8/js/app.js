
/**
 * Git The Hub
 */

var App = App || {};
// INSERT CLIENT ID FROM GITHUB
App.client_id = '6fbda7c39dd43fd60fdc';
// INSERT CLIENT SECRET FROM GITHUB
App.client_secret = '1ad74f632decd0ed501666a7dd573701e71c436d';
App.baseApiUrl = 'https://api.github.com';

App.renderUser = function (user) {
  var html = `
    <div class="user-info">

      <div class="user-avatar" style="background-image: url(${user.avatar_url})"></div>
      <div class info-item>
        <div>Login</div>
        <div>${user.login}</div>
      </div>
      <div class info-item>
        <div>Bio</div>
        <div>${user.bio}</div>
      </div>
      <div class info-item>
        <div>Location</div>
        <div>${user.location}</div>
      </div>
      <div class info-item>
        <div>Description</div>
        <div>${user.description}</div>
      </div>
      <div class info-item>
        <div>Email</div>
        <div>${user.email}</div>
      </div>
      <div class info-item>
        <div>Followers</div>
        <div>${user.followers}</div>
      </div>
      <div class info-item>
        <div>Registered</div>
        <div>${user.created_at}</div>
      </div>
    </div>
    `;
  App.userProfile.html(html);
};
App.fetchRepositories = function (login) {
  var url = baseApiUrl + '/users/' + login + '/repos' + '?client_id=' + client_id + '&client_secret=' + client_secret;
  $.getJSON(url).done(function (repositories) {
    var html = `<p>This user has + ${repositories.length} + repositories.</p>`;
    repositories.forEach(function (repository) {
      html += `
      <li class="repository">
          <div class="repo-name">${repository.name}</div>
          <div class="repo-url"><a href="${repository.html_url}">${repository.html_url}</a></div>
        </li>
      `;
    });
    App.repos.empty().append(html);
  });
  App.init = function () {

    App.searchInput = $('#search-input');
    App.username = App.searchInput.val();
    App.userProfile = $('#user-profile');
    App.repos = $('#repositories');
    App.searchForm = $('#search-form');
    var url = baseApiUrl + '/users/' + username + '?client_id=' + client_id + '&client_secret=' + client_secret;
    // $.getJSON(url).done(function (user) {
    //   renderUser(user);
    //   fetchRepositories(user.login);
    // }).fail(function () {
    //   $('#user-profile').html('<p>User not found</p>');
    // });
  };
  $(document).ready(function () {
    App.init();
  });
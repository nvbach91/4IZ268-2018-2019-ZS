/**
 * Git The Hub
 */

var App = App || {};
// INSERT CLIENT ID FROM GITHUB
App.client_id = 'f5b34b87c71acae5206b';
// INSERT CLIENT SECRET FROM GITHUB
App.client_secret = '43037fb2c332da307df2ddce82fd816cd603fbb2';
App.baseApiUrl = 'https://api.github.com';
App.renderUser = function (user) {
    var html = /*html*/`
    <div class="main">
      <div class="name">${user.name || ''}</div>
      <div class="avatar" style="background-image: url(${user.avatar_url})"></div>
    </div>
      <div class="info">
      <div class="login">
        <div id="title">Login</div>
        <div>${user.login}</div>
      </div>
      <div class="email">
        <div id="title">Email</div>
        <div>${user.email || ''}</div>
      </div>
      <div class="company">
        <div id="title">Company</div>
        <div>${user.company || ''}</div>
      </div>
      <div class="location">
        <div id="title">Location</div>
        <div>${user.location || ''}</div>
      </div>
      <div class="descriptopn">
        <div id="title">Description</div>
        <div>${user.bio || ''}</div>
      </div>
      <div class="followers">
        <div id="title">Followers</div>
        <div>${user.followers || ''}</div>
      </div>
      <div class="firstday">
        <div id="title">Registered</div>
        <div>${new Date(user.created_at).toLocaleDateString('cs-CZ')}</div>
      </div>
      <a class="goprofile" href="${user.html_url || ''}">View profile</a>  
      </div>
  `;
    $('#user-profile').html(html);
};
App.fetchRepositories = function (username) {
    var url = App.baseApiUrl + '/users/' + username + '/repos';
    $('#repositories').empty();
    $('#repositories').append($('<div class="loader"></div>'));
    $.ajax({
        url: url,
        data: {
            client_id: App.client_id,
            client_secret: App.client_secret,
        },
    }).done(function (repositories) {
        $('<div class="loader"></div>').remove();
        repositories.forEach(function (repository) {
            html = /*html*/`
        <li class="repository">
          <div class="repo-url"><a href="${repository.html_url}">${repository.html_url}</a></div>
        </li>
      `;
        });
        $('#repositories').empty().append(html);
    });
};
App.init = function () {
    $('#search-form').submit(function (e) {
        e.preventDefault();
        if (!$('#search-input').val()) {
            return false;
        }
        var url = App.baseApiUrl + '/users/' + $('#search-input').val();
        $('#user-profile').empty();
        $('#user-profile').append($('<div class="loader"></div>'));
        $.ajax({
            url: url,
            data: {
                client_id: App.client_id,
                client_secret: App.client_secret,
            },
        }).done(function (user) {
            App.renderUser(user);
            App.fetchRepositories(user.username);
        }).fail(function () {
            $('#user-profile').html('<p>User not found</p>');
        });
    });
};
$(document).ready(function () {
    App.init();
});
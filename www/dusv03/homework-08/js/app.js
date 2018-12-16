/**
 * Git The Hub
 */

var App = App || {};

App.searchForm = $('#search-form');
App.searchInput = $('#search-input');
App.userProfile = $('#user-profile');
App.repositories = $('#repositories');
App.loader = $('<div>').addClass('loader');

App.client_id = 'a3aa880f9d44a258eb3c';
App.client_secret = '7dff340228b4a56d1219b955f3172dda6eccf4f2';

App.baseApiUrl = 'https://api.github.com';
var searchValue;

var url = App.baseApiUrl + '/users/' + searchValue + '?client_id=' + App.client_id + '&client_secret=' + App.client_secret;


App.renderUser = function (user) {
    var createdDate = new Date(user.created_at).toLocaleDateString('cs-CZ');
    var html = /*html*/`
      <div class="basic-info">
        <div class="bi-name">${user.name || ''}</div>
        <div class="bi-avatar" style="background-image: url(${user.avatar_url})"></div>
        <div class="bi-info bi-username">
          <div>Login</div>
          <div>${user.login}</div>
        </div>
        <div class="bi-info bi-company">
          <div>Bio</div>
          <div>${user.company || ''}</div>
        </div>
        <div class="bi-info bi-location">
          <div>Location</div>
          <div>${user.location || ''}</div>
        </div>
        <div class="bi-info bi-bio">
          <div>Description</div>
          <div>${user.bio || ''}</div>
        </div>
        <div class="bi-info bi-email">
          <div>Email</div>
          <div>${user.email || ''}</div>
        </div>
        <div class="bi-info bi-followers">
          <div>Followers</div>
          <div>${user.followers || ''}</div>
        </div>
        <div class="bi-info bi-created">
          <div>Registered</div>
          <div>${createdDate}</div>
        </div>
        <div class="bi-info bi-profile"><a href="${user.html_url || ''}">${user.html_url || ''}</a></div>
        <a class="btn bi-view" href="${user.html_url || ''}" target="_blank">View profile</a>
      </div>
    `;
    App.userProfile.html(html);
};

App.fetchRepositories = function (login) {
    App.repositories.empty();
    App.repositories.append(App.loader);
    var url = App.baseApiUrl + '/users/' + login + '/repos';
    $.ajax({
        url: url,
        data: {
            client_id: App.client_id,
            client_secret: App.client_secret,
        },
    }).done(function (repositories) {
        App.loader.remove();
        var html = `<p>This user has ${repositories.length} repositories</p>`;
        repositories.forEach(function (repository) {
            html += /*html*/`
        <li class="repository">
          <div class="repo-name">${repository.name}</div>
          <div class="repo-url"><a href="${repository.html_url}">${repository.html_url}</a></div>
        </li>
      `;
        });
        App.repositories.empty().append(html);
    });
};

App.init = function () {

    App.searchForm.submit(function (e) {
        e.preventDefault();
        var searchValue = App.searchInput.val();

        if (!searchValue) {
            App.userProfile.html('<p>Musíte zadat jméno, které chcete vyhledat</p>');
            return false;
        }

        var url = App.baseApiUrl + '/users/' + searchValue;

        App.userProfile.empty();
        App.userProfile.append(App.loader);
        $.ajax({
            url: url,
            data: {
                client_id: App.client_id,
                client_secret: App.client_secret,
            },
        }).done(function (user) {
            App.renderUser(user);
            App.fetchRepositories(user.login);
        }).fail(function () {
            App.userProfile.html('<p>Uživatel nebyl nalezen !</p>');
        });
    });
};

$(document).ready(function () {
    App.init();
});
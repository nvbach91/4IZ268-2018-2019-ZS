/**
 * Inspirovat se v tomto kĂłdu mĹŻĹľeĹˇ, ale opisovat ho nesmĂ­Ĺˇ, protoĹľe by to smysl nemÄ›lo -- Master Yoda
 */

var App = App || {};
App.client_id = '67df13db9faa3d2037e5';
App.client_secret = 'dc13c3526b797f32dcaeec2af9572d05d1808dd7';
App.baseApiUrl = 'https://api.github.com';
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
    App.jUserProfile.html(html);
};
App.fetchRepositories = function (login) {
    App.jRepositories.empty();
    App.jRepositories.append(App.loader);
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
        App.jRepositories.empty().append(html);
    });
};
App.init = function () {
    App.jUserProfile = $('#user-profile');
    App.jSearchInput = $('#search-input');
    App.jSearchForm = $('#search-form');
    App.jRepositories = $('#repositories');
    App.loader = $('<div class="loader"></div>');

    App.jSearchForm.submit(function (e) {
        e.preventDefault();
        var searchValue = App.jSearchInput.val();
        if (!searchValue) {
            return false;
        }
        var url = App.baseApiUrl + '/users/' + searchValue;

        App.jUserProfile.empty();
        App.jUserProfile.append(App.loader);

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
            App.jUserProfile.html('<p>User not found</p>');
        });
    });
};
$(document).ready(function () {
    App.init();
});
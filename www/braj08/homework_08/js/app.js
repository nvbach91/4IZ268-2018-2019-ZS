/**
 * Git The Hub
 */
var App = App || {};
App.client_id = '90b853118b528b975fc8';
App.client_secret = 'cf17339d1c9e4ca54beb58b82f2f95f4f7c649bc';
App.baseApiUrl = 'https://api.github.com';

App.init = function() {
    App.jUser = $('#user-profile');
    App.jInput = $('#search-input');
    App.jForm = $('#search-form');
    App.jRepositories = $('#repositories');
    App.loader = $('<div class="loader"></div>');
    App.jForm.submit(function(f) {
        f.preventDefault();
        var searchValue = App.jInput.val();
        if (!searchValue) {
          return false;
        } else {
        var url = App.baseApiUrl + '/users/' + searchValue;
        App.jUser.append(App.loader);
        $.getJSON({
            url: url, 
            data: {
            client_id: App.client_id,
            client_secret: App.client_secret,
            },
        }).done(function(user) {
          App.renderUser(user);
          App.fetchRepositories(user.login);
        }).fail(function() {
          App.jUser.html('<p>User not found</p>');
        });
      }});
    };

App.renderUser = function(user) {
    var registerDate = new Date(user.created_at);
    var html_user = 
    `<div class ="info">
            <div class="name">${user.name || ''}</div>
            <div class="image" style="background-image: url(${user.avatar_url || ''}")>
            </div>
            <div class="right-side username">
                <div>Login: </div>
                <div>${user.login}</div>
            </div>
            <div class="right-side company">
                <div>Company: </div>
                <div>${user.company || ''}</div>
            </div>
            <div class="right-side location">
                <div>Location: </div>
                <div>${user.location || ''}</div>
            </div>
            <div class="right-side description">
                <div>Description: </div>
                <div>${user.bio || ''}</div>
            </div>
            <div class="right-side mail">
                <div>Email: </div>
                <div>${user.mail || ''}</div>
            </div>
            <div class="right-side followers">
                <div>Followers: </div>
                <div>${user.followers || ''}</div>
            </div>
            <div class="right-side registered">
                <div>Registered: </div>
                <div>${registerDate}</div>
            </div>
            <div class="right-side link">
                <div><a href="${user.html_url}" target="_blank">${user.html_url}</a></div>
            </div>
        </div>`;
    App.jUser.html(html_user);  
};

App.fetchRepositories = function(login) {
    App.jRepositories.append(App.loader);
    var url = App.baseApiUrl + '/users/' + login + '/repos';
    $.getJSON({
      url: url,
      data: {
        client_id: App.client_id,
        client_secret: App.client_secret,
      },
    }).done(function(repositories) {
      var html = `<p>This user has ${repositories.length} repositories</p>`;
      repositories.forEach(function(repository) {
        html = html + `<li class="repository-item">
                            <div class="repository-name">${repository.name} | </div>
                            <div class="repository-url"><a href="${repository.html_url}" target="_blank">${repository.html_url}</a></div>
                         </li>`;
      });
      App.loader.remove();
      App.jRepositories.append(html);
    });
};



$(document).ready(function() {
  App.init();
});
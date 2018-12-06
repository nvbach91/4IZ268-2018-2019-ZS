
var App = App || {};
App.client_id = 'fb75cc6c85c65df71173';
App.client_secret = 'd938251b1b5b275c97b591f477d476067f0d74ef';
App.baseApiUrl = 'https://api.github.com';


App.renderUser = function(user) {
    $("#user-profile").append(`<img src="${user.avatar_url}" alt=""><div>${user.name}</div><div>${user.company}</div>`);
    };
App.renderRepos = function(repos) {
    for (var i=0; i < repos.length; i++){
        $("#repositories").append(`<li><p>${repos[i].name}</p><a href="${repos[i].html_url}">${repos[i].html_url}</a></li>`);
    }
};
App.fetchRepositories = function(username) {
    var url = App.baseApiUrl + '/users/' + username + '/repos?client_id=' + App.client_id + '&client_secret=' + App.client_secret;
    $.getJSON(url).done(function(repos) {
        App.renderRepos(repos);
    }).fail(function() {
        $('#user-profile').html('<p>User not found</p>');
    });
    };
App.init = function() {
        $("#button-search").click(function () {
            var searchValue = $("#search-input").val();
            var url = App.baseApiUrl + '/users/' + searchValue + '?client_id=' + App.client_id + '&client_secret=' + App.client_secret;
            $.getJSON(url).done(function(user) {
                App.renderUser(user);
                App.fetchRepositories(user.login);
            }).fail(function() {
                $('#user-profile').html('<p>User not found</p>');
            });
        })
    };

$(document).ready(function() {
   App.init();
});

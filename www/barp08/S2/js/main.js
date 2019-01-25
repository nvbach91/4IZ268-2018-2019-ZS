//func for debouncing keyup AJAX calls

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

$(document).ready(function () {
    $('#searchUser').keyup(delay(function (e) {
        let username = e.target.value;

        // API request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                // My account - OAuth app UserInfo
                client_id: '1e4042cdd2536243f127',
                client_secret: '89d3399dbf8083cb8ef003f338c2403cfdaea6f2'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '1e4042cdd2536243f127',
                    client_secret: '89d3399dbf8083cb8ef003f338c2403cfdaea6f2',
                    per_page: 20
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
                    <div class="card">
                      <div class="row">
                        <div class="col-md-3">
                          ${repo.name}:
                        </div>
                        <div class="col-md-9">
                            <a href="${repo.html_url}" target="_blank">${repo.html_url}</a>
                        </div>
                    </div>
                </div>
                        `);
                });
            });
            // date from ISO ISO 8601 format to some nice looking one
            function isoToDMY(s) {
                var b = s.split(/\D/);
                return b[2] + '/' + b[1] + '/' + b[0];
            }
            var betterDate = isoToDMY(user.created_at);

            $('#profile').html(`
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                        <img class="thumbnail avatar" src="${user.avatar_url}">
                        </div>
                        <br>
                        <div class="col-md-9">
                        <ul class="list-group">
                            <li class="list-group-item">Username: ${username}</li>
                            <li class="list-group-item">URL: <a href="${user.html_url}" target="_blank">${user.html_url}</a></li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Public repos: ${user.public_repos}</li>
                            <li class="list-group-item">Following: ${user.following}</li>
                            <li class="list-group-item">Member since: ${betterDate}</li>
                        </ul>
                        </br>
                    </div>
                    <h4 class="panel-title">List of repos:</h4>
                    </div>
                </div>
          </div>
            `);
        });
    }, 500));
});
$(document).ready(function() {
    $('#searchUser').on('keyup', function(e) {
        let username = e.target.value;

        // API request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                // My account - OAuth app UserInfo
                client_id: '1e4042cdd2536243f127',
                client_secret: '89d3399dbf8083cb8ef003f338c2403cfdaea6f2'
            }
        }).done(function(user) {
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
                            <li class="list-group-item">URL: ${user.html_url}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Public repos: ${user.public_repos}</li>
                            <li class="list-group-item">Following: ${user.following}</li>
                            <li class="list-group-item">Member since: ${user.created_at}</li>
                        </ul>
                    </div>
                    </div>
                </div>
          </div>
            `);
        });
    });
});
var cb = new Codebird;
cb.setConsumerKey("7T3WDEIZI6AlJzuuPrufryPJk", "ChNjwMAe75zthLay6dwK5kpDqptuY6j3n9eEUF2WhHs9yy2qrX");
cb.__call("oauth2_token", {}, function (reply, err) {
    var bearer_token;
    if (err) {
        console.log("error response or timeout exceeded" + err.error);
    }
    if (reply) {
        bearer_token = reply.access_token;
    }
});

window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };
    return t;
}(document, "script", "twitter-wjs"));

$("#search-input").keyup(function (event) {
    if (event.keyCode == 13) {
        $("#buttonSearch").click();
    }
});

$("#buttonSearch").click(function () {
    if ($('#search-input').val().trim() == '') {
        alert('Input can not be empty.');
    }
    else {
        searchUsers();
    }
});

document.querySelector('.list').addEventListener('click', function (e) {
    var item = e.target;
    $('#search-input').val(item.innerText);
    $("#buttonSearch").click();
});

var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
favorites.forEach(function (favorite) {
    $(".list").append($("<li>").text(favorite));
});

function searchUsers() {
    $('.list').empty();

    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(function (favorite) {
        $(".list").append($("<li>").text(favorite));
    });

    var userInput = $('#search-input').val();
    var paramUser = {
        screen_name: userInput
    };

    $('#latest_container').empty();
    $('#first_container').empty();
    $('#latestdirected_container').empty();

    cb.__call("users_show", paramUser, function (reply, rate, err) {
        console.log(reply);

        var split = reply.created_at.split(' ');
        var date = split.splice(1, 2);
        var year = split[split.length - 1];
        date.push(year);
        date = date.join(' ');

        var verified = "";
        if (reply.verified) {
            verified = "Yes";
        }
        else {
            verified = "No";
        }

        var screenName = reply.screen_name;

        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        document.querySelector('#user').addEventListener('click', function (e) {

            var item = e.target;
            var index = favorites.indexOf(screenName);

            if (index == -1) {
                favorites.push(screenName);
                item.className = 'fav';
                $('.list').empty();
                favorites.forEach(function (favorite) {
                    $(".list").append($("<li>").text(favorite));
                });
            } else {
                favorites.splice(index, 1);
                item.className = '';
                $('.list').empty();
                favorites.forEach(function (favorite) {
                    $(".list").append($("<li>").text(favorite));
                });
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });

        $('#basic_stats').html("<h2>Basic Statistics</h2>");
        $('#user').html("<strong>User:</strong> " + screenName);
        $('#profile_image').html("<strong>Profile Image:</strong> <img src=" + reply.profile_image_url + " alt='ProfileImage'>");
        $('#name').html("<strong>Name:</strong> " + reply.name);
        $('#description').html("<strong>Description:</strong> " + reply.description);
        $('#location').html("<strong>Location:</strong> " + reply.location);
        $('#verified').html("<strong>Verified:</strong> " + verified);
        $('#created').html("<strong>Account Created:</strong> " + date);
        $('#followers').html("<strong>Number of followers:</strong> " + reply.followers_count);
        $('#friends').html("<strong>Number of followings:</strong> " + reply.friends_count);
        $('#favourites').html("<strong>Number of favourites:</strong> " + reply.favourites_count);
        $('#tweets').html("<strong>Number of tweets:</strong> " + reply.statuses_count);

        var latestTweets = {
            screen_name: screenName,
            include_rts: false,
            count: 50
        };

        cb.__call("statuses_userTimeline", latestTweets, function (reply, rate, err) {
            console.log(reply);
            try {
                $('#latest_stats').html("<h2>Latest Tweet by User</h2>");
                twttr.widgets.createTweet(reply[0].id_str,
                    $('#latest_container')[0],
                    {
                        theme: 'light',
                    }
                );
            }
            catch{
                $('#latest_stats').html("<h2>Latest Tweet by User</h2>");
                $('#latest_container').text("No User tweets were found.");
            }
        },
            true
        );

        var randomTweets = {
            screen_name: screenName,
            include_rts: false,
            count: 200
        };

        cb.__call("statuses_userTimeline", randomTweets, function (reply, rate, err) {
            console.log(reply);
            var realTweets = reply.length;
            var minNumber = 0;
            var maxNumber = realTweets;
            var randomNumber = Math.floor(Math.random() * (+maxNumber - +minNumber)) + +minNumber;
            try {
                $('#random_stats').html("<h2>Random Tweet by User</h2>");
                twttr.widgets.createTweet(reply[randomNumber].id_str,
                    $('#first_container')[0],
                    {
                        theme: 'light',
                    }
                );
            }
            catch{
                $('#random_stats').html("<h2>Random Tweet by User</h2>");
                $('#first_container').text("No User tweets were found.");
            }
        },
            true
        );

        var latestDirectedTweets = {
            q: "-filter:nativeretweets to:" + screenName,
            count: 50
        };

        cb.__call("search_tweets", latestDirectedTweets, function (reply, rate, err) {
            console.log(reply);
            try {
                $('#latestdirected_stats').html("<h2>Latest Tweet replying to User</h2>");
                twttr.widgets.createTweet(reply.statuses[0].id_str,
                    $('#latestdirected_container')[0],
                    {
                        theme: 'light',
                    }
                );
            }
            catch{
                $('#latestdirected_stats').html("<h2>Latest Tweet replying to User</h2>");
                $('#latestdirected_container').text("No replies to the User were found.");
            }
        },
            true
        );
    },
        true
    );
    $('#search-input').val('');
}
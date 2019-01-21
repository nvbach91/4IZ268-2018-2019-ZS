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
    searchUsers();
});

function searchUsers() {
    var params = {
        screen_name: document.getElementById("search-input").value
    };
    document.getElementById("latest_container").innerHTML = "";
    document.getElementById("first_container").innerHTML = "";
    document.getElementById("latestdirected_container").innerHTML = "";
    cb.__call("users_show", params, function (reply, rate, err) {
        console.log(reply);

        var split = reply.created_at.split(' ');
        var date = split.splice(1, 2);
        var year = split[split.length - 1];
        date.push(year);
        date = date.join(' ');

        var verified = "";
        if (reply.verified == true) {
            verified = "Yes";
        }
        else {
            verified = "No";
        }
        document.getElementById("profile_image").innerHTML = "<img src=" + reply.profile_image_url + ">";
        document.getElementById("name").innerHTML = reply.name;
        document.getElementById("description").innerHTML = reply.description;
        document.getElementById("location").innerHTML = reply.location;
        document.getElementById("created").innerHTML = date;
        document.getElementById("followers").innerHTML = reply.followers_count;
        document.getElementById("friends").innerHTML = reply.friends_count;
        document.getElementById("favourites").innerHTML = reply.favourites_count;
        document.getElementById("statuses").innerHTML = reply.statuses_count;
        document.getElementById("verified").innerHTML = verified;

        var Tweets = {
            screen_name: reply.screen_name,
            include_rts: false,
            count: 50
        };

        cb.__call("statuses_userTimeline", Tweets, function (reply, rate, err) {
            console.log(reply);
            try {
                twttr.widgets.createTweet(
                    reply[0].id_str,
                    document.getElementById('latest_container'),
                    {
                        theme: 'light',
                    }
                );
            }
            catch{
                document.getElementById("latest_container").innerHTML = "No User tweets were found";
            }
        },
            true
        );

        var randomTweets = {
            screen_name: reply.screen_name,
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
                twttr.widgets.createTweet(
                    reply[randomNumber].id_str,
                    document.getElementById('first_container'),
                    {
                        theme: 'light',
                    }
                );
            }
            catch{
                document.getElementById("first_container").innerHTML = "No User tweets were found";
            }
        },
            true
        );

        var paramsTweets = {
            q: "-filter:nativeretweets to:" + reply.screen_name,
            count: 50
        };

        cb.__call("search_tweets", paramsTweets, function (reply, rate, err) {
            console.log(reply);
            try {
                twttr.widgets.createTweet(
                    reply.statuses[0].id_str,
                    document.getElementById('latestdirected_container'),
                    {
                        theme: 'light',
                    }
                );
            }
            catch{
                document.getElementById("latestdirected_container").innerHTML = "No replies to the User were found.";
            }
        },
            true
        );
    },
        true
    );
}
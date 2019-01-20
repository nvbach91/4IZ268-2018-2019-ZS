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
function searchUsers() {
    var params = {
        screen_name: document.getElementById("search-input").value
    };
    document.getElementById("latest_container").innerHTML = "";
    document.getElementById("first_container").innerHTML = "";
    document.getElementById("latestdirected_container").innerHTML = "";
    cb.__call(
        "users_show",
        params,
        function (reply, rate, err) {
            console.log(reply);
            document.getElementById("profile_image").innerHTML = "<img src=" + reply.profile_image_url + ">";
            document.getElementById("name").innerHTML = reply.name;
            document.getElementById("description").innerHTML = reply.description;
            document.getElementById("location").innerHTML = reply.location;
            document.getElementById("created").innerHTML = reply.created_at;
            document.getElementById("followers").innerHTML = reply.followers_count;
            document.getElementById("friends").innerHTML = reply.friends_count;
            document.getElementById("favourites").innerHTML = reply.favourites_count;
            document.getElementById("statuses").innerHTML = reply.statuses_count;
            document.getElementById("verified").innerHTML = reply.verified;
            twttr.widgets.createTweet(
                reply.status.id_str,
                document.getElementById('latest_container'),
                {
                    theme: 'light',
                }
            );
            twttr.widgets.createTweet(
                '0',
                document.getElementById('first_container'),
                {
                    theme: 'light',
                }
            );
            var paramsTweets = {
                q: "to:" + reply.screen_name,
                count: 1
            };
            cb.__call(
                "search_tweets",
                paramsTweets,
                function (reply) {
                    console.log(reply);
                    twttr.widgets.createTweet(
                        reply.statuses[0].id_str,
                        document.getElementById('latestdirected_container'),
                        {
                            theme: 'light',
                        }
                    );
                },
                true
            );
        },
        true
    );
}
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
    cb.__call(
        "users_show",
        params,
        function (reply, rate, err) {
            console.log(reply);
            document.getElementById("name").innerHTML = "Name: " + reply.name;
            document.getElementById("description").innerHTML = "Description: " + reply.description;
            document.getElementById("location").innerHTML = "Location: " + reply.location;
            document.getElementById("created").innerHTML = "Account created: " + reply.created_at;
            document.getElementById("followers").innerHTML = "Number of followers: " + reply.followers_count;
            document.getElementById("friends").innerHTML = "Number of followings: " + reply.friends_count;
            document.getElementById("favourites").innerHTML = "Number of favourites: " + reply.favourites_count;
            document.getElementById("statuses").innerHTML = "Number of tweets: " + reply.statuses_count;
            document.getElementById("verified").innerHTML = "Verified: " + reply.verified;
        },
        true
    );
}
var searchButton = document.querySelector('#button');
var input = document.querySelector("#search-input");
var userProfile = document.querySelector("#user-profile");
var label = document.querySelector("#label");
var tag = "prague";

var token = '1804866677.62bd4a1.e4cec3783b484776a96708277600efa5';

var fetchUsers = async () => {
    var api_call = await fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token);
    var data = await api_call.json();
    return { data };
}

var showData = () => {
    fetchUsers().then((res) => {
        res.data.data.forEach(function (post) {
            post.tags.forEach(function (tg) {
                if (tg === tag) {
                    console.log(tg);
                    label.innerHTML += '<img class="image" src="' + post.images.standard_resolution.url + '" alt="First slide">';
                }
            })
        });;
    }
    );
}



searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    showData();
});
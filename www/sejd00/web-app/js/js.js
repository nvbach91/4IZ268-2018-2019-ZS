var searchButton = document.querySelector('#button');
var input = document.querySelector("#search-input");
var userProfile = document.querySelector("#user-profile");
var label = document.querySelector("#photo");
var likes = document.querySelector("#likes");
var test = document.querySelector("#test");
var indicators = document.querySelector("#seznam-indicators");
var tag;
var pocet = 0;

var token = '1804866677.62bd4a1.1fd524b45f6945b5a465a6bae3a393db';

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
                    // label.innerHTML += '<img class="image" src="' + post.images.standard_resolution.url + '" alt="First slide">';
                    // likes.innerHTML += '<p>Počet likes: ' + post.likes.count + '</p><br><p>' + post.caption.text + '</p>';
                    indicators.innerHTML += '<li data-target="#myCarousel" data-slide-to="' + pocet + '"></li>'

                    test.innerHTML += '<div class="item"> <img src="' + post.images.standard_resolution.url + '" alt="Chicago" style="width:100%;">' +
                        '<div class="carousel-caption">' +
                        '<h3>' + post.caption.text + '</h3>' +
                        '<p>Počet likes: ' + post.likes.count + '</p>' +
                        '</div>'
                    pocet++;
                }
            })
        });;
    }
    );

}



searchButton.addEventListener("click", (e) => {

    test.innerHTML += '<div class="item active">' +

        '<div class="carousel-caption">' +
        '<h3>AHOJ</h3>' +
        '<p>LA is always so much fun!</p>' +
        '</div>' +
        '</div>';
    tag = document.querySelector("#text").value;
    e.preventDefault();
    showData();

});
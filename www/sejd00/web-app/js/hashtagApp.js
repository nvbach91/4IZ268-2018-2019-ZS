var searchButton = document.querySelector("#button");
var input = document.querySelector("#search-input");
var userProfile = document.querySelector("#user-profile");
var label = document.querySelector("#photo");
var likes = document.querySelector("#likes");
var posts = document.querySelector("#posts");
var indicators = document.querySelector("#list-indicators");
var tag = document.querySelector("#hashtagSelector");
var tagSearch;
var indicatorNumber = 0;
var a = [];
var allTags;
var token = localStorage.getItem("token");

var fetchUsers = async () => {
    var api_call = await fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token);
    var data = await api_call.json();
    return { data };
}

var showData = () => {
    posts.innerHTML = `<div class="item active">
                        <p class="post-intro">Prohlížej šipkama!</p>
                      </div>`;
    indicators.innerHTML = "";
    console.log(posts.innerHTML);
    fetchUsers().then((respond) => {
        label.innerHTML += `<p>Přihlášený uživatel: ${respond.data.data[0].user.full_name}</p>`;

        respond.data.data.forEach(function (post) {

            post.tags.forEach(function (tg) {

                if (tg === tagSearch) {
                    // label.innerHTML += '<img class="image" src="' + post.images.standard_resolution.url + '" alt="First slide">';
                    // likes.innerHTML += '<p>Počet likes: ' + post.likes.count + '</p><br><p>' + post.caption.text + '</p>';
                    indicators.innerHTML += `<li data-target="#myCarousel" data-slide-to="${indicatorNumber}"></li>`;
                    posts.innerHTML += `<div class="item"> <img src="${post.images.standard_resolution.url}" alt="Obrazek ${indicatorNumber + 1}">
                                            <div class="desc"> 
                                                <h3>Fotka číslo: ${indicatorNumber + 1}</h3> 
                                                <p>Počet likes: ${post.likes.count}</p>
                                                <p>Popis fotky: ${post.caption.text}</p>
                                                <p><a href="#">#${post.tags[indicatorNumber]}</a></p>
                                            </div>
                                       </div>`;
                    indicatorNumber++;
                }
            });
        });
    });
};

searchButton.addEventListener("click", (e) => {
    tagSearch = tag.value;
    if (token === "undefined" || token === null || tagSearch === "") {
        window.alert("Musíš zadat hashtag a být přihlášený.");
        e.preventDefault();
    } else {
        indicatorNumber = 0;
        posts.innerHTML = "";
        label.innerHTML = "";
        e.preventDefault();
        showData();
    }

});
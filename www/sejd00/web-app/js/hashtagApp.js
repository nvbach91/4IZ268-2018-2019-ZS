var searchButton = document.querySelector('#button');
var input = document.querySelector("#search-input");
var userProfile = document.querySelector("#user-profile");
var label = document.querySelector("#photo");
var likes = document.querySelector("#likes");
var posts = document.querySelector("#posts");
var indicators = document.querySelector("#seznam-indicators");
var tag = document.querySelector("#text").value;;
var pocet = 0;

var token = localStorage.getItem("token");

var fetchUsers = async () => {
    var api_call = await fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token);
    var data = await api_call.json();
    return { data };
}

var showData = () => {
    posts.innerHTML = `<div class="item active"><p class="post-intro">Prohližej šipkama!
                      <div class="carousel-caption">
                      <h3>Prohlížeč</h3>
                      <p>20 obrázků</p>
                      </div>
                      </div>`;
    indicators.innerHTML = "";
    console.log(posts.innerHTML);
    fetchUsers().then((res) => {
        res.data.data.forEach(function (post) {
            post.tags.forEach(function (tg) {
                if (tg === tag) {
                    console.log(tg);
                    // label.innerHTML += '<img class="image" src="' + post.images.standard_resolution.url + '" alt="First slide">';
                    // likes.innerHTML += '<p>Počet likes: ' + post.likes.count + '</p><br><p>' + post.caption.text + '</p>';
                    indicators.innerHTML += `<li data-target="#myCarousel" data-slide-to="${pocet}"></li>`

                    posts.innerHTML += `<div class="item"> <img src="${post.images.standard_resolution.url}" alt="Obrazek" style="width:50%;"> 
                                        <div class="carousel-caption"> 
                                        <h3>Fotka číslo: ${pocet + 1}</h3> 
                                        <p>Počet likes: ${post.likes.count}</p>
                                        </div>
                                       </div>`;
                    pocet++;
                }
            })
        });;
    }
    );
}

searchButton.addEventListener("click", (e) => {
    posts.innerHTML = "";
    tag = document.querySelector("#text").value;
    e.preventDefault();
    showData();
});
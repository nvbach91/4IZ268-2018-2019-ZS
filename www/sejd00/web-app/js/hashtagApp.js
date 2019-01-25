var searchButton = document.querySelector("#button");
var input = document.querySelector("#search-input");
var userProfile = document.querySelector("#user-profile");
var label = document.querySelector("#photo");
var likes = document.querySelector("#likes");
var posts = document.querySelector("#posts");
var selectTag = document.querySelector("#selectTag");
var indicators = document.querySelector("#list-indicators");
var tag = document.querySelector("#hashtagSelector");
var tagSearch;
var indicatorNumber = 0;
var a = [];
var allTags = [];
var token = localStorage.getItem("token");

var fetchUsers = async () => {
    var api_call = await fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token);
    var data = await api_call.json();
    return { data };
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

$(document).ready(function disTags() {
    fetchUsers().then((respond) => {
        for (let i = 0; i < respond.data.data.length; i++) {
            for (let j = 0; j < respond.data.data[i].tags.length; j++) {
                allTags += respond.data.data[i].tags[j] + ":";
            }
        }
        var tagsArray = allTags.split(':');
        // var distinctTags = new Set(tagsArray);
        var distinctTags = tagsArray.filter(onlyUnique);

        distinctTags.forEach(tag => {
            selectTag.innerHTML += `<option value="${tag}">${tag}</option>`;
        });
    });
})



var showData = () => {

    indicators.innerHTML = "";

    fetchUsers().then((respond) => {
        label.innerHTML += `<p>Přihlášený uživatel: ${respond.data.data[0].user.full_name}</p>`;

        respond.data.data.forEach(function (post, index) {
            var isFirst;
            var active = "";
            if (index === 0) {
                isFirst = true;
            }
            else {
                isFirst = false;
            }
            if (isFirst) {
                active = "active";
            }

            post.tags.forEach(function (tg) {

                if (tg === tagSearch) {
                    // label.innerHTML += '<img class="image" src="' + post.images.standard_resolution.url + '" alt="First slide">';
                    // likes.innerHTML += '<p>Počet likes: ' + post.likes.count + '</p><br><p>' + post.caption.text + '</p>';
                    indicators.innerHTML += `<li data-target="#myCarousel" data-slide-to="${indicatorNumber}"></li>`;
                    posts.innerHTML += `<div class="item ${active}"> <img src="${post.images.standard_resolution.url}" alt="Obrazek ${indicatorNumber + 1}">
                                            <div class="desc"> 
                                                <h3>Fotka číslo: ${indicatorNumber + 1}</h3> 
                                                <p>Počet likes: ${post.likes.count}</p>
                                                <p>${post.caption.text}</p>
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
    tagSearch = selectTag.options[selectTag.selectedIndex].text;
    //tagSearch = tag.value;
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
//searching by pressing enter
function enterSearch() {
    var input = document.getElementById("keyword");
    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("btnSearch").click();
        }
    })
}
enterSearch();

//search video and search results
document.getElementById("btnSearch").addEventListener("click", searchVid);

function searchVid() {
    gapi.client.setApiKey('AIzaSyAgAcMNHu1LUVxiGKN8Onb_Qga3WTImnI8');
    gapi.client.load('youtube', 'v3', function () {
        makeRequest();
    });
}
function makeRequest() {
    var keyword = document.getElementById("keyword").value;
    var searchRequest = gapi.client.youtube.search.list({
        q: keyword,
        part: 'snippet',
        maxResults: 5
    });
    searchRequest.execute(function (response) {
        var clearList = document.getElementById("searchResults");
        clearList.innerHTML = '';

        var searchVids = response.result.items;


        var content = "";
        searchVids.forEach(function (item, index) {            
            content += '<div class="video" id="video" data-id="' + item.id.videoId + '">' +
                '<img src="' + item.snippet.thumbnails.high.url + '"></img>' + '<div class="overlay"><div class="overlayText">' + item.snippet.title + '</div></div>' +
                '</div>';
        })
        document.getElementById("searchResults").innerHTML = content;

        searchedVidsEvListen();
        searched();
    })
}

//update main video
var classname = document.getElementsByClassName("video");

var changeMainVid = function () {
    var attribute = this.getAttribute("data-id");
    document.getElementById("mainVid").innerHTML = '<iframe data-id="' + attribute + '"src="https://www.youtube.com/embed/' + attribute + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
}

function searchedVidsEvListen() {
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener("click", changeMainVid, false);
    }
}



//add video to favorites
document.getElementById("addFav").addEventListener("click", function () {
    addToFavs();
});

function addToFavs() {
    var mainVidId = document.getElementById("mainVid").firstChild.getAttribute("data-id");

    //no same videos in favorites condition
    var favVids = document.getElementsByClassName("favVid");
    for (var i = 0; i < favVids.length; i++) {
        tempId = favVids[i].getAttribute("data-id");
        if (mainVidId == tempId) {
            return alert("You already added this video to favorites!");
        }
    }

    var favs = document.getElementById("favs");
    favs.insertAdjacentHTML("beforeend", '<div class="favVid" data-id="' + mainVidId + '"> <img src="https://i.ytimg.com/vi/' + mainVidId + '/hqdefault.jpg"></img></div>');

    favs.lastChild.addEventListener("click", function () {
        document.getElementById("mainVid").innerHTML = '<iframe data-id="' + mainVidId + '"src="https://www.youtube.com/embed/' + mainVidId + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    })
}

//search bar change to search
function searched() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("search").innerHTML = this.responseText;
            document.getElementById("searched").addEventListener("click", function () {
                searchBar();
            })
        }
    };
    xhttp.open("GET", "searched.txt", true);
    xhttp.send();
}

//searched change to search bar
function searchBar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("search").innerHTML = this.responseText;
            document.getElementById("btnSearch").addEventListener("click", searchVid);
            enterSearch();
        }
    };
    xhttp.open("GET", "searchBar.txt", true);
    xhttp.send();
}

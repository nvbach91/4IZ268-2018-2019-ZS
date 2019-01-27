//searching by pressing enter
var input = document.getElementById("keyword");
input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btnSearch").click();
    }
})

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

        searchVids.forEach(function (item, index) {
            var temp = document.getElementById("searchResults").innerHTML;
            document.getElementById("searchResults").innerHTML =
                temp + '<div class="video" id="video" data-id="' + item.id.videoId + '">' +
                /*item.snippet.title + '<p></p>' +*/
                '<img src="' + item.snippet.thumbnails.high.url + '"></img>' +
                '</div>';
        })
        cycle();
    })
}

//update main video
var classname = document.getElementsByClassName("video");

var changeMainVid = function () {
    var attribute = this.getAttribute("data-id");
    document.getElementById("mainVid").innerHTML = '<iframe data-id="' + attribute + '"src="https://www.youtube.com/embed/' + attribute + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
}

function cycle() {
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
    favVids = document.getElementsByClassName("favVid");
    for (i = 0; i < favVids.length; i++) {
        tempId = favVids[i].getAttribute("data-id");
        if (mainVidId == tempId) {
            return alert("You already added this video to favorites!");
        }
    }

    document.getElementById("favs").insertAdjacentHTML("beforeend", '<div class="favVid" data-id="' + mainVidId + '"> <img src="https://i.ytimg.com/vi/' + mainVidId + '/hqdefault.jpg"></img></div>');

    document.getElementById("favs").lastChild.addEventListener("click", function () {
        document.getElementById("mainVid").innerHTML = '<iframe data-id="' + mainVidId + '"src="https://www.youtube.com/embed/' + mainVidId + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    })
}




/*document.getElementById("video").addEventListener("click", loadDoc)

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("searchResults").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "data.txt", true);
    xhttp.send();
  }*/
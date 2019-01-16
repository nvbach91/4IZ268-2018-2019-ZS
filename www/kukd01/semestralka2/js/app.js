var App = App || {};

App.baseApiUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';

App.buttonLoader = (`<button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                    </button>`);

App.formButton = $(".form-button");
App.carousel = $('.carousel-1');
App.myJSON;

App.init = function () {

    App.token = localStorage.getItem('token');
    App.formButton.append(App.buttonLoader);

    var url = App.baseApiUrl + App.token;

    $.getJSON(url, function (json) {
        App.myJSON = json;
    })

        .done(function () {
            console.log("JSON downloaded");
            // App.carouselPhotos(url);
            App.formButton.empty();
            App.formButton.append('<button type="submit" class="btn btn-primary">Hledej</button>');
        }).fail(function () {
            console.log("problem with getJSON");
        });

};




//Po zmáčnutí tlačítka hledej volá metodu pro vytvoření carouselu
galleryForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var hastagGallery = $('#hashtagInput').val();
    $('#galleryForm').trigger("reset");
    App.galleryList(hastagGallery);
});

//Vytváří carousel
App.galleryList = function (tag) {
    var nalezeno = false;
    var media = "";

    App.myJSON.data.forEach(function (a) {
        a.tags.forEach(function (b) {

            if (b == tag) {
                nalezeno = true;

                media += `<div class="media">
                
                    <img src="${a.images.thumbnail.url}"  
                    data-largeimg="${a.images.standard_resolution.url}" 
                    class="align-self-center mr-3 modalImg"  
                    onclick="onClick(this)" 
                     alt="${a.caption.text}">
                
                <div class="media-body">
                  <h5 class="mt-0">${a.caption.text}</h5> 
                  <div class = "likes"> 
                        <img src="../img/heart.png" width="30" height="30" alt="Srdce"> 
                        <p>${a.likes.count} likes</p>
                    </div>
                </div>
              </div>
              
             `;


            }

        });

    });


    if (nalezeno === true) {
        $('.mediaList').html(media);
    }
    else {
        App.carousel.html('<p>Hashtag nenalezen</p>')
    }
};

//Otevírá modální okno
function onClick(element) {
    document.getElementById("img01").src = element.getAttribute("data-largeimg");
    document.getElementById("img01").alt = element.getAttribute("alt");
    document.getElementById("modal01").style.display = "block";
}

function localToken() {
    hash = window.location.hash.substr(1); //url of the current page

    if (hash !== "") {
        arHash = hash.split('='); //this creates an array with key ([0] element) and value ([1] element)
        App.token1 = arHash[1]; //recieve value
        localStorage.setItem("token", App.token1);
        window.location = 'http://127.0.0.1:5500/search.html';
    }
}

$(document).ready(function () {
    App.init();
    localToken();
});


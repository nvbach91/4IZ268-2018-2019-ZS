var App = App || {};
//User token 


//App.token = url.split("=")[1]; //"1150314422.93c52c9.a0e2f3b2a4fe4091a63d1455ed3b2958";

App.baseApiUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';


App.buttonLoader = (`<button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                    </button>`);

App.formButton = $(".form-button");
App.carousel = $('.carousel-1');
App.myJSON;

App.init = function () {


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
    console.log(hastagGallery);
    $('#galleryForm').trigger("reset");
    App.carouselPhotos(hastagGallery);
});

//Vytváří carousel
App.carouselPhotos = function (tag) {
    var nalezeno = false;
    var content = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">`;

    App.myJSON.data.forEach(function (a) {
        a.tags.forEach(function (b) {

            if (b == tag) {
                nalezeno = true;
                content += `<div class="carousel-item">
                <img class="d-block w-100" src="${a.images.standard_resolution.url}"
                    alt="First slide"> 
                    <p>${a.caption.text}</p>
                    <div class = "likes"> 
                        <img src="../img/heart.png" width="30" height="30" alt="Srdce"> 
                        <p>${a.likes.count} likes</p>
                    </div>
            </div>`;

            }

        });

    });
    content += ` </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a> </div>`;

    if (nalezeno == true) {
        App.carousel.html(content);
        $('.carousel-item').first().removeClass('carousel-item').addClass('carousel-item active');
    }
    else {
        App.carousel.html('<p>Hashtag nenalezen</p>')
    }
};


$(document).ready(function () {
    hash = window.location.hash.substr(1); //url of the current page
    arHash = hash.split('='); //this creates an array with key ([0] element) and value ([1] element)
    App.token = arHash[1]; //recieve value

    App.init();



});
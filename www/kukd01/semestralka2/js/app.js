var App = App || {};
//User token 
App.token = "1150314422.93c52c9.a0e2f3b2a4fe4091a63d1455ed3b2958";
App.baseApiUrl = "https://api.instagram.com/v1/users/self/media/recent/?access_token="

App.myJSON;
App.init = function () {

    var url = App.baseApiUrl + App.token;
    console.log(url);


    $.getJSON(url, function (json) {
        App.myJSON = json;
    })

        .done(function () {
            console.log("JSON downloaded");
            App.carouselPhotos(url);
        }).fail(function () {
            console.log("problem with getJSON");
        });

};

App.carouselPhotos = function () {
    App.carousel = $('.carousel-1');
    var tag = "hockey";
    var content = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">`;
    console.log(App.myJSON);

    App.myJSON.data.forEach(function (a) {
        a.tags.forEach(function (b) {

            if (b == tag) {
                content += `<div class="carousel-item">
                <img class="d-block w-100" src="${a.images.standard_resolution.url}"
                    alt="First slide">
            </div>`;
                console.log(a.images.standard_resolution.url);
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

    App.carousel.html(content);
    $('.carousel-item').first().removeClass('carousel-item').addClass('carousel-item active');

};


$(document).ready(function () {
    App.init();

});
var App = App || {};

App.baseApiUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';

App.buttonLoader = (`<button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                    </button>`);

App.formButton = $('.form-button');
App.carousel = $('.carousel-1');
App.mediaList = $('.mediaList');
App.myJSON;

App.init = function () {

    App.token = localStorage.getItem('token');
    App.formButton.append(App.buttonLoader);

    var url = App.baseApiUrl + App.token;

    $.getJSON(url, function (json) {
        App.myJSON = json;
    }).done(function () {
        //console.log("JSON downloaded");
        App.formButton.empty();
        App.formButton.append('<button type="submit" class="btn btn-primary">Hledej</button>');
        tagsText();
    }).fail(function () {
        //console.log("problem with getJSON");
    });

};

//Přihlašovací tlačítko
$(".authBut").click(function () {
    document.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=93c52c960d444e75b7c60e3c46ba182d&redirect_uri=https://fcp.vse.cz/4IZ268/2018-2019-ZS/www/kukd01/semestralka2/search.html&response_type=token';
});




//Funkce vypíše všechny #hashtagy
function tagsText() {
    var tags = [];
    App.myJSON.data.forEach(function (a) {
        a.tags.forEach(function (b) {
            tags.push(b);

        });
    });

    App.unique = tags.filter(onlyUnique);
    createHashButton();
    //$("#galleryForm").append('<div><p>Seznam hastags:' + unique + '</p></div>');
};

function createHashButton() {
    len = App.unique.length;
    var buttHash = '<div><p>Seznam hastags:';
    for (var i = 0; i < len; i++) {

        buttHash += ' <button type="submit" class="btn btn-primary buttHash" >' + App.unique[i] + '</button>';
    }
    buttHash += '</p></div>';
    $("#galleryForm").append(buttHash);
    klikej();
}

function klikej() {
    $(".buttHash").click(function (e) {
        App.mediaList.empty();
        e.preventDefault();

        var hastagGallery = $(this).text();

        App.galleryList(hastagGallery);

    });
};

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}



//Po zmáčnutí tlačítka hledej volá metodu galleryList
galleryForm.addEventListener('submit', function (e) {
    App.mediaList.empty();
    e.preventDefault();
    var hastagGallery = $('#hashtagInput').val();
    $('#galleryForm').trigger("reset");
    App.galleryList(hastagGallery);
});

//Vytváří galleryList
App.galleryList = function (tag) {
    //console.log(tag);
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


    if (nalezeno) {
        App.mediaList.html(media);
        App.carousel.empty();
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

//Ukládá token do localStorage
function localToken() {
    hash = window.location.hash.substr(1); //url of the current page

    if (hash !== "") { //Po změně na !hash nefuguje
        arHash = hash.split('='); //this creates an array with key ([0] element) and value ([1] element)
        App.token1 = arHash[1]; //recieve value
        localStorage.setItem("token", App.token1);
        window.location = 'https://fcp.vse.cz/4IZ268/2018-2019-ZS/www/kukd01/semestralka2/search.html'; //Při nasazení na web bude potřeba změnit + redirect URI
    }
}

$(document).ready(function () {
    App.init();
    localToken();
});


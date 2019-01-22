$(document).ready(function () {
    var ptoken = '1404870044.fa0d083.290093ca2a4d4a7f90e28bf31ec3570d',
        token = ptoken,
        mtoken = '6320184047.209a707.58363885aaa94bcdb68332026275b3f1',
        numphotos = 18,
        container = document.getElementById('instafeed'),
        modal = document.getElementById('myModal'),
        modalImg = document.getElementById("imgModal"),
        captionText = document.getElementById("caption"),
        parsedResult;

    // vytvoření objektu XHR
    xhr = new XMLHttpRequest();

    // definice funkce volané v případě změny stavu požadavku
    xhr.onreadystatechange = function () {

        // je už požadavek vyřízen?
        if (xhr.readyState === XMLHttpRequest.DONE) {

            // je návratový kód v pořádku?
            if (xhr.status === 200) {
                container.style.display = "flex";
                parsedResult = JSON.parse(xhr.response);
                console.log(parsedResult.data);
                var innerString = "";
                for (x in parsedResult.data) {

                    if (document.getElementById('p' + x) == null) {
                        innerString += ' <div class="photoBox"><img id = "p' + x + '" alt = "Photo from Instagram"><div class="midle"><div class="textOnHover" id="l' + x + '"><img class="icon" src="IMG/heart-solid.svg" alt="heart icon"></div></div></div>';
                    }

                }
                container.innerHTML += innerString;

                for (x in parsedResult.data) {
                    var img = document.getElementById('p' + x);
                    img.src = parsedResult.data[x].images.standard_resolution.url;
                    img.srcset = parsedResult.data[x].images.thumbnail.url + ' 150w,' + parsedResult.data[x].images.low_resolution.url + ' 306w,' + parsedResult.data[x].images.standard_resolution.url + ' 612w';
                    img.onload = fillByImage(img);
                    img.data = x;
                    img.onclick = function () { openModal(this) };

                    var textOnHover = document.getElementById('l' + x);
                    textOnHover.innerHTML = '<img class="icon" src="IMG/heart-solid.svg" alt="heart icon"></img>' + parsedResult.data[x].likes.count;

                }

            } else {
                parsedResult = JSON.parse(xhr.response);
                alert(parsedResult.meta.error_message);
            }
        }
    }

    // nastavení způsobu odeslání požadavku
    xhr.open("GET", 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + numphotos);

    // odeslání požadavku
    xhr.send();

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }

    $('#profilBT').click(function () {
        container.style.display = "none";
        xhr.abort();
        if (this.innerHTML == '@makacenkoteam') {
            token = mtoken;
            this.innerHTML = '@lukashodbod';
            $('.profileName').text('Instagram @makacenkoteam');
            xhr.open("GET", 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + numphotos);

        } else {
            token = ptoken;
            this.innerHTML = '@makacenkoteam';
            $('.profileName').text('Instagram @lukashodbod');
            xhr.open("GET", 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + numphotos);

        }
        xhr.send();
    });

    $('#BT').click(function () {
        window.open("https://api.instagram.com/oauth/authorize/?client_id=209a707af7004f7abcc776a3cdeddaa2&redirect_uri=http://127.0.0.1:5500/foto.html&response_type=token");
        //token = getTokenFromUrl();
        //xhr.open("GET", 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + numphotos);
        //xhr.send();
    });
    $('#BT2').click(function () {
        token = getTokenFromUrl();
        xhr.open("GET", 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + numphotos);
        xhr.send();
    });


    function openModal(obr) {
        modal.style.display = "block";
        modalImg.src = obr.src;
        console.log(obr.src);
        modalImg.srcset = obr.srcset;
        /*var imgtags="";
        if (parsedResult.data[obr.data].carousel_media!=null) {
            for (x in parsedResult.data[obr.data].carousel_media ) {
          
            }
            modal.innerHTML+= '<a class="prev">&#10094;</a><a class="next">&#10095;</a>';
            $( ".prev" ).click(function() {
                modalImg.src=parsedResult.data[obr.data].carousel_media[1].images.standard_resolution.url;
                console.log(parsedResult.data[obr.data].carousel_media[1].images.standard_resolution.url);
                console.log(modalImg.src);
                
              });
        }*/
        captionText.innerHTML = parsedResult.data[obr.data].caption.text;
    }

});

function fillByImage(photo) {
    var pRatio = 1, tRatio = photo.naturalWidth / photo.naturalHeight;
    if (1 < tRatio) {
        photo.classList.add('fillHeight');
        photo.classList.remove('fillWidth');
    } else {
        photo.classList.add('fillWidth');
        photo.classList.remove('fillHeight');
    }
}
function getTokenFromUrl() {
    var query = document.URL;
    var vars = query.split('=');
    return vars[1];

}



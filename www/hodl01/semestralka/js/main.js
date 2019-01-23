
$(document).ready(function () {
    var ptoken = '1404870044.fa0d083.290093ca2a4d4a7f90e28bf31ec3570d',
        mtoken = '6320184047.209a707.58363885aaa94bcdb68332026275b3f1',
        token = ptoken,
        personalToken = null,
        numphotos = 18,
        container = document.getElementById('instafeed'),
        modal = document.getElementById('myModal'),
        modalImg = document.getElementById('imgModal'),
        captionText = document.getElementById('caption'),
        profilePicture = document.getElementById('profilePicture'),
        bio = document.getElementById('bio'),
        follows = document.getElementById('follows'),
        profileNameH2 = $('.profileName'),
        parsedResult,
        parsedInfo,
        xhr = new XMLHttpRequest();

    // definice funkce volané v případě změny stavu požadavku
    xhr.onreadystatechange = function () {

        // je už požadavek vyřízen?
        if (xhr.readyState === XMLHttpRequest.DONE) {

            // je návratový kód v pořádku?
            if (xhr.status === 200) {
                parsedResult = JSON.parse(xhr.response);
                console.log(parsedResult);
                if (parsedResult.data[0] == undefined) {
                    parsedInfo = parsedResult;
                    profilePicture.src = parsedInfo.data.profile_picture;
                    bio.innerText = parsedInfo.data.bio;
                    follows.innerText = "followers: " + parsedInfo.data.counts.followed_by;
                    xhr.open("GET", 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + numphotos);
                    xhr.send();
                }
                else {
                    container.style.display = "flex";

                    var innerString = "";
                    container.innerHTML = "";
                    for (x in parsedResult.data) {

                        if (document.getElementById('p' + x) == null) {
                            innerString += ' <div class="photoBox"><img id="p' + x + '" alt="Photo from Instagram">' +
                                '<div class="midle"><div class="textOnHover" id="l' + x + '"><img class="icon" src="IMG/heart-solid.svg" alt="heart icon"></div></div></div>';
                        }

                    }
                    container.innerHTML += innerString;
                    profileNameH2.text('Instagram @' + parsedResult.data[0].user.username);
                    for (x in parsedResult.data) {
                        var img = document.getElementById('p' + x);
                        img.src = parsedResult.data[x].images.standard_resolution.url;
                        img.srcset = parsedResult.data[x].images.thumbnail.url + ' 150w,' + parsedResult.data[x].images.low_resolution.url + ' 306w,' + parsedResult.data[x].images.standard_resolution.url + ' 612w';
                        img.onload = fillByImage;
                        img.data = x;
                        img.onclick = function () { openModal(this) };

                        var textOnHover = document.getElementById('l' + x);
                        textOnHover.innerHTML = '<img class="icon" src="IMG/heart-solid.svg" alt="heart icon"></img>' + parsedResult.data[x].likes.count;

                    }
                }

            } else {
                parsedResult = JSON.parse(xhr.response);
                alert(parsedResult.meta.error_message);
            }
        }
    }
    xhrRequestSend();

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

        } else {
            token = ptoken;
            this.innerHTML = '@makacenkoteam';

        }
        xhrRequestSend();
    });

    $('#BT').click(function () {
        askToken();
    });

console.log(personalToken);
console.log(getTokenFromUrl() != undefined);

    if (getTokenFromUrl() != undefined) {
        if (personalToken == null) {
            personalToken = getTokenFromUrl();
        }
        token = personalToken;
        xhrRequestSend();
    }
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



    function fillByImage() {
        var pRatio = 1, tRatio = this.naturalWidth / this.naturalHeight;
        if (1 < tRatio) {
            this.classList.add('fillHeight');
            this.classList.remove('fillWidth');

        } else {
            this.classList.add('fillWidth');
            this.classList.remove('fillHeight');

        }
    }
    function xhrRequestSend() {
        xhr.open("GET", 'https://api.instagram.com/v1/users/self/?access_token=' + token);
        xhr.send();
    }
    function askToken() {
        window.open("https://api.instagram.com/oauth/authorize/?client_id=209a707af7004f7abcc776a3cdeddaa2&redirect_uri=http://127.0.0.1:5500/foto.html&response_type=token", "_self");
    }
    function getTokenFromUrl() {
        var query = document.URL;
        var vars = query.split('=');
        return vars[1];

    }

});

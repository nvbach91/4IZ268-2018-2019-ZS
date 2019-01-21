$(document).ready(function () {
    var ptoken = '1404870044.fa0d083.290093ca2a4d4a7f90e28bf31ec3570d',
        token = ptoken,
        mtoken = '6320184047.209a707.58363885aaa94bcdb68332026275b3f1',
        container = document.getElementById('instafeed'),
        modal = document.getElementById('myModal'),
        modalImg = document.getElementById("img01"),
        captionText = document.getElementById("caption"),
        parsedResult,
        requestArray = new Array("první hodnota", "druhá hodnota");

    // vytvoření objektu XHR
    xhr = new XMLHttpRequest();

    // definice funkce volané v případě změny stavu požadavku
    xhr.onreadystatechange = function () {

        // je už požadavek vyřízen?
        if (xhr.readyState === XMLHttpRequest.DONE) {

            // je návratový kód v pořádku?
            if (xhr.status === 200) {


                console.log(xhr.responseText);
                parsedResult = JSON.parse(xhr.response);
                console.log(parsedResult.data);
                for (x in parsedResult.data) {
                    console.log(parsedResult.data[x].likes.count);

                    var img = document.getElementById('p' + x);

                    img.src = parsedResult.data[x].images.standard_resolution.url;
                    img.srcset = parsedResult.data[x].images.thumbnail.url + ' 150w,' + parsedResult.data[x].images.low_resolution.url + ' 306w,' + parsedResult.data[x].images.standard_resolution.url + ' 612w';
                    img.onload = fillByImage(img);
                    img.onclick = function () { openModal(this) };
                    //img.addEventListener("click", openModal(x));


                    var textOnHover = document.getElementById('l' + x);
                    textOnHover.innerHTML += parsedResult.data[x].likes.count;
                }

            } else {
                console.log(xhr.responseText);
            }
        }
    }

    // nastavení způsobu odeslání požadavku
    xhr.open("GET", 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + 2);

    // odeslání požadavku
    xhr.send();

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }

    $('#profilBT').click(function () {
        if (this.innerHTML == '@makacenkoteam') {
            token = mtoken;
            this.innerHTML = '@lukashodbod';
            $('.profileName').text('Instagram @makacenkoteam');
            xhr.abort();
            xhr.open("GET", 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + 2);
            xhr.send();
        } else {
            token = ptoken;
            this.innerHTML = '@makacenkoteam';
            $('.profileName').text('Instagram @lukashodbod');
            xhr.abort();
            xhr.open("GET", 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + 2);
            xhr.send();
        }
    });
    function openModal(obr) {
        console.log(obr);

        modal.style.display = "block";
        modalImg.src = obr.src;
        captionText.innerHTML = obr.alt;
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


$(function () {
    //Instagram API
    var token = '1404870044.fa0d083.290093ca2a4d4a7f90e28bf31ec3570d',
        num_photos = 18, // max 20
        container = document.getElementById('instafeed'),
        scrElement = document.createElement('script');

    window.mishaProcessResult = function (data) {
        for (x in data.data) {
            container.innerHTML += '<div class="photoBox"><img onload="fillByImage(this)" src="' + data.data[x].images.low_resolution.url + '"></div>';
        }
    }

    scrElement.setAttribute('src', 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + num_photos + '&callback=mishaProcessResult');
    document.body.appendChild(scrElement);


});
function fillByImage(t) {
    var p = t.parentElement;
    var pRatio = 1, tRatio = t.naturalWidth / t.naturalHeight;
    if (pRatio < tRatio) {
        t.classList.add('fillHeight');
        t.classList.remove('fillWidth');
    } else {
        t.classList.add('fillWidth');
        t.classList.remove('fillHeight');
    }
}


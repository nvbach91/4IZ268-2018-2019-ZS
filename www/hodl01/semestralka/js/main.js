$(function () {
    //Instagram API
    var ptoken = '1404870044.fa0d083.290093ca2a4d4a7f90e28bf31ec3570d',
        mtoken = '6320184047.209a707.58363885aaa94bcdb68332026275b3f1',
        container = document.getElementById('instafeed');

    window.mishaProcessResult = function (data) {
        for (x in data.data) {
            container.innerHTML += '<div class="photoBox"><img onload="fillByImage(this)" onclick="window.open(\''+ data.data[x].link +'\')" src="' + data.data[x].images.low_resolution.url + '"><div class="midle"><div class="textOnHover"><img class="icon" src="IMG/heart-solid.svg" alt="heart icon"> ' + data.data[x].likes.count + '</div></div></div>';
        }
    }
    apiScriptCreate(ptoken);


    $('button').click(function () {
        $('.apiScript').remove();
        $('.photoBox').remove();
        if (this.innerHTML == '@makacenkoteam') {
            apiScriptCreate(mtoken);
            this.innerHTML = '@lukashodbod';
            $('.profileName').innerHTML = 'Instagram @makacenkoteam';
        } else {
            apiScriptCreate(ptoken);
            this.innerHTML = '@makacenkoteam';
            $('.profileName').innerHTML = 'Instagram @lukashodbod';
        }
    });


});

function apiScriptCreate(token) {
    var num_photos = 18;
    var scrElement = document.createElement('script');
    scrElement.classList = 'apiScript';
    scrElement.setAttribute('src', 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + num_photos + '&callback=mishaProcessResult');
    document.body.appendChild(scrElement);
}
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


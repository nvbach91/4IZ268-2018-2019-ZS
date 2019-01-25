(function () {
    Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.5.7/themes/classic/galleria.classic.min.js');
    Galleria.run('.galleria');
}());

var offsetChecker = true;

function reloadFrame() {
    var ifcal = $("#iframe_calendar");

    ifcal.append(ifcal.html()).find('iframe').last().css('display', 'none');

    setTimeout(function () {
        $("#iframe_calendar iframe:not(:last-child)").remove();
        $("#iframe_calendar iframe").css('display', 'block');
        offsetChecker = true;
    }, 4000);
}

$(document).ready(function () {

    $(window).scroll(function () {
        var currentOffset = $(window).scrollTop();
        if (currentOffset >= 1600 && currentOffset <= 1850 && offsetChecker === true) {
            reloadFrame();
            offsetChecker = false;
        }
    });

});
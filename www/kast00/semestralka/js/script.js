document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 200) {
        $('.scrollToTop').fadeIn();
    } else {
        $('.scrollToTop').fadeOut();
    }

});

$(function () { $("#scrollButton").click(function () { $("html,body").animate({ scrollTop: $("#wrapper").offset().top }, "1000"); return false }) })

function openRestaurant(evt, restaurantName) {
    var i, x, tabnavs;
    x = document.getElementsByClassName("restaurant");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tabnavs = document.getElementsByClassName("tabNav");
    for (i = 0; i < x.length; i++) {
        tabnavs[i].className = tabnavs[i].className.replace("activeTab", "");
    }
    document.getElementById(restaurantName).style.display = "block";
    evt.currentTarget.className += " activeTab";
}


document.getElementById('btn1').onclick = function () { openRestaurant(event, 'res1'); }
document.getElementById('btn2').onclick = function () { openRestaurant(event, 'res2'); }
document.getElementById('btn3').onclick = function () { openRestaurant(event, 'res3'); }
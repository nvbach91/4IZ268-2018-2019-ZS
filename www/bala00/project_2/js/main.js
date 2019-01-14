/* SMOOTH SCROLL */
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 64.5
    }, 500);
});

// API key: e02b6e165f0c7de197bceb648e9e788b
// https://developers.zomato.com/api?lang=cs

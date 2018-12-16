$('.diary').hover(
    function () {
        $('.description').html($(this).attr('description-data'));
        $('.description').fadeIn();
    },
    function () {
        $('.description').fadeOut(50);
    }
)
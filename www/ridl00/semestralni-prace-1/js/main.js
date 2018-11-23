$(document).ready(function () {

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if(scroll > 15){
            $('header').addClass('scrolled');
        }
        else{
            $('header').removeClass('scrolled');
        }
    });

    $('.navbar-icon').on('click', function(){
        $('nav').toggleClass('show-mobile-nav');
    });
    
});
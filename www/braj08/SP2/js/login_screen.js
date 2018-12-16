$(".twitter").on("click",function(){
    $(".tw-login").toggleClass("showed");
  });

  $(".tw-close").on("click",function(){
    $(".tw-login").toggleClass("showed");
  });

$(".facebook").on("click",function(){
  $(".feature-coming").toggleClass('hide');
});

$(".instagram").on("click",function(){
  $(".feature-coming").toggleClass('hide');
});

$(".feature-ok-btn").click(function(e) {
  e.preventDefault();
  location.reload();
});
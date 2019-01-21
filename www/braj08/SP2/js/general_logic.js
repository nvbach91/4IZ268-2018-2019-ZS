function errorScreen(text) {
    $(".error-text").html(text);
    $(".error-overlay").toggleClass('error-show');
  };
  
  function alertPopUp(text, duration) {
    $(".pop-up").html(text);
    $(".pop-up").toggleClass("pop");
    setTimeout(function () {
      $(".pop-up").toggleClass("pop");
    }, duration);
  };
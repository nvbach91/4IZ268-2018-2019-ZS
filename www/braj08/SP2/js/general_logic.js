var popUp = $(".pop-up");
var errorText = $(".error-text");
var errorOverlay = $(".error-overlay");

function errorScreen(text) {
  errorText.html(text);
  errorOverlay.toggleClass('error-show');
};

function alertPopUp(text, duration) {
  popUp.html(text);
  popUp.toggleClass("pop");
  setTimeout(function () {
    popUp.toggleClass("pop");
  }, duration);
};
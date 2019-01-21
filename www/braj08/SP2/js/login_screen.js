twLogin = $(".tw-login");
fbLogin = $(".fb-login");

$(".twitter").on("click", function () {
  twLogin.toggleClass("shown");
});


$(".tw-close").on("click", function () {
  twLogin.toggleClass("shown");
});

$(".facebook").on("click", function () {
  checkLoginState();
  if (getLogin() == true) {
    loadFacebook();
  } else {
    fbLogin.toggleClass("shown");
  }
});

$(".fb-close").on("click", function () {
  fbLogin.toggleClass("shown");
});

$(".instagram").on("click", function () {
  window.location.replace("notimplemented.html");
});
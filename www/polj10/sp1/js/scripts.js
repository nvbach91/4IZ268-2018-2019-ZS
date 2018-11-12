function closeMobileNav(element) {
  var navButton = document.getElementById("mobile-nav-button");
  var nav = document.getElementById("navigation");
  var header = document.getElementsByTagName("header")[0];
  document.getElementsByTagName("main")[0].classList.remove("fixed-position");
  document.getElementsByTagName("main")[0].classList.remove("top-3em")
  document.getElementsByTagName("footer")[0].classList.remove("invisible");
  nav.style.left = '-100vw';
  header.style.position = 'relative';

  mobileNavButtonAnimateBw();

  navButton.addEventListener("click", openMobileNav);
}

function openMobileNav(element) {
  var navButton = document.getElementById("mobile-nav-button");
  var nav = document.getElementById("navigation");
  var header = document.getElementsByTagName("header")[0];
  document.getElementsByTagName("main")[0].classList.add("fixed-position");
  document.getElementsByTagName("main")[0].classList.add("top-3em")
  document.getElementsByTagName("footer")[0].classList.add("invisible");

  nav.style.left = '0%';
  header.style.position = 'fixed';

  mobileNavButtonAnimateFw();

  navButton.removeEventListener("click", openMobileNav);
  navButton.addEventListener("click", closeMobileNav);
}

function mobileNavButtonAnimateBw() {
  var topMenuBar = document.getElementById("top-menu-bar");
  var midMenuBar1 = document.getElementById("mid-menu-bar1");
  var midMenuBar2 = document.getElementById("mid-menu-bar2");
  var bottomMenuBar = document.getElementById("bottom-menu-bar");

  topMenuBar.classList.remove("top-menu-bar-animation");
  midMenuBar1.classList.remove("mid-menu-bar1-animation");
  midMenuBar2.classList.remove("mid-menu-bar2-animation");
  bottomMenuBar.classList.remove("bottom-menu-bar-animation");

  topMenuBar.classList.add("bw-top-menu-bar-animation");
  midMenuBar1.classList.add("bw-mid-menu-bar1-animation");
  midMenuBar2.classList.add("bw-mid-menu-bar2-animation");
  bottomMenuBar.classList.add("bw-bottom-menu-bar-animation");
  
}

function mobileNavButtonAnimateFw() {
  var topMenuBar = document.getElementById("top-menu-bar");
  var midMenuBar1 = document.getElementById("mid-menu-bar1");
  var midMenuBar2 = document.getElementById("mid-menu-bar2");
  var bottomMenuBar = document.getElementById("bottom-menu-bar");

  topMenuBar.classList.remove("bw-top-menu-bar-animation");
  midMenuBar1.classList.remove("bw-mid-menu-bar1-animation");
  midMenuBar2.classList.remove("bw-mid-menu-bar2-animation");
  bottomMenuBar.classList.remove("bw-bottom-menu-bar-animation");

  topMenuBar.classList.add("top-menu-bar-animation");
  midMenuBar1.classList.add("mid-menu-bar1-animation");
  midMenuBar2.classList.add("mid-menu-bar2-animation");
  bottomMenuBar.classList.add("bottom-menu-bar-animation");
}





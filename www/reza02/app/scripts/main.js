(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// import libs

// window.ds = {};

// import components
// import './components/menu.js';

// init
// $('.lazy').Lazy({
//   // your configuration goes here
//   scrollDirection: 'vertical',
//   effect: 'fadeIn',
//   visibleOnly: true,
//   threshold: 2000,
//   // placeholder: 'path/to/image'
//   onError: function(element) {
//       console.log('error loading ' + element.data('src'));
//   }
// });

// ----------------------------------------
//  scroll to
function scrollTo(e) {
  e.preventDefault();

  var href = $.attr(this, 'href');
  if (typeof href === 'undefined') {
    href = $.attr(this, 'data-href');
  }
  var offset = $.attr(this, 'data-offset');

  var $target = $(href);
  if ($target.length) {
    $('html,body').animate({
      scrollTop: $target.offset().top + (typeof offset !== 'undefined' ? parseInt(offset) : 10)
    }, {
      duration: 500,
      easing: 'swing'
    });
  }
}

var $scrollToItems = $('.scrollTo');
$.each($scrollToItems, function () {
  $(this).on('click', scrollTo);
});
// ----------------------------------------

},{}]},{},[1])

//# sourceMappingURL=main.js.map

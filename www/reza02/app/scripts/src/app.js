
// import libs

// window.ds = {};

// import components
// import './components/menu.js';

var headerHeight = $('#header').height();
console.log(headerHeight);

// init
$('.lazy').Lazy({
  // your configuration goes here
  scrollDirection: 'vertical',
  effect: 'fadeIn',
  visibleOnly: true,
  threshold: 2000,
  // placeholder: 'path/to/image'
  onError: function(element) {
      console.log('error loading ' + element.data('src'));
  }
});

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
        scrollTop: $target.offset().top - headerHeight + ((typeof offset !== 'undefined') ? parseInt(offset) : 10)
      }, {
        duration: 500,
        easing: 'swing'
      });
  }
}

var $scrollToItems = $('.scrollTo');
$.each($scrollToItems, function() {
  $(this).on('click', scrollTo);
});
// ----------------------------------------


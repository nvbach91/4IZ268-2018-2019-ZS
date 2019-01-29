const App = {};
const config = { app_id: '750142425345045' };

// only works after app review z facebook reviewers for post permission
App.postStatus = (msg) => {
  FB.api('/me/feed', 'post', { message: msg }, function(response) {
    if (!response || response.error) {
      console.log('Error occured');
    } else {
      console.log('Post ID: ' + response.id);
    }
  });
};
App.renderPage = () => {
  // fetching data about the current user
  FB.api('/me?fields=name,email', (resp) => {
    $('#heading').text(`Hello ${resp.name}!`);
  });
};
App.checkLoginState = () => {
  FB.getLoginStatus((resp) => {
    if (resp.status === 'connected') {
      App.jFbLoginBtn.hide();
      App.renderPage();
    }
  });
};
App.fbInit = () => {
  $.getScript('https://connect.facebook.net/en_US/sdk.js', function() {
    FB.init({
      appId: config.app_id,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.2',
    });
    App.checkLoginState();
  });
};
App.init = () => {
  App.jFbLoginBtn = $('#fb-login');
};
$(document).ready(() => {
  App.fbInit();
  App.init();
});

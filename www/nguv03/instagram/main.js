var instagramConfig = JSON.parse(localStorage.instagram || '{}');
var baseURI = 'https://api.instagram.com';
// replace with https://fcp.vse.cz/4IZ268/2018-2019-ZS when doing pull request or deploying
var deployBaseURI = 'https://fcp.vse.cz/4IZ268/2018-2019-ZS';
//var deployBaseURI = 'http://localhost:5500';
var redirectURI = deployBaseURI + '/www/nguv03/instagram/';
var client_id = 'a9ef2c5c732b49b5ba77c34dfad51998';
var client_secret = '6b200f791fdb472b8a6d30a6d5e49a91';

var authenticate = function() {
  var redirect_uri = encodeURIComponent(redirectURI);
  window.open(baseURI + '/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=code', '_self');
};
var requestAccessToken = function(code) {
  return $.ajax({
    type: 'POST',
    url: baseURI + '/oauth/access_token',
    data: {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: 'authorization_code',
      redirect_uri: redirectURI,
      code: code,
    },
  });
};
var renderUser = function() {
  var user = instagramConfig.user;
  var html = `
        <div class="user-avatar" style="background-image: url(${user.profile_picture})"></div>
        <div class="user-name">${user.full_name}</div>
        <div class="user-username">${user.username}</div>
    `;
  userContainer.html(html);
};
var init = function() {
  if (instagramConfig.access_token) {
    authButton.slideUp();
    logoutButton.slideDown();
    renderUser();
    fetchMedia();
  } else if (window.location.search.startsWith('?code=')) {
    var code = window.location.search.replace('?code=', '');
    window.history.replaceState(null, null, './');
    requestAccessToken(code)
      .done(function(resp) {
        instagramConfig = resp;
        localStorage.instagram = JSON.stringify(resp);
        authButton.slideUp();
        logoutButton.slideDown();
        renderUser();
        return fetchMedia();
      })
      .fail(authenticate);
  }
};
var renderMedia = function(medias) {
  var html = '';
  medias.forEach(function(media) {
      console.log(media);
    var m = `
        <div class="media">
            <a class="media-image" href="${media.link}" target="_blank" style="background-image: url(${media.images.standard_resolution.url})"></a>
            <div class="media-likes">${media.likes.count} likes</div>
        </div>
    `;
    html += m + m + m + m + m + m + m;
  });
  mediaContainer.html(html);
};
var fetchMedia = function() {
  return $.getJSON(baseURI + '/v1/users/self/media/recent/?access_token=' + instagramConfig.access_token).done(function(resp) {
    renderMedia(resp.data);
  });
};
var logout = function() {
  $.ajax({ url: 'https://www.instagram.com/accounts/logout/' })
    .done(function(data) {
      localStorage.clear();
      userContainer.children().remove();
      mediaContainer.children().remove();
      authButton.slideDown();
      logoutButton.slideUp();
    })
    .fail(function(e) {
      console.error(e);
    });
};
var authButton = $('#auth-button').click(authenticate);
var logoutButton = $('#logout-button').click(logout);
var userContainer = $('#user');
var mediaContainer = $('#medias');
init();

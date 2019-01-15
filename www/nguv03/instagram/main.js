var instagramConfig = JSON.parse(localStorage.instagram || '{}');
var baseURI = 'https://api.instagram.com';
// replace with https://fcp.vse.cz/4IZ268/2018-2019-ZS/www/nguv03/instagram/ when doing pull request
var redirectUri = 'http://localhost:5500/www/nguv03/instagram/';
var client_id = 'a9ef2c5c732b49b5ba77c34dfad51998';
var client_secret = '6b200f791fdb472b8a6d30a6d5e49a91';
var grant_type = 'authorization_code';

var authenticate = function() {
  var redirect_uri = encodeURIComponent(redirectUri);
  window.open(baseURI + '/oauth/authorize/?client_id=a9ef2c5c732b49b5ba77c34dfad51998&redirect_uri=' + redirect_uri + '&response_type=code', '_self');
};
var requestAccessToken = function(code) {
  return $.ajax({
    type: 'POST',
    url: baseURI + '/oauth/access_token',
    data: {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: grant_type,
      redirect_uri: redirectUri,
      code: code,
    },
  });
};

var init = function() {
  if (instagramConfig.access_token) {
    fetchMedia();
  } else if (window.location.search.startsWith('?code=')) {
    var code = window.location.search.replace('?code=', '');
    window.history.replaceState(null, null, './');
    requestAccessToken(code)
      .done(function(resp) {
        instagramConfig = resp;
        localStorage.instagram = JSON.stringify(resp);
        return fetchMedia();
      })
      .fail(authenticate);
  }
};
var fetchMedia = function() {
  return $.getJSON(baseURI + '/v1/users/self/media/recent/?access_token=' + instagramConfig.access_token).done(function(resp) {
    output.text(JSON.stringify(resp, null, 2));
  });
};
var logout = function() {
  $.ajax({
    url: 'https://instagram.com/accounts/logout/',
  })
    .done(function(data) {
      localStorage.clear();
      output.text('');
    })
    .fail(function(e) {
      console.error(e);
    });
};
var authButton = $('#auth-button').click(authenticate);
var logoutButton = $('#logout-button').click(logout);
var output = $('#output code');
init();

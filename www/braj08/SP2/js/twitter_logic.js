var cb = new Codebird;
var twAppKey = 'okLlYkRsOE2v7c1Gmh3TMKrIv';
var twAppSecret = '4rhFBEwTYT9a2ijAtPDcIilhrApyxp0CKycTqPa7raimvazAD9';
var twToken = '';
var twSecret = '';
var requested = false;
var introContainer = $(".intro-container");
var loaderContainer = $(".loader-container");
var twContainer = $(".tw-container");

$(".tw-auth").click(function (e) {
  e.preventDefault();
  authorizeOpen();
});

$(".tw-pin").click(function (e) {
  e.preventDefault();
  if (requested == true) {
    $(".tw-pin-submit").prop('disabled', false);
  } else {
    errorScreen('You must request a unique PIN first, please try again.');
  }
})

$(".tw-pin-submit").click(function (e) {
  e.preventDefault();
  twPin = $(".tw-pin");
  if (twPin.val().length !== 7) {
    alertPopUp("Your PIN has different lenght than requested. Please request new PIN!", 5000);
  } else {
    authorizePin();
  }
});

$(".tw-tweet-submit").click(function (e) {
  e.preventDefault();
  tweet($(".post-text").val());
});

$(".tw-logout").click(function (e) {
  e.preventDefault();
  logOut();
});

$(".error-ok-btn").click(function (e) {
  e.preventDefault();
  location.reload();
});

$(".post-text").keyup(function (e) {
  e.preventDefault();
  var charNumber = $(".post-text").val().length;
  var charLimit = charNumber + ` / 280`;
  if (charNumber > 280) {
    $(".tw-char-limit").addClass("char-red");
  } else {
    $(".tw-char-limit").removeClass("char-red");
  };
  $(".tw-char-limit").html(charLimit);
});

function authorizeOpen() {
  requested = true;
  cb.setConsumerKey(twAppKey, twAppSecret);
  cb.__call("oauth_requestToken", { oauth_callback: "oob" }, function (
    reply,
    rate,
    err
  ) {
    if (err) {
      console.log("error response or timeout exceeded" + err.error);
      errorScreen("Request PIN failed, please try again later");
    }
    if (reply) {
      setCookie("oa_token", reply.oauth_token, 1);
      setCookie("oa_token_secret", reply.oauth_token_secret, 1);
      if (reply.errors && reply.errors["415"]) {
        console.log(reply.errors["415"]);
        console.log(reply);
      }
      cb.setToken(reply.oauth_token, reply.oauth_token_secret);
      cb.__call("oauth_authorize", {}, function (auth_url) {
        window.codebird_auth = window.open(auth_url);
      });
    }
  });
};

function authorizePin() {
  cb.__call(
    "oauth_accessToken",
    { oauth_verifier: twPin.val() },
    function (reply, rate, err) {
      if (err) {
        console.log("error response or timeout exceeded" + err.error);
        errorScreen("PIN authorization failure, please try again.");
      }
      if (reply) {
        if ((reply.oauth_token || reply.oauth_token_secret) === undefined) {
          errorScreen("PIN authorization failure, please try again.");
        } else {
          cb.setToken(reply.oauth_token, reply.oauth_token_secret);
          loadUser();
          $(".tw-pin").val("");
          $(".tw-pin-submit").prop('disabled', true);
          loaderContainer.toggleClass("hide");
          setTimeout(function () {
            loaderContainer.toggleClass("hide");
          }, 2000);
          introContainer.toggleClass("hide");
          twContainer.toggleClass("hide");
          setTimeout(function () {
            alertPopUp("Logged-in", 2000);
          }, 2000);
        }
      }
    }
  );

};

function tweet(text) {
  if ((text.length <= 280) && (text.length > 0)) {
    var params = {
      status: text
    };
    cb.__call("statuses_update", params, function (
      reply,
      rate,
      err
    ) {
      if (reply) {
        alertPopUp("Tweet sent. May the force be with him...", 3000);
        $(".post-text").val("");
        loadUser();
      } else if (err) {
        alertPopUp("Whoopsie! Wrong number! Try again...");
      };
    });
  } else {
    alertPopUp("It's ehm... wrong size...", 4000);
  }
};

function logOut() {
  /* This function is broken on the current CDN, there for, just changes the "view"
  cb.logout().then(() => {
    loaderContainer.toggleClass("hide");
    setTimeout(function () {
      loaderContainer.toggleClass("hide");
    }, 2000);
    $(".post-text").val("");
    loadUser();
    $(".tw-login").toggleClass("showed");
    introContainer.toggleClass("hide");
    twContainer.toggleClass("hide");
    requested = false;
    alertPopUp("Log out successful", 3000);
  });*/

  // For getting to other platforms
  loaderContainer.toggleClass("hide");
  setTimeout(function () {
    loaderContainer.toggleClass("hide");
  }, 2000);
  $(".tw-login").toggleClass("showed");
  introContainer.toggleClass("hide");
  twContainer.toggleClass("hide");
  alertPopUp("NOT LOGGED OUT!", 5000);
};

function loadUser() {
  cb.__call("account_verifyCredentials", {}, function (reply) {
    if (reply) {
      var nameHTML = `Sup, your name is ` + reply.name + ` (<a href="https://twitter.com/@${reply.screen_name}" target="_blank">` + `@` + reply.screen_name + `</a>)!`;
      var profileHTML = `<div class="tw-user-profile" style="background-image: url(${reply.profile_image_url_https})"></div>`;
      var aboutHMTL = reply.description;
      var registeredDate = new Date(reply.created_at).toLocaleDateString('cs-CZ');
      var registeredHTML = `You registerd at: <em>` + registeredDate + `</em>`;
      var activityDateTime = new Date(reply.status.created_at).toLocaleString('cs-CZ');
      var activityHTML = `Your last activity happened: <em>` + activityDateTime + `</em>`;
      $(".tw-user-name").html(nameHTML);
      twAbout = $(".tw-about");
      if (aboutHMTL !== null) {
        twAbout.html(aboutHMTL);
      } else {
        twAbout.toggleClass("hide");
      };
      $(".tw-user-profile").html(profileHTML);
      $(".tw-registered").html(registeredHTML);
      $(".tw-last-activity").html(activityHTML);
      cb.__call("statuses_userTimeline",
        {
          user_id: reply.id,
          count: 10
        }, function (reply, rate, err) {
          var tweetList = $('.tw-last-tweets');
          var latestHTML = "";
          tweetList.empty();
          if (reply) {
            for (i = 0; i < reply.length; i++) {
              var date = new Date(reply[i].created_at);
              latestHTML += '<li><div class="tw-latest-date">' + date.toLocaleString() + '</div>';
              latestHTML += '<div class="tw-latest-text">' + reply[i].text + '</div></li>';
            }
            tweetList.append(latestHTML);
          } else {
            var errorHTML = '<h2>There are no tweets to be loaded!</h2>';
            tweetList.append(errorHTML);
          }
        });
    } else {
      errorScreen('An error has accured during loading of the user. Please try again.');
    }
  });
}

function setCookie(par, value, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = par + "=" + value + ";" + expires + ";path=/";
}

function getCookie(par) {
  var name = par + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
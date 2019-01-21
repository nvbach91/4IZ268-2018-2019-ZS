var login;
var pages;
var selectedPageId;
var selectedIndex;
var canPost = false;
var lastPostsList = $('.fb-last-posts-list');

window.fbAsyncInit = function () {
    FB.init({
        appId: '2280023065576018',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
    });
    checkLoginState();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(".fb-logout").click(function (e) {
    e.preventDefault();
    logOutFacebook();
});

$(".fb-login-btn").click(function (e) {
    e.preventDefault();
    FB.login(function (response) {
        if (response.status === 'connected') {
            $('.fb-profile-other').empty();
            loadFacebook();
            setTimeout(function () {
                alertPopUp("Logged-in", 2000);
            }, 2000);
        }
    }, { scope: 'user_birthday,user_status,user_posts,email,public_profile,user_hometown,user_link,publish_pages,manage_pages' })
});

$(".fb-post-page").change(function (e) {
    reloadSelectedPage();
})

$(".fb-post-btn").click(function (e) {
    e.preventDefault;
    var postText = $(".fb-post-text");
    if (canPost == true) {
        if (postText.val().length !== 0) {
            window.scrollTo(top);
            sendPost(postText.val());
        } else {
            window.scrollTo(top);
            alertPopUp('There is no text!', 2000);  
        }
    } else {
        errorScreen("You don't have permission to post to this page you ding dong!");
    }
})

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            login = true;
        } else {
            login = false;
        }
    });
}

function getLogin() {
    return login;
}

function loadFacebook() {
    var profilePic = "";
    var userName = "";
    var userLink = "";
    var userEmail = "";
    var userBirthday = "";
    var userHometown = "";
    var postingContainer = $(".fb-posting-container");
    $(".loader-container").toggleClass("hide");
    setTimeout(function () {
        $(".loader-container").toggleClass("hide");
    }, 2000);
    $(".fb-container").toggleClass("hide");
    $(".intro-container").toggleClass("hide");
    FB.api('/me/picture?redirect=false', 'GET', function (response) {
        profilePic = response.data.url;
    })
    FB.api('/me/accounts', function (response) {
        if (response.data.length > 0) {
            pages = response.data;
            pages.forEach(addPages);
            reloadSelectedPage();
            postingContainer.removeClass("hide");
            $('.fb-last-posts').removeClass("hide");
        } else {
            postingContainer.addClass("hide");
            $('.fb-last-posts').addClass("hide");
            alertPopUp("You have no pages to post to...", 5000);
        }
    })
    FB.api(
        '/me/', { fields: 'name,email,birthday,hometown,link' },
        function (response) {
            userName = response.name;
            userLink = response.link;
            userEmail = response.email;
            userBirthday = response.birthday;
            try {
                if (typeof response.hometown !== 'undefined') {
                    userHometown = response.hometown.name;
                }
            } catch (e) {
                console.log('response.hometown is undefined');
            }
            userBirthday = response.birthday;
        }
    );
    setTimeout(function () {
        $('.fb-user-profile').css("background-image", `url(${profilePic})`);
        $('.fb-li-name').html(userName);
        var userLinkHTML = `<a href="${userLink}" target="_blank">Your profile</a>`;
        $('.fb-li-profile').html(userLinkHTML);
        $('.fb-li-email').html(userEmail);

        if (userHometown !== '') {
            getWeather(userHometown.substring(0, userHometown.indexOf(",")));
        }
        if (userBirthday !== ' ') {
            getAge(userBirthday);
        }
    }, 2000);

}

function logOutFacebook() {
    FB.logout(function (response) {
        if (response && !response.error) {
            alertPopUp("Logged out!", 3000);
            $(".fb-container").toggleClass("hide");
            $(".intro-container").toggleClass("hide");
            $(".fb-login").toggleClass("shown");
            $(".fb-post-text").val("");
            $(".fb-posting-container").removeClass("hide");
            $(".fb-post-page").empty();
            pages = null;
            selectedPageId = null;
            selectedIndex = null;
            canPost = false;
        } else {
            window.scrollTo(top);
            alertPopUp("Logout error, please try again", 3000);
        }
    })
    $(".loader-container").toggleClass("hide");
    setTimeout(function () {
        $(".loader-container").toggleClass("hide");
    }, 2000);
    
}

function getWeather(hometown) {
    var weatherList = `<li class="fb-weather">
                        <div>What is the weather like in your home town?</div>
                        <div class="fb-li-town"></div>
                        <div class="fb-li-weather-icon"></div>
                        <div class="fb-li-weather"></div>
                        <div class="fb-li-weather-situation"></div>
                        </li>`
    $('.fb-profile-other ul').append(weatherList);
    $.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${hometown}&APPID=e4d6ef049ebfae31218c87a663209bd7&units=metric`, function (response) {
        var printWeather = "Temp: <strong>" + response.main.temp + "°C</strong> Humidity: <strong>" + response.main.humidity + "%</strong> Pressure: <strong>" + response.main.pressure + "hPa</strong>";
        var printWeatherSituation = "It's <strong>" + response.weather[0].description + "</strong>!";
        $('.fb-li-weather-icon').css("background-image", `url(http://openweathermap.org/img/w/${response.weather[0].icon}.png)`);
        $('.fb-li-town').html(response.name);
        $('.fb-li-weather').html(printWeather);
        $('.fb-li-weather-situation').html(printWeatherSituation);
    });
}

function getAge(age) {
    var ageList = `<li class="fb-age">
                    <div class="fb-age-inner">
                    <div class="fb-li-age">You were born on:</div>
                    <div class="fb-li-age-birth"></div>
                    <div>That means, you have: </div>
                    <div class="fb-li-age-days"></div>
                    <div>before your birthday!</div>
                    </div>
                    </li>`;
    $('.fb-profile-other ul').append(ageList);
    $('.fb-age').toggleClass("hide");
    var bornDate = new Date(age);
    var today = new Date();
    var todayMM = today.getMonth();
    var todayDD = today.getDate();
    var bornMM = bornDate.getMonth();
    var bornDD = bornDate.getDate();
    $('.fb-li-age-birth').html(bornDate.toLocaleDateString());
    var countdownMM = bornMM - todayMM;
    if (bornDD <= todayDD) {
        var countdownDD = daysInMonth(today.getMonth(), today.getFullYear());
        console.log(countdownDD);
        countdownDD -= todayDD;
        console.log(countdownDD);
        countdownDD += bornDD;
        console.log(countdownDD);
    } else {
        var countdownDD = bornDD - todayDD;
    }
    var countdownHTML = Math.abs(countdownMM) + " months and " + (countdownDD) + " days";
    $('.fb-li-age-days').html(countdownHTML);
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function sendPost(text) {
    FB.api('/' + selectedPageId + '/feed', 'post', { message: text, access_token: pages[selectedIndex].access_token }, function (response) {
        if (response && !response.error) {
            $('.fb-post-text').val("");
            alertPopUp("Your post just got into the internet sea", 4000);
            reloadSelectedPage();
        }
    });
}

function addPages(item) {
    $('.fb-post-page').append(`<option>${item.name}</option>`);
}

function reloadSelectedPage() {
    selectedIndex = $(".fb-post-page").prop('selectedIndex');
    var fbPostingContainer = $('.fb-page-properties');
    selectedPageId = pages[selectedIndex].id;
    fbPostingContainer.empty();
    lastPostsList.empty();
    FB.api('/' + selectedPageId + '/picture', { redirect: '0' }, function (response) {
        $('.fb-page-icon').css("background-image", `url(${response.data.url})`);
    })
    FB.api('/' + selectedPageId, { fields: 'about,can_post,link,location,website' }, function (response) {
        canPost = response.can_post;
        var pageName = `<div class="fb-page-name"><span class="fb-page-headline">Page name:</span></br>` + pages[selectedIndex].name + `</div>`;
        var pageCategory = `<div class="fb-page-category"><span class="fb-page-headline">Page category:</span></br>` + pages[selectedIndex].category + `</div>`;
        var pageLink = `<div class="fb-page-link"><span class="fb-page-headline">Page link:</span></br><a href="${response.link}" target="_blank">` + response.link + '</a></div>';
        setTimeout(function () {
            fbPostingContainer.append(pageName);
            fbPostingContainer.append(pageCategory);
            fbPostingContainer.append(pageLink);
        }, 1000);
        try {
            if (typeof response.about !== 'undefined') {
                var pageAbout = '<div class="fb-page-about"><span class="fb-page-headline">Page about:</span></br>' + response.about + '</div>';
                setTimeout(function () {
                    fbPostingContainer.append(pageAbout);
                }, 1000)
            } else {
                var pageAbout = '<div class="fb-page-about"><span class="fb-page-headline">Page about:</span></br>About info is not entered!</div>';
                setTimeout(function () {
                    fbPostingContainer.append(pageAbout);
                }, 1000)
            }
        } catch (e) {
            console.log('response.about is undefined');
        }
        try {
            if (typeof response.location !== 'undefined') {
                var pageLocation = '<div class="fb-page-location"><span class="fb-page-headline">Page location:</span></br>' + response.location.street + ", " + response.location.city + ", " + response.location.country + ", " + response.location.zip + '</div>';
                setTimeout(function () {
                    fbPostingContainer.append(pageLocation);
                }, 1000)
            } else {
                var pageLocation = '<div class="fb-page-location"><span class="fb-page-headline">Page location:</span></br>Location is not entered!</div>';
                setTimeout(function () {
                    fbPostingContainer.append(pageLocation);
                }, 1000)
            }
        } catch (e) {
            console.log('response.location is undefined');
        }
        try {
            if (typeof response.website !== 'undefined') {
                var pageWebsite = `<div class="fb-page-website"><span class="fb-page-headline">Page website:</span></br><a href="http://${response.website}" target="_blank">` + response.website + '</a></div>';
                setTimeout(function () {
                    fbPostingContainer.append(pageWebsite);
                }, 1000)
            } else {
                var pageWebsite = `<div class="fb-page-website"><span class="fb-page-headline">Page website:</span></br>Website not entered!</div>`;
                setTimeout(function () {
                    fbPostingContainer.append(pageWebsite);
                }, 1000)
            }
        } catch (e) {
            console.log('response.website is undefined');
        }
        try {
            if ((typeof response.location == 'undefined') || (typeof response.website == 'undefined')) {

            }
        } catch (e) {
            console.log('response.location or response.website not defined, moving grid');
        }
    })
    getLastPosts();
}

function getLastPosts() {
    FB.api('/' + selectedPageId + '/feed', { redirect: '0' }, function (response) {
        for (i = 0; i < response.data.length; i++) {
            getPost(response.data[i].id);
        }
    })
}

function getPost(id) {
    FB.api("/" + id, { fields: 'message,story,created_time,full_picture' }, function (response) {
        $(".fb-last-posts-list").append(createPost(response));
    })
}

function deletePost(id) {
    FB.api("/" + id, 'DELETE', { access_token: pages[selectedIndex].access_token }, function (response) {
        if (response && !response.error) {
            $(".loader-container").toggleClass("hide");
            alertPopUp("Post has been deleted", 4000);
            reloadSelectedPage();
        } else {
            $(".loader-container").toggleClass("hide");
            try {
                alertPopUp(error.message, 6000);
            } catch {
                console.log(response);
            }
            reloadSelectedPage();
        }
    })
}

function viewPost(id) {
    window.open("https://www.facebook.com/" + id);
}

var createPost = function (response) {
    try {
        if ((typeof response.message !== 'undefined') || (typeof response.story !== 'undefined')) {
            var createdTime = new Date(response.created_time);
            var post = document.createElement('li');

            post.setAttribute("postID", response.id);

            var postDate = document.createElement('div');
            postDate.classList.add('fb-post-date');
            postDate.innerText = createdTime.toLocaleString();

            try {
                if (typeof response.message !== 'undefined') {
                    var postMessage = document.createElement('div');
                    postMessage.classList.add('fb-post-message');
                    postMessage.innerText = response.message;
                    post.appendChild(postMessage);
                }
            } catch (e) {
                console.log('response.message is undefined');
            };
            try {
                if (typeof response.story !== 'undefined') {
                    var postStory = document.createElement('div');
                    postStory.classList.add('fb-post-message');
                    postStory.innerText = response.story;
                    post.appendChild(postStory);
                }
            } catch (e) {
                console.log('response.story is undefined');
            };

            try {
                if (typeof response.full_picture !== 'undefined') {
                    var fullPictureContainer = document.createElement('div');
                    fullPictureContainer.classList.add('fb-post-picture-container');
                    var fullPicture = document.createElement('div');
                    fullPicture.classList.add('fb-post-picture');
                    fullPicture.style.backgroundImage = `url(${response.full_picture})`;
                    fullPictureContainer.appendChild(fullPicture);
                    post.appendChild(fullPictureContainer);
                }
            } catch (e) {
                console.log('response.message is undefined');
            };

            var postLink = document.createElement('div');
            postLink.classList.add('fb-post-link');
            postLink.innerText = "View post";
            postLink.addEventListener('click', function () {
                viewPost(post.getAttribute("postID"));
            });

            var postDelete = document.createElement('div');
            postDelete.classList.add('fb-post-delete');
            postDelete.innerText = "Delete post";
            postDelete.addEventListener('click', function () {
                $(".loader-container").toggleClass("hide");
                window.scrollTo(top);
                deletePost(post.getAttribute("postID"));
            });

            post.appendChild(postDate);
            post.appendChild(postLink);
            post.appendChild(postDelete);

            return post;
        }
    } catch (e) {
        console.log('response story and message is undefined');
    };
}
const shareButton = document.querySelector('#share');

var tweet = function () {
    var url = "https://twitter.com/intent/tweet";
    var text = $('#results').text();
    var via = "lukazko";
    window.open(url + "?text=" + text + ";via=" + via, 'height=340,width=660');
}

shareButton.addEventListener("click", tweet);
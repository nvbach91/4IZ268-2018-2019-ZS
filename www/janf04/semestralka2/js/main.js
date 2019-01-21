function searchVid() {
    gapi.client.setApiKey('AIzaSyAgAcMNHu1LUVxiGKN8Onb_Qga3WTImnI8');
    gapi.client.load('youtube', 'v3', function () {
        makeRequest();
    });
}
function makeRequest() {
    var keyword = document.getElementById("keyword").value;
    var searchRequest = gapi.client.youtube.search.list({
        q: keyword,
        part: 'snippet',
        maxResults: 5
    });
    searchRequest.execute(function (response) {
        var clearList = document.getElementById("searchResults");
        while (clearList.firstChild) {
            clearList.removeChild(clearList.firstChild);
        }
        var searchVids = response.result.items;

        searchVids.forEach(function(item, index) {
            var temp = document.getElementById("searchResults").innerHTML
            document.getElementById("searchResults").innerHTML = temp + '<div class="video" >' + 
            item.snippet.title + 
            '<img src="' + item.snippet.thumbnails.high.url + '"></img>'
        });
    })
}
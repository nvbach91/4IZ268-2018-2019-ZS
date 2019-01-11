var appkey = "AIzaSyDFWvjr0kfp5dWp89C6_894J24akHha8sE";
resultsList = "";

$(document).ready(function() {
  $("#form").submit(function(e) {
    e.preventDefault();
    $("#results").html("");

    var query = $("#query").val();
    $.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        part: "snippet, id",
        type: "video",
        q: query,
        key: appkey
      },
      function(data) {
        resultsList = "";
        $.each(data.items, function(index, item) {
          var renderVideo = getRenderVideo(item);
          resultsList += "<li>" + renderVideo + "</li>";
        });
        var results = $("#results");
        results.append(resultsList);
      }
    );
  });
});

function getRenderVideo(video) {
  var title = video.snippet.title;
  var thumb = video.snippet.thumbnails.high.url;
  var videoID = video.id.videoId;
  var description = video.snippet.description;
  var videoDate = video.snippet.publishedAt;
  var channelTitle = video.snippet.channelTitle;

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  var date = new Date(videoDate);
  var formatDate =
    date.getDate() +
    "." +
    addZero(date.getMonth() + 1) +
    "." +
    date.getFullYear() +
    " " +
    addZero(date.getHours()) +
    ":" +
    addZero(date.getMinutes());

  var renderVideo =
    "<li>" +
    '<div class="picture">' +
    '<img src="' +
    thumb +
    '">' +
    "</div>" +
    '<div class="information">' +
    '<h3><a href="https://youtube.com/watch?v=' +
    videoID +
    '?rel=0">' +
    title +
    "</a></h3>" +
    '<div class="title">' +
    channelTitle +
    " " +
    "</div>" +
    formatDate +
    "<p>" +
    description +
    "</p>" +
    "</div>" +
    "</li>";
  return renderVideo;
}

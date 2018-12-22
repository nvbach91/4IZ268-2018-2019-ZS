var appkey = "AIzaSyDFWvjr0kfp5dWp89C6_894J24akHha8sE";

$(document).ready(function() {
  $("#form").submit(function(e) {
    e.preventDefault();
    $("#results").html("");

    var question = $("#question").val();
    $.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        part: "snippet, id",
        type: "video",
        q: question,
        key: appkey
      },
      function(data) {
        $.each(data.items, function(index, item) {
          var output = getOutput(item);
          $("#results").append(output);
        });
      }
    );
  });
});

function getOutput(video) {
  var title = video.snippet.title;
  var thumb = video.snippet.thumbnails.high.url;
  var videoID = video.id.videoId;
  var description = video.snippet.description;
  var videoDate = video.snippet.publishedAt;
  var channelTitle = video.snippet.channelTitle;

  var output =
    "<li>" +
    '<div class="picture">' +
    '<img src="' +
    thumb +
    '">' +
    "</div>" +
    '<div class="information">' +
    '<h3><a href="https://youtube.com/watch?v=' +
    videoID +
    '"target="_blank">' +
    title +
    "</a></h3>" +
    '<div class="title">' +
    channelTitle +
    " " +
    "</div>" +
    videoDate +
    "<p>" +
    description +
    "</p>" +
    "</div>" +
    "</li>";
  return output;
}

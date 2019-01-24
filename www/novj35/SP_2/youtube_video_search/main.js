var pageToken = {};

$(function () {

  $('#searchButton').on('click', function (event) {
    searchYouTube();
  })
  $('.tokenClass').on('click', function () {
    pageToken.current = $(this).val() == 'Next' ? pageToken.nextPage : pageToken.prevPage
    console.log($(this).val())
    searchYouTube()
  })

  $(document).ready(function () {
    $('#hideButtons').hide();
    $('#searchButton').click(function (event) {
      event.preventDefault();
      $('#hideButtons').toggle(600);
      $('#hideFooter').hide();
    });
  });

  function searchYouTube() {
    let searchQuery = $('input[type = "text"]').val();
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      dataType: 'json',
      type: 'GET',
      data: {
        key: "AIzaSyCUwk5fprQrD3YyKPnP2nrjBOiDDxugk28",
        q: searchQuery,
        part: 'snippet',
        maxResults: 6,
        pageToken: pageToken.current
      }
    }).done(function (data) {
      pageToken.nextPage = data.nextPageToken;
      pageToken.prevPage = data.prevPageToken;
      console.log(data)
      let html = ('<h2>6 zobrazených videí</h2>');
      $.each(data.items, function (index, value) {
        html += `<div class='title'>${value.snippet.title}</div>`;
        html += `<a href=https://www.youtube.com/watch?v=${value.id.videoId} ><img class="thumbnail" src="${value.snippet.thumbnails.high.url}" alt="${value.snippet.title}"></a></div>`
      })

      $('#output').html(html).prop('hidden', false);
    })
  }

})
var pageToken = {};

$(function () {

  $('#searchButton').on('click', function (event) {
    searchYouTube();
  })
  $('.tokenClass').on('click', function () {
    pageToken.current = $(this).val() === 'Next' ? pageToken.nextPage : pageToken.prevPage
    console.log($(this).val())
    searchYouTube()

  })

  function searchYouTube() {
    let searchQuery = $('input[type = "text"]').val();
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      dataType: 'json',
      type: 'GET',
      data: {
        key: "AIzaSyDFWvjr0kfp5dWp89C6_894J24akHha8sE",
        q: searchQuery,
        part: 'snippet',
        maxResults: 6,
        type: 'video',
        order: 'viewCount',
        pageToken: pageToken.current

      }


    }).done(function (data) {
      pageToken.nextPage = data.nextPageToken;
      pageToken.prevPage = data.prevPageToken;
      console.log()
      let html = ('<h2>Zobrazeno 6 videí seřazených sestupně podle zhlédnutí</h2>');
      $.each(data.items, function (index, value) {
        var date = new Date(value.snippet.publishedAt);
        var m = (date).getMonth() + 1;
        var n = date.getDate() + "." + m + "." + date.getFullYear();
        
        html += `<h2>Název videa</h2><div class="title">${value.snippet.title}</div>`;
        html += `<h2>Popis</h2><div class="description">${value.snippet.description}</div>`;
        html += `<h2>Rok vložení videa</h2><div class="videoDate">${n.toString()}</div>`;
        html += `<h2>Channel</h2><div class="channelTitle">${value.snippet.channelTitle}</div>`;
        html += `<a href="https://www.youtube.com/watch?v=${value.id.videoId}">
        <img class="thumbnail" src="${value.snippet.thumbnails.high.url}" alt="${value.snippet.title}">
        </a>`;
      })



      $('#output').html(html).prop('hidden', false);
    })
  }

  $('#searchButton').on('click', function (event) {
    event.preventDefault();
    $('#hideButtons').toggle(600);
    $('#hideFooter').hide();


  });




});




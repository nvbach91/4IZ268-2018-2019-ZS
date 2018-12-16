var App = App || {};
App.api_key = '77f7487a9f001c0768f6ebc3751ff016';

App.getMovies = function (searchText) {
  App.movieField.empty();
  App.movieField.append(App.loader);
  var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + App.api_key + '&language=en-US&query=' + searchText;
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    console.log(response);
    var movies = response.results;
    var html = '';
    var message = '<p class="message">Results of searching <strong> &bdquo;' + searchText + '&rdquo; <strong></p>';
    if (movies.length == 0) {
      var html = `<p class="no-records">No records</p>`;
    }
    //seřadí filmy podle hodnocení
    //budu se však snažit o to, aby se filmy řadily na základě výběru řazení od uživatele
    var sortedMovies = movies.sort(function (a, b) {
      var textA = a.vote_average;
      var textB = b.vote_average;
      if (textA > textB)
        return -1;
      if (textA < textB)
        return 1;
      return 0;
    });
    $.each(sortedMovies, (index, movie) => {
      html += `
          <div class="movie-item">
            <div class="movie-poster">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            </div>
              <h3>${movie.title}</h3>
              <a onclick="App.movieSelected('${movie.id}')" class="movie-select" href="#">Movie Details</a>
              <div class="rate"><strong>Rated: </strong>${movie.vote_average}</div>
          </div>
        `;
    });
    $('.container-side-mov').html(message);
    App.movieField.html(html);
  })
    .catch(function (error) {
      console.log(error);
    });
}

App.movieSelected = function (id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

App.getMovie = function () {
  var movieId = sessionStorage.getItem('movieId');
  var url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + App.api_key;
  fetch(url)
    .then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
      var movie = response;
      var output = `<div class="info">
        <div class="info-title"><h2>${movie.title}</h2></div>
        <div class="info-main">
          <div class="info-poster"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></div>
          <div class="info-figures">
            <div class="info-genre"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</div>
            <div class="info-release"><strong>Released:</strong> ${movie.release_date}</div>
            <div class="info-runtime"><strong>Runtime:</strong> ${movie.runtime} min.</div>
            <div class="info-vote"><strong>Rated:</strong> ${movie.vote_average}</div>
            <div class="info-vote-count"><strong>Vote count:</strong> ${movie.vote_count}</div>
            <div class="info-popularity"><strong>Popularity:</strong> ${movie.popularity}</div>
            <div class="info-production"><strong>Production Companies:</strong> ${movie.production_companies[0].name}</div>
          </div>
        </div>
        </div>
        <div class="info-overview">
        <div class="info-overview-header">
            <h3>Overview</h3>
            </div>
            ${movie.overview}
          <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="link-imdb">View IMDB</a>
            <a href="index.html" class="link-back">Go Back To Search</a>
          </div>`;
      $('#movie').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}

App.getActors = function (searchText) {
  App.actorField.empty();
  App.actorField.append(App.loader);
  var url = 'https://api.themoviedb.org/3/search/person?api_key=' + App.api_key + '&language=en-US&query=' + searchText;
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    console.log(response);
    var actors = response.results;
    var html = '';
    var message = '<p class="message">Results of searching <strong> &bdquo;' + searchText + '&rdquo; <strong></p>';
    if (actors.length == 0) {
      var html = `<p class="no-records">No records</p>`;
    }
    $.each(actors, (index, actor) => {
      html += `
          <div class="actor-item">
            <div class="actor-poster">
              <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}">
            </div>
              <h3>${actor.name}</h3>
          </div>
        `;
    });
    $('.container-side-act').html(message);
    App.actorField.html(html);
  })
    .catch(function (error) {
      console.log(error);
    });
}

var showElement = function(elementID) {
  var elem = document.getElementById(elementID);
  if (!elem) {
    alert("No elements");
    return;
  }
  var pages = document.getElementsByClassName('page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }
  elem.style.display = 'block';
}

App.init = function () {
  App.searchFormMov.submit(function (e) {
    e.preventDefault();
    var searchText = App.searchInputMov.val();
    if (!searchText) {
      App.moviesField.empty();
      alert("Nebyl zadán název filmu")
      return false;
    }
    else {
      App.getMovies(searchText);
    }
  });
  App.searchFormAct.submit(function (e) {
    e.preventDefault();
    var searchText = App.searchInputAct.val();
    if (!searchText) {
      App.actorsField.empty();
      alert("Nebylo zadáno jméno")
      return false;
    }
    else {
      App.getActors(searchText);
    }
  });
}

$(document).ready(function () {
  App.searchInputMov = $('#search-input-mov');
  App.searchInputAct = $('#search-input-act');
  App.searchFormMov = $('#search-form-mov');
  App.searchFormAct = $('#search-form-act');
  App.moviesField = $('#movies');
  App.actorsField = $('#actors');
  App.movieField = $('#movie-field');
  App.actorField = $('#actor-field');
  App.optionVal = $('#sortMovies');
  App.loader = $('<div class="loader"></div>');
  App.init();
});


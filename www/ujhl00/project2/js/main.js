var searchForm = $('#searchForm');
var searchText = $('#searchText');
var apiUrl = 'http://www.omdbapi.com?';
var apiKey = '&apikey=d8ae8847';
var movies = $('#movies');
var movie = $('#movie');

//Zachytenie vstupu z formulára, získam hodnotu a volám funkciu getMovies()
$(document).ready(function () {
    $(searchForm).on('submit', function (e) {
        let searchTextVal = $(searchText).val();
        getMovies(searchTextVal);
        e.preventDefault();
    });
});

function getMovies(searchTextVal) {
    //axios api request
    axios.get(apiUrl + 's=' + searchTextVal + apiKey)
        .then(function (response) {
            console.log(response);
            let moviesFound = response.data.Search;
            let moviesNotFound = response.data.Response;
            let output = '';

            if (moviesNotFound === "False") {
                output = `
                <div class="container">
                    <div class="well text-center">
                        Žiadny film nebol nájdený! Skúste vyhľadávanie znovu...
                    </div>
                </div>
                `;
            } else {
                // each loop poľa, pripojenie každého filmu do premennej output a jej výpis
                $.each(moviesFound, function (index, movie) {
                    let moviePoster = movie.Poster;

                    if (moviePoster === "N/A") {
                        moviePoster = "img/poster_unavailable.png";
                    }
                    output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${moviePoster}" alt="Poster filmu">
                            <br><br>
                            <h5>${movie.Title}</h5>
                            <br>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Detail filmu</a>
                        </div>
                    </div> 
                    `;
                });
            }

            movies.html(output);
        })
        .catch(function (err) {  //v prípade nejakého error
            console.log(err);
        });
}


//Predanie dát z jednej stránky na druhú prostredníctvom sessionStorage
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location.href = 'movie.html' + '?movieId=' + id;
}

var loader = $('#loader');

function getMovie() {
    //let movieId = sessionStorage.getItem('movieId');
    //console.log(movieId);

    let movieId = location.search.split('movieId=')[1];

    //axios api request
    loader.show();
    axios.get(apiUrl + 'i=' + movieId + apiKey)
        .then(function (response) {
            console.log(response);
            let movieData = response.data;
            let moviePoster = response.data.Poster;

            if (moviePoster === "N/A") {
                moviePoster = "img/poster_unavailable.png";
            }
            loader.hide();
            let output = `
                <div class="row" >
                    <div class="col-md-4">
                        <img src="${moviePoster}" class="thumbnail" alt="Poster filmu">
                    </div>
                    <div class="col-md-8">
                        <h2>${movieData.Title}</h2>
                            <ul class="list-group">
                                <li class="list-group-item">Žáner: ${movieData.Genre}</li>
                                <li class="list-group-item">Vydané: ${movieData.Released}</li>
                                <li class="list-group-item">Obsadenie: ${movieData.Actors}</li>
                                <li class="list-group-item">Produkcia: ${movieData.Production}</li>
                                <li class="list-group-item">Režisér: ${movieData.Director}</li>
                                <li class="list-group-item">Autor: ${movieData.Writer}</li>
                                <li class="list-group-item">Dĺžka: ${movieData.Runtime}</li>
                                <li class="list-group-item">IMDB hodnotenie: ${movieData.imdbRating} / 10</li>
                            </ul>
                    </div>
                </div> 

                <div class="row">
                    <div class="well">
                        <br><br><hr>
                        <h3>Obsah</h3>
                        ${movieData.Plot}
                        <br><br><br>
                        <a href="http://imdb.com/title/${movieData.imdbID}" target="_blank" class="btn btn-primary">Prejsť na IMDB</a>
                        <a href="index.html" class="btn btn-primary">Späť na vyhľadávanie</a>
                    </div>  
                </div>
                `;
            movie.html(output);

            $(document).attr("title", "Filmová databáza | " + movieData.Title);
        })
        .catch(function (err) { //v prípade nejakého error
            console.log(err);
        });
}
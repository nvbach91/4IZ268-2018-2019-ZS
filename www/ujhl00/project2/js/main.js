//Zachytenie vstupu z formulára, získam hodnotu a volám funkciu getMovies()
$(document).ready(function () {
    $('#searchForm').on('submit', function (e) {
        //console.log($('#searchText').val());
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    //console.log(searchText);

    //axios api request
    axios.get('http://www.omdbapi.com?s=' + searchText + "&apikey=d8ae8847")
        .then(function (response) {
            console.log(response);
            let movies = response.data.Search;
            let moviesNotFound = response.data.Response;
            let output = '';

            if (moviesNotFound == "False") {
                output = `
                <div class="container">
                    <div class="well text-center">
                        Žiadny film nebol nájdený! Skúste vyhľadávanie znovu...
                    </div>
                </div>
                `;
            } else {
                // each loop poľa, pripojenie každého filmu do premennej output a jej výpis
                $.each(movies, function (index, movie) {
                    output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <br><br>
                            <h5>${movie.Title}</h5>
                            <br>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Detail filmu</a>
                        </div>
                    </div> 
                    `;
                });
            }

            $('#movies').html(output);
        })
        .catch(function (err) {  //v prípade nejakého error
            console.log(err);
        });
}

//Predanie dát z jednej stránky na druhú prostredníctvom sessionStorage
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    //console.log(movieId);

    //axios api request
    axios.get('http://www.omdbapi.com?i=' + movieId + "&apikey=d8ae8847")
        .then(function (response) {
            console.log(response);
            let movie = response.data;

            let output = `
                <div class="row" >
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                            <ul class="list-group">
                                <li class="list-group-item">Žáner: ${movie.Genre}</li>
                                <li class="list-group-item">Vydané: ${movie.Released}</li>
                                <li class="list-group-item">Obsadenie: ${movie.Actors}</li>
                                <li class="list-group-item">Produkcia: ${movie.Production}</li>
                                <li class="list-group-item">Režisér: ${movie.Director}</li>
                                <li class="list-group-item">Autor: ${movie.Writer}</li>
                                <li class="list-group-item">Dĺžka: ${movie.Runtime}</li>
                                <li class="list-group-item">IMDB hodnotenie: ${movie.imdbRating} / 10</li>
                    </div>
                </div> 
                <div class="row">
                    <div class="well">
                        <br><br><hr>
                        <h3>Obsah</h3>
                        ${movie.Plot}
                        <br><br><br>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Prejsť na IMDB</a>
                        <a href="index.html" class="btn btn-primary">Späť na vyhľadávanie</a>
                    </div>  
                </div>
                `;

            $('#movie').html(output);
            $(document).attr("title", "Filmová databáza | " + movie.Title);
        })
        .catch(function (err) { //v prípade nejakého error
            console.log(err);
        });
}
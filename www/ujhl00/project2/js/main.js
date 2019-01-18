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
                </div>`;
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
                    </div>`;
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
        })
        .catch(function (err) { //v prípade nejakého error
            console.log(err);
        });
}
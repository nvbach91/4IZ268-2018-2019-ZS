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
        })
        .catch(function (err) {  //v prípade nejakého error
            console.log(err)    //výpis do console
        });
}
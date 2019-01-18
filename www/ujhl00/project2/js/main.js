$(document).ready(function () {
    $('#searchForm').on('submit', function (e) {
        console.log($('#searchText').val());
        //let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {

}
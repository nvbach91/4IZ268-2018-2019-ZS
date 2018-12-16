$(document).ready(function(){
            $('again').hide();
 
submit.addEventListener('submit', function(e) {
 
    e.preventDefault();
    var artist = $('#artist').val();
    var song = $('#song').val();
 
    if(artist ==''){
        alertArtist();
    } else if (song ==''){
        alertSong();
    } else {
 
        $.ajax({
        url: 'https://orion.apiseeds.com/api/music/lyric/'+ artist + '/' + song + '?apikey=cRomUgw9cay6obVEueVwhiNZTGQFlqBv9evFRe1Xx1frFDCqy7leXKmiEfEMfcID',
        type: 'GET',
        dataType: 'json',
        error: function(data){
            var error404 = error(data);
            $('#error').hide();
            $('#results').html(error404);
        },
        success: function(data){
            var lyrics = results(data);
 
            $('#results').html(lyrics);
 
            $('#artist').val('');
            $('#song').val('');
            $('#error').hide();
            $('#submit').hide();
            $('#again').show();
        }
 
    });
    };
 
 
});
});
 
function results(data){
    return  '<h1>' + data.result.artist.name + ' - ' + data.result.track.name + '</h1><p>' + data.result.track.text + '</p>';
 
};
function error(data){
    return  '<div class="alert alert-danger" id="error404" role="alert">Je nám to velmi líto, ale hledaná píseň nebyla nalezena!</div>';
 
};
function alertArtist(){
    document.getElementById("error").innerHTML = '<div class="alert alert-danger" role="alert">CHYBÍ JMÉNO UMĚLCE!!</div>';
};
function alertSong(){
    document.getElementById("error").innerHTML = '<div class="alert alert-danger" role="alert">CHYBÍ JMÉNO PÍSNĚ!!</div>';
};
 
$('#again').click(function(){
        location.reload();
});
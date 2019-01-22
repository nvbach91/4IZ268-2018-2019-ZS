$(document).ready(function(){

    var baseApiLyrics = 'https://orion.apiseeds.com/api/music/lyric/'; 
    var apiKeyLyrics = '?apikey=cRomUgw9cay6obVEueVwhiNZTGQFlqBv9evFRe1Xx1frFDCqy7leXKmiEfEMfcID';
    var baseApiChart = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=c0fd8b3e8900c8cb6ec278f750bcf6cb&format=json';
    loadChartAjax();
    submit.addEventListener('submit', function(e) {
 
        e.preventDefault();
        var artist = $("#artist").val();
        var song = $("#song").val();
        
        $('#lyric').empty();    
        $("#loader").show();
 
        if(!artist){
            alertArtist();
        } else if (!song){
            alertSong();
        } else {
        
            $.ajax({
            url: baseApiLyrics+ artist + '/' + song + apiKeyLyrics,
            type: "GET",
            dataType: "json",
            error: function(data){
                $("#loader").hide();
                $("#error").hide();
                var error404 = error(data);
                $("#lyric").html(error404);
                },
            success: function(data){
                $("#loader").hide();
                $("#error").hide();
                var lyrics = lyric(data);
                $("#lyric").html(lyrics);
                }
            });
        };
    });
 
    function lyric(data){
        return  '<h1>' + data.result.artist.name + ' - ' + data.result.track.name + '</h1><p class="text">' + nahrad(data.result.track.text) + '</p>';
    };
    function nahrad(str){
        return str.replace(/\n/g, "<br>");
    };
    
    function error(data){
        return  '<div class="alert alert-danger" id="error404" role="alert">Je nám to velmi líto, ale píseň nebyla nalezena!</div>'; 
    };
    
    function alertArtist(){
        $("#loader").hide();
        $('#error').html('<div class="alert alert-danger" role="alert">CHYBÍ JMÉNO UMĚLCE!!</div>');
    };
    
    function alertSong(){
        $("#loader").hide();
        $('#error').html('<div class="alert alert-danger" role="alert">CHYBÍ JMÉNO PÍSNĚ!!</div>');
    };
  
    function loadChartAjax() {
        $.ajax({
        url: baseApiChart,
        type:"GET",
        dataType: 'json',
        success: function(data) {
            var charts = chartSongs(data);
            $('#chart').html(charts);
        }});
    
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        };
        
        function chartSongs(data){
            var datum = new Date();
            var day = addZero(datum.getDate());
            var month = addZero(datum.getMonth()+1);
            var year = addZero(datum.getFullYear());
            return '<p class="description">- aktuální k ' + day + '. ' + month + '. ' + year + ' -</p><p class="full-chart">' +  
                        '<strong>1. </strong>'+ data.tracks.track[0].artist.name + ' - <strong>' + data.tracks.track[0].name + '</strong> <br>' + 
                        '<strong>2. </strong>'+ data.tracks.track[1].artist.name + ' - <strong>' + data.tracks.track[1].name + '</strong> <br>' +
                        '<strong>3. </strong>'+ data.tracks.track[2].artist.name + ' - <strong>' + data.tracks.track[2].name + '</strong> <br>' +
                        '<strong>4. </strong>'+ data.tracks.track[3].artist.name + ' - <strong>' + data.tracks.track[3].name + '</strong> <br>' +
                        '<strong>5. </strong>'+ data.tracks.track[4].artist.name + ' - <strong>' + data.tracks.track[4].name + '</strong> <br>' +
                        '<strong>6. </strong>'+ data.tracks.track[5].artist.name + ' - <strong>' + data.tracks.track[5].name + '</strong> <br>' +
                        '<strong>7. </strong>'+ data.tracks.track[6].artist.name + ' - <strong>' + data.tracks.track[6].name + '</strong> <br>' +
                        '<strong>8. </strong>'+ data.tracks.track[7].artist.name + ' - <strong>' + data.tracks.track[7].name + '</strong> <br>' + 
                        '<strong>9. </strong>'+ data.tracks.track[8].artist.name + ' - <strong>' + data.tracks.track[8].name + '</strong> <br>' + 
                        '<strong>10. </strong>'+ data.tracks.track[9].artist.name + ' - <strong>' + data.tracks.track[9].name + '</strong> </p>'; 
            };
    
    };
});



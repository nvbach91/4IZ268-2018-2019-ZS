$(document).ready(function(){

    loadChartAjax();
    submit.addEventListener('submit', function(e) {
 
        e.preventDefault();
        var artist = $("#artist").val();
        var song = $("#song").val();
        
        $('#lyric').empty();    
        $("#loader").show();
 
        if(artist ===''){
            alertArtist();
        } else if (song ===''){
            alertSong();
        } else {
        
            $.ajax({
            url: 'https://orion.apiseeds.com/api/music/lyric/'+ artist + '/' + song + "?apikey=cRomUgw9cay6obVEueVwhiNZTGQFlqBv9evFRe1Xx1frFDCqy7leXKmiEfEMfcID",
            type: "GET",
            dataType: "json",
            error: function(data){
                $("#loader").hide();
                var error404 = error(data);
                $("#lyric").html(error404);
                },
            success: function(data){
                var lyrics = lyric(data);
 
                $("#lyric").html(lyrics);
                $("#loader").hide();
                }
            });
        };
    });
 
    function lyric(data){
        return  '<h1>' + data.result.artist.name + ' - ' + data.result.track.name + '</h1><p>' + data.result.track.text + '</p>';
    };
    
    function error(data){
        return  '<div class="alert alert-danger" id="error404" role="alert">Je nám to velmi líto, ale píseň nebyla nalezena!</div>'; 
    };
    
    function alertArtist(){
        document.getElementById("error").innerHTML = '<div class="alert alert-danger" role="alert">CHYBÍ JMÉNO UMĚLCE!!</div>';
    };
    
    function alertSong(){
        document.getElementById("error").innerHTML = '<div class="alert alert-danger" role="alert">CHYBÍ JMÉNO PÍSNĚ!!</div>';
    };
  
    function loadChartAjax() {
        $.ajax({
        url:"http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=c0fd8b3e8900c8cb6ec278f750bcf6cb&format=json",
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
            return '<p class="logo2">Last.Fm Chart</p><hr class="line2"> <p class="description">- aktuální k ' + day + '. ' + month + '. ' + year + ' -</p><p class="full-chart">' +  '<b>1. </b>'+ data.tracks.track[0].artist.name + ' - <b>' + data.tracks.track[0].name + '</b> <br>' + 
                        '<b>2. </b>'+ data.tracks.track[1].artist.name + ' - <b>' + data.tracks.track[1].name + '</b> <br>' +
                        '<b>3. </b>'+ data.tracks.track[2].artist.name + ' - <b>' + data.tracks.track[2].name + '</b> <br>' +
                        '<b>4. </b>'+ data.tracks.track[3].artist.name + ' - <b>' + data.tracks.track[3].name + '</b> <br>' +
                        '<b>5. </b>'+ data.tracks.track[4].artist.name + ' - <b>' + data.tracks.track[4].name + '</b> <br>' +
                        '<b>6. </b>'+ data.tracks.track[5].artist.name + ' - <b>' + data.tracks.track[5].name + '</b> <br>' +
                        '<b>7. </b>'+ data.tracks.track[6].artist.name + ' - <b>' + data.tracks.track[6].name + '</b> <br>' +
                        '<b>8. </b>'+ data.tracks.track[7].artist.name + ' - <b>' + data.tracks.track[7].name + '</b> <br>' + 
                        '<b>9. </b>'+ data.tracks.track[8].artist.name + ' - <b>' + data.tracks.track[8].name + '</b> <br>' + 
                        '<b>10. </b>'+ data.tracks.track[9].artist.name + ' - <b>' + data.tracks.track[9].name + '</b> <p>'; 
            };
    
    };
});



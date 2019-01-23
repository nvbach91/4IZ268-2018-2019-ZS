$(document).ready(function(){

    var baseApiLyrics = 'https://orion.apiseeds.com/api/music/lyric/'; 
    var apiKeyLyrics = '?apikey=cRomUgw9cay6obVEueVwhiNZTGQFlqBv9evFRe1Xx1frFDCqy7leXKmiEfEMfcID';
    var baseApiChart = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=c0fd8b3e8900c8cb6ec278f750bcf6cb&format=json';
    var loader = $('#loader');
    var inputError = $('#error');
    var lyricArea = $('#lyric');
    var chartArea = $('#chart');
    var artist = $('#artist');
    var song = $('#song');
    var form1 = $('#submit');
    var searchButton = $("#search-button");
    
    cutMezer();
    loadChartAjax();


    submit.addEventListener('submit', function(e) {
 
        e.preventDefault();
        var artist = $('#artist').val();
        var song = $('#song').val();
        
        lyricArea.empty();    
        loader.show();
 
        if(!artist){
            alertArtist();
        } else if (!song){
            alertSong();
        } else {
        
            $.ajax({
            url: baseApiLyrics+ artist + '/' + song + apiKeyLyrics,
            type: 'GET',
            dataType: "json",
            error: function(data){
                loader.hide();
                inputError.hide();
                var error404 = error(data);
                lyricArea.html(error404);
                },
            success: function(data){
                loader.hide();
                inputError.hide();
                var lyrics = lyric(data);
                lyricArea.html(lyrics);
                }
            });
        };
    });

    
    function cutMezer(){
        artist.blur(function() {
            var str = artist.val().trim();
            artist.val(str);
        });   
        song.blur(function() {
            var str = song.val().trim();
            song.val(str);
        });
    };
    
    function lyricsChartSong(){
        $('.fullSong').click(function() {
            var thisSong = $(this);
            var artistName = thisSong.find('span.artistName').text();
            var songName = thisSong.find('span.songName').text();
            artist.val(artistName);  
            song.val(songName);
            searchButton.click();
            });
        };
 
    function lyric(data){
        return  '<h1>' + data.result.artist.name + ' - ' + data.result.track.name + '</h1><p class="text">' + replaceN(data.result.track.text) + '</p>';
    };
    function replaceN(str){
        return str.replace(/\n/g, "<br>");
    };
    
    function error(data){
        return  '<div class="alert alert-danger" id="error404" role="alert">Je nám to velmi líto, ale píseň nebyla nalezena!</div>'; 
    };
    
    function alertArtist(){
        loader.hide();
        inputError.html('<div class="alert alert-danger" role="alert">CHYBÍ JMÉNO UMĚLCE!!</div>');
    };
    
    function alertSong(){
        loader.hide();
        inputError.html('<div class="alert alert-danger" role="alert">CHYBÍ JMÉNO PÍSNĚ!!</div>');
    };
  
    function loadChartAjax() {
        $.ajax({
        url: baseApiChart,
        type:'GET',
        dataType: 'json',
        success: function(data) {
            var charts = chartSongs(data);
            chartArea.html(charts);
            lyricsChartSong();
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
            var trackInfo = "";
            var c = 0;
            while (c < 10) {
                trackInfo += '<span class="fullSong"><strong>' + (c+1) + '. </strong><span class="artistName">'+ data.tracks.track[c].artist.name + '</span> - <strong><span class="songName">' + data.tracks.track[c].name + '</span></strong></span><br>';
                c++;
            }
            return '<p class="date-chart">- aktuální k ' + day + '. ' + month + '. ' + year + ' -</p><p class="full-chart">' + trackInfo + '</p>';
            };
        
    };
});
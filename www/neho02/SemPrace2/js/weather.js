$(document).ready(function(){

$('#submitWeather').click(function(){

    var city = $("#city").val();
    if(city != ''){
    
    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + 
            "&APPID=bb037310921af67f24ba53f2bad48b1d",
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            console.log(data);
        }

    });
    
    }else{
        $("error").html('Field cant be empty')
    }

});


});
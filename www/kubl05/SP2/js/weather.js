const refreshButton = document.querySelector("#refresh");
var weatherIcon = document.querySelector("#weather-icon");

var setLoader = function() {
  weatherIcon.src = "img/loader.svg";
  $("#summary").text("Povol přístup k poloze!");
  $("#temp").text("");
  $("#wind").text("");
};

var getPosition = function() {
  var positions = {};
  setLoader();
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        positions.lat = position.coords.latitude;
        positions.lon = position.coords.longitude;
        resolve(positions);
        //console.log(positions);
      });
    }
  });
};

function tempConvert(temp) {
  var temp = Math.round(((temp - 32) * 5) / 9);
  return temp;
}

function setIcon(icon) {
  switch (icon) {
    case "clear-day":
      weatherIcon.src = "img/weather/clear-day.png";
      break;
    case "clear-night":
      weatherIcon.src = "img/weather/clear-night.png";
      break;
    case "rain":
      weatherIcon.src = "img/weather/rain.png";
      break;
    case "snow":
      weatherIcon.src = "img/weather/snow.png";
      break;
    case "cloudy":
      weatherIcon.src = "img/weather/cloudy.png";
      break;
    case "thunderstorm":
      weatherIcon.src = "img/weather/cloudy.png";
      break;
    case "sleed":
      weatherIcon.src = "img/weather/cloudy.png";
      break;
    case "wind":
      weatherIcon.src = "img/weather/wind.png";
      break;
    case "fog":
      weatherIcon.src = "img/weather/fog.png";
      break;
    case "partly-cloudy-day":
      weatherIcon.src = "img/weather/partly-cloudy-day.png";
      break;
    case "partly-cloudy-night":
      weatherIcon.src = "img/weather/partly-cloudy-night.png";
      break;
  }
}

function getWeather(position) {
  var url =
    "https://api.darksky.net/forecast/0d66f2f1604ceeffb4daf23447d6a265/" +
    position.lat +
    "," +
    position.lon +
    "?lang=cs";
  var weather = $.ajax({
    url: url,
    dataType: "jsonp"
  });

  weather.done(function(res) {
    //console.log(res)
    var currently = res.currently;
    //var daily = res.daily;
    var summary = currently.summary;
    var temp = "Teplota je " + tempConvert(currently.temperature) + " °C";
    var wind = "Vítr o rychlosti " + currently.windSpeed + " m/s";
    setIcon(currently.icon);
    $("#summary").text(summary);
    $("#temp").text(temp);
    $("#wind").text(wind);
  });
}

$(document).ready(function() {
  setLoader();
  getPosition().then(position => {
    getWeather(position);
  });
});

refreshButton.addEventListener("click", function() {
  setLoader();
  getPosition().then(position => {
    getWeather(position);
  });
});

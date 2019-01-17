var counter = 1;
var count = 0;

function onAction() {
	var city = $("#city").val();
	var cities = city.split(',');
	cities.forEach(function(city) {
	if (city !== '') {
		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" +
				"&APPID=bb037310921af67f24ba53f2bad48b1d",
			type: "GET",
			dataType: "json",
			success: function (data) {
				$("#show").html($('#show').html()).append(getForecast(data));
				$("#city").val('');
				$('#compareBtn').show();

			},
			error: function (xhr, status, errorThrown) {
				showErrorMsg("City '" + $('#city').val() + "' not found");
			}
		});
	} else {
		showErrorMsg("Field cannot be empty");

	}
}
	)};

function showErrorMsg(msg) {
	$("#error").html("<div class='alert alert-danger text-center'><a href='#' class='close' data-dismiss='alert' aria-label='close' onclick='$(this).parent().remove();'>&times;</a>" + msg + "</div>");
}

$('#compareBtn').click(function (e) { onAction(); });
$('#city').change(function (e) { $('#error').html("") })
$("#submitWeather").click(function (e) {
	$("#show").html('');
	$('#compareBtn').hide();
	count = 0;
	onAction();
});
document.querySelector('#city').addEventListener('keyup', function (e) {
	if (e.keyCode === 13) {
		$('#show').html('');
		count = 0;
		onAction();
	};
});

function removeWeatherBlock(id) {
	$("#weather_block_" + id).remove();
	count--;
	if (count < 1) {
		$('#compareBtn').hide();
	}
}

function getForecast(data) {
	var i = 0;
	var date = new Date(data.dt * 1000);

	var dayOfWeek = date.getDay();
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var day = days[dayOfWeek];

	var datte = date.getDate();

	var month = date.getMonth();
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var monnth = months[month];

	var year = date.getFullYear();

	var hours = date.getHours() + 1;
	if (hours === 24) {
		hours = 0;
	}
	if (hours < 10) {
		hours = '0' + hours;
	}

	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}


	count++;
	return "<div id='weather_block_" + counter + "' class='weather-block'><span onclick='removeWeatherBlock(" + counter++ + ")' class='close' style='color:red'>X</span>" +
		"<h2>Current Weather for " + data.name + "," + data.sys.country + "</h2>" +
		"<h3><strong>Date New</strong>: " + day + " " + datte + " " + monnth + " " + year + " " + "</h3>" +
		"<h3><strong>Time</strong>: " + hours + ":" + minutes + "</h3>" +
		"<h3><strong>Weather</strong>: <img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>" + data.weather[0].main + "</h3>" +
		"<h3><strong>Description</strong>: " + data.weather[0].description + "</h3>" +
		"<h3><strong>Temperature</strong>: " + data.main.temp + "&deg;C</h3>" +
		"<h3><strong>Pressure</strong>: " + data.main.pressure + "hPa</h3>" +
		"<h3><strong>Humidity</strong>: " + data.main.humidity + " %</h3>" +
		"<h3><strong>Min. Temperature</strong>: " + data.main.temp_min + "&deg;C</h3>" +
		"<h3><strong>Max. Temperature</strong>: " + data.main.temp_max + "&deg;C</h3>" +
		"<h3><strong>Wind Speed</strong>: " + data.wind.speed + "m/s</h3>" +
		"<h3><strong>Wind Direction</strong>: " + data.wind.deg + "&deg;</h3></div>";
}

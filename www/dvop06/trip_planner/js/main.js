var CLIENT_ID = '311660390252-sk64cfms5qnf8qecr3njfcr9vj13mma4.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCqrIm5k4rHJuYEwMlMGkusAAeLGBNNhZ8';
var SCOPES = 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.metadata.readonly';;
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

var markerList = [];
var labelIndex = 0;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
var map;

function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.08804, lng: 14.42076 },
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
        }, function () {
            handleLocationError(true, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }

    //Retrieve markers from localStorage 
    var i;
    $(document).ready(function () {
        for (i = 0; i < localStorage.length; i++) {
            retrieveMarker(labels[labelIndex++ % labels.length]);
        }
    });




    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });



    map.addListener('rightclick', function (event) {
        placeMarker(event.latLng);
    });


}


function handleLocationError(browserHasGeolocation, pos) {
    alert(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
function retrieveMarker(markerId) {
    var markerData = JSON.parse(localStorage.getItem(markerId));
    // console.log(markerRestored);
    var parameters = {};
    parameters.position = markerData.position;
    parameters.label = markerData.label;
    parameters.content = markerData.content;
    var marker = new google.maps.Marker({
        position: parameters.position,
        label: parameters.label,
        map: map,
        draggable: false
    });
    console.log("retrieved");

    var infowindow = new google.maps.InfoWindow(
        {
            content: parameters.content
        });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

function googleMapsMarkerToSerializable(markerObject, infoWindowObject) {
    var outputObject = {};
    outputObject.position = markerObject.position;
    outputObject.label = markerObject.label;
    outputObject.draggable = markerObject.draggable ? 1 : 0;
    outputObject.text = infoWindowObject.content;
    return outputObject;
}

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        label: labels[labelIndex++ % labels.length],
        map: map,
        draggable: true
    });




    var html = '<div class="test">Lorem ipsum blab bla</div>';

    var infowindow = new google.maps.InfoWindow(
        {
            content: html
        });

    google.maps.event.addListener(marker, 'click', function () {
        $(".test").css('font-weight', 'bold');
        infowindow.open(map, marker);
    });

    try {
        window.localStorage.setItem(marker.label, JSON.stringify(googleMapsMarkerToSerializable(marker, infowindow)));
    } catch (error) {
        alert("Error - marker could not be stored" + "\n Your web storage might be full.");
    }
}


// var ApiKey = "AIzaSyCqrIm5k4rHJuYEwMlMGkusAAeLGBNNhZ8";




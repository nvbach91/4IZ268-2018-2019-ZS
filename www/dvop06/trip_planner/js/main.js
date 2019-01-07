function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
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

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
    var labelIndex = 0;

    map.addListener('click', function (event) {
        placeMarker(event.latLng);
    });

    function placeMarker(location, note) {
        var marker = new google.maps.Marker({
            position: location,
            label: labels[labelIndex++ % labels.length],
            map: map,
            draggable: true,
            editable: true
        });
        var infowindow = new google.maps.InfoWindow(
            {
                content: '<div contentEditable="true">Write your note here :)</div>'
            });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    }



}


function handleLocationError(browserHasGeolocation, pos) {
    alert(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}





// var ApiKey = "AIzaSyCqrIm5k4rHJuYEwMlMGkusAAeLGBNNhZ8";
// var mapDiv = $('#map');
// var map;

// // Initialize and add the map
// var map;
// var initMap = function () {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8
//     });
// }



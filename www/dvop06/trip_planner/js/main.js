

function initAutocomplete() {
    $('.content').removeClass('loader');
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: 'roadmap'
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

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
    var labelIndex = 0;

    map.addListener('click', function (event) {
        placeMarker(event.latLng);
    });

    function placeMarker(location, note) {
        var customMarker = new google.maps.Marker({
            position: location,
            label: labels[labelIndex++ % labels.length],
            map: map,
            draggable: true,
            editable: true
        });
    }

    function attachNote(marker, note) {
        var infowindow = new google.maps.InfoWindow({
            content: note
        });

        marker.addListener('click', function () {
            infowindow.open(marker.get('map'), marker);
        });
    }
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



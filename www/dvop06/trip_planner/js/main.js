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
            var retrievedMarker = retrieveMarker(labels[labelIndex++ % labels.length]);
            markerList.push(retrievedMarker);
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

    // map.addListener('click', function (event) {
    //     var placeid = placeid;
    //     var API_URL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${API_KEY}`;
    //     // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //     try {
    //         if (!place.geometry) {
    //             console.log("Returned place contains no geometry");
    //             return;
    //         }

    //         $.getJSON(API_URL, {
    //             tags: placeid,
    //             tagmode: "any",
    //             format: "json"
    //         },
    //             function (data) {
    //                 alert(data);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });

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
    return marker;
}

function googleMapsMarkerToSerializable(markerObject, infoWindowObject) {
    var outputObject = {};
    outputObject.position = markerObject.position;
    outputObject.label = markerObject.label;
    outputObject.draggable = markerObject.draggable ? 1 : 0;
    outputObject.content = infoWindowObject.content;
    return outputObject;
}

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        label: labels[labelIndex++ % labels.length],
        map: map,
        draggable: true
    });


    markerList.push(marker);

    var html = ['<div  id="infoWindow">',
        '<div class="title">My notes</div>',
        '<div contenteditable="true" class="content"></div>',
        '<div>',
        '<button onclick="markerList.forEach(saveMarker)" class="save-button">',
        'Save</button>',
        '</div>',
        '</div>'].join('');
    ;
    var infowindow = new google.maps.InfoWindow(
        {
            content: html
        });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });


    saveMarker(marker, infowindow);

}

function saveMarker(markerToSave, infowindowToSave) {
    try {
        window.localStorage.setItem(markerToSave.label, JSON.stringify(googleMapsMarkerToSerializable(markerToSave, infowindowToSave)));
    } catch (error) {
        alert("Error - marker could not be stored " + error + console.log(error));
    }
}


// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markerList.length; i++) {
        markerList[i].setMap(map);
    }
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    if (window.confirm("Alert - this action will delete all your saved files \n Do you want to proceed?")) {
        clearMarkers();
        localStorage.clear();
        markerList = [];
        labelIndex = 0;
    }
    return false;
}

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listFiles();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print files.
 */
function listFiles() {
    gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
    }).then(function (response) {
        appendPre('Files:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No files found.');
        }
    });
}




// var ApiKey = "AIzaSyCqrIm5k4rHJuYEwMlMGkusAAeLGBNNhZ8";




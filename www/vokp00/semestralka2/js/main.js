
$("<div id='map'></div>").appendTo("body");
$("<input type='button' id='coors' value='Where to go??'>").appendTo("body");
$("<div class='textBox'></div>").appendTo("body");
$("<div id='coordinates'></div>").appendTo(".textBox");
$("<div class='location'></div>").appendTo("body");

var latitude = 0;
var longitude = 0;
var city = "";


fetch("http://extreme-ip-lookup.com/json/").then(function (response) {
    return response.json();
}).then(function (response) {
    latitude = response.lat;
    longitude = response.lon;
    city = response.city;
}).catch(function (error) {
    console.log(JSON.stringify(error));
    latitude = 14;
    longitude = 50;
    city = "no info found";
});


/* Geo location api from browser 
const geoFindMe = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, geoOptions);
    } else {
        console.log("Geolocation services are not supported by your web browser.");
    };
}

const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);
}

const error = (error) => {
    latitude = 14;
    longitude = 50;
    city = " Prague - default coordinates <br> yours cannot be obtained";
    alert(`Unable to retrieve your location due to ${error.code}: ${error.message}`);
}

const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

$(window).on('load', geoFindMe);
*/

/* Map init */

var center = SMap.Coords.fromWGS84(14, 50);
var map = new SMap(JAK.gel("map"), center, 9);
/* Map controls */
map.addControl(new SMap.Control.Sync());
map.addDefaultLayer(SMap.DEF_TURIST).enable();
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
map.addControl(mouse);
map.addDefaultControls();

/* Getting castles */
var xhr = new JAK.Request(JAK.Request.XML);
xhr.setCallback(window, "response");
xhr.send("gpx/hrady.gpx");

/* Adding a layer of castles to map */
var response = function (xmlDoc) {
    var gpx = new SMap.Layer.GPX(xmlDoc, null, { maxPoints: 100 });
    map.addLayer(gpx);
    gpx.enable();
    gpx.fit();
};

var latitudeCastle = 0;
var longitudeCastle = 0;
var nameCastle = "";
var descCastle = "";
var dist = 0;
var link = "";

var newCastle;
var cont = $('<ul>');

$.getJSON("gpx/hrady.json", function (data) {
    var JSONItems = [];
    JSONItems = data;
    var array = [];

    for (var i = 0; i < JSONItems.features.length; i++) {


        latitudeCastle = JSONItems.features[i].geometry.coordinates[1];
        longitudeCastle = JSONItems.features[i].geometry.coordinates[0];
        nameCastle = JSONItems.features[i].properties.name;
        descCastle = JSONItems.features[i].properties.desc;
        link = JSONItems.features[i].properties.links[0].href;

        var listPois = function () {
            newCastle = $('<li>').appendTo(cont);
            var thelink = $('<a>', {
                text: nameCastle,
                title: 'Castle page',
                href: link,
                target: '_blank'
            }).appendTo(newCastle);
        };

        listPois();


        /* user - castle distance, haversine formula */
        var radlat1 = Math.PI * latitude / 180;
        var radlat2 = Math.PI * latitudeCastle / 180;
        var theta = longitude - longitudeCastle;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

        if (dist > 1) {
            dist = 1;
        }

        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;

        /* saving distances to array */
        array.push(dist);
    }

    $(cont).appendTo(".randomText");

    /* closest castle */
    min = Math.min.apply(Math, array)

    if (dist = min) {
        return nameCastle;
    }
});


var routeLength;
var routeLayer;

var planRoute = function () {
    if (routed === true) {
        $('.textBox').empty();
        routeLayer.removeAll();
        console.log("bing");
    }
    var information = function (route) {
        routeLayer = new SMap.Layer.Geometry();
        map.addLayer(routeLayer).enable();
        var coords = route.getResults().geometry;
        routeLength = route.getResults().length;
        routeLength = Math.round(routeLength / 1000);
        var time = route.getResults().time;
        time = Math.round(time / 60);
        var cz = map.computeCenterZoom(coords);
        map.setCenterZoom(cz[0], cz[1]);
        var g = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
        routeLayer.addGeometry(g);
        $('.textBox').append("<br><br>" + name + " is " + routeLength + " kilometres away. <br>" + " That is about " + time + " minutes spent in a car.");

    }

    var coords = [
        SMap.Coords.fromWGS84(longitude, latitude),
        SMap.Coords.fromWGS84(longitudeCastle, latitudeCastle)
    ];
    var route = new SMap.Route(coords, information);
}

var name;
var routed;

/* Route appears after clicking on the marker */
map.getSignals().addListener(this, "marker-click", function (e) {
    var marker = e.target;
    var coords = marker.getCoords();
    name = marker.getTitle();
    latitudeCastle = coords.y;
    longitudeCastle = coords.x;
    planRoute();
    routed = true;
});


var buttonclicked;

/* Information for the user */
$("#coors").click(function () {
    if (buttonclicked !== true) {
        buttonclicked = true;

        /* $('coordinates').append("<p id='p'></p>");*/
        $('.location').append("<br><br> Your coordinates are: " + latitude + ", " + longitude + city +
            ".<br> The closest castle you can visit according to haversine formula is: <br>" + nameCastle + ". " + " <br>Basic info: " + descCastle +
            " <br>You can get more info here: ");
        var thelink = $('<a>', {
            text: link,
            title: 'Castle page',
            href: link
        }).appendTo('.location');

        /*
                var para = document.createElement("P");
                var t = document.createTextNode("You are somewhere near the coordinates " + latitude + ", " + longitude + " which means you are in " + city +
                    ". The closest castle you can visit is: " + nameCastle + ". " + " Basic info: " + descCastle +
                    " You can get more info here: ");
                para.appendChild(t);
                var a = document.createElement('a');
                var linkText = document.createTextNode(link);
                a.appendChild(linkText);
                a.href = link;
                para.appendChild(a);
        
                document.getElementById("coordinates").appendChild(para);
        */

        /*planRoute();*/

    } else {
        alert("Hey, you already know your location and the way to the closest castle. Or atleast you know, that your defualt location is 14, 50 - Prague!");
    }


});

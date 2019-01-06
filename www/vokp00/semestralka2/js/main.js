/* pozice uživatele na mapě dle IP */
var latitude = 0;
var longitude = 0;
var city = "";

/* Získání délky, šířky a města uživatele */

/*
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
*/

const geoFindMe = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, geoOptions);
    } else {
        console.log("Geolocation services are not supported by your web browser.");
    }
}

const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);
}

const error = (error) => {
    latitude = 14;
    longitude = 50;
    console.log(`Unable to retrieve your location due to ${error.code}: ${error.message}`);
}

const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

/* nastavení mapy */

var center = SMap.Coords.fromWGS84(14, 50);
var map = new SMap(JAK.gel("map"), center, 9);
/* Aby mapa reagovala na změnu velikosti průhledu */
map.addControl(new SMap.Control.Sync());
map.addDefaultLayer(SMap.DEF_TURIST).enable();
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
map.addControl(mouse);
map.addDefaultControls();

/*
var layerTwo = new SMap.Layer.Marker();
map.addLayer(layerTwo);
layerTwo.enable();
*/

/* Získání souboru do mapy */
var xhr = new JAK.Request(JAK.Request.XML);
xhr.setCallback(window, "response");
xhr.send("gpx/hrady.gpx");

/* přidání vrstvy pro zobrazení bodů na mapě */
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

/*
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

        /* vzdálenost uživatele a hradu - haversine formula
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

        /* uložení vzdáleností do pole 
        array.push(dist);
    }

    /* hledání nejbližšího hradu 
    min = Math.min.apply(Math, array)

    if (dist = min) {
        return nameCastle;
    }
});
*/
var length;

var planRoute = function () {
    var nalezeno = function (route) {
        var vrstva = new SMap.Layer.Geometry();
        map.addLayer(vrstva).enable();

        var coords = route.getResults().geometry;
        length = route.getResults().length;
        length = length / 1000;
        var time = route.getResults().time;
        time = time / 60;
        console.log(length);
        console.log(route.getResults());
        var cz = map.computeCenterZoom(coords);
        map.setCenterZoom(cz[0], cz[1]);
        var g = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
        vrstva.addGeometry(g);
        $('p').append("<br>This place is " + length + " kilometres away." + " That is about " + time + " minutes.");
    }

    var coords = [
        SMap.Coords.fromWGS84(longitude, latitude),
        SMap.Coords.fromWGS84(longitudeCastle, latitudeCastle)
    ];
    var route = new SMap.Route(coords, nalezeno);

}

/* Po kliknutí na marker se zobrazí trasa k hradu */
map.getSignals().addListener(this, "marker-click", function (e) {
    var marker = e.target;
    var coords = marker.getCoords();
    latitudeCastle = coords.y;
    longitudeCastle = coords.x;
    planRoute();
});

/* Vaše pozice dle IP adresy, informace o nejbližším hradu, trase a jeho webu */
var buttonclicked;

$("#coors").click(function () {
    if (buttonclicked != true) {
        buttonclicked = true;

        $('coordinates').append("<p id='p'></p>");
        $('p').append("<br>You are somewhere near the coordinates " + latitude + ", " + longitude + " which means you are in " + city +
            ". The closest castle you can visit is: " + nameCastle + ". " + " Basic info: " + descCastle +
            " You can get more info here: ");
        var thelink = $('<a>', {
            text: link,
            title: 'Castle page',
            href: link
        }).appendTo('p');

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

        planRoute();

    } else {
        alert("Hey, you already know your location and the way to the closest castle.");
    }


});



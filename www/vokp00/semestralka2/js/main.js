function showLocation(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function getLocationUpdate() {

    if (navigator.geolocation) {
        var options = { timeout: 60000 };
        var geoLoc = navigator.geolocation;
        var watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
        console.log(watchID);
    } else {
        alert("Sorry, browser does not support geolocation!");
    }
}


if (navigator.geolocation == true) {
    var center = SMap.Coords.fromWGS84(position.coords.longitude, position.coords.latitude);
} else {

    var center = SMap.Coords.fromWGS84(14.4378005, 50.0755381);
}

/*var center = SMap.Coords.fromWGS84(14.4378005, 50.0755381);*/

var map = new SMap(JAK.gel("map"), center, 10);




/* Aby mapa reagovala na změnu velikosti průhledu */
map.addControl(new SMap.Control.Sync());

/* Turistický podklad */
map.addDefaultLayer(SMap.DEF_TURIST).enable();

/* Ovládání myší */
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
map.addControl(mouse);

/* Získání XML do mapy */
var xhr = new JAK.Request(JAK.Request.XML);
xhr.setCallback(window, "response");
xhr.send("gpx/hrady.gpx");

/* přidání vrstvy pro zobrazení bodů na mapě*/
var response = function (xmlDoc) {
    var gpx = new SMap.Layer.GPX(xmlDoc, null, { maxPoints: 1000 });
    map.addLayer(gpx);
    gpx.enable();
    gpx.fit();
}

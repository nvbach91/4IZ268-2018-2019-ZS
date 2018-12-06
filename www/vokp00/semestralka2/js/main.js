/* pozice uživatele na mapě dle IP */
var latitude = null;
var longitude = null;
var city = "";

fetch("http://ip-api.com/json/?fields=lat,lon,city").then(function (take) {
    return take.json();
}).then(function (take) {
    latitude = take.lat;
    longitude = take.lon;
    city = take.city;
});


var center = SMap.Coords.fromWGS84(latitude, longitude);
var map = new SMap(JAK.gel("map"), center, 10);
var cz = map.computeCenterZoom(center);

/* vaše pozice */

var moreInfo = function () {

    var buttonclicked;
    $("#coors").click(function () {
        if (buttonclicked != true) {
            buttonclicked = true;
            var para = document.createElement("P");
            var t = document.createTextNode("You are somewhere near the coordinates " + latitude + ", " + longitude + " which means you are in " + city);
            para.appendChild(t);
            document.getElementById("coordinates").appendChild(para);
        } else {
            alert("Button was clicked before");
        }
    });
}


/* pozice uživatele v mapě
var userPosition = new SMap.Layer.Marker();
map.addLayer(userPosition);
userPosition.enable();

var picture = "https://img.icons8.com/nolan/2x/street-view.png";

var options = {
    url: picture,
    anchor: { left: 10, bottom: 1 }  /* Ukotvení značky za bod uprostřed dole */
/* } */

/* var userMArker = new SMap.Marker(center, null, options);
userPosition.addMarker(userMArker); */

/* Aby mapa reagovala na změnu velikosti průhledu */
map.addControl(new SMap.Control.Sync());

/* Turistický podklad*/
map.addDefaultLayer(SMap.DEF_TURIST).enable();

/* Ovládání myší*/
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
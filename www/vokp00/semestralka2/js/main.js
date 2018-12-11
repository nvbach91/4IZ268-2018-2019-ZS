/* pozice uživatele na mapě dle IP */
var latitude = 0;
var longitude = 0;
var city = "";

/* Získání délky, šířky a města uživatele */
fetch("http://ip-api.com/json/?fields=lat,lon,city").then(function (take) {
    return take.json();
}).then(function (take) {
    latitude = take.lat;
    longitude = take.lon;
    city = take.city;
});

/* NAstavení mapy */
var center = SMap.Coords.fromWGS84(latitude, longitude);
var map = new SMap(JAK.gel("map"), center, 0, { minZoom: 0, maxZoom: 100 });
var cz = map.computeCenterZoom(center);

/* Vaše pozice dle IP adresy */
var buttonclicked;

$("#coors").click(function () {
    if (buttonclicked != true) {
        buttonclicked = true;
        var para = document.createElement("P");
        var t = document.createTextNode("You are somewhere near the coordinates " + latitude + ", " + longitude + " which means you are in " + city);
        para.appendChild(t);
        document.getElementById("coordinates").appendChild(para);
    } else {
        alert("Hey, one time is enough!");
    }
});

/* Aby mapa reagovala na změnu velikosti průhledu */
map.addControl(new SMap.Control.Sync());

/* Turistický podklad*/
map.addDefaultLayer(SMap.DEF_TURIST).enable();

/* Ovládání myší*/
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
map.addControl(mouse);

/* Ovládací prvky */
map.addDefaultControls();

/* Získání XML do mapy */
var xhr = new JAK.Request(JAK.Request.XML);
xhr.setCallback(window, "response");
xhr.send("gpx/hrady.gpx");

/* přidání vrstvy pro zobrazení bodů na mapě*/
var response = function (xmlDoc) {
    var gpx = new SMap.Layer.GPX(xmlDoc, null, { maxPoints: 1000 });

    var x = xmlDoc.getElementsByTagName("wpt");
    map.addLayer(gpx);
    gpx.enable();
    gpx.fit();
}

var latitudeCastle = 0;
var longitudeCastle = 0;
var nameCastle = "";


$.getJSON("../gpx/hrady.json", function (json) {
    var array = [];
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            var item = json[key];
            array.push({
                latitudeCastle: item.lat,
                longitudeCastle: item.lon,
                nameCastle: item.name,

            });
            console.log(item.lat);
        }
    }
    console.log(array);
});


/* vzdálenost uživatele a hradu */
var dist = 0;
function distance(latitude, longitude, latitudeCastle, longitudeCastle, unit) {
    if ((latitude == latitudeCastle) && (longitude == longitudeCastle)) {
        return 0;
    }
    else {
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
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}


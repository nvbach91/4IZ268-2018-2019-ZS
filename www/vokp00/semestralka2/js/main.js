/* pozice uživatele na mapě dle IP */
var latitude = 0;
var longitude = 0;
var city = "";

/* Získání délky, šířky a města uživatele */

fetch("http://ip-api.com/json/?fields=lat,lon,city").then(function (response) {
    return response.json();
}).then(function (response) {
    latitude = response.lat;
    longitude = response.lon;
    city = response.city;
    console.log(latitude, longitude, city);
});

/* nastavení mapy */
var center = SMap.Coords.fromWGS84(latitude, longitude);
var map = new SMap(JAK.gel("map"), center, 9);
var layerTwo = new SMap.Layer.Marker();
map.addLayer(layerTwo);
layerTwo.enable();

/* Aby mapa reagovala na změnu velikosti průhledu */
map.addControl(new SMap.Control.Sync());

/* Turistický podklad*/
map.addDefaultLayer(SMap.DEF_TURIST).enable();

/* Ovládání myší*/
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
map.addControl(mouse);

/* Ovládací prvky */
map.addDefaultControls();

/* Získání souboru do mapy z gpx se vyrobí xml */
var xhr = new JAK.Request(JAK.Request.XML);
xhr.setCallback(window, "response");
xhr.send("gpx/hrady.gpx");

/* přidání vrstvy pro zobrazení bodů na mapě */
var response = function (xmlDoc) {
    var gpx = new SMap.Layer.GPX(xmlDoc, null, { maxPoints: 100 });
    map.addLayer(gpx);
    gpx.enable();
    /*gpx.fit();*/
}

var latitudeCastle = 0;
var longitudeCastle = 0;
var nameCastle = "";
var descCastle = "";
var dist = 0;
var link = "";

$.getJSON("gpx/hrady.json", function (data) {
    var JSONItems = [];
    JSONItems = data;
    var array = [];
    for (var i = 0; i < JSONItems.features.length; i++) {


        latitudeCastle = JSONItems.features[i].geometry.coordinates[0];
        longitudeCastle = JSONItems.features[i].geometry.coordinates[1];
        nameCastle = JSONItems.features[i].properties.name;
        descCastle = JSONItems.features[i].properties.desc;
        link = JSONItems.features[i].properties.links[0].href;

        /* vzdálenost uživatele a hradu - haversine formula*/
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

        /* uložení vzdáleností do pole */
        array.push(dist);
    }

    /* hledání nejbližšího hradu */
    min = Math.min.apply(Math, array)

    if (dist = min) {
        return nameCastle;
    }
});

/* Vaše pozice dle IP adresy, informace o nejbližším hradu a jeho webu */
var buttonclicked;

$("#coors").click(function () {
    if (buttonclicked != true) {
        buttonclicked = true;
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

    } else {
        alert("Hey, you already know your location and the closest castle.");
    }
});



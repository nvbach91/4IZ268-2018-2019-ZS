
//
var center = SMap.Coords.fromWGS84(14.41790, 50.12655);
var mapa = new SMap(JAK.gel("mapa"), center, 1);

/* Aby mapa reagovala na změnu velikosti průhledu */
mapa.addControl(new SMap.Control.Sync());

/* Turistický podklad */
mapa.addDefaultLayer(SMap.DEF_TURIST).enable();

/* Ovládání myší */
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
mapa.addControl(mouse);

var xhr = new JAK.Request(JAK.Request.XML);
xhr.setCallback(window, "response");
xhr.send("gpx/hrady.gpx");

var response = function (xmlDoc) {
    var gpx = new SMap.Layer.GPX(xmlDoc, null, { maxPoints: 10 });
    mapa.addLayer(gpx);
    gpx.enable();
    gpx.fit();
}

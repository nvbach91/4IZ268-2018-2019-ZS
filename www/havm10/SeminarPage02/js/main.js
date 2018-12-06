var startLongitude = $('#start-longitude');
var startLatitude = $('#start-latitude');
var endLongitude = $('#end-longitude');
var endLatitude = $('#end-latitude');
var map = $('#map');
var length = $('#length');
var time = $('#time');
var ascent = $('#ascent');
var descent = $('#descent');

var canvas = document.getElementById('canvas-draw');
var draw = canvas.getContext('2d')

// záznam bodů, je to z důvodu jejich případného přepisu
var startMarker = '';
var endMarker = '';

// záznam hledane trasy, je to z důvodu jejich případného přepisu
var computeRoute = '';

//ciselnik urcujici jakou znacku pridavame, 0 - nic, 1 - start, 2 - end
var selectOption = 0;

//vytvoření mapy
var center = SMap.Coords.fromWGS84(14.41, 50.08);
var map = new SMap(JAK.gel("map"), center, 10);
map.addDefaultLayer(SMap.DEF_TURIST).enable();
map.addDefaultControls();

//přidání do mapy vrstvu pro značky
var markerLayer = new SMap.Layer.Marker();
map.addLayer(markerLayer);
markerLayer.enable();

//přidání do mapy vrstvu pro hledani cesty
var routeLayer = new SMap.Layer.Geometry();
map.addLayer(routeLayer).enable();

//pridani povoleni pro znacku start
$('#start-buttom').click(function () {
    selectOption = 1;
});

//pridani povoleni pro znacku end
$('#end-buttom').click(function () {
    selectOption = 2;
});

//Vybrani bodu na mapě a vytvoreni znacky
function click(e) {
    if (selectOption === 1) {
        if (startMarker !== '') {
            markerLayer.removeMarker(startMarker);
        }
        var coordinates = SMap.Coords.fromEvent(e.data.event, map);
        startMarker = new SMap.Marker(coordinates, "start");
        coordinates = coordinates.toWGS84(2);
        startLongitude.text(coordinates[0]);
        startLatitude.text(coordinates[1]);
        startMarker.decorate(SMap.Marker.Feature.Draggable);
        markerLayer.addMarker(startMarker);
        selectOption = 0;
        if (computeRoute !== '') {
            prepareSearch();
        }
    }

    if (selectOption === 2) {
        if (endMarker !== '') {
            markerLayer.removeMarker(endMarker);
        }
        var coordinates = SMap.Coords.fromEvent(e.data.event, map);
        endMarker = new SMap.Marker(coordinates, "end");
        coordinates = coordinates.toWGS84(2);
        endLongitude.text(coordinates[0]);
        endLatitude.text(coordinates[1]);
        endMarker.decorate(SMap.Marker.Feature.Draggable);
        markerLayer.addMarker(endMarker);
        selectOption = 0;
        if (computeRoute !== '') {
            prepareSearch();
        }
    }
}

/* přesouvání značky */
function start(e) {
    var node = e.target.getContainer();
}

/* přesouvání značky */
function stop(e) {
    var node = e.target.getContainer();
    var coords = e.target.getCoords();

    /* podminka pro aktualizaci souradnic */
    if (e.target._id === 'start') {
        var coordinates = SMap.Coords.fromEvent(e.data.event, map);
        coordinates = coordinates.toWGS84(2);
        startLongitude.text(coordinates[0]);
        startLatitude.text(coordinates[1]);
        if (computeRoute !== '') {
            prepareSearch();
        }
    }

    /* podminka pro aktualizaci souradnic */
    if (e.target._id === 'end') {
        var coordinates = SMap.Coords.fromEvent(e.data.event, map);
        coordinates = coordinates.toWGS84(2);
        endLongitude.text(coordinates[0]);
        endLatitude.text(coordinates[1]);
        if (computeRoute !== '') {
            prepareSearch();
        }
    }
}

// hledani trasy a vypocty vypsanych hodnot
var search = function (route) {
    console.log('a');
    if (computeRoute !== '') {
        routeLayer.removeGeometry(computeRoute);
    }
    console.log('a');
    var coords = route.getResults().geometry;
    length.text((route.getResults().length) / 1000 + ' km');
    var hour = Math.floor(route.getResults().time / 3600);
    var minute = Math.floor((route.getResults().time / 60) - hour * 60);
    time.text(hour + ' h, ' + minute + ' min');
    ascent.text(route.getResults().ascent + ' m');
    descent.text(route.getResults().descent + ' m');
    computeRoute = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
    routeLayer.addGeometry(computeRoute);
    var altitude = route.getResults().altitude;
    draw.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < altitude.length; i++) {
        var localAltitude = (route.getResults().altitude[i]);
        draw.fillRect(22 + i * 2, 150 - (localAltitude / 11), 1, localAltitude / 11);
    }
    drawCanvas();
}

// priprava dat pro trackovani
var prepareSearch = function () {
    if (startMarker !== '' && endMarker !== '') {
        var markers = [
            startMarker._coords,
            endMarker._coords
        ];
        var parameter = { criterion: 'turist2' };
        var route = new SMap.Route(markers, search, parameter).ROUTE_TURIST_TYPES;
    }
}

// aktivace trackovani
$('#track-route').click(function () {
    prepareSearch();
});

// vykreslení výšky
var drawCanvas = function () {
    for (var i = 1; i < 20; i++) {
        draw.fillRect(0, i * 8.8, canvas.width, 0.3);
        draw.font = "8.8px Arial";
        draw.fillText(1700 - (i * 100), 0, i * 8.8);
    }
}

// iniciace pri uvodnim nacteni
drawCanvas();

// vytvoremo observer pro udalosti
var observer = map.getSignals();

//observer pro udalosti
var signals = map.getSignals();
signals.addListener(window, "marker-drag-stop", stop);
signals.addListener(window, "marker-drag-start", start);
map.getSignals().addListener(window, "map-click", click);

var startLongitude = $('#start-longitude');
var startLatitude = $('#start-latitude');
var endLongitude = $('#end-longitude');
var endLatitude = $('#end-latitude');
var map = $('#map');
var length = $('#length');
var time = $('#time');
var ascent = $('#ascent');
var descent = $('#descent');
var save = $('#save');
var nameInput = $('#name-input');
var saveContents = $('#save-contents');

var canvas = document.getElementById('canvas-draw');
var draw = canvas.getContext('2d');

var startMarker = '';
var endMarker = '';
var computeRoute = '';
var selectOption = 0;
var loadContent = 0;

var center = SMap.Coords.fromWGS84(14.41, 50.08);
var map = new SMap(JAK.gel("map"), center, 10);
map.addDefaultLayer(SMap.DEF_TURIST).enable();
map.addDefaultControls();

var markerLayer = new SMap.Layer.Marker();
map.addLayer(markerLayer);
markerLayer.enable();

var routeLayer = new SMap.Layer.Geometry();
map.addLayer(routeLayer).enable();

$('#start-buttom').click(function () {
    selectOption = 1;
});

$('#end-buttom').click(function () {
    selectOption = 2;
});

function click(e) {
    if (selectOption === 1) {
        var coordinates = SMap.Coords.fromEvent(e.data.event, map);
        setMarkerStart(coordinates);
    };

    if (selectOption === 2) {
        var coordinates = SMap.Coords.fromEvent(e.data.event, map);
        setMarkerEnd(coordinates);
    };
};

var setMarkerStart = function (coordinates) {
    if (startMarker !== '') {
        markerLayer.removeMarker(startMarker);
    };
    startMarker = new SMap.Marker(coordinates, 'start');
    coordinates = coordinates.toWGS84(2);
    startCoordinates(coordinates);
    startMarker.decorate(SMap.Marker.Feature.Draggable);
    markerLayer.addMarker(startMarker);
    selectOption = 0;
}

var setMarkerEnd = function (coordinates) {
    if (endMarker !== '') {
        markerLayer.removeMarker(endMarker);
    };
    endMarker = new SMap.Marker(coordinates, 'end');
    coordinates = coordinates.toWGS84(2);
    endCoordinates(coordinates);
    endMarker.decorate(SMap.Marker.Feature.Draggable);
    markerLayer.addMarker(endMarker);
    selectOption = 0;
}

var startCoordinates = function (coordinates) {
    startLongitude.text(coordinates[0]);
    startLatitude.text(coordinates[1]);
    if (computeRoute !== '' && loadContent === 0) {
        prepareSearch();
    };
};

var endCoordinates = function (coordinates) {
    endLongitude.text(coordinates[0]);
    endLatitude.text(coordinates[1]);
    if (computeRoute !== '' && loadContent === 0) {
        prepareSearch();
    };
};

function start(e) {
    var node = e.target.getContainer();
};

function stop(e) {
    var node = e.target.getContainer();
    var coords = e.target.getCoords();

    if (e.target._id === 'start') {
        var coordinates = SMap.Coords.fromEvent(e.data.event, map);
        coordinates = coordinates.toWGS84(2);
        startCoordinates(coordinates);
    };

    if (e.target._id === 'end') {
        var coordinates = SMap.Coords.fromEvent(e.data.event, map);
        coordinates = coordinates.toWGS84(2);
        endCoordinates(coordinates);
    };
};

var search = function (route) {
    if (computeRoute !== '') {
        routeLayer.removeGeometry(computeRoute);
    };
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
        draw.fillRect(30 + i * 2, 150 - (localAltitude / 11), 1, localAltitude / 11);
    };
    drawCanvas();
};

var prepareSearch = function () {
    if (startMarker !== '' && endMarker !== '') {
        var markers = [
            startMarker._coords,
            endMarker._coords
        ];
        var parameter = { criterion: 'turist2' };
        var route = new SMap.Route(markers, search, parameter).ROUTE_TURIST_TYPES;
    };
};

$('#track-route').click(function () {
    prepareSearch();
});

var drawCanvas = function () {
    for (var i = 1; i < 20; i++) {
        draw.fillRect(0, i * 8.8, canvas.width, 0.3);
        draw.font = "8.8px Arial";
        draw.fillText(1700 - (i * 100), 0, i * 8.8);
    };
};

var checkName = function (name) {
    var nameInApp = $('.save-name');
    if (name === '') {
        return true;
    }

    for (var i = 0; i < nameInApp.length; i++) {
        if (name.toLowerCase().trim() === nameInApp[i].innerText.toLowerCase().trim()) {
            return true;
        }
    }
    return false;
};

save.submit(function (e) {
    e.preventDefault();
    if (computeRoute !== '') {
        if (checkName(nameInput.val()) === true) {
            alert('Výraz je prázdný, či je již použit');
        } else {
            saveRoute();
        };
    };
});

var switchContent = function (name) {
    var saveName = $('<div>').addClass('save-name').text(name).click(function () {
        try {
            var object = JSON.parse(localStorage.getItem($(this).text()));
        } catch (e) {
            console.log('někdo upravil záznam v local storage');
        };
        loadContent = 1;
        setMarkerStart(SMap.Coords.fromWGS84(parseFloat(object.startLon), parseFloat(object.startLat)));
        setMarkerEnd(SMap.Coords.fromWGS84(parseFloat(object.endLon), parseFloat(object.endLat)));
        prepareSearch();
        loadContent = 0;
    });
    return saveName;
}

var deleteComponent = function (saveContent) {
    var deleteContent = $('<button>').addClass('save-delete').text('Delete').click(function () {
        localStorage.removeItem($(this).siblings()[0].lastChild.data);
        saveContent.remove();
    });
    return deleteContent;
}

var loadLocalData = function () {
    for (var i = 0; i < localStorage.length; i++) {
        var saveContent = $('<li>').addClass('save-content');
        var value = localStorage.key(i);
        var saveName = switchContent(value);
        var deleteContent = deleteComponent(saveContent);

        saveContent.append(deleteContent);
        saveContent.append(saveName);
        saveContents.append(saveContent);
    }
}

var saveRoute = function () {
    var targetName = nameInput.val();

    var saveContent = $('<li>').addClass('save-content');
    var saveName = switchContent(targetName);
    var deleteContent = deleteComponent(saveContent);

    saveContent.append(deleteContent);
    saveContent.append(saveName);
    saveContents.append(saveContent);

    var object = {
        startLon: startMarker._coords.x,
        startLat: startMarker._coords.y,
        endLon: endMarker._coords.x,
        endLat: endMarker._coords.y
    };

    localStorage.setItem(targetName, JSON.stringify(object));
};

drawCanvas();
loadLocalData();

var signals = map.getSignals();
signals.addListener(window, "marker-drag-stop", stop);
signals.addListener(window, "marker-drag-start", start);
signals.addListener(window, "map-click", click);

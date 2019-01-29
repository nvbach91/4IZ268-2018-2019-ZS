// Loader.load(); //nefunguje
window.onloadend = document.getElementById("loader").style.display = "none";

document.getElementById("btnSel").addEventListener("click", fNav);
document.getElementById("bMap").addEventListener("click", bMap);
document.getElementById("myBtnTop").addEventListener("click", topFunction);
document.getElementById("myBtnBottom").addEventListener("click", bottomFunction);
document.getElementById("button").addEventListener("click", cancelPath);

var picture = "img/drop-vw.png";
var picture_start = "img/drop-vw2.png";
var button = document.getElementById("button");
var bNav = document.getElementById("btnSel");

var map = new SMap(JAK.gel("map"));
map.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
map.addDefaultLayer(SMap.DEF_BASE).enable(); /* Turistický podklad */
map.addDefaultControls(); /* Ovládací prvky v pravém horní rohu mapy */
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
map.addControl(mouse);
map.addDefaultLayer(SMap.DEF_OPHOTO);
map.addDefaultLayer(SMap.DEF_TURIST);
map.addDefaultLayer(SMap.DEF_HISTORIC);
map.addDefaultLayer(SMap.DEF_OPHOTO0203);
map.addDefaultLayer(SMap.DEF_OPHOTO0406);

// Možnost změnit typ mapy
var layerSwitch = new SMap.Control.Layer();
layerSwitch.addDefaultLayer(SMap.DEF_BASE);
layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO);
layerSwitch.addDefaultLayer(SMap.DEF_TURIST);
layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO0406);
layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO0203);
layerSwitch.addDefaultLayer(SMap.DEF_HISTORIC);
map.addControl(layerSwitch, { left: "10px", top: "7px" });

var markers = [];
var coordinates = [];
var startPoint;

var data;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        data = JSON.parse(this.responseText);
        // console.log(typeof this.responseText);
        addData(data);
    }
};
xmlhttp.open("GET", "https://api.myjson.com/bins/11fgww", true);
xmlhttp.send();

var layer = new SMap.Layer.Marker();     /* layer se značkami */
map.addLayer(layer);                          /* Přidat ji do mapy */
layer.enable();                         /* A povolit */
var dealerList = "";
var item;
function addData(data) {
    data.forEach(function (marker) { /* Vyrobit markery */
        var c = SMap.Coords.fromWGS84(marker.coordinates); /* Souřadnice značky, z textového formátu souřadnic fromWGS84(14.297847, 50.076322);*/
        var options = {
            url: picture,
            title: marker.name,
            anchor: { left: 10, bottom: 1 }  /* Ukotvení značky za bod uprostřed dole */
        };
        // Důležité je přiřazení ID jednotlivým markerům - vlastní ID, jinak se generuje nahodne
        var point = new SMap.Marker(c, marker.id, options);
        coordinates.push(c);
        markers.push(point);
    });
    for (var i = 0; i < markers.length; i++) {
        layer.addMarker(markers[i]);
        var card = new SMap.Card();
        card.getBody().innerHTML = "<br>Prodejce vozů Volkswagen<br>";// + found.route.getResults().length;
        card.setSize(270, 100);
        card.getHeader().innerHTML = "<strong>" + data[i].name + "</strong>";
        // dealerList = new Option(data[i].name, data[i].id);
        item = '<option value="' + data[i].id + '">' + data[i].name + '</option>';
        dealerList = dealerList + item;
        // document.getElementById("sel").appendChild = dealerList;
        // document.getElementById("sel").insertAdjacentHTML("beforeend", dealerList);
        // console.log(dealerList);
        markers[i].decorate(SMap.Marker.Feature.Card, card);
    }
    document.getElementById("sel").innerHTML = dealerList;

    console.log(dealerList);

}

// dealerList.push(item);
// console.log(dealerList);
var cz = map.computeCenterZoom(coordinates); /* Spočítat pozici mapy tak, aby značky byly vidět */

var path;
var layerPath = new SMap.Layer.Geometry();
map.addLayer(layerPath).enable();

var found = function (route) {
    var coords = route.getResults().geometry;
    var time = route.getResults().time;
    var date = new Date(time * 1000).toISOString().substr(11, 8);
    document.getElementById("route").innerHTML = "Délka trasy: " + route.getResults().length / 1000 + "km<br>Celkový čas: " + date + "<br>Stoupání: " + route.getResults().ascent + "m Klesání: " + route.getResults().descent + "m";
    console.log(route.getResults().length);
    var cz = map.computeCenterZoom(coords);
    map.setCenterZoom(cz[0], cz[1]); //přibližování na úroveň trasy
    // if (path !== null) { //nefunguje
    if (path != null) {
        layerPath.removeGeometry(path);
    }
    path = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
    layerPath.addGeometry(path);
    button.removeAttribute("disabled", "");
}

var markerClicked = false;
var endPointCoords;

function handleMarkerClick(e) { /* Kliknutí na marker */
    markerClicked = true;
    // Nastavíme button jako disabled, dokud se nepřepočítá trasa
    button.setAttribute("disabled", "");
    // Vybraný marker
    var marker = e.target;
    var id = marker.getId();
    // Párovaní vybraného markeru pomocí jeho ID a našich vstupních dat.
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            document.getElementById("sel").selectedIndex = data[i].id;
            endPointCoords = SMap.Coords.fromWGS84(data[i].coordinates);
            document.getElementById("dealerBox").innerHTML = data[i].name + "<br>" + data[i].adresa + "<br> " + data[i].coordinates;
            break;
        }
    }
    var startPointCoords;
    // if (!startPoint) { //nefunguje
    if (startPoint != null) {
        // Máme startovní bod, najdeme trasu.
        startPointCoords = startPoint._coords;
    } else {
        // noStart();
        // Nemáme startovní bod, najdeme trasu ze středu mapy a přidáme tam marker.
        startPointCoords = SMap.Coords.fromWGS84(14.3573103, 50.0479011);
        var options = {
            url: picture_start,
            title: "Startovní bod",
            anchor: { left: 10, bottom: 1 }  /* Ukotvení značky za bod uprostřed dole */
        };
        startPoint = new SMap.Marker(startPointCoords, null, options);
        startPoint.decorate(SMap.Marker.Feature.Draggable);
        layer.addMarker(startPoint);
    }
    var coords = [startPointCoords, endPointCoords];
    var route = new SMap.Route(coords, found);
}

function handleMapClick(e) { /* Kliknutí do mapy */
    // Ten if je tady aby se neregistrovaly kliknutí na markery jako kliknutí do
    // mapy. Kdyby tady ten if nebyl, tak by každé kliknutí na marker zároveň bylo
    // registrováno jako kliknutí do mapy a přidalo by to výchozí bod někam k
    // markeru, na který se kliknulo (a to nechceme).
    if (markerClicked) {
        // Uživatel kliknul na marker. Nechceme přidat výchozí bod na mapu, ale
        // aspoň nastavíme atribut markerClicked na false, aby při příštím kliknutí
        // na mapu byl vybrán bod na mapě. Když příště uživatel zase klikne na
        // marker, žádný bod se na mapu zase nepřidá.
        markerClicked = false;
    } else {
        // Máme změnu v mapě, tak můžeme nastavit button pro zrušení trasy jako "enabled" - odebere se atribut disabled
        button.removeAttribute("disabled", "");
        // Souřadnice bodu kam se kliknulo
        var startPointCoords = SMap.Coords.fromEvent(e.data.event, map);
        if (startPoint != null) {
            // Odstraníme starý startovní bod
            layer.removeMarker(startPoint);
        }
        var options = {
            url: picture_start,
            title: "Startovní bod",
            anchor: { left: 10, bottom: 1 }  /* Ukotvení značky za bod uprostřed dole */
        };
        startPoint = new SMap.Marker(startPointCoords, null, options);
        startPoint.decorate(SMap.Marker.Feature.Draggable);
        layer.addMarker(startPoint);
        if (path !== null) {
            // Už jsme dřív našli nějakou trasu, tak ji teď přepočítáme pro nový
            // startovní bod.
            var coords = [startPointCoords, endPointCoords];
            var route = new SMap.Route(coords, found);
        }
    }
}

function start(e) { /* Začátek tažení */
    var node = e.target.getContainer();
    node[SMap.LAYER_MARKER].style.cursor = "default";
    // Nastavíme button jako disabled, dokud se nepřepočítá trasa
    button.setAttribute("disabled", "");
}

function stop(e) { /* Konec tažení */
    var node = e.target.getContainer();
    node[SMap.LAYER_MARKER].style.cursor = "pointer";
    var startPointCoords = e.target.getCoords();
    if (path !== null) {
        var coords = [startPointCoords, endPointCoords];
        var route = new SMap.Route(coords, found);
    }
}

var signals = map.getSignals();
signals.addListener(window, "marker-drag-stop", stop);
signals.addListener(window, "marker-drag-start", start);
signals.addListener(this, "marker-click", handleMarkerClick);
signals.addListener(this, "map-click", handleMapClick);


function cancelPath() {
    // Odstraníme startovní bod
    if (layer != null && startPoint != null) {
        layer.removeMarker(startPoint);
        startPoint = null;
    }
    // Odstraníme vykreslenou trasu
    if (layerPath != null && path != null) {
        layerPath.removeGeometry(path);
        path = null;
    }
    // Odstraníme info o dealerovi
    document.getElementById("dealerBox").innerHTML = "";
    document.getElementById("route").innerHTML = "";
    // Nastavíme button jako disabled
    button.setAttribute("disabled", "");
    var cz = map.computeCenterZoom(coordinates); /* Spočítat pozici mapy tak, aby značky byly vidět */
    map.setCenterZoom(cz[0], cz[1]);

    document.getElementById("sel").selectedIndex = 50;
}
hideButton();

//Zkontrolovat, jestli není po změně velikosti okna není okno větší než stránka
window.onresize = function () {
    hideButton();
}
//Skrýt tlačítko pro posun na konec stránky, pokud je okno větší než stránka
function hideButton() {
    if (document.documentElement.offsetHeight < document.documentElement.clientHeight) {
        document.getElementById("myBtnBottom").style.display = "none";
    }
}

// Když se stránka posune dolů o více než 20px, objeví se tlačítko
window.onscroll = function () {
    scrollFunction();
    scrollFunction2();
}

function scrollFunction() {
    if (document.documentElement.scrollTop > 1) {
        document.getElementById("myBtnTop").style.display = "block";
    } else {
        document.getElementById("myBtnTop").style.display = "none";
    }
}
function scrollFunction2() { //offsetHeight = 1324
    if (document.documentElement.offsetHeight - 1 > document.documentElement.clientHeight + document.documentElement.scrollTop) {
        document.getElementById("myBtnBottom").style.display = "block";
    } else {
        document.getElementById("myBtnBottom").style.display = "none";
    }
}

// Když se stiskne tlačítko, posunout stránku na začátek
function topFunction() {
    document.documentElement.scrollTop = 0;
}
// Když se stiskne tlačítko, posunout stránku na konec
function bottomFunction() {
    document.documentElement.scrollTo(0, document.documentElement.scrollHeight);
}
function noStart() {
    // Nemáme startovní bod, najdeme trasu ze středu mapy a přidáme tam marker.
    startPointCoords = SMap.Coords.fromWGS84(14.3573103, 50.0479011);
    var options = {
        url: picture_start,
        title: "Startovní bod",
        anchor: { left: 10, bottom: 1 }  /* Ukotvení značky za bod uprostřed dole */
    };
    startPoint = new SMap.Marker(startPointCoords, null, options);
    startPoint.decorate(SMap.Marker.Feature.Draggable);
    layer.addMarker(startPoint);
}
var elmnt = document.getElementById("button");
function bMap() {
    elmnt.scrollIntoView();
}
function fNav() {

    noStart();
    var select = document.getElementById("sel");
    var id = select.options[select.selectedIndex].value;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            endPointCoords = SMap.Coords.fromWGS84(data[i].coordinates);
            document.getElementById("dealerBox").innerHTML = data[i].name + "<br>" + data[i].adresa + "<br> " + data[i].coordinates;
        }
    }
    elmnt.scrollIntoView();
    var coords = [startPointCoords, endPointCoords];
    var route = new SMap.Route(coords, found);
}
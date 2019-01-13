// var obrazek = "https://api.mapy.cz/img/api/marker/drop-red.png";
var obrazek = "img/drop-vw.png";
var obrazek_start = "img/drop-vw2.png";
var mapa = new SMap(JAK.gel("mapa"));
mapa.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
mapa.addDefaultLayer(SMap.DEF_BASE).enable(); /* Turistický podklad */
mapa.addDefaultControls(); /* Ovládací prvky v pravém horní rohu mapy */
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
mapa.addControl(mouse);
mapa.addDefaultLayer(SMap.DEF_OPHOTO);
mapa.addDefaultLayer(SMap.DEF_TURIST);
mapa.addDefaultLayer(SMap.DEF_HISTORIC);
mapa.addDefaultLayer(SMap.DEF_OPHOTO0203);
mapa.addDefaultLayer(SMap.DEF_OPHOTO0406);

// Možnost změnit typ mapy
var layerSwitch = new SMap.Control.Layer();
layerSwitch.addDefaultLayer(SMap.DEF_BASE);
layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO);
layerSwitch.addDefaultLayer(SMap.DEF_TURIST);
layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO0406);
layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO0203);
layerSwitch.addDefaultLayer(SMap.DEF_HISTORIC);
mapa.addControl(layerSwitch, { left: "10px", top: "7px" });

var data = [{
    name: "NH Car",
    id: 1,
    coords: "50°5'1.732\"N, 14°23'3.251\"E"
}, {
    name: "Porsche Praha Smíchov",
    id: 2,
    coords: "50°4'10.489\"N, 14°22'41.630\"E"
}, {
    name: "Porsche Praha Prosek",
    id: 3,
    coords: "50°7'55.227\"N, 14°29'30.433\"E"
}, {
    name: "Auto Jarov",
    id: 4,
    coords: "50°5'25.698\"N, 14°29'56.907\"E"
}, {
    name: "Auto Podbabská Praha",
    id: 5,
    coords: "50°6'52.443\"N, 14°23'30.614\"E"
}, {
    name: "Autosalon Klokočka Centrum",
    id: 6,
    coords: "50°4'35.496\"N, 14°17'56.176\"E"
}, {
    name: "TUkas",
    id: 7,
    coords: "50°0'7.182\"N, 14°24'45.595\"E"
}, {
    name: "AUTO JAROV KUNRATICE",
    id: 8,
    coords: "50°0'38.903\"N, 14°28'36.962\"E"
}, {
    name: "Louda Auto Praha",
    id: 9,
    coords: "50°6'29.972\"N, 14°32'54.237\"E"
}, {
    name: "Auto I.S.R.",
    id: 10,
    coords: "50°0'18.520\"N, 14°34'10.862\"E"
}];

var znacky = [];
var souradnice = [];
var startovniBod;

data.forEach(function (marker) { /* Vyrobit markery */
    var c = SMap.Coords.fromWGS84(marker.coords); /* Souřadnice značky, z textového formátu souřadnic */
    var options = {
        url: obrazek,
        title: marker.name,
        anchor: { left: 10, bottom: 1 }  /* Ukotvení značky za bod uprostřed dole */
    }
    // Důležité je přiřazení ID jednotlivým markerům - vlastní ID, jinak se generuje nahodne
    var znacka = new SMap.Marker(c, marker.id, options);
    souradnice.push(c);
    znacky.push(znacka);
});

/* NH Car ukotvíme za střed značky, přestože neznáme její velikost */
// var options = {
//     anchor: { left: 0.5, top: 0.5 }
// }
// znacky[1].decorate(SMap.Marker.Feature.RelativeAnchor, options);


var vrstva = new SMap.Layer.Marker();     /* Vrstva se značkami */
mapa.addLayer(vrstva);                          /* Přidat ji do mapy */
vrstva.enable();                         /* A povolit */
for (var i = 0; i < znacky.length; i++) {
    vrstva.addMarker(znacky[i]);
    var card = new SMap.Card();
    card.getBody().innerHTML = "<br>Prodejce Volkswagen";
    card.setSize(270, 90);
    card.getHeader().innerHTML = "<strong>" + data[i].name + "</strong>";
    znacky[i].decorate(SMap.Marker.Feature.Card, card);
}



var cz = mapa.computeCenterZoom(souradnice); /* Spočítat pozici mapy tak, aby značky byly vidět */
mapa.setCenterZoom(cz[0], cz[1]);
var trasa;
var vrstvaSTrasou = new SMap.Layer.Geometry();
mapa.addLayer(vrstvaSTrasou).enable();

var nalezeno = function (route) {
    var coords = route.getResults().geometry;
    var cz = mapa.computeCenterZoom(coords);
    //mapa.setCenterZoom(cz[0], cz[1]);
    if (trasa != null) {
        vrstvaSTrasou.removeGeometry(trasa);
    }
    trasa = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
    vrstvaSTrasou.addGeometry(trasa);
}

var markerClicked = false;
var endPointCoords;

function handleMarkerClick(e) { /* Kliknutí na marker */
    markerClicked = true;
    // Vybraný marker
    var marker = e.target;
    var id = marker.getId();
    loadDoc(id);
    // Párovaní vybraného markeru pomocí jeho ID a našich vstupních dat.
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            endPointCoords = SMap.Coords.fromWGS84(data[i].coords);
            break;
        }
    }
    var startPointCoords;
    if (startovniBod != null) {
        // Máme startovní bod, najdeme trasu.
        startPointCoords = startovniBod._coords;
    } else {
        // Nemáme startovní bod, najdeme trasu ze středu mapy a přidáme tam marker.
        startPointCoords = SMap.Coords.fromWGS84(14.3573103, 50.0479011);
        var options = {
            url: obrazek_start,
            title: "Startovní bod",
            anchor: { left: 10, bottom: 1 }  /* Ukotvení značky za bod uprostřed dole */
        };
        startovniBod = new SMap.Marker(startPointCoords, null, options);
        startovniBod.decorate(SMap.Marker.Feature.Draggable);
        vrstva.addMarker(startovniBod);
    }
    var coords = [startPointCoords, endPointCoords];
    var route = new SMap.Route(coords, nalezeno);
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
        // Souřadnice bodu kam se kliknulo
        var startPointCoords = SMap.Coords.fromEvent(e.data.event, mapa);
        if (startovniBod != null) {
            // Odstraníme starý startovní bod
            vrstva.removeMarker(startovniBod);
        }
        var options = {
            url: obrazek_start,
            title: "Startovní bod",
            anchor: { left: 10, bottom: 1 }  /* Ukotvení značky za bod uprostřed dole */
        };
        startovniBod = new SMap.Marker(startPointCoords, null, options);
        startovniBod.decorate(SMap.Marker.Feature.Draggable);
        vrstva.addMarker(startovniBod);
        if (trasa != null) {
            // Už jsme dřív našli nějakou trasu, tak ji teď přepočítáme pro nový
            // startovní bod.
            var coords = [startPointCoords, endPointCoords];
            var route = new SMap.Route(coords, nalezeno);
        }
    }
}

function start(e) { /* Začátek tažení */
    var node = e.target.getContainer();
    node[SMap.LAYER_MARKER].style.cursor = "default";
}

function stop(e) { /* Konec tažení */
    var node = e.target.getContainer();
    node[SMap.LAYER_MARKER].style.cursor = "pointer";
    var startPointCoords = e.target.getCoords();
    if (trasa != null) {
        var coords = [startPointCoords, endPointCoords];
        var route = new SMap.Route(coords, nalezeno);
    }
}

var signals = mapa.getSignals();
signals.addListener(window, "marker-drag-stop", stop);
signals.addListener(window, "marker-drag-start", start);
signals.addListener(this, "marker-click", handleMarkerClick);
signals.addListener(this, "map-click", handleMapClick);

function loadDoc(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { // DONE and Success
            var jsonResponse = JSON.parse(this.responseText);
            jsonResponse.forEach(function (marker) {
                if (marker.id == id) {
                    document.getElementById("ajax").innerHTML = marker.name + ", popis: " + marker.popis;
                }
            });
        }
    };
    xhttp.open("GET", "txt/data.txt", true);
    xhttp.send();
}
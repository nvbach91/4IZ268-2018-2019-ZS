var m = new SMap(JAK.gel("m"), SMap.Coords.fromWGS84(14.400307, 50.071853));
var textArea = document.getElementById("output");
m.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
m.addDefaultLayer(SMap.DEF_BASE).enable();

/* Ovládání myší */
var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
m.addControl(mouse);

/* Přidání kontrolních prvků */
m.addDefaultControls();
m.addControl(new SMap.Control.Sync);

/* Získání souřadni po kliknutí */
function click(e, elm) {
  var coords = SMap.Coords.fromEvent(e.data.event, m);
  var gpx = coords.toJTSK(2).reverse().join(" ");
  var gpxSplit= gpx.split(" ");
  textArea.append(`<wpt lat="${gpxSplit[0]}" lon="${gpxSplit[1]}"></wpt>`);
}
m.getSignals().addListener(window, "map-click", click); 

/* Funkce stahování obsahu textarea */
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/* Vygenerování souboru po kliknutí na čudl */
document.getElementById("generate").addEventListener("click", function(){
  textArea.append(`</gpx>`);
  var text = textArea.value;
  var filename ="zvolene_body.gpx";
  download(filename, text);
}, false);

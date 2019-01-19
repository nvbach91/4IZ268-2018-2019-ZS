/* Určení proměnných */
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var sendButton = document.getElementById("sendButton");
var gpxText = document.getElementById("gpx");

/* Mapy.cz API - přidání vrsty s GPX body */
Loader.load();
var center = SMap.Coords.fromWGS84(14.400307, 50.071853);
var m = new SMap(JAK.gel("mapycz"), center, 5);
m.addDefaultLayer(SMap.DEF_TURIST).enable();
m.addDefaultControls();

sendButton.addEventListener("click", function load() {
  var value = JAK.gel("gpx").value.trim();
  if (!$('#gpx').val()) {
    // Prázdná textarea
  };
  var xmlDoc = JAK.XML.createDocument(value);

  var gpx = new SMap.Layer.GPX(xmlDoc, null, {
    maxPoints: 500
  }); /* GPX vrstva */
  m.addLayer(gpx); /* GPX vrsta přidaná do mapy */
  gpx.enable(); /* Zapnutí přidané vrstvy */
  gpx.fit(); /* Pozicování mapy */
});

/* Přesunutí na část s mapou po stisknutí tlačítka */
sendButton.addEventListener("click", function () {
    document.getElementById('mapycz').scrollIntoView({block: 'start', behavior: 'smooth'}); 
});

/* Volání na myJSON pro GPX podklady po stisku příslušného tlačítka s trasou */
/* 1. tlačítko */
btn1.addEventListener("click", function() {
  var gpx1 = new XMLHttpRequest();
  gpx1.open("GET", "https://api.myjson.com/bins/b3x14");
  gpx1.onload = function() {
    var gpx1data = JSON.parse(gpx1.responseText);
    addText1(gpx1data);
  };
  gpx1.send();
});

function addText1(text) {
  var gpx1string = text.gpx1;
  gpxText.insertAdjacentText("afterbegin", gpx1string);
};

/* 2. tlačítko */
btn2.addEventListener("click", function() {
  var gpx2 = new XMLHttpRequest();
  gpx2.open(
    "GET",
    "https://api.myjson.com/bins/b3x14"
  );
  gpx2.onload = function() {
    var gpx2data = JSON.parse(gpx2.responseText);
    addText2(gpx2data);
  };
  gpx2.send();
});

function addText2(text) {
  var gpx2string = text.gpx2;
  gpxText.insertAdjacentText("afterbegin", gpx2string);
};

/* 3. tlačítko */
btn3.addEventListener("click", function() {
    var gpx3 = new XMLHttpRequest();
    gpx3.open(
      "GET",
      "https://api.myjson.com/bins/b3x14"
    );
    gpx3.onload = function() {
      var gpx3data = JSON.parse(gpx3.responseText);
      addText3(gpx3data);
    };
    gpx3.send();
  });
  
  function addText3(text) {
    var gpx3string = text.gpx3;
    gpxText.insertAdjacentText("afterbegin", gpx3string);
  };
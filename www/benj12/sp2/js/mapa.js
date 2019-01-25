/* Určení proměnných */
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var sendButton = document.getElementById("sendButton");
var gpxText = document.getElementById("gpx");
var loadingText = document.getElementById('loading-image');

/* Mapy.cz API - přidání vrstev s mapou */
Loader.load();
var center = SMap.Coords.fromWGS84(14.400307, 50.071853);
var m = new SMap(JAK.gel("mapycz"), center, 7);

/* Přidání kontrolních prvků - ovládání pohybu po mapě a změna typu mapy*/
m.addDefaultControls();
m.addControl(new SMap.Control.Sync({bottomSpace: 0}));
m.addDefaultLayer(SMap.DEF_OPHOTO);
m.addDefaultLayer(SMap.DEF_TURIST).enable();
m.addDefaultLayer(SMap.DEF_OPHOTO0203);
m.addDefaultLayer(SMap.DEF_OPHOTO0406);
m.addDefaultLayer(SMap.DEF_TURIST);
m.addDefaultLayer(SMap.DEF_HISTORIC);
m.addDefaultLayer(SMap.DEF_BASE).enable();

/* Změna typu mapy - přepínač vrstev */
var layerSwitch = new SMap.Control.Layer();
layerSwitch.addDefaultLayer(SMap.DEF_BASE);
layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO);
layerSwitch.addDefaultLayer(SMap.DEF_TURIST);
layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO0406);
layerSwitch.addDefaultLayer(SMap.DEF_OPHOTO0203);
layerSwitch.addDefaultLayer(SMap.DEF_HISTORIC);

/* Stringy k obrázkům*/
var part1 = '<img src=';
var part2 = `>`;
var koncovka = " ";

/* Tlačítko + načtení gpx podkladů od uživatele */
sendButton.addEventListener("click", function load() {
  var value = JAK.gel("gpx").value.trim();
  if (!$('#gpx').val()) {
    // Prázdná textarea
  };
  var xmlDoc = JAK.XML.createDocument(value);
  var gpx = new SMap.Layer.GPX(xmlDoc, null, {
    maxPoints: 500
  });
  // Přidání gpx vrstvy a "zapnutí"
  m.addLayer(gpx);
  gpx.enable(); 
  gpx.fit();
  
});

/* Tlačítko pro načtení gpx včetně značek */
sendButton1.addEventListener("click", function load() {
  var value = JAK.gel("gpx").value.trim();
  if (!$('#gpx').val()) {
    // Prázdná textarea
  };
  var xmlDoc = JAK.XML.createDocument(value);
  var gpx = new SMap.Layer.GPX(xmlDoc, null, {
    maxPoints: 500
  });
  // Přidání gpx vrstvy a "zapnutí"
  m.addLayer(gpx);
  gpx.enable(); 
  gpx.fit();
  m.addLayer(markers).enable();  
});

/* Přesunutí na část s mapou po stisknutí tlačítka */
sendButton.addEventListener("click", function () {
    document.getElementById('mapycz').scrollIntoView({block: 'start', behavior: 'smooth'}); 
});
sendButton1.addEventListener("click", function () {
  document.getElementById('mapycz').scrollIntoView({block: 'start', behavior: 'smooth'}); 
});

/* Funkce přidání textu */
function pridaniTextu(){
  document.getElementById('sendButton1').style.display = 'inline';
  document.getElementById('sendButton').style.display = 'none';
  var gpx1 = new XMLHttpRequest();
  gpx1.open("GET", souradnice);
  gpx1.onload = function() {
    var gpx1data = JSON.parse(gpx1.responseText);
    addText1(gpx1data);
  };
  gpx1.send();
}

/* Volání na myJSON pro GPX podklady po stisku příslušného tlačítka s trasou 
 1. trasa: https://api.myjson.com/bins/m82z0
 2. trasa: https://api.myjson.com/bins/16iyp8
 3. trasa: https://api.myjson.com/bins/v7q7g

 1. tlačítko */
btn1.addEventListener("click", function() {
  loadingText.style.display = 'inline';
  document.getElementById('sendButton1').style.display = 'inline';
  document.getElementById('sendButton').style.display = 'none';
  var gpx1 = new XMLHttpRequest();
  gpx1.open("GET", "https://api.myjson.com/bins/b3x14");
  gpx1.onload = function() {
    var gpx1data = JSON.parse(gpx1.responseText);
    addText1(gpx1data);
    loadingText.style.display = 'none';
  };
  gpx1.send();
});

function addText1(text) {
  var gpx1string = text.gpx1;
  gpxText.insertAdjacentText("afterbegin", gpx1string);
};

/* 2. tlačítko */
btn2.addEventListener("click", function() {
  loadingText.style.display = 'inline';
  document.getElementById('sendButton1').style.display = 'none';
  document.getElementById('sendButton').style.display = 'inline';
  var gpx2 = new XMLHttpRequest();
  gpx2.open("GET", "https://api.myjson.com/bins/b3x14");
  gpx2.onload = function() {
    var gpx2data = JSON.parse(gpx2.responseText);
    addText2(gpx2data);
    loadingText.style.display = 'none';
  };
  gpx2.send();
});

function addText2(text) {
  var gpx2string = text.gpx2;
  gpxText.insertAdjacentText("afterbegin", gpx2string);
};

/* 3. tlačítko */
btn3.addEventListener("click", function() {
  loadingText.style.display = 'inline';
  document.getElementById('sendButton1').style.display = 'none';
  document.getElementById('sendButton').style.display = 'inline';
  var gpx3 = new XMLHttpRequest();
  gpx3.open("GET", "https://api.myjson.com/bins/b3x14");
  gpx3.onload = function() {
    var gpx3data = JSON.parse(gpx3.responseText);
    addText3(gpx3data);
    loadingText.style.display = 'none';
  };
  gpx3.send();
});
  
  function addText3(text) {
    var gpx3string = text.gpx3;
    gpxText.insertAdjacentText("afterbegin", gpx3string);
  };
  m.addControl(layerSwitch, {left:"8px", top:"9px"});

/* Zobrazení značek s popiskem a obrázkem */
var markers = new SMap.Layer.Marker();
var marks = [];
var coordinates = [];

/* Určení dat k lokacím */
var data = {
  "Vyšehrad": {
    coord: "50.064455768942985N,14.419538337179006'E", 
    url: SMap.CONFIG.img + "/marker/drop-red.png", 
    descrip: "img/vysehrad.jpg", 
    letter: " "
  },
  "Tančící dům": {
    coord: "50.07541647853822N,14.414169788360596'E", 
    url: SMap.CONFIG.img + "/marker/drop-red.png", 
    descrip: "img/tadum.jpg",  
    letter: " "
  },
  "Národní divadlo": {
    coord: "50.081055024738795N,14.413279150560811'E", 
    url: SMap.CONFIG.img + "/marker/drop-red.png", 
    descrip: "img/nardiv.jpg", 
    letter: " "
  },
  "Národní muzeum": {
    coord: "50.0797041654444N,14.42998753256029'E", 
    url: SMap.CONFIG.img + "/marker/drop-red.png", 
    descrip: "img/muzeum.jpg",
    letter: " "
  },
  "Pražský hrad": {
    coord: "50.09110442275498N,14.4019546379551'E", 
    url: SMap.CONFIG.img + "/marker/drop-red.png", 
    descrip: "img/hrad.jpg", 
    letter: " "
  },
  "Staroměstská radnice": {
    coord: "50.08698786069408N,14.42055656825164'E", 
    url: SMap.CONFIG.img + "/marker/drop-red.png", 
    descrip: "img/orloj.jpg", 
    letter: " "
  },
  "Karlův most": {
    coord: "50.086491307128746N,14.411721807741628'E", 
    url: SMap.CONFIG.img + "/marker/drop-red.png", 
    descrip: "img/most.jpg", 
    letter: " "
  },
  "Malostranské náměstí": {
    coord: "50.08788340898792N,14.403498486328772'E", 
    url: SMap.CONFIG.img + "/marker/drop-red.png", 
    descrip: "img/malonam.jpg", 
    letter: " "
  },
  "Socha Franze Kafky": {
    coord: "50.08165437091309N,14.420778751373291'E", 
    url: SMap.CONFIG.img + "/marker/drop-red.png", 
    descrip: "img/franz.jpg", 
    letter: " "
  },
}

/* Přiřazení dat k jednotlivým bodům */
for (var name in data) { 
  var c = SMap.Coords.fromWGS84(data[name].coord);
  var point = JAK.mel("div");
  var picture = JAK.mel("img", {src: data[name].url});
  point.appendChild(picture);
  
  /* Přiřazení popisku */
  var description = JAK.mel("div", {}, {position:"absolute", left:"20px", top:"2px", textAlign:"center", width:"22px", color:"black", fontWeight:"bold"});
  description.innerHTML = data[name].letter;
  point.appendChild(description); 
  var options = {
    url: point,
    title: name,
  }
  var marker = new SMap.Marker(c, null, options);
  coordinates.push(c);
  var card = new SMap.Card();
  card.getHeader().innerHTML = "<strong>"+name+"</strong>";
  card.getBody().innerHTML = part1 + data[name].descrip + part2;
  marker.decorate(SMap.Marker.Feature.Card, card);
  marks.push(marker);
}

for (var i=0;i<marks.length;i++) {
    markers.addMarker(marks[i]);
};
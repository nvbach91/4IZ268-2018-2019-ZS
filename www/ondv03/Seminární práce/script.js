var isChecked = false;

/*Tady výstup vypíšu do html, udělám funckionalitu i pro vstupy v imperiálních hodnotách
  upravím design buttonů a zkusím to udělat víc user-friendly*/
//Ještě přiložím návod k určení tělesného tuku pomocí obrazných příkladů
//Vložím reference na studie o FFMI
//Doufám, že je v pohodě, když to bude do 4.1.2018, mám toho teď hodně, přes svátky určitě dodělám
function onClickCalculate() {
  var cm = document.getElementById('height').value;
  var bodyfat = document.getElementById('bodyfat').value;
  var leanMass = calculateLeanMass(document.getElementById('weight').value, bodyfat);

  var FFMI = calculateFFMI(leanMass, convertCmToIn(cm));
  alert("Tvůj FFMI je " + FFMI);
}

function calculateFFMI(leanMass, inches) {
  var heightSquaring = Math.pow(inches * 0.0254, 2);
  var FFMI = (leanMass / 2.2) / heightSquaring * 2.20462;
  return FFMI;
}

function calculateLeanMass(weight, bodyfat){
  var leanMass = weight*(1-(bodyfat/100));
  return leanMass;
}

function convertCmToIn(cm) {
  return cm/2.54;
}

function calculareLbsFromKgs(kg){
  return kg * 2.2;
}

function onClickHandler(isChecked) {
  var checkbox = document.getElementById('switch');
  isChecked = checkbox.checked;
  if(isChecked == true){
    document.getElementById('weight').placeholder = 'lbs';
    document.getElementById('height').placeholder = 'ft';
    document.getElementById('height-inches').style.display = "unset";
  } else {
    document.getElementById('weight').placeholder = 'kg';
    document.getElementById('height').placeholder = 'cm';
    document.getElementById('height-inches').style.display = "none";
  }
}

//Responzivní menu
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
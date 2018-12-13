// some globals
let size = [300,300];


// dom
const eSearch = document.getElementById("search");
const eButtonSearch = document.getElementById("searchButton");
const eMemes = document.getElementById("memeBody");

// functions

function search(){


}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            parser(this);
        }
    };
    xhttp.open("GET", "memes.xml", true);
    xhttp.send();
}

function parser(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("meme");
    for (let i = 0; i <x.length; i++) {
        let element = document.createElement("img");
        element.src = x[i].getElementsByTagName("source")[0].childNodes[0].nodeValue;
        eMemes.appendChild(element);
    }

}



loadDoc();









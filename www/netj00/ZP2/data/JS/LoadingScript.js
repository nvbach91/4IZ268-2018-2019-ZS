// some globals


// dom
const eSearch = document.getElementById("search");
const eButtonSearch = document.getElementById("searchButton");
const eMemes = document.getElementById("memeBody");

// functions

eSearch.onclick = search;


function search() {
    eMemes.innerText = ""; // reset
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            parser(this);
        }
    };
    xhttp.open("GET", "memes.xml", true);
    xhttp.send();
}

function loadDoc() {

}

function parser(xml) {
    let xmlDoc = xml.responseXML;
    let x = xmlDoc.getElementsByTagName("meme");
    for (let i = 0; i < x.length; i++) {
        let element = document.createElement("img");
        element.src = x[i].getElementsByTagName("source")[0].childNodes[0].nodeValue;

        let maxWidth = 550; // Max width for the image
        let maxHeight = 400;    // Max height for the image
        let ratio = 0;  // Used for aspect ratio
        let width = x[i].getElementsByTagName("width")[0].childNodes[0].nodeValue;    // Current image width
        let height = x[i].getElementsByTagName("height")[0].childNodes[0].nodeValue;  // Current image height

        if (width > maxWidth) {
            ratio = maxWidth / width;   // get ratio for scaling image
            width = maxWidth;
            height = height * ratio;
        }
        if (height > maxHeight) {
            ratio = maxHeight / height; // get ratio for scaling image
            height = maxHeight;
            width = width * ratio;
        }

        element.width = width;
        element.height = height;
        eMemes.appendChild(element);
    }
}


loadDoc();









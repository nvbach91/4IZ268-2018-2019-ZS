document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 200) {
        $('.scrollToTop').fadeIn();
    } else {
        $('.scrollToTop').fadeOut();
    }

});

$(function () { $("#scrollButton").click(function () { $("html,body").animate({ scrollTop: $("#wrapper").offset().top }, "1000"); return false }) })

function openRestaurant(evt, restaurantName) {
    var i, x, tabnavs;
    x = document.getElementsByClassName("restaurant");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tabnavs = document.getElementsByClassName("tabNav");
    for (i = 0; i < x.length; i++) {
        tabnavs[i].className = tabnavs[i].className.replace("activeTab", "");
    }
    document.getElementById(restaurantName).style.display = "block";
    evt.currentTarget.className += " activeTab";
}


document.getElementById('btn1').onclick = function () { openRestaurant(event, 'res1'); }
document.getElementById('btn2').onclick = function () { openRestaurant(event, 'res2'); }
document.getElementById('btn3').onclick = function () { openRestaurant(event, 'res3'); }


function makeApiCall(action = "read") {

    var ssID = "1gjr8_KlM907EM06O_fOS92Qs9ns3lOwIVDjIXv0tNLc";
    var rng = "List 1";

    if (action === "write") {

        var params = {
            // The ID of the spreadsheet to update.
            spreadsheetId: ssID,  // TODO: Update placeholder value.

            // The A1 notation of a range to search for a logical table of data.
            // Values will be appended after the last row of the table.
            range: rng,  // TODO: Update placeholder value.

            // How the input data should be interpreted.
            valueInputOption: 'RAW',  // TODO: Update placeholder value.

            // How the input data should be inserted.
            insertDataOption: 'INSERT_ROWS',  // TODO: Update placeholder value.
        };

        var nazev = "User";

        var poloha = document.getElementById("poloha").value;
        var patro = document.getElementById("patro").value;


        var valueRangeBody = {
            "values": [
                [
                    1
                ],
                [
                    nazev
                ],
                [
                    poloha
                ],
                [
                    patro
                ]
            ],
            "majorDimension": "COLUMNS"
        };

        var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
        request.then(function (response) {
            // TODO: Change code below to process the `response` object:
            console.log(response.result);
        }, function (reason) {
            console.error('error: ' + reason.result.error.message);
        });

    } else {

        var params = {
            // The ID of the spreadsheet to retrieve data from.
            spreadsheetId: ssID,  // TODO: Update placeholder value.

            // The A1 notation of the values to retrieve.
            range: rng,  // TODO: Update placeholder value.

            // How values should be represented in the output.
            // The default render option is ValueRenderOption.FORMATTED_VALUE.
            // valueRenderOption: '',  // TODO: Update placeholder value.

            // How dates, times, and durations should be represented in the output.
            // This is ignored if value_render_option is
            // FORMATTED_VALUE.
            // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
            // dateTimeRenderOption: '',  // TODO: Update placeholder value.
        };

        var request = gapi.client.sheets.spreadsheets.values.get(params);
        request.then(function (response) {
            // TODO: Change code below to process the `response` object:
            console.log(response.result);
            downloadData(response.result);
        }, function (reason) {
            console.error('error: ' + reason.result.error.message);
        });
    }

}

function initClient() {
    var API_KEY = 'AIzaSyAAQ6D3_bh2NZnrhzeLzP0ItURcjsAe13k';  // TODO: Update placeholder with desired API key.

    var CLIENT_ID = '572059939133-5a7euvaedfvu0fi82gt918dn0apjrj57.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.

    // TODO: Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/drive.readonly'
    //  'https://www.googleapis.com/auth/spreadsheets'
    //  'https://www.googleapis.com/auth/spreadsheets.readonly'
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCall();
        $("#signin-button").css({'background-color': '#e7e7e74f', 'color': 'grey'});
        $("#signout-button").css({'background-color': '#e7e7e7;', 'color': 'black'});
    } else {
        $("#signin-button").css({'background-color': '#e7e7e7;', 'color': 'black'});
        $("#signout-button").css({'background-color': '#e7e7e74f', 'color': 'grey'});
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function downloadData(result) {
    for (var row = 0; row < result.values.length; row++) {
        var x = document.createElement("IMG");
        x.setAttribute("src", "img/location.png");
        for (var col = 0; col < 4; col++) {
            if (col = 2) {
                var res = result.values[row][col].split(",");
                var style = "top: " + res[0] + "%; left: " + res[1] + "%;";
                var classa = result.values[row][col+1] + "floor" + " pin";
                x.setAttribute("style", style);
                x.setAttribute("class", classa);
                console.log(style);
                break;
            }
        }

        document.getElementById("floor1mapa").appendChild(x);
    }
    floorView(1);
}

function refresh() {
    document.getElementById("floor1mapa").innerHTML = "";
    makeApiCall();
}

document.getElementById("floor1mapa").addEventListener("click", getClickPosition, false);

function getClickPosition(e) {
    var xPosition = e.pageX - $('#floor1mapa').offset().left;
    var yPosition = e.pageY - $('#floor1mapa').offset().top;
    document.getElementById("poloha").value = (Math.round((yPosition / document.getElementById('floor1mapa').offsetHeight) * 100)-6) + "," + (Math.round((xPosition / document.getElementById('floor1mapa').offsetWidth) * 100)-2);
    if (document.getElementById("temporary")) {
        document.getElementById("temporary").parentNode.removeChild(document.getElementById("temporary"));
    }
        var x = document.createElement("IMG");
        x.setAttribute("src", "img/location_temporary.png");
        x.setAttribute("class", "pin");
        x.setAttribute("id", "temporary");
        x.setAttribute("style", "top: " + (Math.round((yPosition / document.getElementById('floor1mapa').offsetHeight) * 100)- 6) + "%; left: " + (Math.round((xPosition / document.getElementById('floor1mapa').offsetWidth) * 100 - 2) + "%;"));
        document.getElementById("floor1mapa").appendChild(x);

 

   
}


document.getElementById('signin-button').onclick = function () {handleSignInClick(); }
document.getElementById('signout-button').onclick = function () {handleSignOutClick(); }

document.getElementById('bbutton').onclick = function () {submit();}


function submit() {
    var tester = document.getElementById('poloha').value.split(",");
    if (tester[0] > 0 && tester[0] < 100 && tester[1] > 0 && tester[1] < 100) {
        makeApiCall(action = 'write'); 
        refresh(); 
        document.getElementById("informative").innerHTML = "Succesfully added!";
    } else {
        alert("Enter valid coordinates!");
    }
    
}


document.getElementById('1floorButton').onclick = function () {floorView(1); }
document.getElementById('2floorButton').onclick = function () {floorView(2); }
document.getElementById('3floorButton').onclick = function () {floorView(3); }


var activeFloor = 1;
function floorView (number) {
var pins = document.getElementsByClassName("pin");
    for (var t = 0; t < pins.length; t++) {
        pins[t].style.display = "none";
    }
    console.log(number + "floor");
    var pins2 = document.getElementsByClassName(number + "floor");
    for (var t = 0; t < pins2.length; t++) {
        pins2[t].style.display = "block";
    }

    fbutton = document.getElementsByClassName("floorButton");
    for (i = 0; i < fbutton.length; i++) {
        fbutton[i].className = fbutton[i].className.replace("activeTab", "");
    }
    console.log(number + "floorButton");
    document.getElementById(number + "floorButton").className += " activeTab";
    activeFloor = number;
    document.getElementById("patro").selectedIndex = activeFloor - 1;
    console.log(document.getElementById("patro").value);
}

document.getElementById("event_size_1").onclick = function() {get_price_if_possible()};
document.getElementById("event_size_2").onclick = function() {get_price_if_possible()};
document.getElementById("event_size_3").onclick = function() {get_price_if_possible()};

document.getElementById("event_stream").onclick = function() {get_price_if_possible()};
document.getElementById("event_projekce").onclick = function() {get_price_if_possible()};
document.getElementById("event_zaznam").onclick = function() {get_price_if_possible()};
document.getElementById("event_klip").onclick = function() {get_price_if_possible()};

document.getElementById("event_name").onkeyup = function() {check_event_name(true);get_price_if_possible();};
document.getElementById("event_address").onkeyup = function() {check_event_address(true);get_price_if_possible();};
document.getElementById("organizer_contact").onkeyup = function() {check_event_contact(true);get_price_if_possible();};
document.getElementById("event_start").oninput = function() {check_event_start(true);get_price_if_possible();};
document.getElementById("event_end").oninput = function() {check_event_end(true);get_price_if_possible();};

document.addEventListener('DOMContentLoaded', function() {guid()}, false);

function check_all_fields() {
    var inputs_ok = true;
    if(!check_event_name()){inputs_ok = false;}
    if(!check_event_address()){inputs_ok = false;}
    if(!check_event_contact()){inputs_ok = false;}
    if(!check_event_start()){inputs_ok = false;}
    if(!check_event_end()){inputs_ok = false;}
    if(!(get_event_stream() || get_event_projekce() || get_event_zaznam() || get_event_klip() )){inputs_ok = false;}
    return inputs_ok;
}

function check_event_name(mark) {
    if(document.getElementById("event_name").value == "") {
        if(mark){document.getElementById("event_name").className = "empty"};
        return false;
    } else {
        document.getElementById("event_name").className = "";
        return true;
    }
}

function check_event_address(mark) {
    if(document.getElementById("event_address").value == "") {
        if(mark){document.getElementById("event_address").className = "empty"};
        return false;
    } else {
        document.getElementById("event_address").className = "";
        return true;
    }
}

function check_event_contact(mark) {
    if(document.getElementById("organizer_contact").value == "") {
        if(mark){document.getElementById("organizer_contact").className = "empty"};
        return false;
    } else {
        document.getElementById("organizer_contact").className = "";
        return true;
    }
}

function check_event_start(mark) {
    if(document.getElementById("event_start").value == "") {
        if(mark){document.getElementById("event_start").className = "empty"};
        return false;
    } else {
        document.getElementById("event_start").className = "";
        formatDate(new Date(document.getElementById("event_start").value));
        return true;
    }
}

function check_event_end(mark) {
    if(document.getElementById("event_end").value == "") {
        if(mark){document.getElementById("event_end").className = "empty"};
        return false;
    } else {
        document.getElementById("event_end").className = "";
        return true;
    }
}

function get_duration(){
    if(document.getElementById("event_start").value != "" && document.getElementById("event_end").value != ""){
        startDate = new Date(document.getElementById("event_start").value);
        endDate = new Date(document.getElementById("event_end").value);
        resultHours = (endDate - startDate) / 1000 / 3600;
        return resultHours;
    }
}

function count_paid_hours(hours){
    if(hours <= 0){
        return 0;
    } else if(hours > 0 && hours <= 2){
        return 2;
    } else if(hours > 2 && hours <= 4){
        return 4
    } else if(hours > 4 && hours <= 6){
        return 6
    } else if(hours > 6 && hours <= 8){
        return 8;
    } else {
        return 8 + count_paid_hours(hours - 24);
    }
}

function get_event_size(){
    if (document.getElementById('event_size_1').checked){
        return 1;
    } else if (document.getElementById('event_size_2').checked){
        return 2;
    } else if (document.getElementById('event_size_3').checked){
        return 3;
    }
}

function get_event_stream(){
    if (document.getElementById('event_stream').checked){
        return true;
    } else {
        return false;
    }
}

function get_event_projekce(){
    if (document.getElementById('event_projekce').checked){
        return true;
    } else {
        return false;
    }
}

function get_event_zaznam(){
    if (document.getElementById('event_zaznam').checked){
        return true;
    } else {
        return false;
    }
}

function get_event_klip(){
    if (document.getElementById('event_klip').checked){
        return true;
    } else {
        return false;
    }
}

function get_price_if_possible(){
    if(check_event_name(false) && check_event_address(false) && check_event_contact(false) && check_event_start(false) && check_event_end(false) && (get_event_stream() || get_event_projekce() || get_event_zaznam() || get_event_klip())){
        get_price();
    }
}

function get_price(){
    if(!check_all_fields()){
        return;
    }
    
    $name = document.getElementById("event_name").value;
    $organizer = document.getElementById("organizer_contact").value;
    $address = document.getElementById("event_address").value;
    $start = new Date(document.getElementById("event_start").value);
    $end = new Date(document.getElementById("event_end").value);
    $paid_hours = count_paid_hours(get_duration());
    $size = get_event_size();
    $stream = get_event_stream();
    $projekce = get_event_projekce();
    $zaznam = get_event_zaznam();
    $klip = get_event_klip();
    $id = document.getElementById("hidden_id").className;


    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result_price").innerHTML = "Celkem: " + this.responseText;
        }
    };
    xmlhttp.open("GET","database/getData.php?id="+$id+"&name="+$name+"&address="+$address+"&organizer="+$organizer+"&start="+formatDate($start)+"&end="+formatDate($end)+"&duration="+ $paid_hours +"&size="+$size + "&stream="+$stream + "&projekce="+$projekce + "&zaznam="+$zaznam + "&klip="+$klip, true);
    xmlhttp.send();
}

function formatDate($toFormat){
    var dd = $toFormat.getDate();
    var mm = $toFormat.getMonth()+1; 
    var yyyy = $toFormat.getFullYear();
    var hh = $toFormat.getHours();
    var mn = $toFormat.getMinutes();
    if(dd<10){dd='0'+dd;} 
    if(mm<10){mm='0'+mm;} 
    if(hh<10){hh='0'+hh;} 
    if(mn<10){mn='0'+mn;} 
    return yyyy+'-'+mm+'-'+dd+' '+hh+':'+mn+':'+'00';
}

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    document.getElementById('hidden_id').className = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
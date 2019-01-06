var element_event_name = document.getElementById("event_name");
var element_event_address = document.getElementById("event_address");
var element_organizer_contact = document.getElementById("organizer_contact");
var element_event_start = document.getElementById("event_start");
var element_event_end = document.getElementById("event_end");
var element_event_size_1 = document.getElementById('event_size_1');
var element_event_size_2 = document.getElementById('event_size_2');
var element_event_size_3 = document.getElementById('event_size_3');
var element_event_stream = document.getElementById('event_stream');
var element_event_projection = document.getElementById('event_projection');
var element_event_recording = document.getElementById('event_recording');
var element_event_clip = document.getElementById('event_clip');
var element_event_hidden_id = document.getElementById("hidden_id");

var element_event_name_error = document.getElementById("event_name_error");
var element_event_address_error = document.getElementById("event_address_error");
var element_organizer_contact_error = document.getElementById("organizer_contact_error");
var element_event_start_error = document.getElementById("event_start_error");
var element_event_end_error = document.getElementById("event_end_error");
var element_result_price = document.getElementById("result_price");

var phone_regex = /\+[0-9]{3}\ [0-9]{3} [0-9]{3} [0-9]{3}/;


element_event_size_1.onclick = function() {get_price_if_possible()};
element_event_size_2.onclick = function() {get_price_if_possible()};
element_event_size_3.onclick = function() {get_price_if_possible()};

element_event_stream.onclick = function() {get_price_if_possible()};
element_event_projection.onclick = function() {get_price_if_possible()};
element_event_recording.onclick = function() {get_price_if_possible()};
element_event_clip.onclick = function() {get_price_if_possible()};

element_event_name.addEventListener('focusout', function() {check_event_name(true);get_price_if_possible();}, false);
element_event_address.addEventListener('focusout', function() {check_event_address(true);get_price_if_possible();}, false);
element_organizer_contact.addEventListener('focusout', function() {check_event_contact(true);get_price_if_possible();}, false);
element_event_start.addEventListener('focusout', function() {check_event_start(true);get_price_if_possible();}, false);
element_event_end.addEventListener('focusout', function() {check_event_end(true);get_price_if_possible();}, false);

document.addEventListener('DOMContentLoaded', function() {guid()}, false);


function check_event_name(mark) {
    if(element_event_name.value.length < 5) {
        if(mark){
            element_event_name.className = "empty";
            element_event_name_error.innerHTML = "Jméno akce musí mít alespoň 5 znaků.";
        }
        return false;
    } else {
        element_event_name.className = "";
        element_event_name_error.innerHTML = "&nbsp;";
        return true;
    }
}

function check_event_address(mark) {
    if(element_event_address.value.length < 5) {
        if(mark){
            element_event_address.className = "empty";
            element_event_address_error.innerHTML = "Zadejte adresu, která má alespoň 5 znaků.";
        }
        return false;
    } else {
        element_event_address.className = "";
        element_event_address_error.innerHTML = "&nbsp;";
        return true;
    }
}

function check_event_contact(mark) {
    if(element_organizer_contact.value === "" || !phone_regex.test(element_organizer_contact.value)) {
        if(mark){
            element_organizer_contact.className = "empty";
            element_organizer_contact_error.innerHTML = "Zadejte telefon ve formátu +420 777 777 777";
        }
        return false;
    } else {
        element_organizer_contact.className = "";
        element_organizer_contact_error.innerHTML = "&nbsp;";
        return true;
    }
}

function check_event_start(mark) {
    if(element_event_start.value === "") {
        if(mark){
            element_event_start.className = "empty";
            element_event_start_error.innerHTML = "Vyplňte začátek akce.";
        }
        return false;
    } else {
        element_event_start.className = "";
        element_event_start_error.innerHTML = "&nbsp;";
        return true;
    }
}

function check_event_end(mark) {
    if(element_event_end.value === "") {
        if(mark){
            element_event_end.className = "empty";
            element_event_end_error.innerHTML = "Vyplňte konec akce.";
        }
        return false;
    } else {
        element_event_end.className = "";
        element_event_end_error.innerHTML = "&nbsp;";
        return true;
    }
}

function get_duration(){
    if(element_event_start.value !== "" && element_event_end.value !== ""){
        startDate = new Date(element_event_start.value);
        endDate = new Date(element_event_end.value);
        resultHours = (endDate - startDate) / 1000 / 3600;
        return resultHours;
    }
}

function check_event_time_validity(){
    var inputs_valid = true;
    if(!check_event_start(true)){inputs_valid = false;}
    if(!check_event_end(true)){inputs_valid = false;}
    if(!inputs_valid){return false;}

    if(get_duration() <= 0){
        element_event_end_error.innerHTML = "Akce musí trvat alespoň jednu hodinu.";
        return false;
    } else {
        element_event_end_error.innerHTML = "&nbsp;";
    }
    return true;
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
    if (element_event_size_1.checked){
        return 1;
    } else if (element_event_size_2.checked){
        return 2;
    } else if (element_event_size_3.checked){
        return 3;
    }
}

function get_event_stream(){
    if (element_event_stream.checked){
        return true;
    } else {
        return false;
    }
}

function get_event_projection(){
    if (element_event_projection.checked){
        return true;
    } else {
        return false;
    }
}

function get_event_recording(){
    if (element_event_recording.checked){
        return true;
    } else {
        return false;
    }
}

function get_event_clip(){
    if (element_event_clip.checked){
        return true;
    } else {
        return false;
    }
}

function check_all_fields() {
    var inputs_ok = true;
    if(!check_event_name()){inputs_ok = false;}
    if(!check_event_address()){inputs_ok = false;}
    if(!check_event_contact()){inputs_ok = false;}
    if(!check_event_time_validity()){inputs_ok = false;}
    if(!(get_event_stream() || get_event_projection() || get_event_recording() || get_event_clip() )){inputs_ok = false;}
    if(!inputs_ok){element_result_price.innerHTML = "Celkem: 0 Kč";}
    return inputs_ok;
}

function get_price_if_possible(){
    if(check_event_name(false) && check_event_address(false) && check_event_contact(false) && check_event_start(false) && check_event_end(false) && (get_event_stream() || get_event_projection() || get_event_recording() || get_event_clip())){
        get_price();
    }
}

function format_date(toFormat){
    var dd = toFormat.getDate();
    var mm = toFormat.getMonth()+1; 
    var yyyy = toFormat.getFullYear();
    var hh = toFormat.getHours();
    var mn = toFormat.getMinutes();
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
    element_event_hidden_id.className = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function get_price(){
    if(!check_all_fields()){
        return;
    }
    
    var name = element_event_name.value;
    var organizer = element_organizer_contact.value;
    var address = element_event_address.value;
    var start = new Date(element_event_start.value);
    var end = new Date(element_event_end.value);
    var paid_hours = count_paid_hours(get_duration());
    var size = get_event_size();
    var stream = get_event_stream();
    var projection = get_event_projection();
    var recording = get_event_recording();
    var clip = get_event_clip();
    var id = element_event_hidden_id.className;


    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            element_result_price.innerHTML = "Celkem: " + this.responseText;
        }
    };
    xmlhttp.open("GET","database/getData.php?id="+id+"&name="+name+"&address="+address+"&organizer="+organizer+"&start="+format_date(start)+"&end="+format_date(end)+"&duration="+ paid_hours +"&size="+size + "&stream="+stream + "&projection="+projection + "&recording="+recording + "&clip="+clip, true);
    xmlhttp.send();
}
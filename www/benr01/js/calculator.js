var element_event_name = document.getElementById("event_name");
var element_event_address = document.getElementById("event_address");
var element_organizer_contact = document.getElementById("organizer_contact");
var element_organizer_email = document.getElementById("organizer_email");
var element_event_start = document.getElementById("event_start");
var element_event_end = document.getElementById("event_end");
var element_event_size_1 = document.getElementById('event_size_1');
var element_event_size_2 = document.getElementById('event_size_2');
var element_event_size_3 = document.getElementById('event_size_3');
var element_event_stream = document.getElementById('event_stream');
var element_event_projection = document.getElementById('event_projection');
var element_event_recording = document.getElementById('event_recording');
var element_event_clip = document.getElementById('event_clip');
var element_calculator_select = document.getElementById("calculator_select");
var element_event_hidden_id = document.getElementById("hidden_id");

var element_event_name_error = document.getElementById("event_name_error");
var element_event_address_error = document.getElementById("event_address_error");
var element_organizer_contact_error = document.getElementById("organizer_contact_error");
var element_organizer_email_error = document.getElementById("organizer_email_error");
var element_event_start_error = document.getElementById("event_start_error");
var element_event_end_error = document.getElementById("event_end_error");
var element_result_price = document.getElementById("result_price");

var phone_regex = /\+[0-9]{3}\ [0-9]{3} [0-9]{3} [0-9]{3}/;
var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


element_event_size_1.onclick = function() {
    get_price_if_possible()
};
element_event_size_2.onclick = function() {
    get_price_if_possible()
};
element_event_size_3.onclick = function() {
    get_price_if_possible()
};

element_event_stream.onclick = function() {
    get_price_if_possible()
};
element_event_projection.onclick = function() {
    get_price_if_possible()
};
element_event_recording.onclick = function() {
    get_price_if_possible()
};
element_event_clip.onclick = function() {
    get_price_if_possible()
};

element_event_name.addEventListener('focusout', function() {
    check_event_name(true);
    get_price_if_possible();
}, false);
element_event_address.addEventListener('focusout', function() {
    check_event_address(true);
    get_price_if_possible();
}, false);
element_organizer_contact.addEventListener('focusout', function() {
    check_event_contact(true);
    get_price_if_possible();
}, false);
element_organizer_email.addEventListener('focusout', function() {
    check_event_email(true);
    get_price_if_possible();
}, false);
element_event_start.addEventListener('focusout', function() {
    check_event_start(true);
    get_price_if_possible();
}, false);
element_event_end.addEventListener('focusout', function() {
    check_event_end(true);
    get_price_if_possible();
}, false);

document.addEventListener('DOMContentLoaded', function() {
    guid();
}, false);

document.getElementById("save_calculation").onclick = function() {
    saveCalculation();
    fillDropDownMenu();
    element_calculator_select.selectedIndex = JSON.parse(localStorage.getItem("calculations")).length - 1;
};

document.getElementById("calculator_select").onblur = function() {
    if(localStorage.length === 1){

    }
};

document.getElementById("calculator_select").onchange = function() {
    fillFromLocalStorage(element_calculator_select.value);
};

document.getElementById("send_email").onclick = function() {
    sendEmail();
};

emailjs.init("user_Nln38EShZsyjVgbBsbZmi");

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = decodeURIComponent(value);
    });
    return vars;
}

function getUrlParam(parameter) {
    var urlparameter = "";
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

function fillIfPossible() {
    var event = {
        event_name: getUrlParam('event_name'),
        event_address: getUrlParam('event_address'),
        event_contact: getUrlParam('event_contact'),
        event_email: getUrlParam('event_email'),
        event_start: moment(getUrlParam('event_start')).format('D.M.YYYY HH:mm'),
        event_end: moment(getUrlParam('event_end')).format('D.M.YYYY HH:mm'),
        event_size: getUrlParam('event_size'),
        event_stream: parseInt(getUrlParam('event_stream')) === 1,
        event_projection: parseInt(getUrlParam('event_projection')) === 1,
        event_recording: parseInt(getUrlParam('event_recording')) === 1,
        event_clip: parseInt(getUrlParam('event_clip')) === 1,
        hidden_id:  getUrlParam('id')
    };
    fillValues(event);
}

function fillValues(event) {
    element_event_name.value = event.event_name;
    element_event_address.value = event.event_address;
    element_organizer_contact.value = event.event_contact;
    element_organizer_email.value = event.event_email;
    element_event_start.value = event.event_start;
    element_event_end.value = event.event_end;

    var event_size = event.event_size;
    if (event_size === 1) {
        element_event_size_1.checked = "checked";
    } else if (event_size === 2) {
        element_event_size_2.checked = "checked";
    } else if (event_size === 3) {
        element_event_size_3.checked = "checked";
    }

    element_event_stream.checked = event.event_stream;
    element_event_projection.checked = event.event_projection;
    element_event_recording.checked = event.event_recording;
    element_event_clip.checked = event.event_clip;

    element_event_hidden_id.className = event.hidden_id;
    get_price_if_possible();
}

function fillFromLocalStorage(index) {
    var stored_object = JSON.parse(localStorage.getItem("calculations"));
    fillValues(stored_object[index]);
}

fillIfPossible();
fillDropDownMenu();

function check_event_name(mark) {
    if (element_event_name.value.length < 5) {
        if (mark) {
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
    if (element_event_address.value.length < 5) {
        if (mark) {
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
    if (element_organizer_contact.value === "" || !phone_regex.test(element_organizer_contact.value)) {
        if (mark) {
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

function check_event_email(mark) {
    if (element_organizer_email.value === "" || !email_regex.test(element_organizer_email.value)) {
        if (mark) {
            element_organizer_email.className = "empty";
            element_organizer_email_error.innerHTML = "Zadejte email ve formátu jmeno@adresa.com";
        }
        return false;
    } else {
        element_organizer_email.className = "";
        element_organizer_email_error.innerHTML = "&nbsp;";
        return true;
    }
}

function check_event_start(mark) {
    if (element_event_start.value === "") {
        if (mark) {
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
    if (element_event_end.value === "") {
        if (mark) {
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

function get_duration() {
    if (element_event_start.value !== "" && element_event_end.value !== "") {
        startDate = moment(element_event_start.value, 'DD.MM.YYYY HH:mm');
        endDate = moment(element_event_end.value, 'DD.MM.YYYY HH:mm');
        resultHours = (moment.duration(endDate.diff(startDate))).asHours();
        return resultHours;
    }
}

function check_event_time_validity() {
    var inputs_valid = true;
    if (!check_event_start(true)) { inputs_valid = false; }
    if (!check_event_end(true)) { inputs_valid = false; }
    if (!inputs_valid) { return false; }

    if (get_duration() < 1) {
        element_event_end_error.innerHTML = "Akce musí trvat alespoň jednu hodinu.";
        return false;
    } else {
        element_event_end_error.innerHTML = "&nbsp;";
    }
    return true;
}

function count_paid_hours(hours) {
    if (hours <= 0) {
        return 0;
    } else if (hours > 0 && hours <= 2) {
        return 2;
    } else if (hours > 2 && hours <= 4) {
        return 4
    } else if (hours > 4 && hours <= 6) {
        return 6
    } else if (hours > 6 && hours <= 8) {
        return 8;
    } else {
        return 8 + count_paid_hours(hours - 24);
    }
}

function get_event_size() {
    if (element_event_size_1.checked) {
        return 1;
    } else if (element_event_size_2.checked) {
        return 2;
    } else if (element_event_size_3.checked) {
        return 3;
    }
}

function get_event_stream() {
    return element_event_stream.checked;
}

function get_event_projection() {
    return element_event_projection.checked;
}

function get_event_recording() {
    return element_event_recording.checked;
}

function get_event_clip() {
    return element_event_clip.checked;
}

function check_all_fields() {
    var inputs_ok = true;

    if (!check_event_name()) {
        inputs_ok = false;
    } else if (!check_event_address()) {
        inputs_ok = false;
    } else if (!check_event_contact()) {
        inputs_ok = false;
    } else if (!check_event_email()) {
        inputs_ok = false;
    } else if (!check_event_time_validity()) {
        inputs_ok = false;
    } else if (!(get_event_stream() || get_event_projection() || get_event_recording() || get_event_clip())) {
        inputs_ok = false;
    }

    if (!inputs_ok) {
        element_result_price.innerHTML = "Celkem: 0 Kč";
    }
    return inputs_ok;
}

function get_price_if_possible() {
    if (check_all_fields()) {
        get_price();
    }
}

function saveCalculation() {
    var calculation = {
        event_name: element_event_name.value,
        event_address: element_event_address.value,
        event_contact: element_organizer_contact.value,
        event_email: element_organizer_email.value,
        event_start: element_event_start.value,
        event_end: element_event_end.value,
        event_size: get_event_size(),
        event_stream: element_event_stream.checked,
        event_projection: element_event_projection.checked,
        event_recording: element_event_recording.checked,
        event_clip: element_event_clip.checked,
        timestamp: moment().format("D.M.YYYY HH:mm:ss"),
        hidden_id: element_event_hidden_id.className
    };

    var calculations;
    if(localStorage.getItem("calculations") === null){
        calculations = [calculation];
    } else {
        calculations = JSON.parse(localStorage.getItem("calculations"));
        calculations.push(calculation);
    }
    
    var calculations_serialized = JSON.stringify(calculations);
    localStorage.setItem("calculations", calculations_serialized);
}

function fillDropDownMenu(){
    if(localStorage.length === 0){
        var option = document.createElement("option");
        option.selected = true;
        option.disabled = true;
        option.text = "Není uložena žádná kalkulace";
        option.id = "no_calculation_option";
        element_calculator_select.add(option);
        return;
    }
    if(localStorage.length > 0 && document.getElementById("no_calculation_option") !== null){
        var to_remove = document.getElementById("no_calculation_option");
        to_remove.remove(to_remove.selectedIndex);
    }

    var stored_calculations = JSON.parse(localStorage.getItem("calculations"));
    element_calculator_select.length = 0;
    for (var i = 0; i < stored_calculations.length; i++) { 
        var option = document.createElement("option");
        option.text = stored_calculations[i].timestamp;
        option.value = i;
        element_calculator_select.add(option);
    }
}

function sendEmail() {
    if (!check_all_fields()) {
        alert("Vyplňte prosím všechna pole.");
        return;
    }

    var event_size_text;
    if (get_event_size() === 1) {
        event_size_text = "méně než 20";
    } else if (get_event_size() === 2) {
        event_size_text = "21 - 500";
    } else if (get_event_size() === 3) {
        event_size_text = "více než 500";
    }

    var event_services_text = "";
    if (get_event_stream()) {
        event_services_text = "streaming";
    }
    if (get_event_projection()) {
        if (event_services_text != "") {
            event_services_text += ", ";
        }
        event_services_text += "projekci";
    }
    if (get_event_recording()) {
        if (event_services_text != "") {
            event_services_text += ", ";
        }
        event_services_text += "záznam";
    }
    if (get_event_clip()) {
        if (event_services_text != "") {
            event_services_text += ", ";
        }
        event_services_text += "klip";
    }

    var templateParams = {
        send_to: element_organizer_email.value,
        event_name: element_event_name.value,
        event_address: element_event_address.value,
        event_start: element_event_start.value,
        event_end: element_event_end.value,
        event_size: event_size_text,
        event_services: event_services_text,
        event_price: element_result_price.innerHTML.replace("Celkem: ", "")
    };

    emailjs.send('gmail', 'template_QPHzI7C8', templateParams)
        .then(function (response) {
            alert("Email byl úspěšně odeslán");
        }, function (error) {
            alert("Odeslání emailu se nezdařilo");
        });
}

function format_date(toFormat) {
    return toFormat.format('YYYY-MM-DD HH:mm:00');
}

function guid() {
    if (element_event_hidden_id.className !== "") {
        return;
    }
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    element_event_hidden_id.className = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function get_price() {
    if (!check_all_fields()) {
        return;
    }

    var name = element_event_name.value;
    var organizer = element_organizer_contact.value;
    var email = element_organizer_email.value;
    var address = element_event_address.value;
    var start = moment(element_event_start.value, 'DD.MM.YYYY HH:mm');
    var end = moment(element_event_end.value, 'DD.MM.YYYY HH:mm');
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
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            element_result_price.innerHTML = "Celkem: " + this.responseText;
        }
    };
    xmlhttp.open("GET", "database/getData.php?id=" + id +
        "&name=" + encodeURIComponent(name) +
        "&address=" + encodeURIComponent(address) +
        "&organizer=" + encodeURIComponent(organizer) +
        "&email=" + email +
        "&start=" + format_date(start) +
        "&end=" + format_date(end) +
        "&duration=" + paid_hours +
        "&size=" + size +
        "&stream=" + stream +
        "&projection=" + projection +
        "&recording=" + recording +
        "&clip=" + clip,
        true);
    xmlhttp.send();
}
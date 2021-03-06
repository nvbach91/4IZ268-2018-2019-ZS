var App = App || {};
var clientId = '159400812472-svbnv18ivjumkpbov5d1mvh514adcm0a.apps.googleusercontent.com';
var apiKey = 'AIzaSyApKYbEj_Ilug7V6XryKwPex37bVTzZdRY';
var scopes =
    'https://www.googleapis.com/auth/gmail.readonly '+
    'https://www.googleapis.com/auth/gmail.send';

var itemID = 2;
var item = $(".items").html();
var text ="";

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
    }, handleAuthResult);
}

function handleAuthResult(authResult) {
    if(authResult && !authResult.error) {
        loadGmailApi();
    } else {
        console.info("gApi was not loaded!!!");
    }
}

function handleAuthClick() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
    }, handleAuthResult);
    return false;
}

function orderText(){
    $(".item").each(function (index) {
        text += "Model: " + $(this).children("select[name='model']").val() + "\n" +
            "Velikost: " + $(this).children("select[name='size']").val() +"\n"+
            "Počet: " +$(this).children("select[name='count']").val() + "\n";
    });
    return text;
}

function loadGmailApi() {
    gapi.client.load('gmail', 'v1', displayInbox);
}

function displayInbox() {
    console.info("gmail api loaded")
}

App.init = function(){
    $("#sendButton").click(function () {
        var headers = {
            'To': 'vyvojar.pat@gmail.com',
            'Subject': 'Pokusnej subject'
        };

        var textOrder = orderText();

        var message = "Jméno klienta: " + $("#client-name").val() + "\n" + "Email klienta: " + $("#client-email").val() + "\n" + "Zprava: " + $("#emailBody").val() + "\n Objednávka: " + textOrder;

        function sendMessageCallback() {
            console.info("Email sent!");
            alert("Váš email byl odeslán");
        }

        App.sendMessage(headers, message, sendMessageCallback);
    });
};

App.sendMessage = function(headers_obj, message, callback) {
    var email = '';
    for(var header in headers_obj)
        email += header += ": "+headers_obj[header]+"\r\n";
    email += "\r\n" + message;
    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': window.btoa(unescape(encodeURIComponent(email))).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });
    return sendRequest.execute(callback);
}

App.gInit = function() {
    function start() {
        // 2. Initialize the JavaScript client library.
        gapi.client.init({
            'apiKey': 'AIzaSyApKYbEj_Ilug7V6XryKwPex37bVTzZdRY',
            // Your API key will be automatically added to the Discovery Document URLs.
            'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
            // clientId and scope are optional if auth is not required.
            'clientId': '159400812472-svbnv18ivjumkpbov5d1mvh514adcm0a.apps.googleusercontent.com',
            'scope': 'profile',
        }).then(function() {
            function sendCallback() {
                console.info('sent');
            }
            // 3. Initialize and make the API request.
            return gapi.client.gmail.users.message.send({
                'userId': 'me',
                'resource': {
                    'raw': window.btoa("Ahoj svete!")
                }
            }).execute(sendCallback());
        }).then(function(response) {
            console.log(response.result);
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    };

// 1. Load the JavaScript client library.
    gapi.load('client', start);
}

$(document).ready(function () {
    App.init();

    $("#buttonAdd").click(function(){
        $(".items").append(item);
        $(".item").last().attr("id", itemID);
        itemID++;
    });

    $("#buttonDelete").click(function () {
        $(".item").last().remove();
    });

});


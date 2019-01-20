$(document).ready(function() {

    /**
     * UI and Rendering Functions
     */

    var selfUser = []; // signedin user details
    var otherUsers = []; // other users' details
    var messages = []; // messages involving the signedin user
    var currentOtherUserIndex = 0;

    /*
     selfUser = [{"userID":1,"username":"user1","password":"secret","socketID":null,"last_login_date":null}];
     otherUsers = [{"userID":2,"username":"user2","password":"secret","socketID":null,"last_login_date":null}];
     messages = [{"messagesID":1,"from":1,"to":2,"content":"hello from 1 to 2","delivery_status":"delivered","date":"1:27:06 PM"}];
     */

    function renderUserSlab() {
        var onlineStatus = 'offline';
        if (otherUsers[currentOtherUserIndex].socketID != null) {
            onlineStatus = 'online';
        }
        var username = otherUsers[currentOtherUserIndex].username;
        var userSlab = '';
        userSlab = userSlab + '<div class="userSlab">';
        userSlab = userSlab + '        <div class="username">' + username + '</div>';
        userSlab = userSlab + '        <div class="onlineStatus ' + onlineStatus + '">' + onlineStatus + '</div>';
        userSlab = userSlab + '</div>';
        $('#chatbox .userSlabWrapper').html(userSlab);
    }

    function renderConversation() {
        var userSpeakType = '';
        var username = '';
        var conversation = '';
        for(var i=0; i<messages.length; i=i+1) {
            if (messages[i].from == selfUser[0].userID) {
                userSpeakType = 'selfSpeak';
                username = selfUser[0].username;
            } else {
                userSpeakType = 'opponentSpeak';
                username = otherUsers[currentOtherUserIndex].username;
            }
            if ((messages[i].from == otherUsers[currentOtherUserIndex].userID) || (messages[i].to == otherUsers[currentOtherUserIndex].userID)) {
                conversation = conversation + '<div class="' + userSpeakType + '">';
                conversation = conversation + '    <div class="userName"><div class="time ">' + messages[i].date + '</div>' + username + '</div>';
                conversation = conversation + '    <div class="userSpeak">';
                conversation = conversation + '        <div class="bullet">&#8226</div>';
                conversation = conversation + '        <div class="speakContent">' + messages[i].content + '</div>';
                conversation = conversation + '        <div class="deliveryStatus">' + messages[i].delivery_status + '</div>';
                conversation = conversation + '    </div>';
                conversation = conversation + '</div>';
            }
        }
        $('#chatterBoxChatter').html(conversation);
    }

    function renderMessage(message) {
        var userSpeakType = '';
        var username = '';
        var conversation = '';
        if (message.from == selfUser[0].userID) {
            userSpeakType = 'selfSpeak';
            username = selfUser[0].username;
        } else {
            userSpeakType = 'opponentSpeak';
            username = otherUsers[currentOtherUserIndex].username;
        }
        conversation = conversation + '<div class="' + userSpeakType + '">';
        conversation = conversation + '    <div class="userName"><div class="time ">' + message.date + '</div>' + username + '</div>';
        conversation = conversation + '    <div class="userSpeak">';
        conversation = conversation + '        <div class="bullet">&#8226</div>';
        conversation = conversation + '        <div class="speakContent">' + message.content + '</div>';
        if (message.delivery_status) {
            conversation = conversation + '        <div class="deliveryStatus">' + message.delivery_status + '</div>';
        }
        conversation = conversation + '    </div>';
        conversation = conversation + '</div>';
        var $appendedElement = $(conversation);
        $('#chatterBoxChatter').append($appendedElement);
        return $appendedElement;
    }

    $('#chatmessage').focus();

    $('.changeUserButton').click(function () {
        currentOtherUserIndex = (currentOtherUserIndex == 0 ? 1 : 0); // toggle between 0 and 1
        renderUserSlab();
        renderConversation();
    });

    function customDate() {
        var d = new Date();
        var hours = d.getHours();
        var seconds = d.getSeconds();
        var ampm = (hours >= 12) ? 'PM' : 'AM';
        var sec = (d.getSeconds() < 10) ? ('0'+seconds) : seconds;
        var customDate = d.getHours() + ':' + d.getMinutes() + ':' + sec + ' ' + ampm;
        return customDate;
    }

    /**
     * Socket.io Functions on the client side
     */

    function socketFunctionsClient() {
        var socket = io({reconnection: false, forceNew: true});

        socket.on('connect', function() {
            console.log('connected');
        });

        // update otherUser's socketID, when they come online
        socket.on('socketID', function (userData) {
            console.log('another user joined!', userData.userID, ',', userData.socketID);
            for(var i=0; i<otherUsers.length; i=i+1) {
                if (otherUsers[i].userID == userData.userID) {
                    otherUsers[i].socketID = userData.socketID;
                }
                if (currentOtherUserIndex == i) {
                    renderUserSlab();
                }
            }
        });

        socket.on('chat', function (chatMessageReceived) {
            console.log('new message', chatMessageReceived);
            renderMessage(chatMessageReceived);
        });

        function sendChatMessage() {
            var $chatmessage = $('#chatmessage');
            var $chatterBoxChatter = $('#chatterBoxChatter');
            var message = {};
            message.from = selfUser[0].userID;
            message.to = otherUsers[currentOtherUserIndex].userID;
            message.content = $chatmessage.val();
            message.targetSocketID = otherUsers[currentOtherUserIndex].socketID;
            message.date = customDate();
            messages.push(message);
            var pushedMessageIndex = messages.length - 1;
            var $appendedElement = renderMessage(message);

            socket.emit('chat', message, function (err, cbMessage) {
                if (cbMessage) {
                    var element_deliveryStatus = '<div class="deliveryStatus">' + cbMessage.delivery_status + '</div>';
                    $appendedElement.find('.speakContent').after(element_deliveryStatus);
                    $chatterBoxChatter.scrollTop($chatterBoxChatter[0].scrollHeight);
                    messages[pushedMessageIndex].delivery_status = cbMessage.delivery_status;
                }
            });
            $chatmessage.val('');
            $chatterBoxChatter.scrollTop($chatterBoxChatter[0].scrollHeight);
        }

        $('#chatbutton').click(function(e) {
            e.preventDefault();
            sendChatMessage();
        });
        
        $('#chatmessage').keypress(function(e) {
            if(e.which == 13) {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }


    /**
     * AJAX Functions
     */

    function getSelfDetails() {
        $.ajax({
            url: "/getSelfDetails",
            type: "GET"
        })
            .done(function(data) {
                selfUser = data.slice(0); // clone array
            })
            .fail(function( jqXHR, textStatus ) {
                console.log( "Request failed: " + textStatus);
                console.log(jqXHR.responseText);
            });
    }

    function getMyMessages() {
        $.ajax({
            url: "/getMyMessages",
            type: "GET"
        })
            .done(function(data) {
                messages = data.slice(0);  // clone array
                renderConversation();
            })
            .fail(function( jqXHR, textStatus ) {
                console.log( "Request failed: " + textStatus);
                console.log(jqXHR.responseText);
            });
    }

    function getOtherUserDetails() {
        $.ajax({
            url: "/getOtherUserDetails",
            type: "GET"
        })
            .done(function(data) {
                otherUsers = data.slice(0); // clone array
                renderUserSlab();
                getMyMessages();
            })
            .fail(function( jqXHR, textStatus ) {
                console.log( "Request failed: " + textStatus);
                console.log(jqXHR.responseText);
            });
    }

    /**
     * functions executed after successful signin
     */
    getSelfDetails();
    getOtherUserDetails();
    socketFunctionsClient();

}); // /document.ready()
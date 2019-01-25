//VK API DOCUMENTATION   https://vk.com/dev/users.get

//Giving access
function getUrl(method, params) {
    if (!method) throw new Error('Method was not found');
    params = params || {};  //Check if it is an object, otherwise make it an object
    params ['access_token'] = '9e89fd39a792c4ab2611c5970213c921e493d1db62d20491b8cd452d21a52ed53200a705b43444914f825'; //Your access token
    return 'https://api.vk.com/method/' + method + '?' + $.param(params)+ '&v=5.52';
}

//Universal function to send different requests
function sendRequest(method, params, func) {
    $.ajax({
        url: getUrl(method, params), 
        method: 'GET',
        dataType: 'JSONP',
        success: func
        });
}

$('#load').on('click', loadFriends);
$('#hide').on('click', closeFriends);

$('#send-message').on('click', sendMessage);

// Process "detail info" button
$(document).on('click', '.open-detail', function (event) { 
    event.preventDefault(); 
    var id = +$(event.target).data('id');
    sendRequest(
        'users.get',
        {user_ids: id, fields: 'bdate, photo_big'},  // What data we want to get for detailed window
        drawDetailFriend
    );
    console.log(id);
});

// Request to get info about friends
function loadFriends() { 
    sendRequest('friends.search', {count: 100, fields: 'photo_200_orig, online'}, function (data) { //Fill in method and parametrs
        drawFriends(data.response.items);
        console.log(data);
    });

}

// Show list of your friend
function drawFriends(friends) {
    var html = '';

    for (var i = 1; i < friends.length; i++) { //display all friends
        var f = friends[i]; // current friend
        var online = f.online ? 'Online' : 'Offline'; // Is current friend online?
       

        html += 
            '<li>'+ 
            '<a>'
                +'<img src="'+f.photo_200_orig+'"/>'
                    +'<div>' 
                        +'<h4>' + f.first_name + ' ' + f.last_name + '</h4>' 
                        +'<p>'+ online +'</p>'
                        +'<button data-id="'+f.id+'"class="open-detail">Open detail profile</button>'
                    +'</div>' 
            +'</a>'
            +'</li>';
    }

$('ul').html(html); //Display 

}

function drawDetailFriend(data) {
    $("html, body").animate({ scrollTop: 300 }, "slow");
    var user = data.response[0]; //Read data 
    var $detail = $('.detail');  //Create jquery object 

    var ulHtml =  '<li>' + "Date of Birth:" + ' ' +user.bdate+'</li>' + '<li>' + "ID:" + ' ' +user.id+'</li>';

    // Find and fill in data to html
    $detail.find('img').attr('src', user.photo_big);
    $detail.find('h3').text(user.first_name + ' ' + user.last_name);
    $detail.find('ul').html(ulHtml);
    $detail.find('button').attr('data-id', user.id); 

    $detail.show();
}

function sendMessage (event) {
    var id = +$(event.target).attr('data-id');
    var value = $('textarea').val();  //read value in textarea

    if (!value) {
        alert('Type something');
        return; //do not run next
    }
    
    sendRequest ('messages.send', {user_id: 194940962, message: value}, function() { //I fill in my id, to work properly type in "id"
        alert("Message has been sent!");
        console.log('Message has been sent!')
        $('textarea').val('');  //Clear message section
    })
}

function closeFriends() {
    $('ul').html('');
    $('.detail').hide();
    return;
    
}
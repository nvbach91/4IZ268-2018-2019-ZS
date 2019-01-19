var token = '1150314422.93c52c9.a0e2f3b2a4fe4091a63d1455ed3b2958',
    hashtag = 'hockey', // hashtag without # symbol
    num_photos = 4;

$.ajax({
    url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: { access_token: token, count: num_photos },
    success: function (data) {
        console.log(data);
        for (x in data.data) {
            $('ul').append('<li><img src="' + data.data[x].images.standard_resolution.url + '"></li>');
        }
    },
    error: function (data) {
        console.log(data);
    }
});
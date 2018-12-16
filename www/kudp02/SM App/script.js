var token = '33306950.8bcd707.38adf59e7fd34eaeb4248f4249e1f041',
    num_photos = 20;
 
$.ajax({
	url: 'https://api.instagram.com/v1/users/self/media/recent',
	dataType: 'jsonp',
	type: 'GET',
	data: {access_token: token, count: num_photos},
	success: function(data){
 		console.log(data);
		for( x in data.data ){
			$('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>');
		}
	},
	error: function(data){
		console.log(data);
	}
});

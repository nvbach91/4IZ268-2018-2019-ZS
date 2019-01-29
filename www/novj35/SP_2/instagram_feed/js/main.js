
var userFeed = new Instafeed({
	get: 'user',
	userId: '9166890326',
	limit: 12,
	resolution: 'standard_resolution',
	accessToken: '9166890326.1677ed0.7dc4a1bd3a4e436d84e6dd6f0143f5a9',
	sortBy: 'most-recent',
	template: '<div class="col-lg-4 instaimg"><a href="{{link}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="instaimg"/></a></div>',
});

userFeed.run();

$.ajax({
	url: 'https://api.instagram.com/v1/users/self',
	type: 'GET',
	data: {
		access_token: '9166890326.1677ed0.7dc4a1bd3a4e436d84e6dd6f0143f5a9',
		client_id: '9166890326',
	},
	success: function (response) {
		var follows = response['data']['counts']['follows'];
		document.getElementById("instagram_follows").innerHTML = follows
	},

	error: function (data) {
		console.log(data);
	}
});

$.ajax({
	url: 'https://api.instagram.com/v1/users/self',
	type: 'GET',
	data: {
		access_token: '9166890326.1677ed0.7dc4a1bd3a4e436d84e6dd6f0143f5a9',
		client_id: '9166890326',
	},
	success: function (response) {
		var followed_by = response['data']['counts']['followed_by'];
		document.getElementById("instagram_followers").innerHTML = followed_by
	},

	error: function (data) {
		console.log(data);
	}
});




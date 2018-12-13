$(document).ready(function() {


    var userFeed = new Instafeed({
        get: 'user',
        userId: '9166890326',
        limit: 12,
        resolution: 'standard_resolution',
        accessToken: '9166890326.1677ed0.7dc4a1bd3a4e436d84e6dd6f0143f5a9',
        sortBy: 'most-recent',
        template: '<div class="col-lg-3 instaimg"><a href="{{image}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/></a></div>',
    });


    userFeed.run();
})
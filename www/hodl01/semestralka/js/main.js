var token = '1404870044.fa0d083.290093ca2a4d4a7f90e28bf31ec3570d',
    num_photos = 10, // max 20
    container = document.getElementById( 'instafeed' ), // <ul id="instafeed">
    scrElement = document.createElement( 'script' );
 
window.mishaProcessResult = function( data ) {
	for( x in data.data ){
		container.innerHTML += '<li><img src="' + data.data[x].images.low_resolution.url + '"></li>';
	}
}
 
scrElement.setAttribute( 'src', 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + num_photos + '&callback=mishaProcessResult' );
document.body.appendChild( scrElement );

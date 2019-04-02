var ENV = require('dotenv');
var cloudinary = require('cloudinary');

ENV.config();
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

function getImagePublicIds(options) {
	if(!options)
		options = {};
	options.max_results=500;

	cloudinary.v2.api.resources(options, function(error, result)
	{
		result.resources.forEach(element => {
			console.log(element.public_id);
		});
	});
}

function deleteImage(publicId) {
	cloudinary.uploader.destroy(publicId, function(result) { console.log(result);});
}

function uploadImage(imagePath, options) {
	if(!options)
		options = {};
	
	cloudinary.v2.uploader.upload(imagePath, options, function(error, result) {console.log(result, error)});
}

getImagePublicIds();
//uploadImage("E://_Gallery//Vox Machina//7Ja70yN.png", null);
//deleteImage("vox_machina")
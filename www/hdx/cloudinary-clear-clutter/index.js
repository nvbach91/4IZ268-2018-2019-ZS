const ENV = require('dotenv');
const cloudinary = require('cloudinary');
const fs = require('fs'); 

const dateLimit = Date.parse('2019-04-04T00:00:01Z');
const ignoreIdsFile = "public_ids";

var publicIdExceptions;

ENV.config();
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

function deleteImage(publicId) {
	cloudinary.uploader.destroy(publicId, function(result) { console.log(result);});
}

function removeClutter(exceptionsFile)
{
  	fs.readFile(exceptionsFile, (err, data) => { 
		if (err) {
			console.log(err);
			return;
		}; 
		publicIdExceptions = data.toString().replace(/\r/gm,"").split("\n");
		console.log(publicIdExceptions)
		recursiveCleaning(null);
	});
}

function recursiveCleaning(options) {
	console.log("recursiveCleaning()");
	if(!options)
		options = {};
	options.max_results=500;
	
	cloudinary.v2.api.resources(options, function(err, result)
	{
		if(err) { 
			console.log(err);
			return;
		}
		result.resources.forEach(element => {
			if(!publicIdExceptions.includes(element.public_id)) {
				if(Date.parse(element.created_at) < dateLimit) {
					console.log("remove: " + "\t" + element.created_at + "\t" + element.public_id);
					deleteImage(element.public_id);
				}
			}
		});
		if(result.next_cursor) {
			recursiveCleaning({next_cursor: result.next_cursor});
		}
	});
}

removeClutter(ignoreIdsFile);
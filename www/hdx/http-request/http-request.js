const axios = require('axios');
var ENV = require('dotenv');
ENV.config();

const base = "https://" + process.env.CLOUD_KEY + ":" + process.env.CLOUD_SECRET + "@api.cloudinary.com/v1_1/" + process.env.CLOUD_NAME;
const endpoints = {
	getImages:"/resources/image",
	getVideos:"/resources/video"
}
function getImages(options) {
    if(!options)
        options = "";
    var url = base + endpoints.getImages + options;
    axios.get(url)
    .then(res=> 
        {
            var nextCursor = res.data.next_cursor;
            res.data.resources.forEach(function(image) {
                console.log(image.public_id);
            });
            if(nextCursor) {
                getImages("/?next_cursor=" + nextCursor);
            }
        })
    .catch(err=>console.log(err));
}

function removeImages() {

}

function uploadImages() {

}

getImages();
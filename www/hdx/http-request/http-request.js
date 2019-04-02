const axios = require('axios');
const CLOUDINARY_API_KEY = "789245378565239";
const CLOUDINARY_API_SECRET = "u-KyDzF6frNKbxbmJp66QPtOlX8";
const CLOUDINARY_API_CLOUD_NAME = "zicco";

const base = "https://" + CLOUDINARY_API_KEY + ":" + CLOUDINARY_API_SECRET + "@api.cloudinary.com/v1_1/" + CLOUDINARY_API_CLOUD_NAME;
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

getImages();
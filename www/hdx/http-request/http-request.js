const axios = require('axios');
var ENV = require('dotenv');
ENV.config();

const base = "https://" + process.env.CLOUD_KEY + ":" + process.env.CLOUD_SECRET + "@api.cloudinary.com/v1_1/" + process.env.CLOUD_NAME;

function getAllImg(){
    var url = base + "/resources/search?expression=resource_type:image";

    axios.post(url)
    .then(res=>
        {
            console.log("POST " + url);
            console.log("total_count:" + res.data.total_count);
            res.data.resources.forEach(function(image) 
            {
                console.log(image.public_id);
            });
        })
    .catch(err=>console.log(err));
}

function getImgByOpts(options, cursor) {
    if(!options)
        options = "";
    if(!cursor)
        cursor = "";
    var url = base + "/resources/image/upload?" + options + cursor;

    axios.get(url)
    .then(res=> 
        {
            console.log("GET " + url);
            var nextCursor = res.data.next_cursor;
            res.data.resources.forEach(function(image) 
            {
                console.log(image.public_id);
            });
            if(nextCursor) 
            {
                getImgByOpts(options, "&next_cursor=" + nextCursor);
            }
        })
    .catch(err=>console.log(err));
}

function removeImg(publicIds) {
    var url = base + "/resources/image/upload?";
    publicIds.forEach(function (publicId) {
        url += "&public_ids[]=" + publicId;
    })

    axios.delete(url)
    .then(function(res) 
        {
            console.log("DELETE " + url);
            console.log(res.data.deleted);
        })
    .catch(err=>console.log(err));;
}

getAllImg();
getImgByOpts("prefix=art");
removeImg(["hykiw77znszgb9kgcjm5", "vox_machina"]);

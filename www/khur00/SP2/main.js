var districts = {};
var prispevek;
var id;
var name;
/*var svgcodes = [{
    title: "Royal Capital",
    svgPath: "m 780.33449,567.49946 c -18.66667,8.83308 -38.00002,22.16642 -51.16703,33.33319 -13.16701,11.16677 -20.1666,20.16624 -24.16706,32.50056 -4.00046,12.33432 -5.00033,27.99906 -2.33359,44.16655 2.66674,16.16749 8.99965,32.83303 19.54902,45.92431 10.54938,13.09129 25.78442,22.90942 49.61781,29.24269 23.83338,6.33327 56.50059,9.33332 83.33375,9.33324 26.83315,-8e-5 47.83373,-3.00016 68.66655,-8.83343 20.83283,-5.83328 41.5006,-14.50041 56.50014,-25.16702 14.99954,-10.66661 24.33342,-23.33402 32.99972,-36.33345 8.6662,-12.99943 16.6669,-26.33395 19.4999,-38.49991 2.833,-12.16597 0.4995,-23.16695 -4.8334,-31.49964 -5.3329,-8.3327 -13.6668,-13.99975 -24.0589,-21.42028 -10.39219,-7.42053 -23.27456,-16.91281 -36.10781,-24.24614 -12.83326,-7.33333 -25.83309,-12.66659 -40.4999,-16.50001 -14.66682,-3.83342 -30.99952,-6.16667 -46.6665,-7.50006 -15.66698,-1.33339 -30.66621,-1.6667 -47.1667,0.33328 -16.50049,1.99999 -34.49932,6.33304 -53.166,15.16612 z"
}, {
    title: "Orvud",
    svgPath: "m 780.33449,567.49946 c -18.66667,8.83308 -38.00002,22.16642 -51.16703,33.33319 -13.16701,11.16677 -20.1666,20.16624 -24.16706,32.50056 -4.00046,12.33432 -5.00033,27.99906 -2.33359,44.16655 2.66674,16.16749 8.99965,32.83303 19.54902,45.92431 10.54938,13.09129 25.78442,22.90942 49.61781,29.24269 23.83338,6.33327 56.50059,9.33332 83.33375,9.33324 26.83315,-8e-5 47.83373,-3.00016 68.66655,-8.83343 20.83283,-5.83328 41.5006,-14.50041 56.50014,-25.16702 14.99954,-10.66661 24.33342,-23.33402 32.99972,-36.33345 8.6662,-12.99943 16.6669,-26.33395 19.4999,-38.49991 2.833,-12.16597 0.4995,-23.16695 -4.8334,-31.49964 -5.3329,-8.3327 -13.6668,-13.99975 -24.0589,-21.42028 -10.39219,-7.42053 -23.27456,-16.91281 -36.10781,-24.24614 -12.83326,-7.33333 -25.83309,-12.66659 -40.4999,-16.50001 -14.66682,-3.83342 -30.99952,-6.16667 -46.6665,-7.50006 -15.66698,-1.33339 -30.66621,-1.6667 -47.1667,0.33328 -16.50049,1.99999 -34.49932,6.33304 -53.166,15.16612 z"
}];
var pokus = [];*/



$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts?_embed&per_page=100", function (posts) {
    //console.log(posts);
    posts.forEach(function (post) {
        // console.log(post);
        districts[post.id] = { title: post.title.rendered, desc: post.content.rendered, path: post.excerpt };
    })

    console.log(districts);
    for (let key of Object.keys(districts)) {
        var postCont = districts[key].desc;
        var postId = key;//id post/post desc
        var postName = districts[key].title;
        var coordPath = districts[key].path;
        var button = document.createElement("button");
        button.innerHTML = postName;
        button.setAttribute("data-id", postId);
        button.setAttribute("data-desc", postCont);
        var htmlSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        htmlSvg.setAttribute("viewBox", "0 0 1703 1906");
        var htmlPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        htmlPath.setAttribute("class", postId);
        htmlPath.setAttribute("d", coordPath);
        htmlSvg.appendChild(htmlPath);



        button.addEventListener('click', function () {
            var postId = this.getAttribute("data-id");
            var content = districts[postId].desc;
            var pCoord = districts[postId].path;
            htmlPath.setAttribute("d", pCoord);
            //console.log(content);
            document.getElementById("obsah").innerHTML = content;
            $(htmlPath).css({
                "transition": "opacity .2s ease",
                "opacity": ".2", 'fill': 'ige'
            });

        })

        document.body.appendChild(button);
        document.body.appendChild(htmlSvg);
        document.getElementById("map").appendChild(htmlSvg);




    }
})

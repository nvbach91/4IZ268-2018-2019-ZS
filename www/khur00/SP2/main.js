var districts = {};
var prispevek;
var id;
var name;


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
            var id = this.getAttribute("data-id");
            var content = districts[id].desc;
            var pCoord = districts[id].path;
            htmlPath.setAttribute("d", pCoord);
            //console.log(content);
            document.getElementById("obsah").innerHTML = content;
            $(htmlPath).css({
                "transition": "opacity .2s ease",
                "opacity": ".2", 'fill': 'red'
            });

        })
        document.body.appendChild(button);
        document.body.appendChild(htmlSvg);
        document.getElementById("map").appendChild(htmlSvg);

        $(document).ready(function () {
            $("#obsah").dblclick(function () {
                $("#obsah").empty();
            })

        });

    }
})

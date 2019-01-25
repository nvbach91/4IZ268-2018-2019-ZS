
/*var addToTest = document.getElementsByClassName('test1');
var requestWeb = new XMLHttpRequest();
requestWeb.open('GET', 'http://rinamogy.beget.tech/wp-json/wp/v2/posts/51');
requestWeb.onload = function () {
    if (requestWeb.status >= 200 && requestWeb.status < 400) {
        var data = JSON.parse(this.response);
        createHTML(data);
    }
    else {
        console.log("We connected to a server ,but returned an error");
    }

}
requestWeb.send();


function createHTML(postData) {
    var ourHTMLstring = '';
    for (i = 0; i < postData.length; i++) {
        ourHTMLstring += '<h1>' + postData[i].title.rendered + '/<h1>';

    }
    addToTest.innerHtml = ourHTMLstring;
}

$.getJSON('http://rinamogy.beget.tech/wp-json/wp/v2/posts/51', function (data) {

    var text = `${data.title.rendered}<br>
                ${data.contex.rendered}<br>`


    $(".mypanel").html(text);
});
*/

var content1;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/51", function (json) {
    myjson = json;

    content1 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button1").click(function () {
        $(".Nedlay").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content1));
        $("#obsah").fadeIn();

    }
    )
}
);
var content2;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/48", function (json) {
    myjson = json;

    content2 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button2").click(function () {
        $(".diary").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content2));
        $("#obsah").fadeIn();
    }
    )
}
);
var content3;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/46", function (json) {
    myjson = json;

    content3 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button3").click(function () {
        $(".Paradis").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content3));
        $("#obsah").fadeIn();
    }
    )
}
);
var content4;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/44", function (json) {
    myjson = json;

    content4 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button4").click(function () {
        $(".Maria").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content4));
        $("#obsah").fadeIn();
    }
    )
}
);
var content5;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/42", function (json) {
    myjson = json;

    content5 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button5").click(function () {
        $(".Shiganshina").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content5));
        $("#obsah").fadeIn();
    }
    )
}
);
var content6;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/40", function (json) {
    myjson = json;

    content6 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button6").click(function () {
        $(".Forest").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content6));
        $("#obsah").fadeIn();
    }
    )
}
);
var content7;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/38", function (json) {
    myjson = json;

    content7 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button7").click(function () {
        $(".Chlorba").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content7));
        $("#obsah").fadeIn();
    }
    )
}
);
var content8;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/36", function (json) {
    myjson = json;

    content8 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button8").click(function () {
        $(".Trost").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content8));
        $("#obsah").fadeIn();
    }
    )
}
);
var content9;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/34", function (json) {
    myjson = json;

    content9 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button9").click(function () {
        $(".Karanese").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content9));
        $("#obsah").fadeIn();
    }
    )
}
);
var content10;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/32", function (json) {
    myjson = json;

    content10 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button10").click(function () {
        $(".Rose").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content10));
        $("#obsah").fadeIn();
    }
    )
}
);
var content11;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/30", function (json) {
    myjson = json;

    content11 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button11").click(function () {
        $(".Dauper").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content11));
        $("#obsah").fadeIn();
    }
    )
}
);
var content12;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/28", function (json) {
    myjson = json;

    content12 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button12").click(function () {
        $(".Utgard").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content12));
        $("#obsah").fadeIn();
    }
    )
}
);

var content13;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/26", function (json) {
    myjson = json;

    content13 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button13").click(function () {
        $(".Ragako").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content13));
        $("#obsah").fadeIn();
    }
    )
}
);

var content14;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/24", function (json) {
    myjson = json;

    content14 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button14").click(function () {
        $(".Sina").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content14));
        $("#obsah").fadeIn();
    }
    )
}
);

var content15;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/22", function (json) {
    myjson = json;

    content15 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".Hermina").css({
        "transition": "opacity .2s ease",
        "opacity": ".5", 'fill': 'beige'
    });
    $(".button15").click(function () {
        $("#obsah").append($(content15));
        $("#obsah").fadeIn();
    }
    )
}
);

var content16;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/20", function (json) {
    myjson = json;

    content16 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button16").click(function () {
        $(".Yalkell").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content16));
        $("#obsah").fadeIn();
    }
    )
}
);

var content17;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/18", function (json) {
    myjson = json;

    content17 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button17").click(function () {
        $(".Orvud").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content17));
        $("#obsah").fadeIn();
    }
    )
}
);

var content18;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/16", function (json) {
    myjson = json;

    content18 = myjson.content.rendered;
})

$(document).ready(function () {
    $(".button18").click(function () {
        $(".Stohess").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content18));
        $("#obsah").fadeIn();
    }
    )
}
);

var content19;
$.getJSON("http://rinamogy.beget.tech/wp-json/wp/v2/posts/12", function (json) {
    myjson = json;

    content19 = myjson.content.rendered;
})

$(document).ready(function () {

    $(".button19").click(function () {
        $(".Capital").css({
            "transition": "opacity .2s ease",
            "opacity": ".5", 'fill': 'beige'
        });
        $("#obsah").append($(content19));
        $("#obsah").fadeIn();
    }
    )
}
);
$(document).ready(function () {
    $(".button0").click(function () {
        location.reload(true);
    }
    )
}
);







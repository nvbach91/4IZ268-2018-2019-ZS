
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








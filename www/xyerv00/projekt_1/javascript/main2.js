var App = App || {};

var itemID = 2;
//var item = $(".items").html();
var itemSelect = '';
var mailTo = 'vyvojar.pat@gmail.com';
var settings = {
    "async": false,
    "crossDomain": true,
    "url": "https://products-ace9.restdb.io/rest/products",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "x-apikey": "5c49c1218932456b814555fd",
        "cache-control": "no-cache"
    }
};

var products;

function modelButtons(){
    $.ajax(settings).done(function (response) {
        products = response;
        $(".modelBoxes").append(generateModelView());
    });
}

/*var products = [{
    name: "Mika",
    sizes:[36, 38, 40, 42]
},
    {
        name: "Viktoria",
        sizes: [36, 38, 40, 42]
    },
    {
        name: "Fiji",
        sizes: [36, 38, 40, 42]];
    }*/


function generateModelView() {
    var itemButton = '<div class="modelSelectButtons">';
    for (var i=0; i < products.length; i++){
        itemButton += '<button name="model">'+products[i].model+'</button>';
    }
    itemButton +='</div>';
    return  itemButton;
}

function generateOrderItem(modelOrederItem) {
    var orderItem = '';
    orderItem += '<div class="item"><label>' + modelOrederItem + '</label><select name="size">'+generateSizeOptions(modelOrederItem)+'</select><input type="number" name="count"></div>';
    return orderItem;
}

function  generateSizeOptions(modelOrederItem){
    var sizeOptions = '';
    for (var i=0; i < products.length; i++){
        if (modelOrederItem === products[i].model){
            for (var u =0; u < products[i].sizes.length; u++) {
                sizeOptions += '<option>'+products[i].sizes[u]+'</option>';
            }
    }
    }
    return sizeOptions;
}



function orderContent(){
    var items = [];

    $(".item").each(function () {
        var item = $(this);

        items.push({
            model: item.children("label").text(),
            size: item.children("select[name='size']").val(),
            count:item.children("input[name='count']").val()
        });

    });

    return items;
}

App.init = function(){
    $("#sendButton").click(function () {
        var items = orderContent();
        var message = '<table><thead><tr><th>Model</th><th>Velikost</th><th>Pocet</th></tr></thead><tbody>';
        for(var i = 0; i < items.length; i++) {
            message += '<tr><td>' + items[i].model + '</td><td>' + items[i].size + '</td><td>' + items[i].count + '</td></tr>';
        }
        message += '</tbody></table>';

        message += '<table><tbody>';
        message += '<tr><td>Zpráva od uživatele: </td><td>'+$("#emailBody").val()+'</td></tr>';
        message += '<tr><td>Odpovězte na e-mail</td><td>'+$("#client-email").val()+'</td> </tr>';
        message += '</tbody></table>';

        $.ajax({
            type: 'POST',
            url: 'https://formspree.io/'+mailTo,
            //contentType zjisten empiricky z F12 console, pri testu formulare na https://formspree.io :)
            contentType: "application/x-www-form-urlencoded",
            data: message,
            cache: false,
            success: function(responseData) {
                console.info("Mail sent successfully");

                //Na vystupu jsou data obsahujici captcha overeni, ze nejsi robot - je to nutne, jinak se mail neodesle
                //V podstate se prepise cela html stranka
                var newDoc = document.open("text/html", "replace");
                newDoc.write(responseData);
                newDoc.close();

                items=[];
            },
            error: function(errorData) {
                console.error("Error calling mail api");
            }
        });
    });
};

$(document).ready(function () {
    App.init();

    /*$("#buttonAdd").click(function(){
        $(".items").append(item);
        $(".item").last().attr("id", itemID);
        itemID++;
    });*/

    modelButtons();

    $("button[name='model']").click(function () {
        var modelOrederItem = $(this).text();
        $(".items").append(generateOrderItem(modelOrederItem));
    });

    /*$("#buttonDelete").click(function () {
        $(".item").last().remove();
    });*/
});


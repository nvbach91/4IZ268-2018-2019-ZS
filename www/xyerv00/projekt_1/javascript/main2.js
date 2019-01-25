var App = App || {};
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

function modelButtons() {
    $.ajax(settings).done(function (response) {
        products = response;
        $(".modelBoxes").append(generateModelView());
    });
}

function generateModelView() {
    var itemButton = '<div>';
    for (var i = 0; i < products.length; i++) {
        itemButton += '<div class="modelBox"><div class="modelPictureBox"><img src="' + products[i].pictureURL + '" class="itemPicture"></div><div class="modelButtonsBox"><select name="size" id="size_' + products[i].model + '">' + generateSizeOptions(products[i].model) + '</select><button name="model" id="' + products[i].model + '" type="button">Přidat</button></div></div>';
    }
    itemButton += '<div class="clear"></div></div>';
    return itemButton;
}

function generateOrderItem(modelOrederItem) {
    var id = "size_" + modelOrederItem;
    var selectedSize = $("#" + id).val();
    var orderItem = '';
    var uniqueItemID = modelOrederItem + '_' + selectedSize;

    orderItem += '<div class="item" id="orderItem_' + uniqueItemID + '"><label>Model: </label><label about="model">' + modelOrederItem + '</label><label>Velikost: </label><label about="selectedSize">' + selectedSize + '</label><label>Počet: </label><input type="number" name="count" value="1" id="count_' + uniqueItemID + '"><button type="button" name="buttonDelete" id="buttonDelete_' + uniqueItemID + '">Odebrat</button></div>';

    return orderItem;
}

function generateSizeOptions(modelOrederItem) {
    var sizeOptions = '';
    for (var i = 0; i < products.length; i++) {
        if (modelOrederItem === products[i].model) {
            for (var u = 0; u < products[i].sizes.length; u++) {
                sizeOptions += '<option>' + products[i].sizes[u] + '</option>';
            }
        }
    }
    return sizeOptions;
}

function orderContent() {
    var items = [];

    $(".item").each(function () {
        var item = $(this);

        items.push({
            model: item.children("label[about='model']").text(),
            size: item.children("label[about='selectedSize']").text(),
            count: item.children("input[name='count']").val()
        });

    });

    return items;
}

App.init = function () {
    $("#sendButton").click(function () {

        var items = orderContent();
        if (items.length != 0) {

    var message = '<table><thead><tr><th>Model</th><th>Velikost</th><th>Pocet</th></tr></thead><tbody>';
    for (var i = 0; i < items.length; i++) {
        message += '<tr><td>' + items[i].model + '</td><td>' + items[i].size + '</td><td>' + items[i].count + '</td></tr>';
    }
    message += '</tbody></table>';

    message += '<table><tbody>';
    message += '<tr><td>Zpráva od uživatele: </td><td>' + $("#emailBody").val() + '</td></tr>';
    message += '<tr><td>Odpovězte na e-mail</td><td>' + $("#client-email").val() + '</td> </tr>';
    message += '</tbody></table>';

    $.ajax({
        type: 'POST',
        url: 'https://formspree.io/' + mailTo,
        //contentType zjisten empiricky z F12 console, pri testu formulare na https://formspree.io :)
        contentType: "application/x-www-form-urlencoded",
        data: message,
        cache: false,
        success: function (responseData) {
            console.info("Mail sent successfully");

            //Na vystupu jsou data obsahujici captcha overeni, ze nejsi robot - je to nutne, jinak se mail neodesle
            //V podstate se prepise cela html stranka
            var newDoc = document.open("text/html", "replace");
            newDoc.write(responseData);
            newDoc.close();

            items = [];
        },
        error: function (errorData) {
            console.error("Error calling mail api");
        }
    });
} else {
            alert("Vaše objednávka je prázdná");
        }
    });
};

$(document).ready(function () {
    App.init();

    modelButtons();

    $("button[name='model']").click(function () {
        var modelOrederItem = this.id;
        var size_id = $("#size_" + modelOrederItem).val();

        var orderItemName = "#orderItem_" + modelOrederItem;

        if ($(orderItemName + '_' + size_id).val() === undefined) {
            $(".items").append(generateOrderItem(modelOrederItem));
            $("#buttonDelete_" + modelOrederItem + "_" + size_id).click(function () {
                $("#orderItem_" + modelOrederItem + '_' + size_id).remove();
            });
        } else {
            var increment = $("#count_" + modelOrederItem + '_' + size_id).val();
            $("#count_" + modelOrederItem + '_' + size_id).val(++increment);
        }
    });

    /*$("#buttonDelete").click(function () {
        $(".item").last().remove();
    });*/
});


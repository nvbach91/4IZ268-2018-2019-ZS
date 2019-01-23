var App = App || {};

var itemID = 2;
var item = $(".items").html();
var mailTo = 'vyvojar.pat@gmail.com';

function orderContent(){
    var items = [];

    $(".item").each(function () {
        var item = $(this);

        items.push({
            model: item.children("select[name='model']").val(),
            size: item.children("select[name='size']").val(),
            count:item.children("select[name='count']").val()
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

    $("#buttonAdd").click(function(){
        $(".items").append(item);
        $(".item").last().attr("id", itemID);
        itemID++;
    });

    $("#buttonDelete").click(function () {
        $(".item").last().remove();
    });

});


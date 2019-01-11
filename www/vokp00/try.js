$(function () {
    $.getJSON("//extreme-ip-lookup.com/json/",
        function (json) {
            if (json.country && json.city) {
                $('#ipLookup').html('Location of ' + json.query + ': ' + json.city + ', ' + json.country + '');
            }
        }
    );
});
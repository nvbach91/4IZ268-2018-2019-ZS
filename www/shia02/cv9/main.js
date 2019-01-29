var readFile = function (selector, callback) {
    var fileInput = $(selector);
    fileInput.change(function (e) {
        var targ = e.target;
        var fileReader = new FileReader();
        fileReader.readAsText(targ.files[0]);
        fileReader.onload = function () {
            var fileContent = fileReader.result;
            callback(fileContent);
        };
    });
};

var selector = "#file-input";
readFile(selector, function (result) {
    var fileContent = result;
    console.log(fileContent);
})


/* var bindForm = function () {
    $('#refistration-form').submit(function () {
        var t = $(this);
        var nameInput = t.find('[name="name"]');
        var emailInput = t.find('[name="email"]');
        var ageInput = t.find('[name="age"]');
        LocalStorage.name = nameInput.val();
        LocalStorage.name = emailInput.val();
        LocalStorage.name = ageInput.val();
    })
}
*/

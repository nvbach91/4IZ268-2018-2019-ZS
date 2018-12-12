var fileInput = $("#file-input");

fileInput.change(function (e) {
   var targ = e.target;
   var fileReader = new FileReader();
   fileReader.readAsText(targ.files[0]);
   fileReader.onload = function () {
      var fileContent = fileReader.result;
      console.log(fileContent);
   }

})

var selector = "#file-input";
readFile(selector, function (result) {
   var fileContent = result;
   console.log(fileContent);

})

$('#registration-form')
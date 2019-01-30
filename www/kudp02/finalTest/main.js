var input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    input.setAttribute("value", "");
    document.getElementById('app').appendChild(input);

    var finalResult = document.createElement("P");

    var checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    document.getElementById('app').appendChild(checkBox);

var btn = document.createElement("BUTTON");  
var t = document.createTextNode("Translate");  
btn.appendChild(t);                       
document.getElementById('app').appendChild(btn); 

$("BUTTON").click(function () {
    var value = $(input).val();

    var checkBoxTrue = checkBox.checked;

    var final = uniqueCharacters(value, checkBoxTrue);
    
    finalResult.innerHTML = final;
    
    document.getElementById('app').appendChild(finalResult);
    
});

function uniqueCharacters(string, caseSensetive) {
    var uniqueL = string.split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join('');

    return uniqueL;
}
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btnZoh = document.getElementById("optBtn zoh");
var btnLoh = document.getElementById("optBtn loh");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var inpt = document.getElementById("modal-input");
// When the user clicks the button, open the modal 
btnZoh.onclick = function() {
    modal.style.display = "block";
}
btnLoh.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    inpt.nodeValue();

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

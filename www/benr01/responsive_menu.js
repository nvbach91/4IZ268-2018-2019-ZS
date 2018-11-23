
function myFunction() {
    var x = document.getElementById("responsiveMenu");
    if (x.className === "menuList") {
        x.className += " responsive";
    } else {
        x.className = "menuList";
    }
}

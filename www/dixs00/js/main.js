
function toggleNav() {
   var burger = document.getElementById("toggleHamburger");
   var sidebar = document.getElementById("mySidenav");
   const element = document.querySelector('.sidenav');
   const style = getComputedStyle(element);
   if (sidebar.style.height == "0px" || style.height == "0px") {
      document.getElementsByTagName("body").item(0).style.overflow = "none";
      sidebar.style.height = "300px";
      burger.style.transform = "rotate(90deg)";
      sidebar.style.margin = "10px"
      document.getElementsByTagName("body").item(0).style.overflow = "auto";
   } else {
      document.getElementsByTagName("body").item(0).style.overflow = "none";
      sidebar.style.height = "0px";

      burger.style.transform = "rotate(0deg)";
      document.getElementsByTagName("body").item(0).style.overflow = "auto";
   }
}





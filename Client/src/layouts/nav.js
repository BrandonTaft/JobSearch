var menuToggle = document.querySelector("#hamburger-bun");
var activeElements = document.querySelectorAll(".active");
var toggledMenu = menuToggle.addEventListener("click", function(){
    for(var activated = 0; activated < activeElements.length; activated++){
        activeElements[activated].classList.toggle("active");
   }
    
})
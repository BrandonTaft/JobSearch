var menuToggle = document.querySelector("#hamburger-bun");
var activeElements = document.querySelectorAll(".active");
var toggledMenu = menuToggle.addEventListener("click", function(){
     // forEach is not supported in IE11
  // activeElements.forEach(function(e){
  //     e.classList.toggle("active");
  // });
    //  for(var activated = 0; activated < activeElements.length; activated++){
    //       activeElements[activated].classList.toggle("active");
    //  }
    //activeElements.classList.toggle("active")
    for(var activated = 0; activated < activeElements.length; activated++){
        activeElements[activated].classList.toggle("active");
   }
    
})
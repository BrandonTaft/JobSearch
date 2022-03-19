import React, { useState, useEffect } from "react";
import logo from "../img/logo.png";
//import style from "../css/navbar.module.css";
import { NavLink } from "react-router-dom";
import "../css/nav.css"
//import cx from 'classNameNames';



// const Navigation = () => {
//     const [modalShow, setModalShow] = useState(false);
// }

 function Navbar() {
//     const [isActive, setActive] = useState("true");
//     const ToggleclassName = () => {
//         console.log("hey")
//       setActive(!isActive); 
//      };

    // const ToggleclassName = () => {
    //         console.log("hey")
    //         //var menuToggle = document.querySelector("#hamburger-bun");
    //         var activeElements = document.querySelectorAll(".active");
    //        // menuToggle.addEventListener("click", function(){
    //             // forEach is not supported in IE11
    //          // activeElements.forEach(function(e){
    //          //     e.classList.toggle("active");
    //          // });
    //            //  for(var activated = 0; activated < activeElements.length; activated++){
    //            //       activeElements[activated].classList.toggle("active");
    //            //  }
               
    //            for(var activated = 0; activated < activeElements.length; activated++){
    //                activeElements[activated].classList.toggle("active");
    //           }
               
          // })

    // function ToggleclassName() {
    //     console.log("hey")
    //     var menuToggle = document.querySelector("#hamburger-bun");
    //     var activeElements = document.querySelectorAll(".active");
    //     var toggledMenu = menuToggle.addEventListener("click", function () {

    //         for (var activated = 0; activated < activeElements.length; activated++) {
    //             activeElements[activated].classList.toggle("active");
    //         }

    //     })
   
    // }
    const [isActive, setActive] = useState("false");

    const handleToggle = () => {
      setActive(!isActive);
    };
    return (


       
        <div className="nav-bar">
            <div className="masthead">

                <div onClick={handleToggle} id="hamburger-bun" className={`hamburger-bun ${isActive ? "active" : ""}`}>
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                </div>
            </div>
            <div className={`main-nav-list ${isActive ? "active" : ""}`}>
                <ul>
                    <li><a href="#0">RollTide</a></li>
                    <li><a href="#0"></a></li>
                    <li><a href="#0" className="mobile-hide">Blog</a></li>
                    <li><a href="#0" className="active-link">About</a></li>
                    <li><a href="#0">Contact</a></li>
                </ul>
            </div>
        </div>
      
    );


}

export default Navbar;
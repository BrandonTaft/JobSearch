import React, { useState } from "react";
//import logo from "../img/logo.png";
//import style from "../css/navbar.module.css";
import { NavLink } from "react-router-dom";
import "../css/nav.css";
//import cx from 'classNameNames';



// const Navigation = () => {
//     const [modalShow, setModalShow] = useState(false);
// }

 function Navbar() {
    
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
                    <NavLink to="/logout"  >Log Out</NavLink>
                    <NavLink to="/linkedin"  >Linked In</NavLink>
                    <NavLink to="/google"  >Google</NavLink>
                    <NavLink to="/saved"  >Saved Jobs</NavLink>
                    <NavLink to="/portfolio"  >Portfolio</NavLink>
                    <li><a href="#0">Contact</a></li>
                </ul>
            </div>
        </div>
      
    );


}

export default Navbar;
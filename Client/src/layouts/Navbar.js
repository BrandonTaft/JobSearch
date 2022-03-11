import React, { useState, useEffect } from "react";
import pic from "../img/logo/logo.png";
//import style from "../css/navbar.module.css";
import { NavLink } from "react-router-dom";
import "../css/nav.css"
//import cx from 'classNames';

import ModalLogin from "./ModalLogin";

const Navigation = () => {
    const [modalShow, setModalShow] = useState(false);
}

function Navbar() {


    function toggle() {
        const menuToggle = document.querySelector("#menu-toggle");
        const activeElements = document.querySelectorAll(".active");
        const toggledMenu = menuToggle.addEventListener("click", function () {

            activeElements.forEach(function (e) {
                e.classList.toggle("active");
            });

        })
    }


    return (


        //             <nav classNameNameName={style.navbar} expand="sm">

        //                     <div href="/">
        //                         <img
        //                             alt=""
        //                             src={pic}
        //                             width="30"
        //                             height="30"
        //                             classNameNameName="d-inline-block align-top"
        //                         />{' '}
        //                         Job Finder
        //                     </div>


        //                             
        //                             <div title="Dropdown" id="basic-nav-dropdown">
        //                                 <div> href="#action/3.1">Action</div>
        //                                 <div href="#action/3.2">Another action</div>
        //                                 <div href="#action/3.3">Something</div>

        //                                 <div href="#action/3.4">Separated link</div>
        //                             </div>


        //             </nav>

        {/* <div id="active" classNameName={cx(style.wrapper, style.active)}>
    <header classNameName={style.mainHeader}>
        <nav>
            <div id="active" classNameName={cx(style.masthead, style.active)}>
                <h1><a href="#0" id="bama">Roll Tide Roll</a></h1>
                <div id="active" onClick={toggle} id="menuToggle" classNameName={cx(style.menuToggle, style.active)}>
                    <div classNameName="one"></div>
                    <div classNameName="two"></div>
                    <div classNameName="three"></div>
                </div>
            </div>
            <div id="active" classNameName={cx(style.mainNavList, style.active)}>
                <ul>
                    <li><a href="#0">RollTide</a></li>
                    <li><a href="#0"></a></li>
                    <li><a href="#0" classNameName={cx(style.mobileHide)}>Blog</a></li>
                    <li><a href="#0" classNameName={cx(style.activeLink)}>About</a></li>
                    <li><a href="#0">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
    <main classNameName={cx(style.mainContents)}>
        <h2>Alabama</h2>
         <p>HEY!</p>
        <p>RollTide</p>
    </main>
    <footer id="active" classNameName={cx(style.mainFooter, style.active)}><span classNameName="copyright">&copy;2021 Brandon Taft</span></footer>
</div> */},

        <div className="wrapper active">
            
                <nav>
                    <div className="masthead active">

                        <div onClick={toggle} id="menu-toggle" className="menu-toggle active">
                            <div className="one"></div>
                            <div className="two"></div>
                            <div className="three"></div>
                        </div>
                    </div>
                    <div className="main-nav-list active">
                        <ul>
                            
                           
                            <NavLink to="/linkedin">Linked In</NavLink>
                            <NavLink to="/google">Google Jobs</NavLink>
                            <NavLink to="/portfolio">Portfolio</NavLink>
                            <li><a href="#0" className="mobile-hide">Blog</a></li>
                            <li><a href="#0" className="active-link">About</a></li>
                            <li><a href="#0">Contact</a></li>
                        </ul>
                    </div>
                </nav>
           

        </div>

    );


}

export default Navbar;
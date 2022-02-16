import React from "react";
import style from "../css/home.module.css";
import Navbar from "../layouts/Navbar";
import Portfolio from "../components/CheckPortfolio";
import Profile from "../components/Profile";
import GoogleJobs from "../components/GoogleJobs";
import Button from "../components/Button";



function Home() {
   
    return (
        <div>
            <Navbar />
            <div className={style.home}>
                <Profile />
                <Portfolio />
            </div>
            <GoogleJobs />
        </div>
    )
}

export default Home
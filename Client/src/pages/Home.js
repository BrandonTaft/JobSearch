import React from "react";
import style from "../css/home.module.css";
import Navbar from "../layouts/Navbar";
import Portfolio from "../components/Portfolio";
import Profile from "../components/Profile";
import GoogleJobs from "../components/GoogleJobs";



function Home() {

    return (
        <div>
            <Navbar />
            <div className={style.home}>
                <Profile />
                <Portfolio />
            </div>
            <div>
                <h1>Google Jobs</h1>
                <GoogleJobs />
            </div>
            <div>
                <h1>LinkedIn Jobs</h1>
                <GoogleJobs />
            </div>
        </div>
    )
}

export default Home
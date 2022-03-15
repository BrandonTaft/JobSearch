import React, { useState } from "react";
import style from "../css/home.module.css";
import Navbar from "../layouts/Navbar";
import Portfolio from "../components/Portfolio";
import SavedJobs from "../components/SavedJobs";
import GoogleJobs from "../components/GoogleJobs";
import LinkedInJobs from "../components/LinkedInJobs";
import { useLocation  } from "react-router-dom";



function Home(props) {
    const location = useLocation();
    console.log(location.state.name);
  
    const [isLoggedIn] = useState(true)

    return (
        
        <div className={style.home}>
            
                <Navbar />
            
           
            <div>
                <h1>Profile</h1>
                <Portfolio />
            </div>
            <div>
                <h1>Saved Jobs</h1>
                <SavedJobs />
            </div>
            <div>
                <h1>Google Jobs</h1>
                <GoogleJobs />
            </div>
            <div>
                <h1>LinkedIn Jobs</h1>
                <LinkedInJobs />
            </div>
        </div>
    )
}

export default Home
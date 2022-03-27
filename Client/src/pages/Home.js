import React, { useState } from "react";
import style from "../css/home.module.css";
import Navbar from "../layouts/Navbar";
import Portfolio from "../components/Portfolio";
import SavedJobs from "../components/SavedJobs";
import GoogleJobs from "../components/GoogleJobs";
import LinkedInJobs from "../components/LinkedInJobs";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Login from "./Login";



function Home(props) {
    const token = Cookies.get('jsonwebtoken');
    localStorage.setItem('token', token);
    const navigate = useNavigate();
    
    return (

        <div className={style.home}>

            {/* {((isAuthenticated) || (hasId)) && */}
                <div>
                    <Navbar />

                     {/* <div>
                        <h1>Profile</h1>
                        <Portfolio />
                    </div> */}

                    {/* <div>
                        <h1>Saved Jobs</h1>
                        <SavedJobs />
                    </div>  */}
                    <div>
                        <h1>Google Jobs</h1>
                        <GoogleJobs />
                    </div>
                    <div>
                        <h1>LinkedIn Jobs</h1>
                        <LinkedInJobs />
                    </div>

                </div>
            {/* } */}
            {/* {!isAuthenticated &&
            <div className={style.homeLogin}>
                <Login />
            </div>
} */}
        </div>

    )

}


export default Home
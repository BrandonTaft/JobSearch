import style from "../css/home.module.css";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import SavedJobs from "../components/SavedJobs";
import GoogleJobs from "../components/GoogleJobs";
import LinkedInJobs from "../components/LinkedInJobs";
import Cookies from 'js-cookie';



function Home(props) {
    const token = Cookies.get('jsonwebtoken');
    localStorage.setItem('token', token);
    
    
    return (

        <div className={style.home}>

            {/* {((isAuthenticated) || (hasId)) && */}
                <div>
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
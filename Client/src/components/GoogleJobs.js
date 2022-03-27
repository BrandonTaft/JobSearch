//import jobsService from "../services/jobs-service";

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import style from "../css/googleJobs.module.css";
import Navbar from "../layouts/Navbar";
import Cookies from 'js-cookie';



function GoogleJobs(props) {
    const navigate = useNavigate();
    const [googleJobs, setGoogleJobs] = useState([]);
    const [jobDescription, setjobDescription] = useState([]);

    function displayDescription(job) {
        setjobDescription(job.description)
    };

    // function saveJob(job) {
    //     const id = job._id;
    //     jobsService.update(id, job)
    // }



    useEffect(() => {
        const getGoogleJobs = () => {
            let token;
            const cookie = Cookies.get('jsonwebtoken');
            if(cookie == null){
             token = localStorage.getItem('token')
            } else {
             token = Cookies.get('jsonwebtoken');
            }
            fetch('http://localhost:8001/api/googlejobs', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
            .then(response => response.json())
                .then(response => {
                  
                    if (response.isLoggedIn) {
                        setGoogleJobs(response.jobs)
                    } else {
                        navigate("/")
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }

        getGoogleJobs();
    }, [])

    const leftDisplay = googleJobs.map(job => {
        return (


            <ul className={style.jobs} key={job._id}>
                <h5>{job.title}</h5>
                <button onClick={() => displayDescription(job)}>description</button>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <a href={job.href} alt="Link">Apply Here</a>
                {/* <button onClick={() => saveJob(job)}>Save Job</button> */}

            </ul>


        )
    });

    return (
        <section>
            <div className={style.googleJobs}>
                <Navbar />
                <div className={style.left}>
                    {leftDisplay}
                </div>
                <div className={style.right}>
                    {jobDescription}
                </div>
            </div>
        </section>

    )
}

export default GoogleJobs;
//import jobsService from "../services/jobs-service";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import style from "../css/googleJobs.module.css";
import Navbar from "../layouts/Navbar";



function GoogleJobs(props) {
    const navigate = useNavigate();
    const [googleJobs, setGoogleJobs] = useState([]);
    const [jobDescription, setjobDescription] = useState([]);

    function displayDescription(job){
        setjobDescription( job.description)
    };

    // function saveJob(job){
    //     const id = job._id;
    //     jobsService.update(id, job)
    // }

   

    useEffect(() => {
        const getGoogleJobs = () => {
           //const token = localStorage.getItem("token");
           //console.log("google component is about to request from server, ", token)
           //if(token)
           // jobsService.getAllGoogleJobs()
           fetch("http://127.0.0.1:8001/api/googlejobs", {
               method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
                .then(response => {
                    console.log(response)
                   if(response.data.isLoggedIn){
                    setGoogleJobs(response.data.jobs)
                   }else{
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
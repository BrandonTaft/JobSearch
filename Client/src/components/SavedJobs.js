import style from "../css/savedJobs.module.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function SavedJobs(){
    const navigate = useNavigate();
    const [savedJobs, setSavedJobs] = useState([]);
    const [jobDescription, setjobDescription] = useState([]);

    const getSaved = () => {
        let token;
         const cookie = Cookies.get('jsonwebtoken');
         if (cookie == null) {
             token = localStorage.getItem('token')
         } else {
             token = Cookies.get('jsonwebtoken');
         }
         fetch('http://localhost:8001/api/savedjobs', {
             method: 'GET',
             headers: {
                 'authorization': `Bearer ${token}`
             }
         })
         .then(response => response.json())
             .then(response => {
                 if(response.isLoggedIn){
                 setSavedJobs(response.jobs)
                 }else{
                     navigate("/")
                 }
             })
             .catch(e => {
                 console.log(e);
             });
     }


    function displayDescription(job){
        setjobDescription( job.description)
    };

    function deleteJob(job){
        const id = job._id;
        fetch(`http://localhost:8001/api/${id}`, {
            method: 'DELETE'
        })
        getSaved()
    }

    useEffect(() => {
        getSaved();
    }, []);

    const savedJobsDisplay = savedJobs.map(job => {
        return (

            <ul className={style.savedJobsList} key={job._id}>
                <h5>{job.title}</h5>
                <button onClick={() => displayDescription(job)}>description</button>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <a href={job.href} alt="Link">Apply Here</a>
                <button onClick={() => deleteJob(job)}>Delete</button> 
                
            </ul>
            )
        });


    return(
        <div className={style.savedContainer}>
            
            <div className={style.savedJobsLeft}>
                {savedJobsDisplay}
            </div>
        
            <div className={style.savedJobsRight}>
                 {jobDescription}
            </div>
        </div>
    )
}

export default SavedJobs;
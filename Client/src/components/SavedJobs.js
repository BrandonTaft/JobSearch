import style from "../css/savedJobs.module.css";
import { useState, useEffect } from 'react';
import jobsService from "../services/jobs-service";

function SavedJobs(){

    const [savedJobs, setSavedJobs] = useState([]);
    const [jobDescription, setjobDescription] = useState([]);

    function displayDescription(job){
        setjobDescription( job.description)
    };

    function deleteJob(job){
        const id = job._id;
        jobsService.delete(id, job)
    }

    useEffect(() => {
        const getSaved = () => {
            jobsService.getSavedJobs()
                .then(response => {
                    setSavedJobs(response.data)
                })
                .catch(e => {
                    console.log(e);
                });
        }

        getSaved();
    }, [savedJobs]);

    const savedJobsDisplay = savedJobs.map(job => {
        return (

            <ul className={style.savedJobsList} key={job._id}>
                <h5>{job.title}</h5>
                {/* <button onClick={() => displayDescription(job)}>description</button>  */}
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
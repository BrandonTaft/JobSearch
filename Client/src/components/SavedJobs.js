import style from "../css/savedJobs.module.css";
import { useState, useEffect } from 'react';
import jobsService from "../services/jobs-service";

function SavedJobs(){

    const [savedJobs, setSavedJobs] = useState([]);

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
    }, []);

    const savedJobsDisplay = savedJobs.map(job => {
        return (

            <ul className={style.savedJobsList} key={job._id}>
                <h5>{job.title}</h5>
                {/* <button onClick={() => displayDescription(job)}>description</button>  */}
                <p>{job.company}</p>
                <p>{job.location}</p>
                <a href={job.href} alt="Link">Apply Here</a>
                
            </ul>
            )
        });

    return(
        <div className={style.profile}>
            <h1>Saved Jobs</h1>
            <div className={style.savedJobs}>{savedJobsDisplay}</div>
        </div>
    )
}

export default SavedJobs;
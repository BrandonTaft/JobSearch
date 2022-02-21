import jobsService from "../services/jobs-service";
import { useState, useEffect } from 'react';
import style from "../css/linkedInJobs.module.css";
import Navbar from "../layouts/Navbar";
import SaveButton from "./SaveButton";


function LinkedInJobs(props) {

    const [linkedInJobs, setLinkedInJobs] = useState([]);
    const [jobDescription, setjobDescription] = useState([]);

    function displayDescription(job){
        setjobDescription( job.description)
    };

    function saveJob(job){
        const id = job._id;
        jobsService.update(id, job)
    }

   

    useEffect(() => {
        const getLinkedInJobs = () => {
            jobsService.getAllLinkedInJobs()
                .then(response => {
                    setLinkedInJobs(response.data)
                })
                .catch(e => {
                    console.log(e);
                });
        }

        getLinkedInJobs();
    }, [])

    const leftDisplay = linkedInJobs.map(job => {
        return (

            <ul className={style.jobs} key={job._id}>
                <h5>{job.title}</h5>
                <button onClick={() => displayDescription(job)}>description</button> 
                <p>{job.company}</p>
                <p>{job.location}</p>
                <a href={job.href} alt="Link">Apply Here</a>
                <button onClick={() => saveJob(job)}>Save Job</button>
                
            </ul>


        )
    });

    return (
        <section>
        <div className={style.linkedInJobs}>
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

export default LinkedInJobs;
import JobsService from "../services/jobs-service";
import { useState, useEffect } from 'react';
import style from "../css/googleJobs.module.css";


function GoogleJobs(props) {

    const [googleJobs, setGoogleJobs] = useState([]);
    const [jobDescription, setjobDescription] = useState([]);

    function displayDescription(job){
        setjobDescription( job.description)
    }

   

    useEffect(() => {
        const getGoogleJobs = () => {
            JobsService.getAllGoogleJobs()
                .then(response => {
                    setGoogleJobs(response.data)
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
            </ul>


        )
    });

    return (

        <div className={style.googleJobs}>
            <div className={style.left}>
                {leftDisplay}
            </div>
            <div className={style.right}>
                {jobDescription}
            </div>
        </div>

    )
}

export default GoogleJobs;
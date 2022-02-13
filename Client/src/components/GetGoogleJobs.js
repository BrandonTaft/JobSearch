import JobsService from "../services/jobs-service";
import { useState, useEffect } from 'react';

function GetGoogleJobs() {

    const [googleJobs, setGoogleJobs] = useState([])

    useEffect(() => {
        const getGoogleJobs = () => {
            JobsService.getAllGoogleJobs()
                .then(response => {
                    setGoogleJobs(response.data)
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        getGoogleJobs();
    }, [])
    const jobs = googleJobs
    const display = jobs.map((job, index) => {
        return <ul key={index}>
            <h3>{job}</h3>
        </ul>
    })
    return (
        
        <div>{googleJobs}</div>
    )
}

export default GetGoogleJobs;
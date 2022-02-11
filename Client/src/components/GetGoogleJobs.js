import JobsService from "../services/jobs-service";
import { useState, useEffect } from 'react';

function GetGoogleJobs() {

    const [googleJobs, setGoogleJobs] = useState([])

    useEffect(() => {
        const getGoogleJobs = () => {
            //http.get('http://localhost:8001/api/googlejobs')
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
        <ul>{display}</ul>
    )
}

export default GetGoogleJobs;
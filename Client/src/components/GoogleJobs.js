import JobsService from "../services/jobs-service";
import { useState, useEffect } from 'react';
import style from "../css/googleJobs.module.css";

function GoogleJobs() {

    const [googleJobs, setGoogleJobs] = useState([])

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
    
    const display = googleJobs.map(job => {
        return <ul key={job._id}>
            <h3>{job.title}</h3>
            <a href={job.href} alt="Link">{job.href}</a>
            <p>{job.description}</p>
        </ul>
    })
     return (
    //     // <section id="service" class="section service-area ptb_100 pt-md-0">
    //     // <div class="container">
    //     // <div class="row">
    //     // <div class="col-12 col-md-6 col-lg-4">
    //     //                 <div class="single-service p-4">
    //     //                     <span class="flaticon-rocket-launch color-1 icon-bg-1"></span>
    //     //                     <h3 class="my-3">Google Jobs</h3>
    //     //                     <div>{display}</div>
    //     //                     <a class="service-btn mt-3" href="#">Learn More</a>
    //     //                 </div>
    //     // </div>
    //     // </div>
    //     // </div>
    //     // </section>
       <div className={style.googleJobs}>{display}</div> 
     )
}

export default GoogleJobs;
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import style from "../css/linkedInJobs.module.css";
import Navbar from "../layouts/Navbar";
import Cookies from 'js-cookie';



function LinkedInJobs() {
    const navigate = useNavigate();
    const [linkedInJobs, setLinkedInJobs] = useState([]);
    const [jobDescription, setjobDescription] = useState([]);

    function displayDescription(job) {
        setjobDescription(job.description)
    };

    function saveJob(job) {
        const id = job._id;
       fetch(`http://localhost:8001/api/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
     },
      body: JSON.stringify(job)
    })
    }

    useEffect(() => {
        const getLinkedInJobs = () => {
            let token;
            const cookie = Cookies.get('jsonwebtoken');
            if(cookie == null){
             token = localStorage.getItem('token')
            } else {
             token = Cookies.get('jsonwebtoken');
            }
            fetch('http://localhost:8001/api/linkedin-jobs', {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    if (response.isLoggedIn) {
                        console.log(response)
                        setLinkedInJobs(response.jobs)
                    } else {
                        navigate("/")
                    }
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

export default LinkedInJobs;
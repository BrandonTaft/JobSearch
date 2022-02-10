//import JobsService from "../services/jobs-service";
import React, { useState, useEffect } from 'react';
import http from "../http";
function GetGoogleJobs() {

    const [googleJobs, setGoogleJobs] = useState([])

    useEffect(() => {
        const getGoogleJobs = () => {
            http.get('http://localhost:8001/api/googlejobs')
                
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



    return (
        <ul>{googleJobs}</ul>
    )
}

export default GetGoogleJobs;
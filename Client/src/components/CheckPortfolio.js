import JobsService from "../services/jobs-service";
import { useState } from 'react';

function CheckPortfolio() {
    const [pic, setPic] = useState([])
    //const getPic = () => {
        JobsService.checkPortfolio()
            .then(response => {
                setPic(response.data)
            })
            .catch(e => {
                console.log(e);
            });
   // }
    return (
        <div>
            <img src={pic} alt="Portfolio Screenshot"></img>
        </div>
    )
};

export default CheckPortfolio;
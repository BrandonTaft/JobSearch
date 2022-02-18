import JobsService from "../services/jobs-service";
import { useState } from 'react';
import style from "../css/portfolio.module.css"

function Portfolio() {
    const serverBaseURI = 'http://localhost:8001';
    const d = new Date(); 
	const date = new Date().getDay()
    const [pic, setPic] = useState([])
    JobsService.checkPortfolio()
        .then(response => {
            setPic(response.data)
        })
        .catch(e => {
            console.log(e);
        });

    return (
        <div className={style.screenshot}>
             <h1>Portfolio</h1>
            <img src={`${serverBaseURI}/screenshots/status-pic${date}.png`} alt="Portfolio Screenshot" />
        </div>
    )

}
export default Portfolio;
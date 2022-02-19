import JobsService from "../services/jobs-service";
import { useState } from 'react';
import style from "../css/portfolio.module.css";
import Navbar from "../layouts/Navbar";

function Portfolio() {
    const serverBaseURI = 'http://localhost:8001';
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
        <div className={style.screenshotContainer}>
            <Navbar />
            <img src={`${serverBaseURI}/screenshots/status-pic${date}.png`} alt="Portfolio Screenshot" />
        </div>
    )

}
export default Portfolio;
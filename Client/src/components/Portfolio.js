import { useState } from 'react';
import style from "../css/portfolio.module.css";


function Portfolio() {
    const serverBaseURI = 'http://localhost:8001';
    const date = new Date().getDay()
    const [pic, setPic] = useState([])
    const token = localStorage.getItem('token')

    fetch("http://localhost:8001/api/portfolio", {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            setPic(response.data)
        })
        .catch(e => {
            console.log(e);
        });

    return (
        <div className={style.screenshotContainer}>
            <iframe src="https://brandontaft.net" name="iframe_a" title="Portfolio" ></iframe>

            {/* <p><a href="https://brandontaft.net" target="iframe_a">View Live</a></p> */}
            {/* <iframe src={`${serverBaseURI}/screenshots/status-pic${date}.png`} name="port-iframe" alt="Portfolio Screenshot" title="Portfolio Screenshot" ></iframe>            */}
            {/* <p><a href="https://www.brandontaft.net/" target="port-iframe">View Live Portfolio</a></p> */}
            {/* <img src={`${serverBaseURI}/screenshots/status-pic${date}.png`} alt="Portfolio Screenshot" /> */}
        </div>
    )

}
export default Portfolio;
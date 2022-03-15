import React, { useState } from 'react';
import { NavLink, useNavigate} from "react-router-dom";



function Register() {
    let navigate = useNavigate();
    const [user, setUser] = useState({})
    const handleRegisterChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleRegisterButton = () => {

        fetch('http://localhost:8001/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    navigate("/");
                }
                else {
                    window.alert('THIS USER ALREADY EXISTS')
                }
            })
    }


    return (
        <div id="reg-boxes">
            <h3>Register</h3>
            <input className="textbox" type="text" name="username" onChange={handleRegisterChange} placeholder=" Enter Desired User name" required /><br></br>
            <input className="textbox" type="password" name="password" onChange={handleRegisterChange} placeholder="Enter Desired Password" required /><br></br>
            <button className="button" onClick={handleRegisterButton}>Register</button>
            <NavLink id='regLink' to="/">Back to Login</NavLink>
        </div>
    )
}

export default Register
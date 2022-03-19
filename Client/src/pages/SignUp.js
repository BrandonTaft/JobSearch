import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import style from "../css/login.module.css";
import logo from "../img/clearlogo.png";



function Register() {
    let navigate = useNavigate();
    const [user, setUser] = useState({})
    const [warning, setWarning] = useState({})
    const handleRegisterChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value

        })
    }
    const handleRegisterButton = () => {
        if (user.password !== user.verifyPassword) {
            setWarning({ message: "Passwords Must Match" })
        } else {
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
                        setWarning({ message: "THIS USER ALREADY EXISTS" })
                    }
                })
        }
    }

    return (
        <div className={style.loginWrapper}>
            <div className={style.leftLogin}>
                <div className={style.leftLoginBox}>
                    <img src={logo} alt="logo"></img>
                    <h3>Sign Up</h3>
                    <p className={style.warning}>{warning.message}</p>
                    <input className={style.textBox} type="text" name="username" onChange={handleRegisterChange} placeholder=" Enter Desired User name" required /><br></br>
                    <input className={style.textBox} type="password" name="password" onChange={handleRegisterChange} placeholder="Enter Desired Password" required /><br></br>
                    <input className={style.textBox} type="password" name="verifyPassword" onChange={handleRegisterChange} placeholder="Re-Enter Desired Password" required /><br></br>
                    <button className="button" onClick={handleRegisterButton}>Register</button>
                    <NavLink id='regLink' to="/">Back to Login</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Register
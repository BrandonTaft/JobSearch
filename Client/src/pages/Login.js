import style from "../css/login.module.css";
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import google from "../img/google.png";
import logo from "../img/clearlogo.png";





function Login() {
 
  const [credentials, setCredentials] = useState({});
  const [warning, setWarning] = useState({})
  let navigate = useNavigate();

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:8001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(credentials)
    }).then(response => response.json())
    
      .then(result => {
        if (result.success === true) {
          console.log("TEST",result.token)
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('jsonwebtoken', result.token);
          localStorage.setItem('username', result.username);
          navigate("/google", { state: { authenticated: true, token: result.token } })
        } else {
          setWarning({ message: "UMM...ARE YOU SURE YOU SHOULD BE HERE?" })
        }
        
      })
  }

 



  return (
    <div className={style.loginWrapper}>

      <div className={style.leftLogin}>
        <div className={style.leftLoginBox}>
          <img src={logo} alt="logo"></img>
          <p className={style.warning}>{warning.message}</p>
          <form className={style.loginForm} onSubmit={handleSubmit}>
            <fieldset>


              <input name="username" placeholder="Username" onChange={handleChange} value={credentials.username || ''} />
              <br /><br />
              <input name="password" placeholder="Password" onChange={handleChange} value={credentials.password || ''} />

            </fieldset>

            <button type="submit">Submit</button>
          </form>
          <NavLink to="/signup">Register Here</NavLink>
          <p>___________or___________</p>

          <a className={style.googleBtn} href="http://127.0.0.1:8001/auth/google" alt="google">
            <img className={style.googleLogo} src={google} alt="google logo" />
            <div className={style.btnText}>Log in with Google</div>
          </a>
        </div>
      </div>


    </div>
  )
}


export default Login
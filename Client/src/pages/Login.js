import style from "../css/login.module.css";
import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import google from "../img/google.png";
import logo from "../img/clearlogo.png";


function Login() {

  const [credentials, setCredentials] = useState({});
  const [warning, setWarning] = useState({})
  const navigate = useNavigate();

  //Store user input in state
  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  }

  //Prevent page reload and handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:8001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(credentials)
    }).then(response => response.json())
      //Store credentials sent back from server
      .then(result => {
        if (result.success === true) {
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('token', result.token);
          localStorage.setItem('id', result.id);
          localStorage.setItem('username', result.username);
          //Once sucessfully loged in Navigate to home page
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
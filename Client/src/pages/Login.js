import style from "../css/login.module.css";
import React, { useState } from 'react';
import { NavLink, useNavigate} from "react-router-dom";




function Login() {

  const [credentials, setCredentials] = useState({});
  let navigate = useNavigate();

  const handleChange = event => {
    setCredentials({
      ...credentials,
      //the name of input will be the name of object and value will be the value
      [event.target.name]: event.target.value
    });
    console.log(credentials.username)
  }

 function handleSubmit(event){
     event.preventDefault();
    // setSubmitting(true);

    fetch('http://localhost:8001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json())
            .then(result => {
                if (result.success === true) {
                
                    localStorage.setItem('isAuthenticated', true);
                    localStorage.setItem('jsonwebtoken', result.token);
                    localStorage.setItem('username', result.username);
                   navigate("/home", {state:{authenticated:true, token: result.token}})
                } else {
                    window.alert('HMMM...ARE YOU SURE YOU SHOULD BE HERE?')
                }
            })
    
    // console.log(credentials.username)
    // setTimeout(() => {
    //   setSubmitting(false);
    // }, 3000)
  }




  return (
    <div className={style.loginWrapper}>
      <div className={style.leftLogin}>
      <div className={style.leftLoginBox}>
      
      {/* {submitting &&
       <div>Checking Your Credentials...</div>
     } */}

      <form className={style.loginForm} onSubmit={handleSubmit}>
        <fieldset>
          
            
            <input name="username" placeholder="Username" onChange={handleChange} value={credentials.username || ''} />
            <br /><br />
            <input name="password" placeholder="Password" onChange={handleChange} value={credentials.password || ''} />
          
        </fieldset>

        <button type="submit">Submit</button>
      </form>
      <NavLink  to="/signup">Register</NavLink>
      <p>___________or___________</p>
      <form action="http://127.0.0.1:8001/auth/google">
      <button className={style.googleBtn} type="submit">
        <img className={style.googleLogo} src="/google.png" alt="google logo"/>
        <div className={style.btnText}>Log in with Google</div>
      </button>
      </form>
      </div>
      </div>
      
      
    </div>
  )
}


export default Login
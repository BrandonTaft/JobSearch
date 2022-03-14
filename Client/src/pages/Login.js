import style from "../css/login.module.css";
import React, { useReducer, useState } from 'react';
import { NavLink } from "react-router-dom";
import history from "../History";



function Login(props) {

  const [credentials, setCredentials] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = event => {
    setCredentials({
      ...credentials,
      //the name of input will be the name of object and value will be the value
      [event.target.name]: event.target.value
    });
    console.log(credentials.username)
  }

  const handleSubmit = event => {
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
                    localStorage.setItem('jsonwebtoken', result.token)
                    localStorage.setItem('username', result.username)
                    props.history.push('/home')
                    console.log(result)
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
    <div className={style.wrapper}>
      <h1>LogIn</h1>
      {/* {submitting &&
       <div>Checking Your Credentials...</div>
     } */}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            {/* <input name="Username" onChange={handleChange} /> */}
            <input name="username" onChange={handleChange} value={credentials.username || ''} />
            <input name="password" onChange={handleChange} value={credentials.password || ''} />
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
      <NavLink  to="/signup">Register</NavLink>
      <p>{credentials.username}</p>
    </div>
  )
}


export default Login
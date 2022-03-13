import style from "../css/login.module.css";
import React, { useReducer, useState } from 'react';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }

function Login() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
   setSubmitting(true);

   setTimeout(() => {
     setSubmitting(false);
   }, 3000)
 }
 
 const handleChange = event => {
  setFormData({
    name: event.target.name,
    value: event.target.value,
  });
}

  
    return(
        <div className={style.wrapper}>
          <h1>How About Them Apples</h1>
          {/* {submitting &&
       <div>Submtting Form...</div>
     } */}
     {submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
      }
          <form onSubmit={handleSubmit}>
          <fieldset>
          <label>
            <p>Name</p>
            <input name="name" onChange={handleChange}/>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
      )
    }
    

export default Login
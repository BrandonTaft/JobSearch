import style from "../css/login.module.css";
import React, { useReducer, useState } from 'react';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

function Login() {
  // const [formData, setFormData] = useReducer(formReducer, {});
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
  }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      ...formData,
      //the name of input will be the name of object and value will be the value
      //[event.target.name]: event.target.value


      [event.target.name] : isCheckbox ? event.target.checked : event.target.value,
    });
    console.log(formData.Username)
  }


  return (
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
            {/* <input name="Username" onChange={handleChange} /> */}
            <input name="name" onChange={handleChange} value={formData.name || ''}/>
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Apples</p>
            {/* <select name="apple" onChange={handleChange}> */}
            <select name="apple" onChange={handleChange} value={formData.apple || ''}>
              <option value="">--Please choose an option--</option>
              <option value="fuji">Fuji</option>
              <option value="jonathan">Jonathan</option>
              <option value="honey-crisp">Honey Crisp</option>
            </select>
          </label>
          <label>
            <p>Count</p>
            {/* <input type="number" name="count" onChange={handleChange} step="1" /> */}
            <input type="number" name="count" onChange={handleChange} step="1" value={formData.count || ''}/>
          </label>
          <label>
            <p>Gift Wrap</p>
            {/* <input type="checkbox" name="giftwrap" onChange={handleChange} /> */}
            <input type="checkbox" name="gift-wrap" onChange={handleChange} checked={formData['gift-wrap'] || false}/>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <p>{formData.Username}</p>
      <p>{formData.giftwrap}</p>
    </div>
  )
}


export default Login
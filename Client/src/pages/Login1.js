import style from "../css/login.module.css";
import { useEffect, useState } from 'react';
import googleLogo from '../img/google.png';
import { loadGoogleScript } from '../middleware/GoogleLogIn';
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState();
  
  const onSuccess = (googleUser) => {
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };
  
  const onFailure = () => {
    setIsLoggedIn(false);
  }
  
  const logOut = () => {
    (async() => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };
  
  const renderSigninButton = (_gapi) => {
    _gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure 
    });
  }
  
  
  useEffect(() => {
    
    //window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
     
      const _gapi = window.gapi;
      setGapi(_gapi);
      
      _gapi.load('auth2', () => {
        (async () => { 
          const _googleAuth = await _gapi.auth2.init({
           client_id: googleClientId
          });
          setGoogleAuth(_googleAuth);
          renderSigninButton(_gapi);
        })();
      });
    }
    
    //ensure everything is set before loading the script
    loadGoogleScript();
    
  }, []);
  
  
  return (
    <div className="App">
      <header className="App-header">
      <div >
                <a href="http://127.0.0.1:8001/auth/google">
                    <img id="icon" src={googleLogo} alt="Login With Google" ></img>
                </a>
                </div>        
                
        {!isLoggedIn &&
          <div id="google-signin"></div>
        }
         
        {isLoggedIn &&
          <div>
            <div>
              <img src={imageUrl} />
            </div>
            <div>{name}</div>
            <div>{email}</div>
            <button className='btn-primary' onClick={logOut}>Log Out</button>
          </div>
        }
      </header>
    </div>
  );
}

export default Login

{/* <fieldset>
          <label>
            <p>Apples</p>
            {/* <select name="apple" onChange={handleChange}> */}
          //   <select name="apple" onChange={handleChange} value={formData.apple || ''}>
          //     <option value="">--Please choose an option--</option>
          //     <option value="fuji">Fuji</option>
          //     <option value="jonathan">Jonathan</option>
          //     <option value="honey-crisp">Honey Crisp</option>
          //   </select>
          // </label>
          // <label>
          //   <p>Count</p>
            {/* <input type="number" name="count" onChange={handleChange} step="1" /> */}
          //   <input type="number" name="count" onChange={handleChange} step="1" value={formData.count || ''}/>
          // </label>
          // <label>
          //   <p>Gift Wrap</p>
            {/* <input type="checkbox" name="giftwrap" onChange={handleChange} /> */}
        //     <input type="checkbox" name="gift-wrap" onChange={handleChange} checked={formData['gift-wrap'] || false}/>
        //   </label>
        // </fieldset> */}

        // {submitting &&
        //   <div>
        //     You are submitting the following:
        //     <ul>
        //       {Object.entries(formData).map(([name, value]) => (
        //         <li key={name}><strong>{name}</strong>:{value.toString()}</li>
        //       ))}
        //     </ul>
        //   </div>
        // }


        // const [formData, setFormData] = useReducer(formReducer, {});
        // const formReducer = (state, event) => {
        //   return {
        //     ...state,
        //     [event.name]: event.value
        //   }
        // }

        // const handleChange = event => {
        //   const isCheckbox = event.target.type === 'checkbox';
        //   setCredentials({
        //     ...credentials,
        //     //the name of input will be the name of object and value will be the value
        //     //[event.target.name]: event.target.value
      
      
        //     [event.target.name] : isCheckbox ? event.target.checked : event.target.value,
        //   });
        //   console.log(credentials.Username)
        // }

      //   return (
      //     <div className={style.wrapper}>
      //       <h1>LogIn</h1>
      //       {/* {submitting &&
      //        <div>Checking Your Credentials...</div>
      //      } */}
            
      //       <form onSubmit={handleSubmit}>
      //         <fieldset>
      //           <label>
      //             <p>Name</p>
      //             {/* <input name="Username" onChange={handleChange} /> */}
      //             <input name="username" onChange={handleChange} value={credentials.username || ''}/>
      //             <input name="password" onChange={handleChange} value={credentials.password || ''}/>
      //           </label>
      //         </fieldset>
              
      //         <button type="submit">Submit</button>
      //       </form>
      //       <p>{credentials.Username}</p>
      //     </div>
      //   )
      // }
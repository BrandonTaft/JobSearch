import React, { useEffect} from "react";
import { useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

function Logout(){
    const navigate = useNavigate();
    function signOut(){
    
        localStorage.clear();
        Cookies.remove('jsonwebtoken')
        navigate("/")
}
useEffect(() => {
    signOut();
}, );

}
export default Logout
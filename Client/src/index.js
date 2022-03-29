import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import SignUp from "./pages/SignUp";
import Portfolio from "./components/Portfolio";
import GoogleJobs from "./components/GoogleJobs";
import LinkedInJobs from "./components/LinkedInJobs";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "./History";
import SavedJobs from "./components/SavedJobs";

// const [isLoggedIn] = useState(true)

ReactDOM.render(


  <React.StrictMode>
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/google" element={<GoogleJobs />} />
        <Route path="/linkedin" element={<LinkedInJobs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/saved" element={<SavedJobs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

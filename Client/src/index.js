import React, { useState } from "react";
import ReactDOM from "react-dom";
import {BrowserRouter , Route, Routes, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Portfolio from "./components/Portfolio";
import GoogleJobs from "./components/GoogleJobs";
import LinkedInJobs from "./components/LinkedInJobs";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layouts/Navbar";
import history from "./History";

// const [isLoggedIn] = useState(true)

ReactDOM.render(


  <React.StrictMode>
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/google" element={<GoogleJobs />} />
        <Route path="/linkedin" element={<LinkedInJobs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import history from "./History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Portfolio from "./components/Portfolio";
import GoogleJobs from "./components/GoogleJobs";
import LinkedInJobs from "./components/LinkedInJobs";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layouts/Navbar";

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/google" element={<GoogleJobs />} />
        <Route path="/linkedin" element={<LinkedInJobs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

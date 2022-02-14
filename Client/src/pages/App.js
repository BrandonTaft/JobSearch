import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../App.css";
import "../css/responsive.css"
import Loader from "../components/Loader"
import GetGoogleJobs from "./GetGoogleJobs";
import CheckPortfolio from "./CheckPortfolio";
import PageNotFound from "../components/PageNotFound";
function App() {
  
  return (
    <div className="container mt-3">
      hey
      <Routes>
        <Route exact path="/google-jobs" element={<GetGoogleJobs />} />
        <Route exact path="/portfolio" element={<CheckPortfolio />} />
        {/* <Route path="/*" element={<PageNotFound/>}/> */}
      </Routes>
    </div>
  );
}

export default App;

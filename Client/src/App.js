import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import GetGoogleJobs from "./components/GetGoogleJobs";
import CheckPortfolio from "./components/CheckPortfolio";
import PageNotFound from "./components/PageNotFound";
function App() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/google-jobs" className="navbar-brand">
            My Google Jobs
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/google-jobs"} className="nav-link">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/portfolio"} className="nav-link">
                Check Portfolio
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
          <Route exact path="/google-jobs" element={<GetGoogleJobs/>}/>
          <Route exact path="/portfolio" element={<CheckPortfolio/>}/>
          <Route path="/*" element={<PageNotFound/>}/>
          </Routes>
        </div>
      </div>
    );
  }

export default App;

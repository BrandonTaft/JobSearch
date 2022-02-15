import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import Navbar from "./layouts/Navbar2";
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
  <Router>
  <Navbar />
  <App />
  <Home />
  </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

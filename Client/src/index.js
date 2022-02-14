import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import App from "./pages/App";
import Navbar from "./layouts/Navbar";
//import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
  <Navbar />
  <App />
  </BrowserRouter>,
  document.getElementById("root")
);


//serviceWorker.unregister();
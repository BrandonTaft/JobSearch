import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckPortfolio from "./components/CheckPortfolio"
import Home from "./pages/Home";



function App() {

  return (
    <div>
    <Routes>
      <Route exact path="/" component={Home} />
      <Route exact path="/portfolio" component={CheckPortfolio} />

    </Routes>
    </div>
  );
}

export default App;

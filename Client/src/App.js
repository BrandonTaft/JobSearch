import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";


function App() {

  return (
    <div>
    <Routes>
      <Route exact path="/" component={Home} />

    </Routes>
    </div>
  );
}

export default App;

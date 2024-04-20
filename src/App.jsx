import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalculateAll from "./Pages/CalculateAll";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CalculateAll />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

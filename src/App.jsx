import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalculateAll from "./Pages/CalculateAll";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<CalculateAll />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;

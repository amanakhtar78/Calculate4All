import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalculateAll from "./Pages/CalculateAll";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Home from "./Components/Home";
import LumSum from "./Pages/SipCalculator/LumSum";
import PPF from "./Pages/SipCalculator/PPF";
import SipCalculatator from "./Pages/SipCalculator/SipCalculatator";
import SipCalculateWithStepUp from "./Pages/SipCalculator/SipCalculateWithStepUp";
import SukanyaSamriddhiYojanaCalculator from "./Pages/SipCalculator/SukanyaSamriddhiYojanaCalculator";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/CalculateAll" element={<CalculateAll />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/CalculateAll/LumSum" element={<LumSum />} />
        <Route path="/CalculateAll/PPF" element={<PPF />} />
        <Route
          path="/CalculateAll/SipCalculatator"
          element={<SipCalculatator />}
        />
        <Route
          path="/CalculateAll/SipCalculateWithStepUp"
          element={<SipCalculateWithStepUp />}
        />
        <Route
          path="/CalculateAll/SukanyaSamriddhiYojanaCalculator"
          element={<SukanyaSamriddhiYojanaCalculator />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

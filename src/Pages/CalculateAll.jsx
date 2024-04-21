import React from "react";
import SipCalculatator from "./SipCalculator/SipCalculatator";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const CalculateAll = () => {
  return (
    <div>
      <Navbar />
      <p></p>
      <SipCalculatator />
      <p></p>
      <Footer />
    </div>
  );
};

export default CalculateAll;

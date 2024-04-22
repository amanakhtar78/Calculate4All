import React, { useState, useEffect } from "react";
import SipCalculatator from "./SipCalculator/SipCalculatator";
import SipCalculateWithStepUp from "./SipCalculator/SipCalculateWithStepUp";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const CalculateAll = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <Navbar />
      {activeTab == 0 && (
        <div className="flex gap-2 items-baseline">
          <p className="text-blue-950 font-semibold text-[30px]  ">
            Sip <span className="text-green-700">Calculator</span>
          </p>{" "}
          <p
            className="text-blue-950 font-semibold text-[16px] bg-slate-100 p-1 rounded  cursor-pointer"
            onClick={() => setActiveTab(1)}
          >
            Step up Sip <span className="text-green-700"></span>
          </p>{" "}
        </div>
      )}
      {activeTab == 1 && (
        <div className="flex  gap-2 items-baseline">
          <p className="text-blue-950 font-semibold text-[30px]  ">
            Step Up Sip <span className="text-green-700">Calculator</span>
          </p>{" "}
          <p
            className="text-blue-950 font-semibold text-[16px] bg-slate-100 p-1 rounded cursor-pointer"
            onClick={() => setActiveTab(0)}
          >
            Simple Sip <span className="text-green-700"></span>
          </p>{" "}
        </div>
      )}
      {activeTab == 0 && <SipCalculatator />}
      {activeTab == 1 && <SipCalculateWithStepUp />}
      <p></p>
      <Footer />
    </div>
  );
};

export default CalculateAll;

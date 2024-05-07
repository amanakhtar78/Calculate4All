import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import SipCalculatator from "./SipCalculator/SipCalculatator";
import SipCalculateWithStepUp from "./SipCalculator/SipCalculateWithStepUp";
import LumSum from "./SipCalculator/LumSum";
import PPF from "./SipCalculator/PPF";
import SukanyaSamriddhiYojanaCalculator from "./SipCalculator/SukanyaSamriddhiYojanaCalculator";

const CalculateAll = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [selectedComponent, setSelectedComponent] = useState({
    value: queryParams.get("calculator") || "SipCalculatator",
    label: queryParams.get("label") || "Sip Calculatator",
  });

  const options = [
    {
      value: "SipCalculatator",
      label: "Sip Calculatator",
    },
    {
      value: "SipCalculateWithStepUp",
      label: "Step Up Sip Calculatator",
    },
    {
      value: "LumSum",
      label: "Lum Sum Calculatator",
    },
    {
      value: "PPF",
      label: "PPF Calculatator",
    },
    {
      value: "SukanyaSamriddhiYojanaCalculator",
      label: "Sukanya Samriddhi Yojana Calculator",
    },
  ];

  const handleChange = (selectedOption) => {
    setSelectedComponent(selectedOption);
    // You can navigate to another page here if needed
  };

  return (
    <div>
      <div
        className="w-auto lg:w-[400px] mx-[2%] mt-[1%] font-extrabold  bg-white"
        style={{ zIndex: 999 }}
      >
        <Select
          className="z-50"
          value={selectedComponent}
          onChange={handleChange}
          options={options}
          placeholder="Select Component"
        />
      </div>

      <div>
        {selectedComponent.value === "SipCalculatator" && <SipCalculatator />}
        {selectedComponent.value === "SipCalculateWithStepUp" && (
          <SipCalculateWithStepUp />
        )}
        {selectedComponent.value === "LumSum" && <LumSum />}
        {selectedComponent.value === "PPF" && <PPF />}
        {selectedComponent.value === "SukanyaSamriddhiYojanaCalculator" && (
          <SukanyaSamriddhiYojanaCalculator />
        )}
      </div>
    </div>
  );
};

export default CalculateAll;

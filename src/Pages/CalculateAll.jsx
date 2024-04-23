import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Select from "react-select";

import SipCalculatator from "./SipCalculator/SipCalculatator";
import SipCalculateWithStepUp from "./SipCalculator/SipCalculateWithStepUp";
const CalculateAll = () => {
  const navigate = useNavigate();

  const [selectedComponent, setSelectedComponent] = useState({
    value: "SipCalculatator",
    label: "Sip Calculatator ",
  });
  const options = [
    {
      value: "SipCalculatator",
      label: "Sip Calculatator ",
    },
    {
      value: "SipCalculateWithStepUp",
      label: "Step Up Sip",
    },
  ];

  const handleChange = (selectedOption) => {
    setSelectedComponent(selectedOption);
  };

  return (
    <div>
      <div
        className="w-auto lg:w-[400px] mx-[2%] mt-[1%] font-extrabold "
        style={{ zIndex: 999 }}
      >
        <Select
          value={selectedComponent}
          onChange={handleChange}
          options={options}
          placeholder="Select Component"
        />
      </div>

      <div>
        {selectedComponent && selectedComponent.value === "SipCalculatator" && (
          <SipCalculatator />
        )}
        {selectedComponent &&
          selectedComponent.value === "SipCalculateWithStepUp" && (
            <SipCalculateWithStepUp />
          )}
      </div>
    </div>
  );
};

export default CalculateAll;

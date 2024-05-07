import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const PPF = () => {
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    setShowHeading(url.includes("CalculateAll/"));
  }, []);
  console.log(showHeading);
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [monthlyInvestmentSlider, setMonthlyInvestmentSlider] =
    useState("5000");
  const [expectedReturn, setExpectedReturn] = useState("7.1");
  const [expectedReturnSlider, setExpectedReturnSlider] = useState("7.1");
  const [timePeriod, setTimePeriod] = useState("10");
  const [timePeriodSlider, setTimePeriodSlider] = useState("10");
  const [investmentInterval, setInvestmentInterval] = useState("monthly");

  const getMaxInvestmentValue = () => {
    switch (investmentInterval) {
      case "daily":
        return 100000;
      case "weekly":
        return 500000;
      case "monthly":
        return 1000000;
      case "quarterly":
        return 3000000;
      case "yearly":
        return 12000000;
      default:
        return 1000000; // Default to monthly investment limit
    }
  };
  const maxmoneyyear = {
    daily: 410,
    weekly: 410 * 7,
    monthly: 12500,
    quarterly: 12500 * 3,
    yearly: 150000,
  };

  const handleInputChange = (e, setState, setSliderState) => {
    let value = e.target.value.trim(); // Trim whitespace
    if (value === "") {
      setState(""); // Set state to empty string
      setSliderState(""); // Set slider state to empty string
      return; // Exit function
    }
    value = parseInt(value.replace(/\D/g, "")); // Remove non-digit characters and convert to integer
    const maxValue = Math.min(
      getMaxInvestmentValue(),
      maxmoneyyear[investmentInterval]
    ); // Get the minimum of max investment value and maxmoneyyear

    // Check if the input value exceeds the maximum allowed value
    if (value > maxValue) {
      value = maxValue; // Set the value to the maximum allowed value
    }

    setState(value);
    setSliderState(value);
  };

  const handleSliderChange = (e, setState, setSliderState) => {
    const value = e.target.value;
    const maxValue = Math.min(
      getMaxInvestmentValue(),
      maxmoneyyear[investmentInterval]
    ); // Get the minimum of max investment value and maxmoneyyear

    // Check if the slider value exceeds the maximum allowed value
    if (value > maxValue) {
      setState(maxValue); // Set the state to the maximum allowed value
      setSliderState(maxValue);
    } else {
      setState(value);
      setSliderState(value);
    }
  };

  const getButtonTextAndColor = (interval) => {
    const text = interval.charAt(0).toUpperCase() + interval.slice(1); // Capitalize first letter
    return {
      text,
      color: interval === investmentInterval ? "green" : "slate",
    };
  };

  //

  const [sipData, setSipData] = useState([]);

  useEffect(() => {
    calculateSipValues();
  }, [monthlyInvestment, expectedReturn, timePeriod, investmentInterval]);

  const calculateSipValues = () => {
    const sipValues = [];
    let totalPayments = 0;
    let periodicRate = 0;

    switch (investmentInterval) {
      case "daily":
        totalPayments = timePeriod * 365; // Total number of payments for daily intervals
        periodicRate = expectedReturn / (365 * 100); // Daily rate of interest
        break;
      case "weekly":
        totalPayments = timePeriod * 52; // Total number of payments for weekly intervals
        periodicRate = expectedReturn / (52 * 100); // Weekly rate of interest
        break;
      case "monthly":
        totalPayments = timePeriod * 12; // Total number of payments for monthly intervals
        periodicRate = expectedReturn / (12 * 100); // Monthly rate of interest
        break;
      case "quarterly":
        totalPayments = timePeriod * 4; // Total number of payments for quarterly intervals
        periodicRate = expectedReturn / (4 * 100); // Quarterly rate of interest
        break;
      case "yearly":
        totalPayments = timePeriod; // Total number of payments for yearly intervals
        periodicRate = expectedReturn / 100; // Yearly rate of interest
        break;
      default:
        break;
    }

    const P = monthlyInvestment; // Amount invested at regular intervals
    const r = periodicRate;
    const n = totalPayments;

    // Future value calculation formula for SIP
    const M = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    // Round the result to 2 decimal places
    const roundedROI = parseFloat(M.toFixed(2));

    sipValues.push({
      invested: totalPayments * monthlyInvestment,
      roi: roundedROI - totalPayments * monthlyInvestment,
    });

    setSipData(sipValues);
  };

  const calculateSipValuesPerYear = () => {
    const sipValuesPerYear = [];
    let totalInvestedAmount = 0;
    let totalReturnOnInvestment = 0;

    for (let year = 1; year <= timePeriod; year++) {
      const sipValues = calculateSipValuesForYear(year);
      sipValuesPerYear.push({
        year,
        invested: sipValues.invested,
        roi: sipValues.roi,
      });
      totalInvestedAmount += sipValues.invested;
      totalReturnOnInvestment += sipValues.roi;
    }

    return {
      sipValuesPerYear,
      totalInvestedAmount,
      totalReturnOnInvestment,
    };
  };

  const calculateSipValuesForYear = (year) => {
    let totalPayments = 0;
    let periodicRate = 0;

    switch (investmentInterval) {
      case "daily":
        totalPayments = year * 365; // Total number of payments for daily intervals
        periodicRate = expectedReturn / (365 * 100); // Daily rate of interest
        break;
      case "weekly":
        totalPayments = year * 52; // Total number of payments for weekly intervals
        periodicRate = expectedReturn / (52 * 100); // Weekly rate of interest
        break;
      case "monthly":
        totalPayments = year * 12; // Total number of payments for monthly intervals
        periodicRate = expectedReturn / (12 * 100); // Monthly rate of interest
        break;
      case "quarterly":
        totalPayments = year * 4; // Total number of payments for quarterly intervals
        periodicRate = expectedReturn / (4 * 100); // Quarterly rate of interest
        break;
      case "yearly":
        totalPayments = year; // Total number of payments for yearly intervals
        periodicRate = expectedReturn / 100; // Yearly rate of interest
        break;
      default:
        break;
    }

    const P = monthlyInvestment; // Amount invested at regular intervals
    const r = periodicRate;
    const n = totalPayments;

    // Future value calculation formula for SIP
    const M = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    // Round the result to 2 decimal places
    const roundedROI = parseFloat(M.toFixed(2));

    return {
      invested: totalPayments * monthlyInvestment,
      roi: roundedROI - totalPayments * monthlyInvestment,
    };
  };

  const { sipValuesPerYear, totalInvestedAmount, totalReturnOnInvestment } =
    calculateSipValuesPerYear();

  //

  const investedAmount = sipData.reduce((acc, curr) => acc + curr.invested, 0);
  const returnOnInvestment = sipData.reduce((acc, curr) => acc + curr.roi, 0);
  const threshold = 10000; // Threshold after which to display values in

  return (
    <div className="lg:mx-5 mx-2">
      <h2 className="mt-2 font-extrabold">
        {showHeading ? <h1>PPF Calculatator</h1> : <h1></h1>}
      </h2>
      <header className="lg:flex justify-between items-baseline text-2xl mt-3">
        {/* <p className="text-blue-950 font-semibold text-[30px]  ">
          Sip <span className="text-green-700">Calculator</span>
        </p> */}
        <div className="flex gap-2 my-2 ">
          {["daily", "weekly", "monthly", "quarterly", "yearly"].map(
            (interval) => (
              <button
                key={interval}
                onClick={() => setInvestmentInterval(interval)}
                className={`px-2 lg:text-[15px] text-[12px] font-semibold ${
                  interval === investmentInterval
                    ? "bg-green-200 text-green-950"
                    : "bg-slate-200 text-slate-900"
                } rounded`}
              >
                {getButtonTextAndColor(interval).text}
              </button>
            )
          )}
        </div>
      </header>
      <main className="lg:flex justify-between w-full gap-3">
        <section className="my-5 flex flex-col gap-4 p-2 border-[2px] border-solid border-gray-300 lg:w-1/2 rounded">
          <div className="h-[70px] flex flex-col justify-between">
            <aside className="flex justify-between items-end relative">
              <p className="capitalize">{investmentInterval} Investment</p>
              <input
                type="text"
                value={monthlyInvestment?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    setMonthlyInvestment,
                    setMonthlyInvestmentSlider
                  )
                }
                className="bg-slate-100 text-right px-1 pr-8 rounded items-end h-[30px] w-[150px]"
              />
              <span className="absolute right-2 p-[2px] font-semibold italic text-green-700">
                Rs
              </span>
            </aside>
            <p className="text-right text-[10px] font-semibold text-red-500">
              {monthlyInvestment <= 0 && (
                <p>Investment Cant Be less than 500</p>
              )}
            </p>
            <input
              type="range"
              min="100"
              max={maxmoneyyear[investmentInterval]}
              value={monthlyInvestmentSlider}
              onChange={(e) =>
                handleSliderChange(
                  e,
                  setMonthlyInvestment,
                  setMonthlyInvestmentSlider
                )
              }
              className="bg-slate-100 text-right  rounded items-end w-full"
            />
          </div>
          <div className="h-[70px] flex flex-col justify-between">
            <aside className="flex justify-between items-end relative">
              <p>Expected Return</p>
              <input
                type="text"
                value={expectedReturn}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    setExpectedReturn,
                    setExpectedReturnSlider
                  )
                }
                className="bg-slate-100 text-right px-1 pr-8 rounded items-end h-[30px] w-[150px]"
              />
              <span className="absolute right-2 p-[2px] font-semibold italic text-green-700">
                %
              </span>
            </aside>
            <input
              type="range"
              min="1"
              max="15"
              value={expectedReturnSlider}
              onChange={(e) =>
                handleSliderChange(
                  e,
                  setExpectedReturn,
                  setExpectedReturnSlider
                )
              }
              className="bg-slate-100 text-right  rounded items-end w-full"
            />
          </div>
          <div className="h-[70px] flex flex-col justify-between">
            <aside className="flex justify-between items-end relative">
              <p>Time Period</p>
              <input
                type="text"
                value={timePeriod}
                onChange={(e) =>
                  handleInputChange(e, setTimePeriod, setTimePeriodSlider)
                }
                className="bg-slate-100 text-right px-1 pr-8 rounded items-end h-[30px] w-[150px]"
              />
              <span className="absolute right-2 p-[2px] font-semibold italic text-green-700">
                Yr
              </span>
            </aside>
            <input
              type="range"
              min="1"
              max="60"
              value={timePeriodSlider}
              onChange={(e) =>
                handleSliderChange(e, setTimePeriod, setTimePeriodSlider)
              }
              className="bg-slate-100 text-right  rounded items-end w-full"
            />
          </div>
        </section>
        <section className="my-5 flex flex-col  p-2 border-[2px] border-solid border-gray-300 lg:w-1/2 rounded">
          <div className="w-full">
            <p>Invested amount &nbsp;</p>
            <input
              type="text"
              value={
                isNaN(investedAmount)
                  ? "0"
                  : investedAmount?.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })
              }
              className="bg-slate-100 text-right px-1 pr-8 rounded items-end h-[30px]     w-full "
            />{" "}
            <span className="absolute lg:right-[35px] right-[26px] p-[2px] font-semibold italic text-green-700">
              Rs
            </span>
          </div>
          <div className="w-full">
            <p>Est returns &nbsp;</p>
            <input
              type="text"
              value={
                isNaN(returnOnInvestment)
                  ? "0"
                  : returnOnInvestment?.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })
              }
              className="bg-slate-100 text-right px-1 pr-8 rounded items-end h-[30px]     w-full"
            />{" "}
            <span className="absolute lg:right-[35px] right-[26px] p-[2px] font-semibold italic text-green-700">
              Rs
            </span>
          </div>
          <div className="w-full">
            <p>Total Maturity &nbsp;</p>
            <input
              type="text"
              value={
                (isNaN(returnOnInvestment) ? 0 : returnOnInvestment) +
                (isNaN(investedAmount) ? 0 : investedAmount)?.toLocaleString(
                  "en-IN",
                  { maximumFractionDigits: 0 }
                )
              }
              className="bg-slate-100 text-right px-1 pr-8 rounded items-end h-[30px]      w-full"
            />{" "}
            <span className="absolute lg:right-[35px] right-[26px] p-[2px] font-semibold italic text-green-700">
              Rs
            </span>
          </div>
        </section>
      </main>
      <div className="w-full lg:flex gap-3 justify-between">
        <aside className="lg:w-1/2 ">
          <ReactApexChart
            options={{
              labels: ["Invested ", "Return"], // Labels for the pie chart
              title: {
                text: "PAI",
              },
              dataLabels: {
                enabled: true, // Enable data labels for the pie chart
              },
              tooltip: {
                enabled: true,
                y: {
                  formatter: function (val) {
                    return "Amount: " + val; // Customize tooltip format
                  },
                },
              },
            }}
            series={[investedAmount, returnOnInvestment]} // Assign your calculated values here
            type="pie" // Set chart type to "pie"
            height={300}
          />{" "}
        </aside>
        <aside className="lg:w-1/2 ">
          <ReactApexChart
            options={{
              chart: {
                id: "bar-chart",
              },
              title: {
                text: "BAR",
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              xaxis: {
                categories: ["Investment vs Return"], // X-axis categories
              },
              yaxis: {
                title: {
                  text: "Amount",
                },
                labels: {
                  formatter: function (value) {
                    return value.toFixed(2);
                  },
                },
              },
              dataLabels: {
                enabled: false,
              },
            }}
            series={[
              {
                name: "Invested Amount",
                data: [investedAmount],
              },
              {
                name: "Return On Investment",
                data: [returnOnInvestment],
              },
            ]}
            type="bar"
            height={300}
          />{" "}
        </aside>
      </div>
      <aside className="overflow-auto">
        <div
          className={`${
            timePeriod > 20 ? "w-[1000px] lg:w-[98%]" : "lg:w-[98%]"
          }`}
        >
          <ReactApexChart
            options={{
              chart: {
                type: "bar",
                height: 350,
              },
              title: {
                text: "YEARLY BAR",
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              xaxis: {
                categories: sipValuesPerYear.map((data) => data.year), // X-axis categories
                title: {
                  text: "Years",
                },
              },
              yaxis: {
                title: {
                  text: "Amount",
                },
                labels: {
                  formatter: function (value) {
                    if (value >= threshold) {
                      return (value / 1000).toFixed(1) + "k"; // Convert value to thousands
                    } else {
                      return value.toFixed(2);
                    }
                  },
                },
              },
              fill: {
                opacity: 1,
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return "Rs " + val + "";
                  },
                },
              },
            }}
            series={[
              {
                name: "Invested Amount",
                data: sipValuesPerYear.map((data) => data.invested.toFixed(2)),
              },
              {
                name: "Return on Investment",
                data: sipValuesPerYear.map((data) => data.roi.toFixed(2)),
              },
            ]}
            type="bar"
            height={350}
          />
        </div>
      </aside>{" "}
      <aside
        className={`${
          timePeriod > 20 ? "overflow-auto lg:overflow-hidden " : ""
        }`}
      >
        <div
          className={`${
            timePeriod > 20 ? "w-[1000px] lg:w-[95%] " : "lg:w-[95%]"
          }`}
        >
          <ReactApexChart
            options={{
              chart: {
                id: "area-chart",
                height: 350,
              },
              title: {
                text: "YEARLY AREA",
              },
              xaxis: {
                categories: sipValuesPerYear.map((data) => data.year), // Assuming x-axis as years
                title: {
                  text: "Years",
                },
              },
              yaxis: {
                title: {
                  text: "Amount",
                },
                labels: {
                  formatter: function (value) {
                    if (value >= threshold) {
                      return (value / 1000).toFixed(1) + "k"; // Convert value to thousands
                    } else {
                      return value.toFixed(2);
                    }
                  },
                },
              },
              dataLabels: {
                enabled: false,
              },
            }}
            series={[
              {
                name: "Invested Amount",
                data: sipValuesPerYear.map((data) => data.invested.toFixed(2)),
              },
              {
                name: "Return on Investment",
                data: sipValuesPerYear.map((data) => data.roi.toFixed(2)),
              },
            ]}
            type="area"
            height={300}
          />{" "}
        </div>
      </aside>{" "}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          Understanding the Public Provident Fund (PPF)
        </h1>
        <p className="text-gray-700 mb-4">
          The Public Provident Fund (PPF) is a popular long-term investment
          scheme introduced by the Government of India. It is designed to
          encourage small savings among individuals while providing attractive
          returns and income tax benefits.
        </p>
        <h2 className="text-xl font-semibold mb-2">Features of PPF</h2>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li>Long-term investment with a maturity period of 15 years</li>
          <li>
            Minimum annual investment of Rs. 500 and a maximum of Rs. 1,50,000
          </li>
          <li>Interest compounded annually and credited to the account</li>
          <li>Tax-exempt investment under Section 80C of the Income Tax Act</li>
          <li>Partial withdrawal allowed after the 7th year</li>
          <li>Loan facility available against the PPF account</li>
          <li>Account can be opened at designated banks and post offices</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Benefits of PPF</h2>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li>Stable and risk-free returns</li>
          <li>Income tax benefits on investment and interest earned</li>
          <li>Flexible investment options with low entry barriers</li>
          <li>Acts as a retirement savings tool with long-term benefits</li>
          <li>Can be used as collateral for loans</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">How PPF Works</h2>
        <p className="text-gray-700 mb-4">
          Investors can open a PPF account with a designated bank or post office
          by filling out the necessary forms and depositing the minimum amount.
          Contributions can be made either in lump sum or in installments
          throughout the year. The interest rate on PPF is set by the government
          and is subject to change periodically. The maturity amount, including
          the principal and accumulated interest, can be withdrawn tax-free at
          the end of the 15-year term.
        </p>
        <p className="text-gray-700">
          PPF offers a secure and tax-efficient investment option for
          individuals looking to build wealth over the long term while enjoying
          tax benefits and financial stability.
        </p>
      </div>
    </div>
  );
};

export default PPF;

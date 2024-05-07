import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { useLocation } from "react-router-dom";

const SipCalculatator = () => {
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    setShowHeading(url.includes("CalculateAll/"));
  }, []);
  console.log(showHeading);
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [monthlyInvestmentSlider, setMonthlyInvestmentSlider] =
    useState("5000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [expectedReturnSlider, setExpectedReturnSlider] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [timePeriodSlider, setTimePeriodSlider] = useState("10");
  const [investmentInterval, setInvestmentInterval] = useState("monthly");

  const handleInputChange = (e, setState, setSliderState) => {
    let value = e.target.value;
    setState(value);
    setSliderState(value);
  };

  const handleSliderChange = (e, setState, setSliderState) => {
    const value = e.target.value;
    setState(value);
    setSliderState(value);
  };

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
        {showHeading ? <h1>Sip Calculatator</h1> : <h1></h1>}
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
              {monthlyInvestment <= 0 && <p>Investment Cant Be ZERO</p>}
            </p>
            <input
              type="range"
              min="100"
              max={getMaxInvestmentValue()}
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
              max="100"
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
              max="100"
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
              value={investedAmount?.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
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
              value={returnOnInvestment?.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
              className="bg-slate-100 text-right px-1 pr-8 rounded items-end h-[30px]     w-full"
            />{" "}
            <span className="absolute lg:right-[35px] right-[26px] p-[2px] font-semibold italic text-green-700">
              Rs
            </span>
          </div>
          <div className="w-full">
            {" "}
            <p>Total Maturity &nbsp;</p>
            <input
              type="text"
              value={(returnOnInvestment + investedAmount)?.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 0,
                }
              )}
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
          What is a Systematic Investment Plan (SIP)?
        </h1>
        <p className="text-gray-700 mb-4">
          A Systematic Investment Plan (SIP) is a disciplined approach to
          investing in mutual funds where investors regularly contribute a fixed
          amount at predetermined intervals, typically monthly or quarterly.
          SIPs offer the advantage of rupee cost averaging and can help
          investors achieve their financial goals through systematic and
          disciplined investing over time.
        </p>
        <h2 className="text-xl font-semibold mb-2">
          Formula for SIP Investment Returns
        </h2>
        <p className="text-gray-700 mb-4">
          The formula for calculating the future value of investments through
          SIP is based on the compound interest formula:
        </p>
        <p className="text-gray-700 mb-4">( FV = P * ((1 + r)^n - 1) / r )</p>
        <p className="text-gray-700 mb-4">
          Where:
          <ul className="list-disc pl-5">
            <li>FV = Future Value of the investment</li>
            <li>P = Monthly investment amount</li>
            <li>
              r = Monthly interest rate (annual interest rate divided by 12)
            </li>
            <li>n = Number of periods (total number of contributions)</li>
          </ul>
        </p>
        <h2 className="text-xl font-semibold mb-2">Example</h2>
        <p className="text-gray-700 mb-4">
          Let's assume an investor contributes Rs 5,000 per month to a SIP for
          10 years with an expected annual return of 12%. Using the formula:
        </p>
        <p className="text-gray-700 mb-4">
          ( FV = 5000 * ((1 + 0.12/12)^(10*12) - 1) / (0.12/12) )
        </p>
        <p className="text-gray-700 mb-4">( FV ≈ 10,29,800 )</p>
        <p className="text-gray-700 mb-4">
          Therefore, the future value of the investment would be approximately
          Rs 10,29,800 after 10 years.
        </p>
      </div>
    </div>
  );
};

export default SipCalculatator;

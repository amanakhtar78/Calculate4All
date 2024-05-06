import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const OneTimeInvestment = () => {
  const [investmentAmount, setInvestmentAmount] = useState("50000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");

  const handleInputChange = (e, setState) => {
    let value = e.target.value;

    // Convert empty string to 0
    if (value === "") {
      value = 0;
    } else {
      // Convert value to number if it's not already a number
      value = isNaN(value) ? 0 : parseFloat(value);
    }

    setState(value);
  };

  const handleSliderChange = (value, setState) => {
    // Convert value to number if it's not already a number
    value = isNaN(value) ? 0 : parseFloat(value);

    setState(value);
  };

  const calculateInvestmentReturns = () => {
    // Check if any of the input values are NaN or empty
    if (
      isNaN(investmentAmount) ||
      isNaN(expectedReturn) ||
      isNaN(timePeriod) ||
      investmentAmount === "" ||
      expectedReturn === "" ||
      timePeriod === ""
    ) {
      return {
        invested: 0,
        roi: 0,
      };
    }

    const totalInvestedAmount = parseFloat(investmentAmount);
    const r = parseFloat(expectedReturn) / 100;
    const n = parseFloat(timePeriod);

    const M = totalInvestedAmount * Math.pow(1 + r, n);
    const roundedROI = parseFloat(M.toFixed(2));

    return {
      invested: totalInvestedAmount,
      roi: roundedROI - totalInvestedAmount,
    };
  };

  const { invested, roi } = calculateInvestmentReturns();

  // Function to calculate investment growth per year
  const calculateYearlyGrowth = () => {
    const yearlyGrowth = [];
    let currentInvestment = investmentAmount;
    for (let i = 1; i <= timePeriod; i++) {
      const r = expectedReturn / 100;
      const M = currentInvestment * Math.pow(1 + r, 1);
      const roundedROI = parseFloat(M.toFixed(2));
      yearlyGrowth.push(roundedROI - currentInvestment);
      currentInvestment = roundedROI;
    }
    return yearlyGrowth;
  };

  const yearlyGrowthData = calculateYearlyGrowth();

  const calculateYearlyReturns = () => {
    const totalInvestedAmount = investmentAmount;
    const r = expectedReturn / 100;

    const yearlyData = [];
    let totalGains = 0;

    for (let year = 1; year <= timePeriod; year++) {
      const M = investmentAmount * Math.pow(1 + r, year);
      const gains = M - investmentAmount;
      yearlyData.push({
        year: year,
        invested: investmentAmount,
        gains: gains,
      });
      totalGains += gains;
    }

    return { yearlyData, totalGains };
  };

  const { yearlyData, totalGains } = calculateYearlyReturns();
  return (
    <div className="lg:mx-5 mx-2">
      <main className="lg:flex justify-between w-full gap-3">
        <section className="my-5 flex flex-col  p-2 border-[2px] border-solid border-gray-300 lg:w-1/2 rounded">
          <div className="h-[60px] flex flex-col justify-between">
            <aside className="flex justify-between items-end relative">
              <p>Investment Amount</p>
              <input
                type="text"
                value={investmentAmount}
                onChange={(e) => handleInputChange(e, setInvestmentAmount)}
                className="bg-slate-100 text-right px-1 pr-8 rounded items-end h-[30px] w-[150px]"
              />
              <span className="absolute right-2 p-[2px] font-semibold italic text-green-700">
                Rs
              </span>
            </aside>
            <input
              type="range"
              min="100"
              max="1000000"
              value={investmentAmount}
              onChange={(e) =>
                handleSliderChange(e.target.value, setInvestmentAmount)
              }
              className="bg-slate-100 text-right  rounded items-end w-full"
            />
          </div>
          <div className="h-[60px] flex flex-col justify-between">
            <aside className="flex justify-between items-end relative">
              <p>Expected Return</p>
              <input
                type="text"
                value={expectedReturn}
                onChange={(e) => handleInputChange(e, setExpectedReturn)}
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
              value={expectedReturn}
              onChange={(e) =>
                handleSliderChange(e.target.value, setExpectedReturn)
              }
              className="bg-slate-100 text-right  rounded items-end w-full"
            />
          </div>
          <div className="h-[60px] flex flex-col justify-between">
            <aside className="flex justify-between items-end relative">
              <p>Time Period</p>
              <input
                type="text"
                value={timePeriod}
                onChange={(e) => handleInputChange(e, setTimePeriod)}
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
              value={timePeriod}
              onChange={(e) =>
                handleSliderChange(e.target.value, setTimePeriod)
              }
              className="bg-slate-100 text-right  rounded items-end w-full"
            />
          </div>
        </section>{" "}
        <section className="my-5 flex flex-col  p-2 border-[2px] border-solid border-gray-300 lg:w-1/2 rounded">
          <div className="w-full">
            <p>Investment Amount</p>
            <input
              type="text"
              value={Number(investmentAmount)?.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
              className="bg-slate-100 text-right px-1 pr-8 rounded items-end h-[30px]     w-full"
            />{" "}
            <span className="absolute lg:right-[35px] right-[26px] p-[2px] font-semibold italic text-green-700">
              Rs
            </span>
          </div>
          <div className="w-full">
            <p>Est returns &nbsp;</p>
            <input
              type="text"
              value={roi?.toLocaleString("en-IN", {
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
              value={(Number(invested) + Number(roi))?.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
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
            series={[Number(invested), Number(roi)]}
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
            }}
            series={[
              {
                name: "Invested Amount",
                data: [Number(invested)], // Wrap invested amount in an array
              },
              {
                name: "Return On Investment",
                data: [Number(roi)], // Wrap ROI in an array
              },
            ]}
            type="bar"
            height={300}
          />
        </aside>
      </div>

      <aside className="overflow-auto">
        <div className="w-full">
          <ReactApexChart
            options={{
              chart: {
                type: "bar",
                height: 350,
              },
              title: {
                text: "Yearly Investment vs. Gains",
              },
              xaxis: {
                categories: yearlyData.map((data) => data.year),
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
                name: "Investment",
                data: yearlyData.map((data) =>
                  Number(data.invested).toFixed(2)
                ),
              },
              {
                name: "Gains",
                data: yearlyData.map((data) => Number(data.gains).toFixed(2)),
              },
            ]}
            type="bar"
            height={350}
          />
        </div>
      </aside>
      <aside className="overflow-auto">
        <div className="w-full">
          <ReactApexChart
            options={{
              chart: {
                id: "area-chart",
                height: 350,
              },
              title: {
                text: "Yearly Investment vs. Gains (Area Chart)",
              },
              xaxis: {
                categories: yearlyData.map((data) => data.year),
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
                name: "Investment",
                data: yearlyData.map((data) =>
                  Number(data.invested).toFixed(2)
                ),
              },
              {
                name: "Gains",
                data: yearlyData.map((data) => Number(data.gains).toFixed(2)),
              },
            ]}
            type="area"
            height={350}
          />
        </div>
      </aside>
    </div>
  );
};

export default OneTimeInvestment;

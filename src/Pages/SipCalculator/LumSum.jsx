import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const OneTimeInvestment = () => {
  const [investmentAmount, setInvestmentAmount] = useState("50000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    setShowHeading(url.includes("CalculateAll/"));
  }, []);
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
      <h2 className="mt-2 font-extrabold">
        {showHeading ? <h1>LumSum Calculatator</h1> : <h1></h1>}
      </h2>
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
        <div className="">
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
        <div className="">
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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          What is a Lump Sum Investment?
        </h1>
        <p className="text-gray-700 mb-4">
          A lump sum investment refers to a single, large investment made at
          once, typically in a financial instrument such as stocks, bonds,
          mutual funds, or real estate. Unlike dollar-cost averaging, where
          investments are spread out over time, lump sum investments involve
          committing a significant amount of capital upfront.
        </p>
        <h2 className="text-xl font-semibold mb-2">
          Formula for Lump Sum Investment Returns
        </h2>
        <p className="text-gray-700 mb-4">
          The formula for calculating the future value of a lump sum investment
          is:
        </p>
        <p className="text-gray-700 mb-4">( FV = PV \times (1 + r)^n )</p>
        <p className="text-gray-700 mb-4">
          Where:
          <ul className="list-disc pl-5">
            <li> ( FV ) = Future Value of the investment </li>
            <li> ( PV ) = Present Value or initial investment amount </li>
            <li> ( r ) = Annual interest rate (as a decimal) </li>
            <li> ( n ) = Number of periods (typically in years) </li>
          </ul>
        </p>
        <h2 className="text-xl font-semibold mb-2">Example</h2>
        <p className="text-gray-700 mb-4">
          Suppose you invest 10,000 rs in a mutual fund with an expected annual
          return of 8%. How much will your investment be worth after 10 years?
        </p>
        <p className="text-gray-700 mb-4">Using the formula:</p>
        <p className="text-gray-700 mb-4">
          ( FV = 10000 \times (1 + 0.08)^{10} )
        </p>
        <p className="text-gray-700 mb-4">( FV = 10000 \times (1.08)^{10} )</p>
        <p className="text-gray-700 mb-4">( FV ≈ 21589.35 )</p>
        <p className="text-gray-700 mb-4">
          Therefore, your investment would be worth approximately 21,589.35 rs
          after 10 years.
        </p>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          Lump Sum Investment Calculator
        </h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Why Invest a Lump Sum?</h2>
          <p className="text-gray-700">
            Investing a lump sum amount can offer several advantages:
            <ul className="list-disc pl-5">
              <li>Diversification of assets</li>
              <li>
                Potential for higher returns compared to traditional savings
              </li>
              <li>Capital appreciation over time</li>
              <li>Income generation through dividends and interest</li>
            </ul>
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">When to Invest?</h2>
          <p className="text-gray-700">
            Time in the market is often more important than timing the market.
            However, it's advisable to consider the following factors when
            deciding when to invest:
            <ul className="list-disc pl-5">
              <li>Market conditions and economic outlook</li>
              <li>Personal financial goals and risk tolerance</li>
              <li>Availability of funds for investment</li>
            </ul>
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">How Much to Invest?</h2>
          <p className="text-gray-700">
            The amount to invest depends on various factors:
            <ul className="list-disc pl-5">
              <li>Financial goals and time horizon</li>
              <li>Current financial situation and income</li>
              <li>Existing investments and asset allocation</li>
            </ul>
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Other Considerations</h2>
          <p className="text-gray-700">
            Before making a lump sum investment, it's essential to:
            <ul className="list-disc pl-5">
              <li>Understand the investment vehicle and associated risks</li>
              <li>Consider diversification to mitigate risk</li>
              <li>Regularly review and adjust your investment strategy</li>
              <li>Seek advice from financial professionals if needed</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OneTimeInvestment;

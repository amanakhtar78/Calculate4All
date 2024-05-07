import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4 bg-slate-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Calculate4All!</h1>
      <p className="text-gray-700 mb-4">
        Calculate4All is your one-stop destination for financial calculators.
        Whether you're planning for your retirement, saving for your child's
        education, or looking to invest in the stock market, we have a
        calculator for all your needs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">All-in-One Calculator</h2>
          <p className="text-gray-700 mb-4">
            Access all our financial calculators in one place and simplify your
            financial planning process.
          </p>
          <Link to="/CalculateAll" className="text-blue-500 hover:underline">
            Calculate Now
          </Link>
        </div>

        <div
          className={`bg-white shadow-md rounded-lg p-6 ${
            window.location.pathname.includes("SipCalculatator")
              ? "border border-blue-500"
              : ""
          }`}
        >
          <h2 className="text-xl font-bold mb-2">SIP Calculator</h2>
          <p className="text-gray-700 mb-4">
            Plan your investments and see how systematic investment planning can
            help you achieve your financial goals.
          </p>
          <Link
            to="/CalculateAll/SipCalculatator"
            className="text-blue-500 hover:underline"
          >
            Calculate Now
          </Link>
        </div>

        {/* Card for Lump Sum Calculator */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Lump Sum Calculator</h2>
          <p className="text-gray-700 mb-4">
            Calculate the future value of a lump sum investment and plan your
            wealth accumulation strategy.
          </p>
          <Link
            to="/CalculateAll/LumSum"
            className="text-blue-500 hover:underline"
          >
            Calculate Now
          </Link>
        </div>

        {/* Card for PPF Calculator */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">PPF Calculator</h2>
          <p className="text-gray-700 mb-4">
            Estimate your returns from a Public Provident Fund (PPF) account and
            plan your long-term savings.
          </p>
          <Link
            to="/CalculateAll/PPF"
            className="text-blue-500 hover:underline"
          >
            Calculate Now
          </Link>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Step Up SIP Calculator</h2>
          <p className="text-gray-700 mb-4">
            Plan your investments with a step-up approach and see how your
            savings grow over time.
          </p>
          <Link
            to="/CalculateAll/SipCalculateWithStepUp"
            className="text-blue-500 hover:underline"
          >
            Calculate Now
          </Link>
        </div>

        {/* Card for Sukanya Samriddhi Yojana Calculator */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">
            Sukanya Samriddhi Yojana Calculator
          </h2>
          <p className="text-gray-700 mb-4">
            Estimate the returns from Sukanya Samriddhi Yojana Scheme and plan
            your daughter's future with ease.
          </p>
          <Link
            to="/CalculateAll/SukanyaSamriddhiYojanaCalculator"
            className="text-blue-500 hover:underline"
          >
            Calculate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex justify-between items-center">
        <div className="lg:flex items-center">
          <h1>Calculate4All</h1>
          <p className="lg:ml-2 font-semibold">Av Product</p>
        </div>
        <div className="my-5">
          <aside className=" space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Home
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Services
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
          </aside>
          <p className="hidden lg:block text-gray-400 lg:text-center">
            All rights reserved &copy; {currentYear}
          </p>
        </div>
        <div className="my-5">
          <p className="text-gray-400">Email: example@example.com</p>
          <p className="text-gray-400">Phone: +1234567890</p>
          <p className="text-gray-400">
            Hire me:{" "}
            <a href="#" className="text-white hover:underline">
              Your Portfolio
            </a>
          </p>
        </div>
      </div>
      <p className="block lg:hidden text-gray-400 text-center pb-3">
        All rights reserved &copy; {currentYear}
      </p>
    </footer>
  );
};

export default Footer;

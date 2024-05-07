import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-white font-bold text-xl">
            Calculate4All
          </Link>
        </div>
        {/* Hamburger menu button for small screens */}
        <div className="block lg:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white focus:outline-none focus:text-white"
          >
            {isOpen ? "-!-" : "-=-"}
          </button>
        </div>
        {/* Navbar menu for large screens */}
        <div className="hidden lg:block">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white">
                About
              </Link>
            </li>
            <li>
              <a
                href="https://amanakhtar78.github.io/portfolio-js/"
                className="text-white"
              >
                Services
              </a>
            </li>
            <li>
              <Link to="/contact" className="text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile navbar menu */}
      {isOpen && (
        <div className="lg:hidden fixed top-[40px] left-0 mt-4 w-full z-50 bg-gray-800 p-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link to="/" className="text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

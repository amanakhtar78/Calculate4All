import React, { useState } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div>
          <a href="#" className="text-white font-bold text-xl">
            Calculate4All
          </a>
        </div>
        {/* Hamburger menu button for small screens */}
        <div className="block lg:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white focus:outline-none focus:text-white"
          >
            <div className="h-6 w-8 fill-current text-lg font-bold">
              {isOpen == true ? <p>-!-</p> : <p>-=-</p>}
            </div>
          </button>
        </div>
        {/* Navbar menu for large screens */}
        <div className="hidden lg:block">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile navbar menu */}
      {isOpen && (
        <div className="lg:hidden fixed  top-[40px] left-0 mt-4 w-full z-50 bg-gray-800 p-4">
          <ul className="flex flex-col  space-y-4">
            <li>
              <a href="#" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

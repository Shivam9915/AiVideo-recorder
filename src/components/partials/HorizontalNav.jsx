import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HorizontalNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#E7E9E9] p-4 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to='/'><span className="text-blue-500 text-xl ml-3 font-black">AiVideo Recorder</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className={`block text-[#383838] hover:text-[#5D6DF4] px-2 py-1 ${isActive("/") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            Home
          </Link>

          <Link
            to="/pricing"
            className={`block text-[#383838] hover:text-[#5D6DF4] px-2 py-1 ${isActive("/pricing") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className={`block text-[#383838] hover:text-[#5D6DF4] px-2 py-1 ${isActive("/about") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`block text-[#383838] hover:text-[#5D6DF4] px-2 py-1 ${isActive("/contact") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            Contact
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className={`w-full h-10 bg-[#EFF1F1] text-[#4C4C4C] px-4 py-2 rounded border border-zinc-400 flex items-center justify-center hover:bg-transparent ${isActive("/login") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            <i className="fas fa-user text-sm mr-2"></i> Login
          </Link>
          <Link
            to="/register"
            className={`w-full h-10 bg-[#323232] text-[#EFF1F1] px-6 text-sm rounded flex items-center justify-center hover:bg-green-600 ${isActive("/register") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            Sign Up
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-gray-300 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fas fa-bars text-black hover:text-gray-900"></i>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-3 bg-gray-300 flex flex-col items-start p-4 w-full absolute left-0 top-12">
          <Link
            to="/"
            className={`block text-[#383838] hover:text-[#5D6DF4] px-2 py-1 ${isActive("/") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            Home
          </Link>
          {/* <Link
            to="/features"
            className={`block text-[#383838] hover:text-[#5D6DF4] px-2 py-1 ${isActive("/features") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            Features
          </Link> */}
          <Link
            to="/pricing"
            className={`block text-[#383838] hover:text-[#5D6DF4] px-2 py-1 ${isActive("/pricing") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className={`block text-[#383838] hover:text-[#5D6DF4] px-2 py-1 ${isActive("/about") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block text-[#383838] hover:text-[#5D6DF4] px-2 py-1 mb-10 ${isActive("/contact") ? "font-bold text-[#5D6DF4]" : ""}`}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className={`block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isActive("/login") ? "font-bold" : ""}`}
          >
            <i className="fas fa-user"></i> Login
          </Link>
          <Link
            to="/register"
            className={`block w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-3 ${isActive("/register") ? "font-bold" : ""}`}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HorizontalNav;
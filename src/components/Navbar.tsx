// components/Navbar.tsx
import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className=" text-white p-4 w-full h-24  fixed bg-[#1a1c26] ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Branding */}
       

        {/* Search Bar */}
        <div className="flex items-center bg-[#272932] rounded-lg px-6 py-1 h-12 w-1/3 ml-44">
          <FiSearch className="text-xl mr-1 text-[#8F8F8F]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white outline-none flex-grow"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-10 mr-20">
          <div className="bg-[#272932] h-14 w-14 rounded-lg flex items-center justify-center">
          <FiBell className="text-2xl text-[#8F8F8F]" />
          </div>
          <div className="bg-[#272932] h-14 w-14 rounded-lg flex items-center justify-center">
          <FaUserCircle className="text-2xl text-[#8F8F8F] "/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// components/Navbar.tsx
import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar: React.FC = () => {

  const router = useRouter()
  let user = null;

  if (typeof window !== "undefined") {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      user = JSON.parse(userData);
    } else {
      console.error("User ID not found in session storage.");
    }
  } else {
    console.error("sessionStorage is not available in this environment.");
  }

  return (
    <nav className=" text-white p-4 w-full h-24  fixed bg-[#1a1c26] z-10">
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
          <div className="bg-[#272932] h-14 w-14 rounded-lg flex items-center justify-center"
           onClick={()=>router.push('/profile')}>
          {user && user.image ? (
              <Image
                src={user.image}
                alt="User Profile"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <FaUserCircle className="text-2xl text-[#8F8F8F]" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import { serchUser } from "@/service/profilel";
import SearchResults from "./searchResults";

interface SearchResult {
  _id: string;
  profileImage?: string;
  userName: string;
}



const Navbar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();

  // Fetch user details from sessionStorage
  let user = null;
  if (typeof window !== "undefined") {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      user = JSON.parse(userData);
    }
  }

  // Handle search query change
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      try {
        // Fetch results from the API
        const response = await serchUser(value);
        setSearchResults(response);
        setShowResults(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };
  const handleResultClick = () => {
    setQuery(""); // Clear the input field
    setShowResults(false); // Hide search results
  };

  return (
    <nav className="text-white p-4 w-full h-24 fixed bg-[#1a1c26] z-10">
      <div className="container  flex justify-between items-center">
        {/* Logo */}

        {/* Search Bar */}
        <div className="relative flex items-center bg-[#272932] rounded-lg px-6 py-1 h-12 w-1/3 ml-44">
          <FiSearch className="text-xl mr-1 text-[#8F8F8F]" />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearchChange}
            className="bg-transparent text-white outline-none flex-grow"
          />
          {/* Pass Results to the SearchResults Component */}
          {showResults && (
            <SearchResults
              results={searchResults}
              onResultClick={handleResultClick}
            />
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-10 mr-20">
          {/* Bell Icon */}
          <div className="bg-[#272932] h-14 w-14 rounded-lg flex items-center justify-center">
            <FiBell className="text-2xl text-[#8F8F8F]" />
          </div>

          {/* Profile Icon */}
          <div
            className="bg-[#272932] h-14 w-14 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => router.push("/profile")}
          >
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

// components/Sidebar.tsx
import { useRouter } from "next/router";
import { GoHomeFill } from "react-icons/go";
import { GrGamepad } from "react-icons/gr";
import { PiListPlusFill } from "react-icons/pi";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { PiCoinsDuotone } from "react-icons/pi";
import { FaUserLarge } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

const Sidebar: React.FC = () => {
  const router = useRouter(); // Get the current route

  // Function to determine if the link is active
  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="w-28 bg-[#272932] text-white min-h-screen p-4 flex flex-col items-center fixed z-10">
      <h2 className="text-xl font-bold mb-8">LOGO</h2>
      <ul className="flex flex-col items-center gap-9 w-full mt-10">
        {/* Top Section */}
        <li>
          <a
            href="/"
            className={`block ${isActive("/") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
          >
            <GoHomeFill className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a
            href="/tournaments"
            className={`block ${isActive("/tournaments") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
          >
            <GrGamepad className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a
            href="/createtournament"
            className={`block ${isActive("/createtournament") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
          >
            <PiListPlusFill className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a
            href="/messages"
            className={`block ${isActive("/messages") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
          >
            <BiSolidMessageSquareDetail className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a
            href="/createpost"
            className={`block ${isActive("/createpost") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
          >
            <CiSquarePlus className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a
            href="/coins"
            className={`block ${isActive("/coins") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
          >
            <PiCoinsDuotone className="w-6 h-6" />
          </a>
        </li>

        {/* Divider */}
        <hr className="w-full border-gray-500 mt-14" />

        {/* Bottom Section */}
        <li>
          <a
            href="/about"
            className={`block ${isActive("/about") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
          >
            <FaUserLarge className="w-6 h-6" />
          </a>
        </li>
        <li >
          <a
            href="/settings"
            className={`block ${isActive("/settings") ? "text-[#6a3aba] " : "text-[#8F8F8F]"}`}
          >
            <IoSettings className="w-6 h-6" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

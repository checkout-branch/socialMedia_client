import { useRouter } from "next/router";
import { GoHomeFill } from "react-icons/go";
import { GrGamepad } from "react-icons/gr";
import { PiListPlusFill } from "react-icons/pi";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { PiCoinsDuotone } from "react-icons/pi";
import { FaUserLarge } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import Link from "next/link"; // Import Link from next

const Sidebar: React.FC = () => {
  const router = useRouter(); // Get the current route

  const isActive = (path: string) => {

    if (path === "/tournaments") {
      return router.pathname.startsWith("/tournaments");
    }
    if (path === '/createtournament') {
      return router.pathname.startsWith('/createtournament')
    }
    return router.pathname === path;
  };

  return (
    <div className="w-28 bg-[#272932] text-white min-h-screen p-4 flex flex-col items-center fixed z-20">
      <h2 className="text-xl font-bold mb-8">LOGO</h2>
      <ul className="flex flex-col items-center gap-9 w-full mt-10">
        {/* Top Section */}
        <li className="relative group">
  <Link
  
    href="/"
    passHref
    className={`block ${isActive("/") ? "text-[#6a3aba]" : "text-[#8F8F8F]"} hover:text-[#6a3aba]`}
  >
    <GoHomeFill className="w-6 h-6" />
  </Link>
  {/* Tooltip */}
  <span className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
    Home
  </span>
</li>

        <li>
          <Link href="/tournaments" passHref
            
              className={`block ${isActive("/tournaments") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
            >
              <GrGamepad className="w-6 h-6" />
            
          </Link>
        </li>
        <li>
          <Link href="/createtournament" passHref
            
              className={`block ${isActive("/createtournament") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
            >
              <PiListPlusFill className="w-6 h-6" />
            
          </Link>
        </li>
        <li>
          <Link href="/messages" passHref
          
              className={`block ${isActive("/messages") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
            >
              <BiSolidMessageSquareDetail className="w-6 h-6" />
            
          </Link>
        </li>
        <li>
          <Link href="/createpost" passHref
            
              className={`block ${isActive("/createpost") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
            >
              <CiSquarePlus className="w-6 h-6" />
            
          </Link>
        </li>
        <li>
          <Link href="/coins" passHref
            
              className={`block ${isActive("/coins") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
            >
              <PiCoinsDuotone className="w-6 h-6" />
            
          </Link>
        </li>

        {/* Divider */}
        <hr className="w-full border-gray-500 mt-14" />

        {/* Bottom Section */}
        <li>
          <Link href="/about" passHref
          
              className={`block ${isActive("/about") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
            >
              <FaUserLarge className="w-6 h-6" />
            
          </Link>
        </li>
        <li>
          <Link href="/settings" passHref
            
              className={`block ${isActive("/settings") ? "text-[#6a3aba]" : "text-[#8F8F8F]"}`}
            >
              <IoSettings className="w-6 h-6" />
            
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

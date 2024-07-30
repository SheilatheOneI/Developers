import { Link, Button } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import useAuthCtx from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { FiHelpCircle } from "react-icons/fi";

const NavbarLayout = () => {
  const { logout, isAuthenticated, user } = useAuthCtx();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/src/images/logo2.png"
              alt="Gigit logo"
              className="w-20 h-10 sm:w-24 sm:h-12"
            />
          </Link>
        </div>
        <div className="flex flex-wrap items-center space-x-1 sm:space-x-2 md:space-x-4">
          {user && (
            <div className="relative mb-2 sm:mb-0">
              <button
                className="border border-[#1C5D99] py-1 px-2 sm:px-4 rounded-full text-xs sm:text-sm"
                onClick={toggleDropdown}
              >
                Welcome {user?.first_name}
              </button>
              {isDropdownVisible && (
                <div className="absolute right-0 bg-white border border-[#1C5D99] rounded-lg shadow-md mt-1 flex flex-col py-2 px-4 justify-center items-center z-10">
                  <Link
                    key={user?._id}
                    href={`/userprofile/`}
                    className="mb-2 text-xs sm:text-sm"
                  >
                    {user?.first_name} Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-xs sm:text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {!isAuthenticated && (
            <Button
              as={Link}
              href="/auth/login"
              className="bg-blue-500 text-white font-bold rounded-full text-xs sm:text-sm py-1 px-2 sm:px-4"
            >
              Start as a freelancer
            </Button>
          )}
          <Link href="/faqs" className="flex items-center">
            <FiHelpCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Link>
          <Link href="/admin" className="text-gray-600">
            <FaUser className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default NavbarLayout;
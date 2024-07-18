import { Link, Button } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import useAuthCtx from "../context/auth-context";
import { useNavigate } from "react-router-dom";


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
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="font-bold text-xl text-blue-500 mb-2 sm:mb-0">
          DevConnect
        </Link>
        <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
          {user && (
            <div className="relative mb-2 sm:mb-0">
              <button
                className="border border-[#1C5D99] py-1 px-2 sm:px-4 rounded-full text-sm sm:text-base"
                onClick={toggleDropdown}
              >
                Welcome {user?.first_name}
              </button>
              {isDropdownVisible && (
                <div className="absolute right-0 bg-white border border-[#1C5D99] rounded-lg shadow-md mt-1 flex flex-col py-2 px-4 justify-center items-center z-10">
                  <Link
                    key={user?._id}
                    href={`/profile/${user?._id}`}
                    className="mb-2 text-sm sm:text-base"
                  >
                    {user?.first_name} Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm sm:text-base"
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
          <Link href="/admin" className="text-gray-600">
            <FaUser className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLayout;

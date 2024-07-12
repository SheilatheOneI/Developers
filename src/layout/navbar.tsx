import { Link, Button } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

interface Developer {
  _id: number;
  specialization: string;
  rate: number;
  bio: string;
  phone_number: string | undefined;
  first_name: string;
}

const NavbarLayout = () => {
  const { isLoggedIn, logout } = useAuth();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const { id } = useParams<{ id: string }>();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDeveloper(data);
      } catch (error) {
        console.error("Error fetching developer data:", error);
      }
    };

    if (id) {
      fetchDeveloper();
    }
  }, [id]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-blue-500">
          DevConnect
        </Link>
        <div className="flex items-center space-x-4">
        {isLoggedIn && developer && (
        <div className="relative">
          <button
            className="border border-[#1C5D99] py-1 px-4 rounded-full"
            onClick={toggleDropdown}
          >
            Welcome {developer.first_name}
          </button>
          {isDropdownVisible && (
            <div className="absolute bg-white border border-[#1C5D99] rounded-lg shadow-md mt-1 flex flex-col py-2 px-4 justify-center items-center">
              <Link
                key={developer._id}
                href={`/profile/${developer._id}`}
                className="mb-2"
              >
                {developer.first_name} Profile
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
          {!isLoggedIn && (
            <Button
              as={Link}
              href="/login"
              className="bg-blue-500 text-white font-bold rounded-full"
            >
              Start as a freelancer
            </Button>
          )}
          <Link href="/admin" className="text-gray-600">
            <FaUser className="h-6 w-6" />
          </Link>
        </div>
      </div> 
    </nav>
  );
};

export default NavbarLayout;

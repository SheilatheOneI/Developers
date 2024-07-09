import { Link, Button } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";

const NavbarLayout = () => {
  return (
    <nav className="bg-white shadow-none">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-blue-500">
          DevConnect
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            as={Link}
            href="/login"
            className="bg-blue-500 text-white font-bold rounded-full py-2"
          >
            Start as a freelancer
          </Button>
          <Link href="/admin" className="text-gray-600">
            <FaUser className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLayout;

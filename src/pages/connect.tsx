import { useEffect, useState } from "react";
import { FiSend, FiUser } from "react-icons/fi";
import { IoMdGrid, IoMdList } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

interface Developer {
  id: number;
  name: string;
  role: string;
  bio: string;
  roleColor: string;
  rate: number;
}

const Connect: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch("http://localhost:3000/Developers");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setDevelopers(data);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };

    fetchDevelopers();
  }, []);

  const truncateBio = (bio: string, maxLength: number = 120) => {
    if (bio.length > maxLength) {
      return bio.substring(0, maxLength) + "...";
    } else {
      return bio;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <button 
        className="mb-4 text-[#1C5D99] hover:underline"
        onClick={() => navigate("/")}
        >
          &larr; Back
        </button>
        <div className="flex items-center space-x-4">
          <IoMdGrid className="text-gray-600" />
          <IoMdList className="text-gray-600" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Job Search Settings
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Job Title</label>
            <input
              type="text"
              className="p-2 border rounded-lg w-full"
              placeholder="Designer, Manager etc..."
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Categories</label>
            <input
              type="text"
              className="p-2 border rounded-lg w-full text-sm"
              placeholder="Any Classification"
            />
          </div>
        </div>

        <div className="w-full md:w-3/4 ml-0 md:ml-8">
          <div className="flex justify-between items-center mb-6  p-1 rounded-lg md:max-w-full gap-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-1 border-r border-gray-300 bg-white rounded-md"
            />
            <button className="bg-blue-700 text-white p-1 rounded-lg mt-2 md:mt-0">
              Search
            </button>
          </div>

          <div className="">
            {developers &&
              developers.map((developer) => (
                <div
                  key={developer.id}
                  className="relative bg-white p-4 rounded-lg mb-2 md:h-96 "
                  style={{
                    height: "230px",
                  }}
                >
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: developer.roleColor }}
                        >
                          {developer.role}
                        </span>
                      </div>
                      <h2 className="text-md font-semibold mb-1 mt-4 md:mt-8">
                        {developer.name}
                      </h2>
                      <p className="text-sm mb-1 mt-4">
                        {truncateBio(developer.bio)}
                      </p>

                      <div className="flex items-center mb-1 text-yellow-500 text-sm flex-wrap md:flex-nowrap ">
                        <strong className="mr-2">Rate:</strong>
                        <span>${developer.rate}/hour</span>
                      </div>
                      <div className="bottom-4 left-4 right-4 flex gap-2">
                        <Link
                          to={`/userprofile/${developer.id}`}
                          className="flex items-center bg-blue-500 text-white text-xs px-2 py-1 rounded-lg"
                        >
                          <FiSend className="mr-1 text-sm" />
                          Read More
                        </Link>
                        <button className="flex items-center bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
                          <FiUser className="mr-1 text-sm" /> Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;

import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { IoMdGrid, IoMdList } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

interface Developer {
  _id: number;
  first_name: string;
  last_name: string;
  specialization: string;
  bio: string;
  rate: number;
}

const Connect: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState<Developer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setDevelopers(data);
        setFilteredDevelopers(data);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };

    fetchDevelopers();
  }, []);

  useEffect(() => {
    const searchTermRegex = new RegExp(searchTerm, "i");
    const jobTitleRegex = new RegExp(jobTitle, "i");
    const categoriesRegex = new RegExp(categories, "i");
    const filtered = developers.filter(
      (developer) =>
        (searchTermRegex.test(developer.first_name) ||
          searchTermRegex.test(developer.last_name) ||
          searchTermRegex.test(developer.bio)) &&
        jobTitleRegex.test(developer.specialization) &&
        categoriesRegex.test(developer.specialization)
    );
    setFilteredDevelopers(filtered);
  }, [searchTerm, jobTitle, categories, developers]);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "grid" : "list"));
  };

  // const truncateBio = (bio: string, maxLength: number) => {
  //   return bio.length > maxLength ? bio.slice(0, maxLength) + "..." : bio;
  // };

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
          <IoMdGrid
            className={`text-gray-600 cursor-pointer ${viewMode === "grid" && "text-blue-500"}`}
            onClick={toggleViewMode}
          />
          <IoMdList
            className={`text-gray-600 cursor-pointer ${viewMode === "list" && "text-blue-500"}`}
            onClick={toggleViewMode}
          />
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
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Categories</label>
            <input
              type="text"
              className="p-2 border rounded-lg w-full text-sm"
              placeholder="Any Classification"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full md:w-3/4 ml-0 md:ml-8">
          <div className="flex justify-between items-center mb-6 p-1 rounded-lg md:max-w-full gap-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-1 border-r border-gray-300 bg-white rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={`${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}`}>
            {filteredDevelopers.length > 0 ? (
              filteredDevelopers.slice(-8).map((developer) => (
                <div
                  key={developer._id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="mb-2">
                    <span className="text-sm font-semibold">
                      {developer.specialization}
                    </span>
                  </div>
                  <h2 className="text-md font-semibold mb-1">
                    {developer.first_name} {developer.last_name}
                  </h2>
                  <div className="flex items-center mb-1 text-yellow-500 text-sm">
                    <strong className="mr-2">Rate:</strong>
                    <span>${developer.rate}/hour</span>
                  </div>
                  <p className="text-sm mb-2">
                    {developer.bio}
                  </p>
                  <Link
                    to={`/profile/${developer._id}`}
                    className="inline-flex items-center bg-blue-500 text-white text-xs px-2 py-1 rounded-lg"
                  >
                    <FiSend className="mr-1 text-sm" />
                    Read More
                  </Link>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { FaDollarSign, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface Developer {
  _id: number;
  first_name: string;
  last_name: string;
  specialization: string;
  rate: string;
  location: string;
  rate_currency: string;
  phone_number: string;
}

const Landing = () => {
  const [query, setQuery] = useState("");
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState<Developer[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);

  const fetchSpecializations = async () => {
    try {
      const response = await fetch(
        `https://gigit.onrender.com/api/users/specialization/specializations`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSpecializations(data);
    } catch (error) {
      console.error("Error fetching specializations:", error);
    }
  };

  const fetchDevelopers = async () => {
    try {
      const response = await fetch(`https://gigit.onrender.com/api/users/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDevelopers(data);
      setFilteredDevelopers(data);
    } catch (error) {
      console.error("Error fetching developers:", error);
      setDevelopers([]);
      setFilteredDevelopers([]);
    }
  };

  useEffect(() => {
    fetchSpecializations();
    fetchDevelopers();
  }, []);

  useEffect(() => {
    const searchTermRegex = new RegExp(query, "i");
    const filtered = developers.filter(
      (developer) =>
        searchTermRegex.test(developer.first_name) ||
        searchTermRegex.test(developer.last_name) ||
        searchTermRegex.test(developer.specialization)
    );
    setFilteredDevelopers(filtered);
  }, [query, developers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchTermRegex = new RegExp(query, "i");
      const filtered = developers.filter(
        (developer) =>
          searchTermRegex.test(developer.first_name) ||
          searchTermRegex.test(developer.last_name) ||
          searchTermRegex.test(developer.specialization)
      );
      setFilteredDevelopers(filtered);
    }
  };

  const handleSpecializationClick = (specialization: string) => {
    const filtered = developers.filter(
      (developer) => developer.specialization === specialization
    );
    setFilteredDevelopers(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-lora text-center pt-4 mb-2">
            Discover Skilled Giggers, Connect & Do
          </h1>
          <p className="text-sm text-center font-openSans text-gray-600 mb-6">
            What skill are you looking for?
          </p>
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search for skill... e.g graphics designer"
              className="w-full max-w-3xl mx-auto block border-2 text-center font-lora border-red-200 rounded-full py-3 px-6 pr-12 focus:outline-none focus:border-red-600"
              value={query}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => handleSpecializationClick(spec)}
                className="bg-gray-100 rounded-full py-1 px-4 text-sm font-openSans hover:bg-gray-200 transition-colors"
              >
                {spec}
              </button>
            ))}
          </div>
          <h3 className="text-xl font-lora pt-6 mb-6 text-center">
            Recent Searches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-openSans">
            {filteredDevelopers.slice(0, 6).map((developer) => (
              <DeveloperCard key={developer._id} developer={developer} />
            ))}
          </div>
        </div>
      </main>
      <footer className="py-4 pt-6 bg-white">
        <p className="text-center text-sm text-gray-600">
          Copyright © 2024 Gigit. The Tech Band Originals
        </p>
      </footer>
    </div>
  );
};

const DeveloperCard = ({ developer }: { developer: Developer }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/profile/${developer._id}`);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
  };

  return (
    <div
      className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-start cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center mb-2">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-4xl mb-4 sm:mb-0 sm:mr-6">
              <FontAwesomeIcon icon={faUser} />
            </div>
        <div>
          <h3 className="text-lg font-bold">
            {developer.first_name} {developer.last_name}
          </h3>
          <p className="text-sm text-gray-600">{developer.specialization}</p>
        </div>
      </div>
      <div className="flex items-center mb-1 w-full">
        <FaMapMarkerAlt className="text-gray-400 mr-2" />
        <p className="text-sm text-gray-600">{developer.location}</p>
      </div>
      <div className="flex items-center mb-3 w-full">
        <FaDollarSign className="text-gray-400 mr-2" />
        <p className="text-sm text-gray-600">{developer.rate}/hour</p>
      </div>
      <div className="flex gap-2 mt-auto w-full">
        <Button
          className="bg-red-500 text-white font-bold px-3 py-1 rounded-full flex items-center justify-center flex-1"
          onClick={handleButtonClick}
        >
          <FaPhoneAlt className="mr-2" /> Call
        </Button>
        <Button
          className="bg-white text-red-500 border border-red-500 font-bold px-3 py-1 rounded-full flex items-center justify-center flex-1"
          onClick={(e) => {
            handleButtonClick(e);
            window.location.href = `https://wa.me/${developer.phone_number}`;
          }}
        >
          <FaWhatsapp className="mr-2" /> Chat
        </Button>
      </div>
    </div>
  );
};

export default Landing;
import { useState, useEffect } from "react";
import { Button, Link } from "@nextui-org/react";
import { H2 } from "../components/typography";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

interface Developer {
  _id: number;
  first_name: string;
  last_name: string;
  specialization: string;
  rate: string;
  location: string;
  rate_currency: string;
  rate_type: string;
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
    <div className="min-h-screen bg-white overflow-hidden">
      <main className="container mx-auto px-4 py-12">
        <H2 className="font-lora text-center text-2xl sm:text-sm md:text-base lg:text-lg font-bold mb-2 leading-relaxed">
          Showcase Your Skills, Connect with Clients, Grow Your Career
        </H2>
        <p className="text-xs font-light text-center text-blue-600 -mt-1">
          Start Your Search Now
        </p>
        <div className="relative max-w-2xl mx-auto mb-8 mt-6">
          <input
            type="text"
            placeholder="Start typing to search..."
            className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 pr-10"
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
              className="bg-gray-200 rounded-full py-1 px-3 text-sm"
            >
              {spec}
            </button>
          ))}
        </div>
        <h3 className="text-2xl font-lora text-center font-bold mb-4">Recent Searches</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {filteredDevelopers.slice(-3).map((developer) => (
            <Link
              key={developer._id}
              href={`/profile/${developer._id}`}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start text-left hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col justify-between ">
                <div>
                  <h3 className="text-lg font-lora font-bold text-gray-900">
                    {developer.first_name} {developer.last_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {developer.specialization}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rate: ${developer.rate}/hour
                  </p>
                </div>
                <div className="flex mt-1 gap-2">
                  <Button className="bg-blue-500 text-white font-bold px-4 py-1 rounded-full flex items-center">
                    <FaPhoneAlt className="mr-2" /> Call
                  </Button>
                  <Button
                    className="bg-[#23A5F1] text-white font-bold px-4 py-1 rounded-full flex items-center"
                    onClick={() => {
                      window.location.href = `https://wa.me/${developer.phone_number}`;
                    }}
                  >
                    <FaWhatsapp className="mr-2" /> Chat
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;

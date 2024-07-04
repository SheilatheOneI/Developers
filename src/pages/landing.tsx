import { useState, useEffect } from "react";
import { Button, Link } from "@nextui-org/react";
import { H2 } from "../components/typography";

interface Developer {
  _id: number;
  first_name: string;
  specialization: string;
}
const Landing = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Developer[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const fetchDevelopers = async (searchQuery: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/?q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const searchTermRegex = new RegExp(searchQuery, "i");
      const filteredResults = data.filter(
        (developer: Developer) =>
          searchTermRegex.test(developer.first_name) ||
          searchTermRegex.test(developer.specialization)
      );

      setResults(filteredResults);
      setIsDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching developers:", error);
      setIsDropdownVisible(false);
      setResults([]);
    }
  };
  useEffect(() => {
    if (query.length > 0) {
      fetchDevelopers(query);
    } else {
      setIsDropdownVisible(false);
      setResults([]);
    }
  }, [query]);
  return (
    <section className="bg-landing bg-[#0b0a0a9c] h-screen bg-blend-overlay bg-center bg-cover bg-no-repeat flex items-center justify-center">
      <div className="max-w-4xl w-full p-6 md:p-10">
        <div className="text-center">
          <H2 className=" md: text-small pb-6 italic text-white">
            Connect, Collaborate, Create
          </H2>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <form className="relative flex-grow">
            <input
              type="text"
              placeholder="Looking for a freelancer?..."
              className="w-full border-lapis border-2 rounded-full font-bold py-2 pl-4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {isDropdownVisible && results.length > 0 && (
              <div className="absolute bg-white border border-gray-300 rounded-md w-full mt-2 shadow-md top-[100%] left-0 max-h-60 overflow-y-auto z-10">
                {results.map((developer) => (
                  <Link
                    key={developer._id}
                    href={`/profile/${developer._id}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {developer.first_name} - {developer.specialization}
                  </Link>
                ))}
              </div>
            )}
          </form>
          <Button
            as={Link}
            href="/login"
            className="bg-lapis rounded-full py-2 text-center justify-center text-white font-bold w-full sm:w-auto"
          >
            Start as Freelancer
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Landing;

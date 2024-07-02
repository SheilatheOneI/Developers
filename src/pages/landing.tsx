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

      setIsDropdownVisible(true); // Show dropdown on successful fetch
    } catch (error) {
      console.error("Error fetching developers:", error);
      setIsDropdownVisible(false); // Hide dropdown on error
      setResults([]); // Clear results on error
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
    <section className="bg-landing bg-[#0b0a0a9c] h-[100vh] bg-blend-overlay bg-center bg-cover bg-no-repeat flex items-center justify-center">
      <section className="">
        <section className="justify-center  items-center flex flex-col">
          <H2 className="!text-6xl pb-10 italic text-white">
            Connect,Collaborate,Create
          </H2>
          <section className="grid grid-cols-[3fr,1fr] gap-2 mx-2">
            <form className="">
              <input
                type="text"
                placeholder="Looking for a freelancer?..."
                className="w-full border-lapis border-2 rounded-full font-bold py-2 pl-1 sm:pl-4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {isDropdownVisible && results.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-md w-[32rem] mt-2 overflow-x-hidden shadow-md">
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
              className="bg-lapis  w-max rounded-full py-2 text-center justify-center text-white  font-bold"
            >
              Start as Freelancer
            </Button>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Landing;

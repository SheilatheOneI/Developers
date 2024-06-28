import { useState, useEffect } from "react";
import { Button, Link } from "@nextui-org/react";


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

      const searchTermRegex = new RegExp(searchQuery, "i"); // 'i' flag for case-insensitive matching
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
    <section className="bg-landing min-h-screen bg-[#0b0a0ab6] bg-blend-overlay bg-center bg-cover bg-no-repeat flex items-center justify-center">
      <section className="md:grid md:grid-cols-2 flex flex-col mx-16">
        <section className="flex flex-col justify-center items-start md:items-center">
          <form className="w-full max-w-4xl">
            <input
              type="text"
              placeholder="Search for Connection..."
              className="lg:py-4 md:py-3 pl-4 pr-8 lg:w-full md:w-[80%] border-lapis border-2 rounded-full font-bold lg:text-lg md:text-md"
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
          
        </section>

        <section className="flex justify-end items-start mt-8 md:mt-0 md:ml-16 gap-1">
          <Button
            as={Link}
            href="/signup"
            className="border-2 border-lapis lg:px-20 px-10 lg:py-3 py-2 w-max rounded-lg text-white text-[1.2rem] font-bold mb-4"
          >
            SignIn
          </Button>
          <Button
            as={Link}
            href="/login"
            className="bg-lapis border-2 border-lapis lg:px-20 px-10 lg:py-3 py-2 w-max rounded-lg text-white text-[1.2rem] font-bold"
          >
            Login
          </Button>
        </section>
      </section>
    </section>
  );
};

export default Landing;

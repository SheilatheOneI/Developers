import { useState, useEffect } from "react";
import { Button, Link } from "@nextui-org/react";
import { H2, H5 } from "../components/typography";

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
    <section className="bg-landing min-h-[100vh] bg-[#0b0a0ab6] bg-blend-overlay bg-center bg-cover bg-no-repeat flex items-center">
      <section className="md:grid md:grid-cols-[1fr,1fr] flex flex-col mx-16 m-">
        <section>
          <H2 className="p-1 text-white font-bold !text-[5rem]  leading-[5rem] ">
            Welcome To DevConnect...
          </H2>
          <H5 className="p-1 font-semibold text-white lg:text-2xl md:text-xl md:mb-4">
            Connecting Talent with Opportunity.
          </H5>
          <section className="grid grid-cols-2 lg:gap-4 gap-2 pb-4 align-bottom text-start">
            <section>
              <h5 className="font-semibold text-white pb-4">
                Ready to join us?
              </h5>
              <Button
                as={Link}
                href="/signup"
                className=" border-2 border-lapis lg:px-20 px-10 lg:py-3 py-2 w-max rounded-lg text-white text-[1.2rem] font-bold"
              >
                SignIn
              </Button>
            </section>
            <section>
              <h5 className="pb-4 font-semibold text-white">
                Have an account?
              </h5>
              <Button
                as={Link}
                href="login"
                className="bg-lapis border-2 border-lapis lg:px-20 px-10 lg:py-3 py-2 w-max rounded-lg text-white text-[1.2rem] font-bold"
              >
                Login
              </Button>
            </section>
          </section>
        </section>

        <section className="items-start md:w-[80%] md:ml-20 md:mt-4">
          <form>
            <input
              type="text"
              placeholder="Search for Connection..."
              className="lg:py-4 md:py-3 pl-2 w-[90%] border-lapis border-2 rounded-3xl font-bold lg:text-lg md:text-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {isDropdownVisible && results.length > 0 && (
              <div className="absolute bg-white border border-gray-300 h-[6cm] rounded-md w-[12cm] mt-2 overflow-x-hidden">
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
          <h5 className="p-2 font-semibold text-white lg:text-lg text-sm">
            Are you looking to hire skilled professionals or talented
            freelancers to help take your business to the next level?
            <br />
            <br />
            Look no further!
            <br />
            <br />
            We offer a seamless platform to find and hire the perfect match for
            your project needs.
          </h5>
        </section>
      </section>
    </section>
  );
};

export default Landing;

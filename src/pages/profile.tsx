import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "@nextui-org/react";
import { H5, H6, Subtitle2 } from "../components/typography.tsx";
import { FiPhone, FiMail } from "react-icons/fi";

interface Developer {
  id: number;
  first_name: string;
  specialization: string;
  bio: string;
  rate: number;
  phone_number: string;
  email: string;
  jobType: string;
  location: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await fetch(
          `https://gigit.onrender.com/api/users/${id}`
        );
        const data = await response.json();
        console.log(data);

        setDeveloper(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching developer data");
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!developer) return <div>Developer not found</div>;

  return (
    <section className="mx-auto max-w-screen-lg p-4">
      <section className="flex flex-col text-center gap-y-1 md:w-3/4 lg:w-1/2 mx-auto p-4 border-moonstone border-2 rounded-lg my-6 items-center">
        <span className="flex justify-center mb-4">
          <img
            src="/src/images/logo2.jpg"
            alt="logo"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full"
          />
        </span>
        <H5 className="font-bold text-lg md:text-xl">{developer.first_name}</H5>
        <H5 className="font-bold text-lg md:text-xl">{developer.jobType}</H5>
        <H5 className="font-bold text-lg md:text-xl">{developer.location}</H5>
        <Subtitle2 className="font-bold text-md md:text-lg">
          {developer.specialization}
        </Subtitle2>
        <Subtitle2 className="font-bold text-yellow-500 text-md md:text-lg">
          Rates: ${developer.rate}/hour
        </Subtitle2>
        <H6 className="underline italic text-md md:text-lg">Bio</H6>
        <p className="text-sm md:text-base">{developer.bio}</p>
        <Card className="w-full  py-1">
          <H6 className="underline italic text-md md:text-lg">Contacts</H6>
          <section className="grid grid-cols-[1fr,3fr] gap-y-2 gap-x-2 text-sm md:text-base">
            <h6 className="text-start">Phone:</h6>
            <h6 className="text-start">{developer.phone_number}</h6>
            <h6 className="text-start">Email:</h6>
            <h6 className="text-start">{developer.email}</h6>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            <Button
              as={Link}
              to={`tel:${developer.phone_number}`}
              className="bg-green-600 font-semibold rounded-sm text-white py-1 flex items-center justify-center gap-2"
            >
              <FiPhone />
              Call
            </Button>
            <Button
              as={Link}
              target="_blank"
              to={`mailto:${developer.email}`}
              className="bg-blue-600 font-semibold rounded-sm text-white py-1 flex items-center justify-center gap-2"
            >
              <FiMail />
              Email
            </Button>
          </section>
        </Card>
      </section>
    </section>
  );
};

export default UserProfile;

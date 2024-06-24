import { Card } from "@nextui-org/react";
import { H5, H6, Subtitle2 } from "../components/typography.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Developer {
  id: string;
  name: string;
  role: string;
  rate: number;
  bio: string;
  phone: string;
  email: string;
}

const Profile = () => {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await fetch(`http://localhost:3000/Developers/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); 
        setDeveloper(data);
      } catch (error) {
        console.error("Error fetching developer data:", error);
      }
    };

    fetchDeveloper();
  }, [id]);

  if (!developer) {
    console.log("Developer data is not yet loaded");
    return <div>Loading...</div>;
  }

  return (
    <section className="mx-auto w-max pl-0 md:pt-2">
      <div className="mb-4 mt-3 p-2 pl-0">
        <button
          className="mb-4 mt-3 text-[#1C5D99] hover:underline pl-0"
          onClick={() => navigate("/")}
          style={{ transform: "translateX(-8cm)" }}
        >
          &larr; Back
        </button>
      </div>
      <section className="flex flex-col h-max text-center  gap-y-1 md:mx-auto w-[60%] p-4 border-moonstone border-2 rounded-lg my-6 items-center justify-center">
        <span className="flex">
          <img
            src="/src/images/logo2.jpg"
            alt=""
            className="w-max h-[6rem] rounded-full"
          />
        </span>
        <H5 className="font-bold">{developer.name}</H5>
        <Subtitle2 className="font-bold">{developer.role}</Subtitle2>
        <Subtitle2 className="font-bold text-yellow-500">
          Rates: ${developer.rate}
        </Subtitle2>
        <H6 className="underline italic">Bio</H6>
        <p className="text-wrap  max-w-2xl" >{developer.bio}</p>
        <Card className="w-[90%]">
          <H6 className="underline italic">Contacts</H6>
          <section className="p-0 flex flex-col my-1 gap-x-2 gap-y-2">
            <h6 className="text-start pl-2">Phone: {developer.phone}</h6>
            <h6 className="text-start pl-2">Email: {developer.email}</h6>
          </section>
        </Card>
        <section></section>
      </section>
    </section>
  );
};

export default Profile;

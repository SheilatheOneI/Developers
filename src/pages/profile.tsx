import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "@nextui-org/react";
import { H5, H6, Subtitle2 } from "../components/typography.tsx";

interface Developer {
  id: number;
  name: string;
  role: string;
  bio: string;
  roleColor: string;
  rate: number;
  phone: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        // if (!response.ok) {
        //   throw new Error(HTTP error! Status: ${response.status});
        // }
        const data = await response.json();
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
    <section className="mx-auto max-w-screen-md items-center justify-center">
      <section className="flex flex-col h-max text-center gap-y-1 md:mx-auto w-[60%] p-4 border-moonstone border-2 rounded-lg my-6 items-center justify-center">
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
          Rates: ${developer.rate}/hour
        </Subtitle2>
        <H6 className="underline italic">Bio</H6>
        {developer.bio}
        <Card className="w-[90%]">
          <H6 className="underline italic">Contacts</H6>
          <section className="p-0 grid grid-cols-[1fr,3fr] my-1 gap-x-2">
            <h6 className="text-start pl-2">Phone:</h6>
            <h6 className="text-start pl-2">{developer.phone}</h6>
            <h6 className="text-start pl-2">Email:</h6>
            <h6 className="text-start pl-2">{developer.email}</h6>
          </section>
          <section className="p-0 grid grid-cols-2 my-1 gap-x-2">
            <Button className="bg-green-600 font-semibold rounded-sm text-white">
              Call
            </Button>
            <Button className="bg-moonstone font-semibold rounded-sm text-white italic">
              Send Email
            </Button>
          </section>
        </Card>
        <section>
          <H6 className="italic">Add a Message</H6>
          <form action="">
            <textarea
              name=""
              id=""
              cols={48}
              className="w-full border-lapis border-1 pl-2"
              placeholder="Note"
            ></textarea>
          </form>
          <Button className="bg-moonstone font-semibold rounded-sm text-white w-full">
            Send Message
          </Button>
        </section>
      </section>
    </section>
  );
};

export default UserProfile;

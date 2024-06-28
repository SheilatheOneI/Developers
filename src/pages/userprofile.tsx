import { Card } from "@nextui-org/react";
import { H6, Subtitle2 } from "../components/typography.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Developer {
  specialization: string;
  rate: number;
  bio: string;
  phone_number: string;
}

const Profile = () => {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<Developer | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDeveloper(data);
        setFormValues(data);
      } catch (error) {
        console.error("Error fetching developer data:", error);
      }
    };

    fetchDeveloper();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formValues) {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues) {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `http://localhost:5000/api/freelancer/update`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formValues),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const updatedDeveloper = await response.json();
        setDeveloper(updatedDeveloper);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating developer data:", error);
      }
    }
  };

  if (!developer || !formValues) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mx-auto w-max pl-0 md:pt-2">
      <div className="mb-4 mt-3 p-2 pl-0">
        <button
          className="mb-4 mt-3 text-[#1C5D99] hover:underline pl-0"
          onClick={() => navigate("/")}
          style={{ transform: "translateX(-4cm)" }}
        >
          &larr; Back
        </button>
      </div>
      <section className="flex flex-col h-max text-center gap-y-1 md:mx-auto  p-4 border-moonstone border-2 rounded-lg my-6 items-center justify-center">
        <span className="flex">
          <img
            src="/src/images/logo2.jpg"
            alt=""
            className="w-max h-[6rem] rounded-full"
          />
        </span>
        
        {isEditing ? (
          <form onSubmit={handleEdit} className="flex flex-col gap-y-4 w-96">
            <input
              type="text"
              name="specialization"
              value={formValues.specialization}
              onChange={handleChange}
              className="border p-2"
              placeholder="Specialization"
            />
            <input
              type="number"
              name="rate"
              value={formValues.rate}
              onChange={handleChange}
              className="border p-2"
              placeholder="Rate"
            />
            <textarea
              name="bio"
              value={formValues.bio}
              onChange={handleChange}
              className="border p-2"
              placeholder="Bio"
            />
            <input
              type="text"
              name="phone_number"
              value={formValues.phone_number}
              onChange={handleChange}
              className="border p-2"
              placeholder="Phone Number"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <Subtitle2 className="font-bold">
              {developer.specialization}
            </Subtitle2>
            <Subtitle2 className="font-bold text-yellow-500">
              Rates: ${developer.rate}
            </Subtitle2>
            <H6 className="underline italic">Bio</H6>
            <p className="text-wrap max-w-2xl">{developer.bio}</p>
            <Card className="w-[90%]">
              <H6 className="underline italic">Contacts</H6>
              <section className="p-0 flex flex-col my-1 gap-x-2 gap-y-2">
                <h6 className="text-start pl-2">
                  Phone: {developer.phone_number}
                </h6>
              </section>
            </Card>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              Edit
            </button>
          </>
        )}
      </section>
    </section>
  );
};

export default Profile;

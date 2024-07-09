import { Card } from "@nextui-org/react";
import { H5, H6, Subtitle, Subtitle2 } from "../components/typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface Developer {
  _id: number;
  specialization: string;
  rate: number;
  bio: string;
  phone_number: string | undefined;
  first_name: string;
}

const Profile: React.FC = () => {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<Developer | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const Logout = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("jwtToken");

      Logout("/login");

      // console.log("succesfull logout");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues) {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log(token);

        const response = await fetch(
          `http://localhost:5000/api/freelancer/update`,
          {
            method: "PUT",
            credentials: "include",
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
    <section>
      <section className="containerr mb-4 mt-3 p-2 flex justify-between">
        <button
          className="text-[#1C5D99] hover:underline pl-0"
          onClick={() => navigate("/")}
        >
          &larr; Back
        </button>
        <div className="relative">
          <button
            className="border-1 border-lapis py-1 px-4 rounded-full"
            onClick={toggleDropdown}
          >
            Welcome {developer.first_name}
          </button>
          {isDropdownVisible && (
            <div className="absolute bg-white border-lapis border-1 rounded-lg shadow-md m-1 flex flex-col py-3 px-5 justify-center items-center">
              <Link
                key={developer._id}
                to={`/profile/${developer._id}`}
                className="mr-1 shadow-sm"
              >
                {developer.first_name} Profile
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </section>
      <section className="mx-auto w-max pl-0 md:pt-2">
        <section className="flex flex-col h-max w-max xs:px-3 sm:px-10 lg:px-20 py-4 text-center gap-y-1 md:mx-auto border-moonstone border-2 rounded-lg my-8 items-center justify-center">
          <span className="flex">
            <img
              src="/src/images/logo2.jpg"
              alt=""
              className="w-max h-[6rem] rounded-full"
            />
          </span>
          <Subtitle className="font-bold">{developer.first_name}</Subtitle>

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
              <PhoneInput
                defaultCountry="KE"
                placeholder="Enter phone number"
                value={formValues.phone_number || ""}
                onChange={(value) =>
                  setFormValues({ ...formValues, phone_number: value })
                }
                className="w-full p-2 border border-gray-300 rounded mb-4"
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
              <H6 className="font-bold">{developer.specialization}</H6>
              <Subtitle2 className="font-bold text-yellow-500">
                Rates: ${developer.rate}
              </Subtitle2>
              <H5 className="underline italic">Bio</H5>
              <p className="text-wrap max-w-2xl text-base">{developer.bio}</p>
              <Card className="w-[90%]">
                <H5 className="underline italic">Contacts</H5>
                <section className="p-0 flex flex-col my-1 gap-x-2 gap-y-2">
                  <h5 className="text-start pl-2">
                    Phone: {developer.phone_number}
                  </h5>
                </section>
              </Card>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white p-1 rounded mt-3 w-36"
              >
                Edit
              </button>
            </>
          )}
        </section>
      </section>
    </section>
  );
};

export default Profile;

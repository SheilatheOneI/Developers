import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput, { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { H6, Subtitle, Subtitle2 } from "../components/typography";

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
      const token = localStorage.getItem("jwtToken");

      try {
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
    <section className="min-h-screen bg-w">
      <section className="container mx-auto p-4 flex justify-between items-center mb-4">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => navigate("/")}
        >
          &larr; Back
        </button>
      </section>
      <section className="container mx-auto p-4 flex justify-center items-center">
        <section className="flex flex-col items-center border-2 border-[#1C5D99] max-w-sm lg:max-w-lg rounded-lg p-6 bg-white shadow-md">
          <img
            src="/src/images/logo2.jpg"
            alt=""
            className="w-24 h-24 rounded-full mb-4"
          />
          <Subtitle className="font-bold">{developer.first_name}</Subtitle>

          {isEditing ? (
            <form
              onSubmit={handleEdit}
              className="flex flex-col gap-y-4 w-full max-w-md"
            >
              <input
                type="text"
                name="specialization"
                value={formValues.specialization}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Specialization"
              />
              <input
                type="number"
                name="rate"
                value={formValues.rate}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Rate"
              />
              <textarea
                name="bio"
                value={formValues.bio}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Bio"
              />
              <PhoneInput
                defaultCountry="KE"
                placeholder="Enter phone number"
                value={formValues.phone_number || ""}
                onChange={(value: Value) =>
                  setFormValues({ ...formValues, phone_number: value })
                }
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <H6 className="font-bold mt-2">{developer.specialization}</H6>
              <Subtitle2 className="text-blue-500">
                Rate: {developer.rate} USD/hr
              </Subtitle2>
              <p className="text-blue-500 font-medium mt-2">{developer.bio}</p>
              <p className="text-blue-500 font-medium mt-1">
                Phone Number: {developer.phone_number}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Edit Profile
              </button>
            </>
          )}
        </section>
      </section>
    </section>
  );
};

export default Profile;

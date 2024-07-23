import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput, { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { H6, Subtitle, Subtitle2 } from "../components/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthCtx from "../context/auth-context";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faBriefcase,
  faDollarSign,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface Developer {
  last_name: string;
  _id: number;
  specialization: string;
  rate: number;
  bio: string;
  phone_number: string;
  first_name: string;
  jobType: string;
  location: string;
  email: string;
}

const defaultDeveloper: Developer = {
  last_name: "",
  _id: 0,
  specialization: "",
  rate: 0,
  bio: "",
  phone_number: "",
  first_name: "",
  jobType: "",
  location: "",
  email: "",
};

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<Developer>(defaultDeveloper);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const { updateProfile, deleteProfile, user } = useAuthCtx();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfile(formValues);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating developer data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProfile(user?._id as string);
      navigate("/");
    } catch (error) {
      console.error("Error deleting developer profile:", error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <button
          className="text-blue-500 hover:underline mb-4 flex items-center"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          Back to Home
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <H6 className="text-blue-600 font-semibold">
                  {user?.jobType}
                </H6>
                <Subtitle2 className="text-gray-600">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  {user?.location}
                </Subtitle2>
              </div>
              <Subtitle className="font-bold text-xl mb-2">
                {user?.specialization}
              </Subtitle>
              <div className="flex items-center text-green-600">
                <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                <span className="font-semibold">${user?.rate}</span> USD/hr
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-bold text-lg mb-4 text-blue-600">
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">{user?.bio}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-bold text-lg mb-4 text-blue-600">
                Contact Information
              </h2>
              <div className="space-y-3">
                <p className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-blue-500" />
                  {user?.email}
                </p>
                <p className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faPhone} className="mr-3 text-blue-500" />
                  {user?.phone_number}
                </p>
                <p className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-3 text-blue-500" />
                  {user?.jobType}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-bold text-lg mb-4 text-blue-600">
                Manage Profile
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleEdit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              </div>
              <textarea
                name="bio"
                value={formValues.bio}
                onChange={handleChange}
                className="border p-2 rounded w-full h-24"
                placeholder="Bio"
              />
              <PhoneInput
                defaultCountry="KE"
                placeholder="Enter phone number"
                value={formValues.phone_number}
                onChange={(value: Value) =>
                  setFormValues((prev) => ({
                    ...prev,
                    phone_number: value || "",
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="location"
                  value={formValues.location}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  placeholder="Location"
                />
                <input
                  type="text"
                  name="jobType"
                  value={formValues.jobType}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  placeholder="Job Type"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-1/2 hover:bg-blue-600 transition duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded w-full sm:w-1/2 hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this profile?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded w-full hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded w-full hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
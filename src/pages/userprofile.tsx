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

    console.log("Form Values being sent:", formValues);

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
          className="text-blue-500 hover:underline mb-4"
          onClick={() => navigate("/")}
        >
          &larr; Back
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/3 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <H6 className="text-red-200 mb-2 text-sm">
                Type: {user?.jobType}
              </H6>
              <Subtitle className="font-bold text-sm mb-2">
                {user?.specialization}
              </Subtitle>
              <Subtitle2 className="text-red-600 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {user?.location}
              </Subtitle2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-bold text-sm mb-4 text-blue-400">
                Freelancer Bio
              </h2>
              <p className="text-gray-700 mb-4 ">{user?.bio}</p>
              <h3 className="font-bold text-xs mb-2">Rate</h3>
              <p className="text-red-600 text-xs">${user?.rate} USD/hr</p>
            </div>
          </div>

          <div className="md:w-1/3 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-bold text-xs mb-4">Freelancer Info</h2>
              <h3 className="font-bold text-xs mb-2">
                {user?.first_name} {user?.last_name}
              </h3>
              <h4 className="font-bold text-xs mb-2 text-blue-400">
                Contact Information
              </h4>
              <p className="text-gray-700 text-xs">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                {user?.email}
              </p>
              <p className="text-gray-700 text-xs">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                {user?.phone_number}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-bold text-xs mb-4">Manage Profile</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded"
              >
                Delete Profile
              </button>
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
                  className="bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-1/2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded w-full sm:w-1/2"
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
                className="bg-red-500 text-white py-2 px-4 rounded w-full"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded w-full"
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

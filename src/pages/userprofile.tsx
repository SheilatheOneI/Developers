import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthCtx from "../context/auth-context";

import {
  faChevronLeft,
  faEdit,
  faSave,
  faTimes,
  faUser,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface Skill {
  _id: string;
  name: string;
  level: string;
}

interface Developer {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | undefined;
  specialization: string;
  jobType: string;
  location: string;
  rate: number;
  bio: string;
  skills: Skill[];
  experience: number;
  completedProjects: number;
  rating: number;
  availability: string;
  linkedinUrl: string;
  githubUrl: string;
}

type DeveloperKeys = keyof Developer;

const Profile: React.FC = () => {
  const [formValues, setFormValues] = useState<Developer | null>(null);
  const [skillsToDelete, setSkillsToDelete] = useState<string[]>([]);
  const [editingSections, setEditingSections] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const { updateProfile, deleteProfile, user } = useAuthCtx();

  useEffect(() => {
    if (user) {
      setFormValues({
        ...user,
        skills: user.skills || [],
        experience: user.experience || 0,
        completedProjects: user.completedProjects || 0,
        rating: user.rating || 0,
        linkedinUrl: user.linkedinUrl || '',
        githubUrl: user.githubUrl || '',
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormValues((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      };
    });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormValues((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        phone_number: value || "",
      };
    });
  };

  const handleSave = async (section: keyof typeof sectionFields) => {
    if (!formValues) return;
    try {
      const sectionData: Partial<Developer> = Object.keys(formValues)
        .filter(key => sectionFields[section].includes(key as DeveloperKeys))
        .reduce((obj, key) => {
          const typedKey = key as DeveloperKeys;
          (obj[typedKey] as typeof formValues[typeof typedKey]) = formValues[typedKey];
          return obj;
        }, {} as Partial<Developer>);
      
      if (section === 'professional') {
        await updateProfile(sectionData, skillsToDelete);
      } else {
        await updateProfile(sectionData);
      }
      
      setEditingSections(prev => prev.filter(s => s !== section));
      setSkillsToDelete([]);
    } catch (error) {
      console.error("Error updating developer data:", error);
    }
  };

  const handleDelete = async () => {
    if (!user?._id) return;
    try {
      await deleteProfile(user._id.toString());
      navigate("/");
    } catch (error) {
      console.error("Error deleting developer profile:", error);
    }
  };

  const handleAddSkill = () => {
    setFormValues(prev => {
      if (!prev) return null;
      return {
        ...prev,
        skills: [...prev.skills, { _id: `new-${Date.now()}`, name: '', level: 'Beginner' }]
      };
    });
  };

  const handleSkillChange = (index: number, field: 'name' | 'level', value: string) => {
    setFormValues(prev => {
      if (!prev) return null;
      return {
        ...prev,
        skills: prev.skills.map((skill, i) => 
          i === index ? { ...skill, [field]: value } : skill
        )
      };
    });
  };

  const handleDeleteSkill = (index: number) => {
    setFormValues(prev => {
      if (!prev) return null;
      const skillToDelete = prev.skills[index];
      if (skillToDelete._id && !skillToDelete._id.startsWith('new-')) {
        setSkillsToDelete(prevSkillsToDelete => [...prevSkillsToDelete, skillToDelete._id]);
      }
      return {
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index)
      };
    });
  };

  if (!formValues) return <div>Loading...</div>;

  const sectionFields = {
    personal: ['first_name', 'last_name', 'email', 'phone_number'] as DeveloperKeys[],
    professional: ['specialization', 'jobType', 'location', 'rate', 'skills'] as DeveloperKeys[],
    additional: ['experience', 'completedProjects'] as DeveloperKeys[],
    social: ['linkedinUrl', 'githubUrl'] as DeveloperKeys[],
    bio: ['bio'] as DeveloperKeys[],
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 sm:p-8">
        <button
          className="text-blue-600 hover:underline mb-8 flex items-center transition duration-300"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          Back to Home
        </button>

        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row items-center mb-8">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-4xl mb-4 sm:mb-0 sm:mr-6">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-lora sm:text-3xl font-bold">{`${formValues.first_name} ${formValues.last_name}`}</h1>
              <p className="text-gray-600 font-openSans">{formValues.specialization}</p>
            </div>
          </div>
          
          {Object.entries(sectionFields).map(([sectionKey, fields]) => (
            <ProfileSection
              key={sectionKey}
              title={sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
              fields={fields}
              formValues={formValues}
              isEditing={editingSections.includes(sectionKey)}
              onEdit={() => setEditingSections(prev => [...prev, sectionKey])}
              onSave={() => handleSave(sectionKey as keyof typeof sectionFields)}
              onCancel={() => setEditingSections(prev => prev.filter(s => s !== sectionKey))}
              onChange={handleChange}
              onPhoneChange={sectionKey === 'personal' ? handlePhoneChange : undefined}
              multiline={sectionKey === 'bio'}
              handleSkillChange={handleSkillChange}
              handleDeleteSkill={handleDeleteSkill}
              handleAddSkill={handleAddSkill}
            />
          ))}
        </div>

        <div className="bg-red-50 p-4 sm:p-8 rounded-lg shadow-lg border border-red-200">
          <h2 className="text-2xl font-lora font-semibold mb-4 text-red-600">Danger Zone</h2>
          <p className="mb-4 text-gray-700">Deleting your profile is permanent and cannot be undone.</p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 w-full sm:w-auto"
          >
            Delete Profile
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this profile?</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
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

interface ProfileSectionProps {
  title: string;
  fields: DeveloperKeys[];
  formValues: Developer;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onPhoneChange?: (value: string | undefined) => void;
  multiline?: boolean;
  handleSkillChange?: (index: number, field: 'name' | 'level', value: string) => void;
  handleDeleteSkill?: (index: number) => void;
  handleAddSkill?: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  fields,
  formValues,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
  onPhoneChange,
  multiline = false,
  handleSkillChange,
  handleDeleteSkill,
  handleAddSkill,
}) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-lora font-semibold">{title}</h2>
      {isEditing ? (
        <div className="space-x-2">
          <button
            onClick={onSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit
        </button>
      )}
    </div>

    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field}>
          {field === 'skills' ? (
            <>
              <label className="block font-openSans font-semibold mb-1">Skills</label>
              {formValues.skills.map((skill, index) => (
                <div key={skill._id} className="mb-2">
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      className="border p-2 rounded w-1/3 mr-2"
                      value={skill.name}
                      onChange={(e) => handleSkillChange?.(index, 'name', e.target.value)}
                      placeholder="Skill name"
                      disabled={!isEditing}
                    />
                    <select
                      className="border p-2 rounded w-1/3 mr-2"
                      value={skill.level}
                      onChange={(e) => handleSkillChange?.(index, 'level', e.target.value)}
                      disabled={!isEditing}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    {isEditing && (
                      <button
                        onClick={() => handleDeleteSkill?.(index)}
                        className="text-red-600 hover:text-red-800 transition duration-300"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={handleAddSkill}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                  Add Skill
                </button>
              )}
            </>
          ) : field === 'phone_number' ? (
            <PhoneInput
              value={formValues.phone_number}
              onChange={(value: string | undefined) => onPhoneChange && onPhoneChange(value)}
              disabled={!isEditing}
              className="border p-2 rounded w-full"
            />
          ) : (
            <>
              <label htmlFor={field} className="block font-openSans font-semibold mb-1 capitalize">
                {field.replace('_', ' ')}
              </label>
              {multiline ? (
                <textarea
                  id={field}
                  name={field}
                  value={formValues[field] as string}
                  onChange={onChange}
                  disabled={!isEditing}
                  className="border p-2 rounded w-full"
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formValues[field] as string | number}
                  onChange={onChange}
                  disabled={!isEditing}
                  className="border p-2 rounded w-full"
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Profile;
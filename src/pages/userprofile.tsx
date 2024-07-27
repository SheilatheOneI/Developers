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

interface Developer {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: string;
  jobType: string;
  location: string;
  rate: number;
  bio: string;
  skills: { name: string; level: number }[];
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const sectionData = Object.keys(formValues)
        .filter(key => sectionFields[section].includes(key as DeveloperKeys))
        .reduce((obj, key) => {
          if (key === 'skills') {
            obj[key] = formValues[key];
          } else {
            obj[key as DeveloperKeys] = formValues[key as DeveloperKeys];
          }
          return obj;
        }, {} as Partial<Developer>);
      
      updateProfile(sectionData);
      setEditingSections(prev => prev.filter(s => s !== section));
    } catch (error) {
      console.error("Error updating developer data:", error);
    }
  };

  const handleDelete = async () => {
    if (!user?._id) return;
    try {
      deleteProfile(user?._id as unknown as string);
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
        skills: [...prev.skills, { name: '', level: 0 }]
      };
    });
  };

  const handleSkillChange = (index: number, field: 'name' | 'level', value: string | number) => {
    setFormValues(prev => {
      if (!prev) return null;
      return {
        ...prev,
        skills: prev.skills.map((skill, i) => 
          i === index ? { ...skill, [field]: field === 'level' ? Number(value) : value } : skill
        )
      };
    });
  };

  const handleDeleteSkill = (index: number) => {
    setFormValues(prev => {
      if (!prev) return null;
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
              <h1 className="text-2xl sm:text-3xl font-bold">{`${formValues.first_name} ${formValues.last_name}`}</h1>
              <p className="text-gray-600">{formValues.specialization}</p>
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
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Danger Zone</h2>
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
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPhoneChange?: (value: string | undefined) => void;
  multiline?: boolean;
  handleSkillChange: (index: number, field: 'name' | 'level', value: string | number) => void;
  handleDeleteSkill: (index: number) => void;
  handleAddSkill: () => void;
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
}) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {isEditing ? (
          <div>
            <button onClick={onSave} className="text-green-500 hover:text-green-600 transition duration-300 mr-2">
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button onClick={onCancel} className="text-red-500 hover:text-red-600 transition duration-300">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ) : (
          <button onClick={onEdit} className="text-blue-500 hover:text-blue-600 transition duration-300">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            {isEditing ? (
              field === 'phone_number' && onPhoneChange ? (
                <PhoneInput
                  defaultCountry="KE"
                  placeholder="Enter phone number"
                  value={formValues[field]}
                  onChange={onPhoneChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : field === 'skills' ? (
                <div>
                  {formValues.skills.map((skill, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                        placeholder="Skill name"
                        className="border p-2 rounded w-full sm:w-auto flex-grow"
                      />
                      <input
                        type="number"
                        value={skill.level}
                        onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                        min="0"
                        max="10"
                        placeholder="Level (0-10)"
                        className="border p-2 rounded w-full sm:w-24"
                      />
                      <button
                        onClick={() => handleDeleteSkill(index)}
                        className="text-red-500 hover:text-red-600 transition duration-300 w-full sm:w-auto"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddSkill}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                  >
                    Add Skill
                  </button>
                </div>
              ) : multiline ? (
                <textarea
                  name={field}
                  value={formValues[field] != null ? formValues[field].toString() : ''}
                  onChange={onChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                />
              ) : (
                <input
                  type={field === 'rate' || field === 'experience' || field === 'completedProjects' || field === 'rating' ? 'number' : 'text'}
                  name={field}
                  value={formValues[field] != null ? formValues[field].toString() : ''}
                  onChange={onChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )
            ) : (
              field === 'skills' ? (
                <ul>
                  {formValues.skills.map((skill, index) => (
                    <li key={index}>{skill.name} - Level: {skill.level}</li>
                  ))}
                </ul>
              ) : (
                <p>{formValues[field] != null ? formValues[field].toString() : ''}</p>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
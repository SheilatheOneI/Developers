import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Button,  Avatar,  Badge } from "@nextui-org/react";
import { Developer } from "../types/auth";
import {
  FiPhone,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiStar,
  FiAward,
} from "react-icons/fi";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
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
        setDeveloper({
          ...data,
           skills: data.skills || [],
        experience: data.experience || 0,
        completedProjects: data.completedProjects || 0,
        rating: data.rating ,
        linkedinUrl: data.linkedinUrl || '',
        githubUrl: data.githubUrl || '',
        });
        setLoading(false);
      } catch (error) {
        console.log("Error fetching developer data", error);
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!developer) return <div>Developer not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <Button
          color="primary"
          variant="light"
          className="mb-4"
          onClick={() => navigate("/")}
          startContent={<FiArrowLeft />}
        >
          Back to Home
        </Button>
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Avatar
              src={developer.profilePicture}
              alt={`${developer.first_name} ${developer.last_name}`}
              className="h-48 w-full object-cover md:w-48"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {developer.specialization}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 font-lora">
              {developer.first_name} {developer.last_name}
            </h1>
            <p className="mt-2 text-gray-600">{developer.jobType}</p>
            <p className="mt-2 text-gray-600">{developer.location}</p>
            <div className="mt-4 flex items-center">
              <Badge color="warning" variant="flat">
                ${developer.rate}/hour
              </Badge>
              
            </div>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900 font-lora">About Me</h2>
          <p className="mt-2 text-gray-600">{developer.bio}</p>
        </div>

        <div className="px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-900 font-lora">Skills</h2>
          <div className="mt-4  sm:grid-cols-2">
            {developer.skills?.map((skill) => (
              <div key={skill.name}>
                <div className="flex space-x-5 items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {skill.name}
                  </span>
                  <span className="text-sm font-medium text-gray-500">-
                   {skill.level} level
                  </span>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900 font-lora">Experience</h2>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {developer.experience}
              </p>
              <p className="text-sm text-gray-600 font-lora">Years of Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 font-lora">
                {developer.completedProjects}
              </p>
              <p className="text-sm text-gray-600 font-lora">Completed Projects</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 flex items-center">
                {developer.rating} <FiStar className="text-yellow-400 ml-1" />
              </p>
              <p className="text-sm text-gray-600 font-lora">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-900 font-lora">
            Contact Information
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <FiPhone className="text-gray-400 mr-2" />
              <span>{developer.phone_number}</span>
            </div>
            <div className="flex items-center">
              <FiMail className="text-gray-400 mr-2" />
              <span>{developer.email}</span>
            </div>
          </div>
          <div className="mt-6 flex space-x-4 font-lora">
            <Button
              color="success"
              as="a"
              href={`tel:${developer.phone_number}`}
            >
              <FiPhone className="mr-2 font-lora" /> Call
            </Button>
            <Button color="primary" as="a" href={`mailto:${developer.email}`}>
              <FiMail className="mr-2" /> Email
            </Button>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900 font-lora">
            Social Profiles
          </h2>
          <div className="mt-4 flex space-x-4">
              <Button
                color="default"
                as="a"
                href={developer.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin className="mr-2" /> LinkedIn
              </Button>
            
              <Button
                color="default"
                as="a"
                href={developer.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="mr-2" /> GitHub
              </Button>
            
          </div>
        </div>

        <div className="px-8 py-4">
          <Button color="secondary" className="w-full">
            <FiAward className="mr-2" /> Hire {developer.first_name}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

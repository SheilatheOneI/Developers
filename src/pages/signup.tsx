import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { H1 } from "../components/typography";
import useAuthCtx from "../context/auth-context";
import { SignUpData } from "../types/auth";

const Signup: React.FC = () => {
  const { signUp } = useAuthCtx();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formatedData: SignUpData = {
      ...formData,
      user_data: [
        { first_name: formData.firstName, last_name: formData.lastName },
      ],
      
    };

    try {
      await signUp(formatedData);
      navigate(`/userprofile/`);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="min-h-screen bg-w flex flex-col items-center justify-center p-8 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full mt-6 border-2 border-grey"
      >
        <H1 className="mb-2 text-4xl font text-center">DevConnect</H1>
        <h1 className="text-xl text-center mb-6">Sign up to get started</h1>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-1/2 px-4 py-2 border rounded-full"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 border rounded-full"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail Address"
            className="w-full px-4 py-2 border rounded-full"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create your Password"
            className="w-full px-4 py-2 border rounded-full"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-full"
          />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="terms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-[#1C5D99] text-white py-2 rounded-full hover:bg-[#164973] transition-colors mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

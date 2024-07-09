import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
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
    console.log(formData);
    const formatedData = {
      ...formData,
      user_type: "individual",
      user_data: [
        { first_name: formData.firstName, last_name: formData.lastName },
      ],
    };

    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatedData),
      });
      console.log(response.status);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Signup failed ${data.message || data}`);
      }
      const userId = data.id;

      navigate(`/userprofile/${userId}`);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="min-h-screen bg-w flex flex-col items-center justify-center p-8 relative">
      {/* <button
        className="absolute top-4 left-4 text-[#1C5D99] hover:underline"
        onClick={() => navigate("/")}
      >
        &larr; Back
      </button> */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full mt-12 border-2 border-grey"
      >
        <img
          src="src/images/logo2.jpg"
          alt="Logo"
          className="h-16 w-16 mx-auto mb-4 rounded-full"
        />
        <h1 className="text-2xl font-semibold text-center mb-6">
          Sign up to get started
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-1/2 p-2 border rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-1/2 p-2 border rounded-lg"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail Address"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create your Password"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded-lg"
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
          className="w-full bg-[#1C5D99] text-white py-2 rounded hover:bg-[#164973] transition-colors mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(true);
  const [isIndividual, setIsIndividual] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    agreeTerms: false,
  });

  const handleClientFreelancerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsClient(e.target.value === "client");
  };

  const handleIndividualBusinessChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsIndividual(e.target.value === "individual");
  };

  const handleContinue = () => {
    setIsSignup(true);
  };

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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 relative">
      <div className="mb-4 mt-3 p-2 pl-0">
        <button
          className="mb-4 mt-3 text-[#1C5D99] hover:underline pl-0"
          onClick={() => navigate("/")}
          style={{ transform: "translateX(-4cm)" }}
        >
          &larr; Back
        </button>
      </div>
      {!isSignup ? (
        <div className="bg-white shadow-lg rounded-lg p-10 top-40 max-w-sm w-full border-2 border-grey">
          <span className="flex ">
            <img
              src="/src/images/logo2.jpg"
              alt=""
              className="w-max h-[6rem] rounded-full"
            />
          </span>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Join as Client or Freelancer
          </h1>
          <div className="flex flex-col gap-4 mb-6 border p-4 rounded">
            <label className="flex items-center">
              <input
                type="radio"
                name="clientFreelancer"
                value="client"
                checked={isClient}
                onChange={handleClientFreelancerChange}
                className="mr-2"
              />
              Join as a Client
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="clientFreelancer"
                value="freelancer"
                checked={!isClient}
                onChange={handleClientFreelancerChange}
                className="mr-2"
              />
              Join as a Freelancer
            </label>
          </div>
          <button
            onClick={handleContinue}
            className="w-full bg-[#1C5D99] text-white py-2 rounded hover:bg-[#164973] transition-colors"
          >
            Continue as {isClient ? "Client" : "Freelancer"}
          </button>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full mt-20 border-2 border-grey"
        >
          <img
            src="/path/to/logo.jpg"
            alt="Logo"
            className="h-16 mx-auto mb-4 "
          />
          <h1 className="text-2xl font-semibold text-center mb-6">
            Sign up to get started
          </h1>
          <div className="flex gap-4 mb-6">
            <div className="flex flex-col gap-4 border p-4 rounded w-1/2">
              <label className="flex items-center justify-center">
                <input
                  type="radio"
                  name="individualBusiness"
                  value="individual"
                  checked={isIndividual}
                  onChange={handleIndividualBusinessChange}
                  className="mr-2"
                />
                Individual
              </label>
            </div>
            <div className="flex flex-col gap-4 border p-4 rounded w-1/2">
              <label className="flex items-center justify-center">
                <input
                  type="radio"
                  name="individualBusiness"
                  value="business"
                  checked={!isIndividual}
                  onChange={handleIndividualBusinessChange}
                  className="mr-2"
                />
                Business
              </label>
            </div>
          </div>
          {isIndividual ? (
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
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 border rounded-lg"
              />
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
          ) : (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name / Organisation"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 border rounded-lg"
              />
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
          )}
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
      )}
    </div>
  );
};

export default Signup;

import { useState } from "react";

const Signup: React.FC = () => {
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

  const handleGoBack = () => {
    setIsSignup(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 relative">
      <div className="container mx-auto px-4" onClick={handleGoBack}>
        <button className="mb-4 text-[#1C5D99] hover:underline">
          &larr; Back
        </button>
      </div>

      {!isSignup ? (
        <div className="bg-white shadow-lg rounded-lg p-10 top-40 max-w-sm w-full border-2 border-grey">
          <img
            src="/path/to/logo.jpg"
            alt="Logo"
            className="h-16 mx-auto mb-4"
          />
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
              className="mr-2"
            />
            <label htmlFor="terms">I agree to the Terms and Conditions</label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1C5D99] text-white py-2 rounded-lg mt-4 hover:bg-[#164973] transition-colors"
          >
            Sign Up as {isClient ? "Client" : "Freelancer"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Signup;

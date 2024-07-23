import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { H1 } from "../components/typography";
import useAuthCtx from "../context/auth-context";
import { SignUpData } from "../types/auth";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const Signup: React.FC = () => {
  const { signUp } = useAuthCtx();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const formatedData: SignUpData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        agreeTerms: formData.agreeTerms,
      };

      try {
        await signUp(formatedData);
        navigate(`/userprofile/`);
      } catch (error) {
        console.error("Error during signup:", error);
        setSignupError('Signup failed. Please check your email and try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-w flex flex-col items-center justify-center p-8 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full mt-6 border-2 border-grey"
      >
        <H1 className="mb-2 text-4xl font text-center">Gigit</H1>
        <h1 className="text-xl text-center mb-6">Sign up to get started</h1>
        {signupError && <p className="text-red-500 text-sm mb-4 text-center">{signupError}</p>}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="w-1/2">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className={`w-full px-4 py-2 border rounded-full ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className={`w-full px-4 py-2 border rounded-full ${errors.lastName ? 'border-red-500' : ''}`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail Address"
              className={`w-full px-4 py-2 border rounded-full ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create your Password"
              className={`w-full px-4 py-2 border rounded-full ${errors.password ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`w-full px-4 py-2 border rounded-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="terms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className={`w-4 h-4 ${errors.agreeTerms ? 'border-red-500' : ''}`}
          />
          <label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <a href="/termsandconditions" className="text-blue-500 hover:underline">
              terms and conditions
            </a>
          </label>
        </div>
        {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
        <button
          type="submit"
          className="w-full bg-[#F13223] text-white py-2 rounded-full hover:bg-[#f0b4af] transition-colors mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const ResetPassword: React.FC = () => {
  const { resetToken } = useParams<{ resetToken: string }>();
  const token = resetToken;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    setError(null);

    try {
      await resetPassword(token, password);

      toast.success("Password reset successfully!", {
        position: "top-right",
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      console.error("Error during password reset:", error);

      toast.error("Failed to reset password. Please try again later.", {
        position: "top-right",
      });
    }
  };

  const resetPassword = async (token: string, password: string) => {
    const response = await fetch(
      `https://gigit.onrender.com/api/auth/reset-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-w p-4 sm:p-6 md:p-8">
      <ToastContainer className="toast-container" />

      <main className="flex flex-col items-center justify-center flex-grow w-full p-4 sm:p-8">
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px]">
          <div className="flex justify-center mb-1">
            <img
              src="/logo2.png"
              alt="Gigit logo"
              className="w-32 h-16 sm:w-40 sm:h-20 object-contain"
            />
          </div>
          
          <p className="text-base sm:text-lg text-center mb-2 font-medium text-gray-600">
            Reset Your Password
          </p>
          <p className="text-center mb-6 text-xs sm:text-sm text-gray-500">
            Enter your new password below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="New Password"
                className="w-full p-2 sm:p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#F13223] text-sm sm:text-base pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                )}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs sm:text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#F13223] text-white py-2 sm:py-3 rounded-full hover:bg-[#e28983] transition-colors text-sm sm:text-base"
            >
              Reset Password
            </button>
          </form>
        </div>
      </main>
      <footer className="py-4">
        <p className="text-center text-sm text-gray-600">
          Copyright © 2024 Gigit. The Tech Band Originals
        </p>
      </footer>
      <style>{`
        .toast-container {
          width: 100%;
          max-width: 320px;
        }
        @media (min-width: 640px) {
          .toast-container {
            max-width: 380px;
          }
        }
        @media (min-width: 768px) {
          .toast-container {
            max-width: 440px;
          }
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;

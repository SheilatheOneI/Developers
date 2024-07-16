import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      setError("Password is required");
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
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error during password reset:", error);

      toast.error("Failed to reset password. Please try again later.", {
        position: "top-right",
      });
    }
  };

  const resetPassword = async (token: string, password: string) => {
    const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-w p-4">
      <ToastContainer className="toast-container" />
      <button
        className="absolute top-16 left-12 text-[#1C5D99] hover:underline"
        onClick={() => navigate("/login")}
      >
        &larr; Back
      </button>
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-center mb-1">DevConnect</h1>
        <p className="text-lg text-center mb-2 font-medium text-gray-600">
          Reset Your Password
        </p>
        <p className="text-center mb-6 text-sm text-gray-500">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            placeholder="New Password"
            className="w-full p-3 mb-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#1C5D99] text-sm"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#1C5D99] text-white py-3 rounded-full hover:bg-[#164973] transition-colors text-sm"
          >
            Reset Password
          </button>
        </form>
      </div>
      <style>{`
        .toast-container {
          width: 100%;
          max-width: 400px;
        }
        @media (max-width: 768px) {
          .toast-container {
            max-width: 80%;
          }
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;

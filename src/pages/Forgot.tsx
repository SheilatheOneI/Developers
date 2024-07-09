import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    } else {
      setError(null);
    }

    try {
      await sendResetEmail(email);

      toast.success("Reset link sent successfully!", {
        position: "top-right",
      });

      navigate("/");
    } catch (error) {
      console.error("Error during password reset:", error);

      toast.error("Failed to send reset link. Please try again later.", {
        position: "top-right",
      });
    }
  };

  const sendResetEmail = async (email: string) => {
    console.log("Sending password reset email to:", email);

    const response = await fetch(`http://localhost:5000/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send reset link");
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
          Forgot Your Password
        </p>
        <p className="text-center mb-6 text-sm text-gray-500">
          Enter your email address to receive the link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="Your Email"
            className="w-full p-3 mb-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#1C5D99] text-sm"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#1C5D99] text-white py-3 rounded-full hover:bg-[#164973] transition-colors text-sm"
          >
            Send Link
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-500">
          Remembered your password?{" "}
          <span
            className="text-[#1C5D99] cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
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

export default ForgotPassword;

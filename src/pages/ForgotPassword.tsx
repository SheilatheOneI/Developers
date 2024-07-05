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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <ToastContainer className="toast-container" />
      <button
        className="absolute top-4 left-4 text-[#1C5D99] hover:underline"
        onClick={() => navigate("/")}
      >
        &larr; Back
      </button>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full mt-12 border-2 border-grey"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Forgot Your Password?
        </h1>
        <p className="text-center mb-6">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null); // Clear error when input changes
          }}
          placeholder="Your Email Address"
          className="w-full p-2 border rounded-lg"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>} 
        <button
          type="submit"
          className="w-full bg-[#1C5D99] text-white py-2 rounded hover:bg-[#164973] transition-colors mt-4"
        >
          Send Reset Link
        </button>
      </form>

      <style>{`
        .toast-container {
          width: 100%;
          max-width: 400px; /* Adjust maximum width as needed */
          @media (max-width: 768px) {
            max-width: 80%; /* Responsive adjustment for smaller screens */
          }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;

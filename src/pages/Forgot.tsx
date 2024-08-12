import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    } else {
      setError(null);
    }
    setLoading(true);
    try {
      await sendResetEmail(email);
      setLinkSent(true);
      toast.success("Reset link sent successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("Failed to send reset link. Please try again later.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendResetEmail = async (email: string) => {
    console.log("Sending password reset email to:", email);
    const response = await fetch(
      `https://gigit.onrender.com/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send reset link");
    }
  };

  const handleResendLink = () => {
    setLinkSent(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-w p-4">
      <ToastContainer className="toast-container" />
      <button
        className="absolute top-16 left-12 text-black hover:underline"
        onClick={() => navigate("/auth/login")}
      >
        &larr; Back
      </button>
      <main className="flex flex-col items-center justify-center flex-grow w-full p-4 sm:p-8">
        <div className="bg-white shadow-md rounded-2xl p-8 max-w-sm w-full">
          <div className="flex justify-center mb-1">
            <img
              src="/logo2.png"
              alt="Gigit logo"
              className="w-32 h-16 sm:w-40 sm:h-20 object-contain"
            />
          </div>
          
          <p className="text-lg text-center mb-2 font-medium text-gray-600">
            Forgot Your Password
          </p>
          {!linkSent ? (
            <>
              <p className="text-center mb-6 text-sm text-gray-500">
                Let's help you recover your account.
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
                  className="w-full p-3 mb-4 text-center border rounded-full focus:outline-none focus:ring-2 focus:ring-[#1C5D99] text-sm"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-[#F13223] text-white py-3 rounded-full hover:bg-[#F13223] transition-colors text-sm"
                >
                  {loading ? "Loading..." : "Recover"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-6 text-sm text-gray-500">
                A reset link has been sent to your email address.
              </p>
              <button
                onClick={() => navigate("/auth/login")}
                className="w-full bg-[#F13223] text-white py-3 rounded-full hover:bg-[#db5349] transition-colors text-sm mb-4"
              >
                Back to Login
              </button>
              <button
                onClick={handleResendLink}
                className="w-full bg-white text-[#F13223] py-3 rounded-full border border-[#F13223] hover:bg-[#f0f8ff] transition-colors text-sm"
              >
                Recover
              </button>
            </div>
          )}
          {!linkSent && (
            <p className="text-center mt-4 text-sm text-gray-500">
              Remembered your password?{" "}
              <span
                className="underline cursor-pointer hover:underline"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </span>
            </p>
          )}
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

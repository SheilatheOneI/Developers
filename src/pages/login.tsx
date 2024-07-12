import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { H1 } from "../components/typography";

type formValues = {
  email: string;
  password: string;
};

const Login = () => {
  const form = useForm<formValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const loginUser = async (data: formValues) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      localStorage.setItem("jwtToken", result.user.token);

      console.log(result.user._id);

      login(); // Ensure login() is called correctly
      navigate(`/userprofile/${result.user._id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data: formValues) => {
    loginUser(data);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex flex-col h-screen items-center bg-w overflow-hidden">
      <main className="flex flex-col items-center justify-center flex-grow w-full p-4 sm:p-8">
        <div className="w-full max-w-md p-8 bg-white border-2 rounded-2xl shadow-md">
          {/* Uncomment the following block if you want to include the logo */}
          {/* <div className="flex justify-center mb-4">
            <img
              src="src/images/logo2.jpg"
              alt="DevConnect Logo"
              className="w-20 h-20 rounded-full"
            />
          </div> */}
          <H1 className="mb-2 text-4xl font text-center">DevConnect</H1>
          <p className="mb-4 text-center">Login to continue</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <input
                type="text"
                id="email"
                className="py-2 px-6 border-2 rounded-full"
                placeholder="Email"
                {...register("email", { required: "This field is required" })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                id="password"
                className="py-2 px-6 border-2 rounded-full"
                placeholder="Password"
                {...register("password", {
                  required: "This field is required",
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <span className="text-sm">Forgot Password? </span>
              <Link
                href="/forgot-password"
                className="text-sm text-lapis cursor-pointer"
                onClick={handleForgotPassword}
              >
                <span className="text-[#BBCDE5] hover:underline">
                  Click here
                </span>
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full py-2 text-white bg-[#1C5D99] rounded-full my-0"
            >
              Log In
            </Button>
          </form>
          <div className="mt-2 text-center mb-1">
            <span className="text-sm"> Don't have an account?</span>
            <Link href="/signup">
              <span className="text-[#BBCDE5] hover:underline">Sign up</span>
            </Link>
          </div>
          <DevTool control={control} />
        </div>
      </main>
    </div>
  );
};

export default Login;

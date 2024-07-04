import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

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

  const login = async (data: formValues) => {
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
      localStorage.setItem("jwtToken", result.token);

      console.log(result.user._id);

      navigate(`/userprofile/${result.user._id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data: formValues) => {
    login(data);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Navigate to the forgot password page
  };

  return (
    <div className="flex flex-col h-screen items-center bg-white overflow-hidden">
      <main className="flex flex-col items-center justify-center flex-grow w-full p-4 sm:p-8">
        <div className="w-full max-w-md p-8 bg-white border-2 rounded-2xl shadow-md">
          <div className="flex justify-center mb-4">
            <img
              src="src/images/logo2.jpg"
              alt="DevConnect Logo"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-center">DevConnect</h1>
          <p className="mb-4 text-center">Login to continue</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <input
                type="text"
                id="email"
                className="p-2 border-2 rounded-xl"
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
                className="p-2 border-2 rounded-xl"
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
              <a
                href="#"
                className="text-sm text-[#1C5D99] cursor-pointer"
                onClick={handleForgotPassword}
              >
                Forget Password?{" "}
                <span className="text-[#BBCDE5] hover:underline">Click here</span>
              </a>
            </div>
            <Button
              type="submit"
              className="w-full py-2 text-white bg-[#1C5D99] rounded-xl"
            >
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center mb-1 ">
            <p> Don't have an account?</p>
            <Link href="/signup">
              <p className="text-[#BBCDE5] hover:underline">Sign up</p>
            </Link>
          </div>
          <DevTool control={control} />
        </div>
      </main>
    </div>
  );
};

export default Login;

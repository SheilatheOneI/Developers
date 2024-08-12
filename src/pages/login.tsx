import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useAuthCtx from "../context/auth-context";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const { login } = useAuthCtx();

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
      navigate(`/userprofile/`);
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/auth/forgot-password");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col h-screen items-center bg-w overflow-hidden">
      <main className="flex flex-col items-center justify-center flex-grow w-full p-4 sm:p-8">
        <div className="w-full max-w-sm p-8 bg-white border-2 rounded-2xl ">
          <div className="flex justify-center mb-1">
            <img
              src="/logo2.png"
              alt="Gigit logo"
              className="w-32 h-16 sm:w-40 sm:h-20 object-contain"
            />
          </div>
          
          <p className="mb-4  text-center">Login to continue</p>
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
            <div className="flex flex-col relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="py-2 px-6 border-2 rounded-full pr-10"
                placeholder="Password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            {loginError && (
              <p className="mt-1 text-sm text-red-600 text-center">
                {loginError}
              </p>
            )}
            <div className="flex justify-center">
              <span className="text-sm">Forgot Password?</span>
              <Link
                href="/auth/forgot-password"
                className="text-sm "
                onClick={handleForgotPassword}
              >
                <span className=" underline">
                   Click here
                </span>
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full py-2 text-white bg-[#F13223] rounded-full my-0"
            >
              Log In
            </Button>
          </form>
          <div className="mt-2 text-center mb-1">
            <span className="text-sm"> Don't have an account?</span>
            <Link href="/auth/signup">
              <span className="text-[#F13223] hover:underline">Sign up</span>
            </Link>
          </div>
          <DevTool control={control} />
        </div>
      </main>
      <footer className="py-4">
        <p className="text-center text-sm text-gray-600">
          Copyright © 2024 Gigit. The Tech Band Originals
        </p>
      </footer>
    </div>
  );
};

export default Login;

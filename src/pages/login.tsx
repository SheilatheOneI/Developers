import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@nextui-org/react";
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

  const onsubmit = (data: formValues) => {
    login(data);
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-100 overflow-hidden">
      <header className="flex justify-between w-full px-8 py-4">
        <img src="src/images/logo2.jpg" alt="DevConnect Logo" className="w-40 h-20" />
      </header>
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-lg p-8 bg-white border-2 rounded-2xl shadow-md">
          <h1 className="mb-2 text-2xl font-bold text-center">DevConnect</h1>
          <p className="mb-4 text-center">Login to continue</p>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
            <div className="flex flex-col">
              <input
                type="text"
                id="email"
                className="p-4 border-2 rounded-xl"
                placeholder="Email"
                {...register("email", { required: "This field is required" })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                id="password"
                className="p-4 border-2 rounded-xl"
                placeholder="Password"
                {...register("password", {
                  required: "This field is required",
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-500">
                Forget Password? Click here
              </a>
            </div>
            <Button type="submit" className="w-full py-3 text-white bg-blue-600 rounded-xl">
              Log In
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p>
              Don't have an account?{" "}
              <a href="#" className="text-blue-500">
                Sign up
              </a>
            </p>
          </div>
          <DevTool control={control} />
        </div>
      </main>
    </div>
  );
};

export default Login;

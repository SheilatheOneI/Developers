import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { H1 } from "../components/typography";

type FormValues = {
  email: string;
  password: string;
};

const Admin = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  const adminLogin = async (data: FormValues) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      navigate(`/connect`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data: FormValues) => {
    adminLogin(data);
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <section className="flex flex-col justify-center items-center p-8 border border-moonstone rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md bg-white">
        <section className="text-center mb-4">
          <H1 className="mb-0 text-4xl font-bold">DevConnect</H1>
          <p className="text-lg">Admin Login</p>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-4">
            <input
              type="text"
              id="email"
              className="w-full py-3 pl-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-lapis"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="w-full py-3 pl-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-lapis"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>
          <Button
            type="submit"
            className="w-full text-lg bg-lapis text-white py-2 rounded-full"
          >
            Login
          </Button>
          <DevTool control={control} />
        </form>
      </section>
    </main>
  );
};

export default Admin;

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch(
        `https://gigit.onrender.com/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-w">
      <main className="flex flex-col items-center justify-center flex-grow w-full p-4 sm:p-8">
        <section className="flex flex-col justify-center items-center p-8 border shadow-lg rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md bg-white">
          <div className="flex justify-center mb-2">
            <img
              src="/logo2.png"
              alt="Gigit logo"
              className="w-32 h-16 sm:w-40 sm:h-20 object-contain"
            />
          </div>
            <p className="text-lg mb-3">Admin Login</p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <input
                type="text"
                id="email"
                className="w-full py-3 pl-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F13223]"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                className="w-full py-3 pl-6 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F13223]"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>
            <Button
              type="submit"
              className="w-full text-lg bg-[#F13223] text-white py-2 rounded-full hover:bg-[#e28983] transition-colors"
            >
              Login
            </Button>
            <DevTool control={control} />
          </form>
        </section>
      </main>
      <footer className="py-4">
        <p className="text-center text-sm text-gray-600">
          Copyright © 2024 Gigit. The Tech Band Originals
        </p>
      </footer>
    </div>
  );
};

export default Admin;

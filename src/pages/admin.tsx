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
      const response = await fetch(`http://localhost:5000/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data)

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
    <main>
      <section className="flex flex-col h-[90%] mt-20 justify-center items-center mx-auto p-10 border-moonstone border-2 rounded-lg w-max md:w-[36%]">
        <section className="text-center mb-10">
          <img
            src="/src/images/logo2.jpg"
            alt="Logo"
            className="w-36 h-36 rounded-full mx-auto mb-4"
          />
          <h1 className="font-bold text-2xl">Admin Login</h1>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
          <div className="mb-4">
            <input
              type="text"
              id="email"
              className="w-full p-3 border border-gray-400 rounded-xl"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.email?.message}
            </p>
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-400 rounded-xl"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg"
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

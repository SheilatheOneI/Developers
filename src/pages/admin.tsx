import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

type formValues = {
  email: string;
  password: string;
};

const Admin = () => {
  const form = useForm<formValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  const adminlogin = async (data: formValues) => {
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

      // const result = await response.json();

      // console.log(result.user._id);

      navigate(`/connect`);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const onsubmit = (data: formValues) => {
    adminlogin(data);
  };

  return (
    <main className="h-full flex items-center pt-[4cm] justify-center">
      <section className="flex flex-col text-center mx-auto w-max p-4 border-moonstone border-2 rounded-lg items-center justify-center">
        <section>
          {/* <span className="flex justify-center mb-4">
            <img
              src="/src/images/logo2.jpg"
              alt=""
              className="w-max h-[9rem] rounded-full"
            />
          </span>

          <h1 className="font-bold">Admin Login</h1>
        </section>
        <form onSubmit={handleSubmit(onsubmit)} className="pt-4">
          <section className="grid grid-cols-1 gap-y-2">
            <input
              type="text"
              id="email"
              className="p-4 border-gray-400 border-2 rounded-xl"
              placeholder="Email"
              {...register("email", { required: "This field is required" })}
            />
            <p className="text-red-300 text-start text-sm">
              {errors.email?.message}
            </p>

            <input
              type="password"
              id="password"
              className="p-4 border-gray-400 border-2 w-[20rem] rounded-xl"
              placeholder="Password"
              {...register("password", {
                required: "This field is required",
              })}
            />
            <p className="text-red-300 text-start text-sm">
              {errors.password?.message}
            </p>

            <Button
              type="submit"
              className="bg-lapis text-white p-3 rounded-lg w-[20rem]"
            >
              Login
            </Button>
          </section>

          <DevTool control={control} />
        </form>
      </section>
    </main>
  );
};

export default Admin;

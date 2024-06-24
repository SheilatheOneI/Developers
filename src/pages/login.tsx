import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@nextui-org/react";

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
  const onsubmit = (data: formValues) => {
    console.log(data);
  };

  return (
    <main>
      <section className="flex flex-col h-[90%] text-center  mx-auto w-max p-4 border-moonstone border-2 rounded-lg my-10  items-center justify-center">
        <section>
          <span className=" flex">
            <img
              src="/src/images/logo2.jpg"
              alt=""
              className="w-max h-[9rem] rounded-full "
            />
          </span>
          <h1 className="font-bold">Have An Account?</h1>
          <h2 className="font-bold">Login</h2>
        </section>
        <form onSubmit={handleSubmit(onsubmit)} className="pt-4">
          <section className="grid grid-col gap-y-2">
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
              className="p-4 border-gray-400 border-2 w-[20rem] rounded-xl "
              placeholder="Password"
              {...register("password", {
                required: "This field is required",
              })}
            />
            <p className="text-red-300 text-start text-sm ">
              {errors.password?.message}
            </p>

            <Button
              type="submit"
              className=" bg-lapis text-white  p-3  rounded-lg w-[20rem]"
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

export default Login;

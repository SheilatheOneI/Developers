import { Button, Link } from "@nextui-org/react";
import { H2, H5 } from "../components/typography.tsx";

const Landing = () => {
  return (
    <section className=" bg-landing min-h-[100vh] bg-[#0b0a0ab6] bg-blend-overlay bg-center bg-cover bg-no-repeat flex items-center ">
      <section className="md:grid md:grid-cols-[1fr,1fr] flex flex-col  mx-16 m-8 ">
        <section className="">
          <H2 className="p-1 text-white  lg:!text-7xl !text-5xl ">
            Welcome To DevConnect...
          </H2>
          <H5 className="p-1 font-semibold text-white lg:!text-3xl !text-2xl md:mb-4">
            Connecting Talent with Opportunity.
          </H5>
          <section className="grid grid-cols-2 lg:gap-4  gap-2 py-4 align-bottom text-start">
            <section>
              <h5 className="font-semibold text-white pb-2">
                Ready to join us?
              </h5>
              <Button className="border-lapis border-2 lg:px-20 px-10 lg:py-2  py-1 w-max rounded-lg text-white text-[1.2rem] font-bold">
                SignIn
              </Button>
            </section>
            <section>
              <h5 className="pb-4 font-semibold text-white">
                Have an account?
              </h5>
              <Button
                as={Link}
                href="login"
                className="bg-lapis border-2 border-lapis lg:px-20 px-10 lg:py-3 py-2 w-max rounded-lg text-white text-[1.2rem] font-bold"
              >
                Login
              </Button>
            </section>
          </section>
        </section>

        <section className="items-start md:w-[80%] md:ml-20 md:mt-4">
          <form>
            <input
              placeholder="Search for Connection..."
              className="lg:py-4 md:py-3 pl-2 w-[90%] border-lapis border-2 rounded-3xl font-bold lg:!text-lg md:!text-md"
            />
          </form>
          <h5 className="p-2 font-semibold text-white lg:text-lg text-sm">
            Are you looking to hire skilled professionals or talented
            freelancers to help take your business to the next level?
            <br />
            <br />
            Look no further!
            <br />
            <br />
            We offer a seamless platform to find and hire the perfect match for
            your project needs.
          </h5>
        </section>
      </section>
    </section>
  );
};
export default Landing;

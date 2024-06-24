import { Button, Card } from "@nextui-org/react";
import { H5, H6, Subtitle2 } from "../components/typography.tsx";

const Profile = () => {
  return (
    <section className=" mx-auto w-max  items-center justify-center">
      <section className="  flex flex-col h-max text-center gap-y-1 md:mx-auto w-[60%] p-4 border-moonstone border-2 rounded-lg my-6  items-center justify-center">
        <span className=" flex">
          <img
            src="/src/images/logo2.jpg"
            alt=""
            className="w-max h-[6rem] rounded-full "
          />
        </span>
        <H5 className="font-bold">Ruth Chepkoech</H5>
        <Subtitle2 className="font-bold">Front-End Software Engineer</Subtitle2>
        <Subtitle2 className="font-bold text-yellow-500">
          {" "}
          Rates: $200/hour
        </Subtitle2>
        <H6 className="underline italic">Bio</H6>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati sit
        ad veritatis laborum tempore.
        <Card className=" w-[90%] ">
          <H6 className="underline italic">Contacts</H6>
          <section className="p-0 grid grid-cols-2 my-1 gap-x-2">
            <h6 className="text-start pl-2 ">Phone:</h6>
            <h6 className="text-start pl-2">Email:</h6>
          </section>
          <section className="p-0 grid grid-cols-2 my-1 gap-x-2">
            <Button className="bg-green-600 font-semibold rounded-sm text-white ">
              Call
            </Button>
            <Button className="bg-moonstone font-semibold rounded-sm text-white italic">
              Send Email
            </Button>
          </section>
        </Card>
        <section>
          <H6 className="italic">Add a Message</H6>
          <form action="">
            <textarea
              name=""
              id=""
              // rows={3}
              cols={48}
              className="w-full border-lapis border-1 pl-2 "
              placeholder="Note"
            ></textarea>
          </form>
          <Button className="bg-moonstone font-semibold rounded-sm text-white w-full">
            Send Message
          </Button>
        </section>
      </section>
    </section>
  );
};
export default Profile;

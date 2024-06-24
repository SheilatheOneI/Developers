import { Link, Button } from "@nextui-org/react";
const NavbarLayout = () => {
  return (
    <nav className=" bg-lapis  p-4">
      <section className=" flex justify-between text-white mx-12 ">
        <div className="">
          <Link href="/" className="font-bold">
            {" "}
            Home
          </Link>
        </div>
        <div>
          <Button as={Link} href="admin" className="font-bold">
            Admin Login
          </Button>
        </div>
      </section>
    </nav>
  );
};
export default NavbarLayout;

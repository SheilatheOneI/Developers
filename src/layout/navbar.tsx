import { Link, Button } from "@nextui-org/react";

interface NavbarLayoutProps {
  currentPage: string;
}

const NavbarLayout = ({ currentPage }: NavbarLayoutProps) => {
  return (
    <nav className="bg-lapis p-4">
      <section className="flex justify-between text-white mx-12">
        <div className="">
          {currentPage !== "/" && (
            <Link href="/" className="font-bold">
              Home
            </Link>
          )}
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

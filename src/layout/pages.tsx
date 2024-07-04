import { Outlet, useLocation } from "react-router-dom";
import NavbarLayout from "./navbar";

const PageLayout = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <section className="h-screen flex flex-col">
      <NavbarLayout currentPage={currentPage} />
      <div className="flex-grow">
        <Outlet />
      </div>
    </section>
  );
};

export default PageLayout;

import { Outlet,} from "react-router-dom";
import NavbarLayout from "./navbar";

const PageLayout = () => {


  return (
    <section className="h-screen flex flex-col">
      <NavbarLayout />
      <div className="flex-grow">
        <Outlet />
      </div>
    </section>
  );
};

export default PageLayout;

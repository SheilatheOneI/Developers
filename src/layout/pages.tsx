import { Outlet } from "react-router-dom";
import NavbarLayout from "./navbar";
const PageLayout = () => {
  return (
    <section className="h-max">
      <div>
        <NavbarLayout />
      </div>
      <div className="">
        <Outlet />
      </div>
    </section>
  );
};
export default PageLayout;

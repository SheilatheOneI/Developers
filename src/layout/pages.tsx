import { Outlet } from "react-router";

import NavbarLayout from "./navbar";

const PageLayout = () => {
  return (
    <section>
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

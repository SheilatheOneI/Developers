import { useRoutes } from "react-router-dom";
import PageLayout from "./layout/pages";
import Signup from "./pages/signup";
import Connect from "./pages/connect";
import Profile from "./pages/userprofile";
const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          path: "userprofile/:id",
          element: <Profile/>,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "connect",
          element: <Connect />,
        },
      ],
    },
  ]);
  return routes;
};
export default Router;

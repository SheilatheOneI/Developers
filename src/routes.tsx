import Login from "./pages/login";
import { useRoutes } from "react-router-dom";
import Profile from "./pages/profile";
import Landing from "./pages/landing";
import PageLayout from "./layout/pages";
import Admin from "./pages/admin";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "login",
          element: <Login />,
        },
        { path: "admin", element: <Admin /> },
      ],
    },
  ]);

  return routes;
};

export default Router;

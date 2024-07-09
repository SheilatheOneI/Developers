import { useRoutes } from "react-router-dom";
import Signup from "./pages/signup";
import Connect from "./pages/connect";
import Profile from "./pages/userprofile";
import Login from "./pages/login";
import UserProfile from "./pages/profile";
import Landing from "./pages/landing";
import PageLayout from "./layout/pages";
import Admin from "./pages/admin";
import ForgotPassword from "./pages/Forgot";

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
          path: "userprofile/:id",
          element: <Profile />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "/forgot-password",
          element: <Forgot />,
        },

        {
          path: "connect",
          element: <Connect />,
        },
        {
          path: "profile/:id",
          element: <UserProfile />,
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

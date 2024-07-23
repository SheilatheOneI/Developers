import { useRoutes } from "react-router-dom";
import Signup from "./pages/signup";
import Connect from "./pages/connect";
import UserProfile from "./pages/userprofile";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Landing from "./pages/landing";
import PageLayout from "./layout/pages";
import Admin from "./pages/admin";
import ForgotPassword from "./pages/Forgot";
import AuthGuard from "./context/authGuard";
// import ResetPassword from "./pages/resett";
import ResetPassword from "./pages/ResetPassword";
import NotFoundPage from "./pages/NotFoundPage";
import TermsAndConditions from "./pages/TermsAndConditions";
import FAQs from "./pages/FAQs";

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
          path: "userprofile",
          element: (
            <AuthGuard>
          <UserProfile />
          </AuthGuard>
        ),
        },
        {
          path: "auth/signup",
          element: <Signup />,
        },
        {
          path: "auth/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "auth/reset-password/:resetToken",
          element: <ResetPassword />,
        },

        {
          path: "connect",
          element: <Connect />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path: "auth/login",
          element: <Login />,
        },
        {
          path: "termsandconditions",
          element: <TermsAndConditions />,
        },
        {
          path: "faqs",
          element: <FAQs />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
        { path: "admin", element: <Admin /> },
      ],
    },
  ]);

  return routes;
};

export default Router;

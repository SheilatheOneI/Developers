import useAuthCtx from "./auth-context";
import { PropsWithChildren, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../components/preloader";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isInitialized } = useAuthCtx();
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isInitialized) return <Preloader />;

  if (!isAuthenticated) {
    let redirectTo: string = "";
    if (!pathname.includes("/auth")) {
      redirectTo = pathname;
    }

    return (
      <Navigate
        to={redirectTo ? `/auth/login?redirect=${redirectTo}` : "/auth/login"}
      />
    );
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return children;
};

export default AuthGuard;

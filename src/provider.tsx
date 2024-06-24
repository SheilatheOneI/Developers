import { PropsWithChildren, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

const Providers = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    (() => {
      window.scrollTo(0, 0);
    })();
  }, [pathname]);

  return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
};

export default Providers;

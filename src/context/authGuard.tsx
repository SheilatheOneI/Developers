import useAuthCtx from "./auth-context";
import { PropsWithChildren, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }: PropsWithChildren) => {
	const { isAuthenticated, user } = useAuthCtx();
	const { pathname } = useLocation();

	const [requestedLocation, setRequestedLocation] = useState<string | null>(
		null
	);

	if (!isAuthenticated) {
		let redirectTo: string = "";
		if (!pathname.includes("/auth")) {
			redirectTo = pathname;
		}

		return (
			<Navigate
				to={
					redirectTo
						? `/auth/login?redirect=${redirectTo}`
						: "/auth/login"
				}
			/>
		);
	}

	if (
		isAuthenticated &&
		!pathname.includes("/verify-email") &&
		user?.verified === false
	) {
		return <Navigate to="/auth/verify-email" />;
	}

	if (requestedLocation && pathname !== requestedLocation) {
		setRequestedLocation(null);
		return <Navigate to={requestedLocation} />;
	}

	return children;
};

export default AuthGuard;

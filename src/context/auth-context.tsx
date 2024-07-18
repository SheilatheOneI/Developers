/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-useless-catch */


import axiosFunc from "../utils/axios";
import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from "react";
import {
	AuthState,
	AuthActions,
	AuthActionsTypes,
	LoginData,
	SignUpData,
	AuthCtx,
    // User,
	Developer
} from "../types/auth";
import useLocalStorage from "../hooks/use-localStorage";

const AuthContext = createContext<AuthCtx | null>(null);

const authReducer = (state: AuthState, action: AuthActions) => {
	const { payload, type } = action;

	if (type === AuthActionsTypes.LOGIN) {
		return { ...state, user: payload, isAuthenticated: true };
	}

	if (type === AuthActionsTypes.SIGNUP) {
		return { ...state, isAuthenticated: true, user: payload };
	}

	if (type === AuthActionsTypes.LOGOUT) {
		return { ...state, isAuthenticated: false, user: null };
	}

	if (type === AuthActionsTypes.UPDATEPROFILE) {
		if (!state.user) {
			return state;
		}

		return { ...state, user: { ...state.user, ...payload } };
	}
	if (type === AuthActionsTypes.DELETEPROFILE) {
		if (!state.user) {
			return state;
		}

		return { ...state, isAuthenticated: true, user: null };
	}

	return state;
};

const defaultAuthState: AuthState = {
	user: null,
	isAuthenticated: false,
};

export const AuthCtxProvider = ({ children }: { children: ReactNode }) => {
	const [authState, dispatch] = useReducer(authReducer, defaultAuthState);

	const { storeItem, deleteItem } = useLocalStorage();

	const login = useCallback(async (credentials: LoginData) => {
		try {
			const {data} = await axiosFunc.post("/api/auth/login", credentials);

			axiosFunc.defaults.headers.common.Authorization = `Bearer ${data.user.token}`;

			await storeItem("jwtToken", data.token);
			const userData = data.user

			dispatch({
				type: AuthActionsTypes.LOGIN,
				payload: userData,
			});
		} catch (err) {
			throw err;
		}
	}, []);

	const signUp = useCallback(async (data: SignUpData) => {
		try {
			const response = await axiosFunc.post("/api/auth/register", data);

			const { user, accessToken } = response.data;

			await storeItem("token", accessToken);
			axiosFunc.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

			dispatch({
				type: AuthActionsTypes.SIGNUP,
				payload: user,
			});
		} catch (err) {
			throw err;
		}
	}, []);

	const updateProfile = useCallback(async (userProfile: Partial<Developer>) => {
		try {
			const {data} = await axiosFunc.put("/api/freelancer/update", userProfile);

			const { user } = data;

			
		dispatch({
			type: AuthActionsTypes.UPDATEPROFILE,
			payload: user,
		});
		} catch (err) {
			throw err;
		}
		
	}, []);

	const deleteProfile = useCallback(async (userId: string) => {
		try {
			await axiosFunc.delete(`/api/freelancer/delete/${userId}`);

			
		dispatch({
			type: AuthActionsTypes.DELETEPROFILE,
			payload: null,
		});
		} catch (err) {
			throw err;
		}
		
	}, []);


	const logout = useCallback(async () => {
		await deleteItem("token");
		dispatch({
			type: AuthActionsTypes.LOGOUT,
			payload: null,
		});
	}, []);

	const verifyEmail = useCallback(
		async (token: string) => {
			try {
				axiosFunc.defaults.headers.common.Authorization = `Bearer ${token}`;

				await axiosFunc.get("/api/auth/verify-email");
				await storeItem("token", token);

				const response = await axiosFunc.get("/api/auth/profile");
				const user = response.data.user;
				dispatch({
					type: AuthActionsTypes.LOGIN,
					payload: user,
				});
			} catch (err) {
				throw err;
			}
		},

		[]
	);

	const authCtxValue = useMemo(
		() => ({
			user: authState.user,
			isAuthenticated: authState.isAuthenticated,
			login,
			signUp,
			updateProfile,
			deleteProfile,
			logout,
			verifyEmail,
		}),
		[
			authState,
			login,
			signUp,
			updateProfile,
			deleteProfile,
			logout,
			verifyEmail,
		]
	);

	return (
		<AuthContext.Provider value={authCtxValue}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuthCtx = () => {
	const authCtx = useContext(AuthContext);

	if (!authCtx) {
		throw new Error("useAuthCtx should be used inside AuthCtxProvider");
	}

	return authCtx;
};

export default useAuthCtx;

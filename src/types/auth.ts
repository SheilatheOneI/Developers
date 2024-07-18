export type AuthState = {
  user: null | User;
  isAuthenticated: boolean;
};

export type AuthCtx = {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => void;
  logout: () => void;
  signUp: (data: SignUpData) => void;
  updateProfile: (data: Partial<Developer>) => void;
  deleteProfile: (userId: string) => void;
  verifyEmail: (token: string) => void;
};

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  specialization: string;
  bio: string;
  rate: number;
  phone_number: string;
  email: string;
  jobType: string;
  location: string;
  verified: boolean;
}

export type LoginData = {
  email: string;
  password: string;
};

export interface SignUpData {
  email: string;
  password: string;
  agreeTerms: boolean;
  user_data: {
    first_name: string;
    last_name: string;
  }[];
}

export type AuthActions =
  | {
      type: AuthActionsTypes.LOGIN;
      payload: User;
    }
  | {
      type: AuthActionsTypes.SIGNUP;
      payload: User;
    }
  | {
      type: AuthActionsTypes.UPDATEPROFILE;
      payload: Partial<User>;
    }
  | {
      type: AuthActionsTypes.DELETEPROFILE;
      payload: null;
    }
  | {
      type: AuthActionsTypes.LOGOUT;
      payload: null;
    };

export enum AuthActionsTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGNUP = "SIGNUP",
  UPDATEPROFILE = "UPDATEPROFILE",
  DELETEPROFILE = "DELETEPROFILE",
}

export interface Developer {
  id: number;
  first_name: string;
  specialization: string;
  bio: string;
  rate: number;
  phone_number: string;
  email: string;
  jobType: string;
  location: string;
}

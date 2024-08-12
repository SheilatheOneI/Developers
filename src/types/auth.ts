// auth.ts

export type AuthState = {
  user: null | User;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

export type AuthCtx = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (data: LoginData) => void;
  logout: () => void;
  signUp: (data: SignUpData) => void;
  updateProfile: (userProfile: Partial<Developer>, skillsToDelete?: string[]) => Promise<void>;
  deleteProfile: (userId: string) => void;
};

export interface User {
  skills: never[];
  experience: number;
  completedProjects: number;
  rating: number;
  availability: string;
  linkedinUrl: string;
  githubUrl: string;
  _id: number;
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

export interface Developer {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: string;
  jobType: string;
  location: string;
  rate: number;
  bio: string;
  skills: { name: string; level: string }[];
  experience: number;
  completedProjects: number;
  rating: number;
  availability: string;
  linkedinUrl: string;
  githubUrl: string;
  profilePicture: string;
}


export type LoginData = {
  email: string;
  password: string;
};

export interface SignUpData {
  email: string;
  password: string;
  agreeTerms: boolean;
  first_name: string;
  last_name: string;
}

export type AuthActions =
  | {
      type: AuthActionsTypes.INITIAL;
      payload: boolean;
    }
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
  INITIAL = "INITIAL",
  LOGOUT = "LOGOUT",
  SIGNUP = "SIGNUP",
  UPDATEPROFILE = "UPDATEPROFILE",
  DELETEPROFILE = "DELETEPROFILE",
}
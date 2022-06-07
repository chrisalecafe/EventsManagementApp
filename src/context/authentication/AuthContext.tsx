import { createContext } from "react";
import { AuthState } from "../../interfaces";
interface ContextProps {
  _id?: any;
  username: string;
  name: string;
  password: string;
  roles: string[];
  accessToken: string;
  isLoggedIn: boolean;

  setAuth: (auth: AuthState) => void;
}

export const AuthContext = createContext({} as ContextProps);

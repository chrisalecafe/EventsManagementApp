import { FC, ReactNode, useReducer } from "react";
import { AuthState } from "../../interfaces";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";

const AUTH_INITIAL_STATE: AuthState = {
  username: "",
  name: "",
  password: "",
  roles: [],
  accessToken: "",
  isLoggedIn: false,
};
interface Props {
  children?: ReactNode | undefined;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const setAuth = (auth: AuthState) => {
    dispatch({ type: "[Auth] - SetUser", payload: auth });
  };
  return (
    <AuthContext.Provider
      value={{
        ...auth,

        // Methods
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

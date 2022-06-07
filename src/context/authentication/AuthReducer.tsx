import { AuthState } from "../../interfaces";

type AuthActionType = { type: "[Auth] - SetUser"; payload: AuthState };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case "[Auth] - SetUser":
      return {
        ...state,
        _id: action.payload._id,
        username: action.payload.username,
        name: action.payload.name,
        password: action.payload.password,
        roles: action.payload.roles,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
};

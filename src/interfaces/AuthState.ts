export interface AuthState {
    _id?: any;
    username: string;
    name: string;
    password: string;
    roles: string[];
    accessToken: string;
    isLoggedIn: boolean;
}
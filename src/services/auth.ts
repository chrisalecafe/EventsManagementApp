import { AuthState } from "../interfaces";
import { IEvent } from "../interfaces/IEvent";
import http from "./common.http";
async function request(httpCall: any) {
    const response = await httpCall();
    return response.data;
}
const auth = (data: AuthState) => request(() => http.post<AuthState>("/auth", data));


export default {
    auth
}
import { IRegistration } from "../interfaces";
import http from "./common.http";
async function request(httpCall: any) {
    const response = await httpCall();
    return response.data;
}

const add = (data: IRegistration) => request(() => http.post<IRegistration>("/registration", data));

export default {

    add
}
import { IEvent } from "../interfaces/IEvent";
import http from "./common.http";
async function request(httpCall: any) {
    const response = await httpCall();
    return response.data;
}
const all = () => request(() => http.get<Array<IEvent>>("/events"));
const get = (id: string) => request(() => http.get<IEvent>(`/events/${id}`));
const add = (data: IEvent) => request(() => http.post<IEvent>("/events", data));
const update = (data: IEvent, id: any) => request(() => http.put<any>(`/events/${id}`, data));
const remove = (id: any) => request(() => http.delete<any>(`/events/${id}`));


export default {
    all,
    get,
    add,
    update,
    remove
}
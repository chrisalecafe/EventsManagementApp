import { IGroup } from "./IGroup";
import { IStaff } from "./IStaff";

export interface IEvent {
    _id?: any;
    type: "Donation" | "Survey" | "Social event" | "Other";
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    country: string;
    city: string;
    state: string;
    address: string;
    zip: string;
    active: boolean,
    staff?: IStaff[],
    groups?: IGroup[]

}
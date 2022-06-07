export interface IGroup {

    _id?: any;
    id?: any;
    name: string;
    participants?: [{
        employee?: any;
        isEmployees: boolean;
        external?: {
            id: string;
            name: string;
        }
    }
    ]

}
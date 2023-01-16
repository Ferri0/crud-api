export interface IUser {
    id: string;
    username: string;
    age: number;
    hobbies: string[] | [];
}

export interface IUserDataFromPOSTReq {
    username: string;
    age: number;
    hobbies: string[] | [];
}

export interface IUserDataFromPUTReq {
    username?: string;
    age?: number;
    hobbies?: string[] | [];
}

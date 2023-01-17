import { v4 as generateUuid } from 'uuid';

import { IUser, IUserDataFromPOSTReq, IUserDataFromPUTReq } from '../../types/user';

export class DataStorage {
    users: IUser[] = [];

    constructor() {
        this.users = [];
    }

    getAllUsers = () => JSON.stringify(this.users);

    getUserById = (id: string): string | null => {
        const userData = this.users.find((user) => user.id === id);

        return userData ? JSON.stringify(userData) : null;
    };

    createUser = (userData: IUserDataFromPOSTReq): string => {
        const generatedRecord = { id: generateUuid(), ...userData };

        this.users.push(generatedRecord);

        return JSON.stringify(generatedRecord);
    };

    updateUserById = (updatedUserData: IUserDataFromPUTReq, id: string): string => {
        let updatedRecord = {};

        this.users = this.users.map((userData) => {
            if (userData.id === id) {
                updatedRecord = { ...userData, ...updatedUserData };

                return { ...userData, ...updatedUserData };
            }

            return userData;
        });

        return JSON.stringify(updatedRecord);
    };

    deleteUserById = (id: string) => {
        this.users.filter((userData) => userData.id !== id);
    };
}

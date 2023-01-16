import { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Endpoint based on '/api/users' route
 * Accepts GET requests
 */
export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
    try {
        res.statusCode = 200;

        const usersData = DataStorageInstance.getAllUsers();

        res.end(usersData);
    } catch (error: any) {
        res.statusCode = 500;
        res.end(error.message);
    }
};

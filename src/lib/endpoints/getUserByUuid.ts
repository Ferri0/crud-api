import { validate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Endpoint based on '/api/users/${uuid}' route
 * Accepts GET requests
 */
export const getUserByUuid = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    try {
        if (validate(userId)) {
            const userData = DataStorageInstance.getUserById(userId);

            if (userData) {
                res.statusCode = 200;
                res.end(userData);
            } else {
                res.statusCode = 404;
                throw new Error('User not found');
            }
        } else {
            res.statusCode = 400;
            throw new Error('User ID is not valid');
        }
    } catch (error: any) {
        if (res.statusCode !== 400 && res.statusCode !== 404) {
            res.statusCode = 500;
        }

        res.end(error.message);
    }
};

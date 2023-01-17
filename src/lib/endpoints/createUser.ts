import { IncomingMessage, ServerResponse } from 'node:http';

import { validateUserData } from '../../services/validateUserData';
import { getRequestData } from '../../services/getRequestData';

/**
 * Endpoint based on '/api/users' route
 * Accepts POST requests with user data
 */
export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const userData = await getRequestData(req);
        const parsedUserData = JSON.parse(userData);

        if (validateUserData(parsedUserData, 'POST')) {
            const generatedRecord = DataStorageInstance.createUser(parsedUserData);

            res.statusCode = 201;
            res.end(generatedRecord);
        } else {
            res.statusCode = 400;
            res.end('Invalid user data provided');
        }
    } catch (error: any) {
        res.statusCode = 500;
        res.end(error.message);
    }
};

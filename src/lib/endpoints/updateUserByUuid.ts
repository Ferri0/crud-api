import { validate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'node:http';

import { validateUserData } from '../../services/validateUserData';
import { getRequestData } from '../../services/getRequestData';

/**
 * Endpoint based on '/api/users/${uuid}' route
 * Accepts PUT requests
 */
export const updateUserByUuid = async (
    req: IncomingMessage,
    res: ServerResponse,
    userId: string
) => {
    try {
        if (validate(userId)) {
            const isUserExist = !!DataStorageInstance.getUserById(userId);

            if (isUserExist) {
                const updatedUserData = await getRequestData(req);
                const parsedUpdatedUserData = JSON.parse(updatedUserData);

                if (validateUserData(parsedUpdatedUserData, 'PUT')) {
                    const updatedRecord = DataStorageInstance.updateUserById(
                        parsedUpdatedUserData,
                        userId
                    );

                    res.statusCode = 200;
                    res.end(updatedRecord);
                } else {
                    res.statusCode = 400;
                    res.end('Invalid user data provided');
                }
            } else {
                res.statusCode = 404;
                res.end('User not found');
            }
        } else {
            res.statusCode = 400;
            res.end('User ID is not valid');
        }
    } catch (error: any) {
        res.statusCode = 500;
        res.end(error.message);
    }
};

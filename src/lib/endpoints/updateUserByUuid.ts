import { validate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'node:http';

import { validateUserData } from '../../services/validateUserData';

/**
 * Endpoint based on '/api/users/${uuid}' route
 * Accepts PUT requests
 */
export const updateUserByUuid = (req: IncomingMessage, res: ServerResponse, userId: string) => {
    try {
        if (validate(userId)) {
            const userData = DataStorageInstance.getUserById(userId);

            if (userData) {
                const chunks: Uint8Array[] = [];

                req.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                req.on('end', () => {
                    try {
                        const dataBuffer = Buffer.concat(chunks);
                        const dataString = dataBuffer.toString();
                        const reqBody = JSON.parse(dataString);

                        if (validateUserData(reqBody, 'PUT')) {
                            const updatedRecord = DataStorageInstance.updateUserById(
                                reqBody,
                                userId
                            );

                            res.statusCode = 200;
                            res.end(updatedRecord);
                        } else {
                            res.statusCode = 400;
                            res.end('Invalid user data provided');
                        }
                    } catch (error) {
                        res.statusCode = 500;
                        res.end('Invalid user data provided');
                    }
                });
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

import { IncomingMessage, ServerResponse } from 'node:http';

import { validateUserData } from '../../services/validateUserData';

/**
 * Endpoint based on '/api/users' route
 * Accepts POST requests with user data
 */
export const createUser = (req: IncomingMessage, res: ServerResponse) => {
    const chunks: Uint8Array[] = [];

    req.on('data', (chunk) => {
        chunks.push(chunk);
    });

    req.on('end', () => {
        try {
            const dataBuffer = Buffer.concat(chunks);
            const dataString = dataBuffer.toString();
            const reqBody = JSON.parse(dataString);

            if (validateUserData(reqBody, 'POST')) {
                const generatedRecord = DataStorageInstance.createUser(reqBody);

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
    });
};

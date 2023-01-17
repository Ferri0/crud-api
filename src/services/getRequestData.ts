import { IncomingMessage } from 'node:http';

// Asynchronously retrieve request body
export const getRequestData = (req: IncomingMessage) => {
    return new Promise<string>((resolve, reject) => {
        try {
            let body = '';

            // listen to data sent by client
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            // listen till the end
            req.on('end', () => {
                resolve(body);
            });
        } catch (error: any) {
            reject(error);
        }
    });
};

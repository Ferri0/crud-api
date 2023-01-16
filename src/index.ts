import * as dotenv from 'dotenv';
dotenv.config();

import { createServer, IncomingMessage, ServerResponse } from 'node:http';

import { DataStorage } from './lib/dataStorage/DataStorage';
import { getUserId } from './services/getUserId';

import { getAllUsers } from './lib/endpoints/getAllUsers';
import { getUserByUuid } from './lib/endpoints/getUserByUuid';
import { createUser } from './lib/endpoints/createUser';
import { updateUserByUuid } from './lib/endpoints/updateUserByUuid';
import { deleteUserByUuid } from './lib/endpoints/deleteUserByUuid';

declare global {
    var DataStorageInstance: DataStorage;
}

global.DataStorageInstance = new DataStorage();

const hostname = process.env.SERVER_HOST_NAME || '127.0.0.1';
const port = +(process.env.SERVER_PORT || '3000');

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    let isRequestRecognised = false;
    const requestUrl = req.url || '';

    if (req.method === 'GET') {
        const userId = getUserId(requestUrl);

        if (requestUrl === '/api/users') {
            isRequestRecognised = true;
            getAllUsers(req, res);
        }

        if (requestUrl.startsWith('/api/users/') && userId) {
            isRequestRecognised = true;
            getUserByUuid(req, res, userId);
        }
    }

    if (req.method === 'POST') {
        if (requestUrl === '/api/users') {
            isRequestRecognised = true;
            createUser(req, res);
        }
    }

    if (req.method === 'PUT') {
        const userId = getUserId(requestUrl);

        if (requestUrl.startsWith('/api/users/') && userId) {
            isRequestRecognised = true;
            updateUserByUuid(req, res, userId);
        }
    }

    if (req.method === 'DELETE') {
        const userId = getUserId(requestUrl);

        if (requestUrl.startsWith('/api/users/') && userId) {
            isRequestRecognised = true;
            deleteUserByUuid(req, res, userId);
        }
    }

    if (!isRequestRecognised) {
        res.statusCode = 404;
        res.end('Endpoint not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

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

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const requestUrl = req.url || '';
    const userId = getUserId(requestUrl);

    if (req.method === 'GET' && requestUrl === '/api/users') {
        // GET - /api/users
        getAllUsers(req, res);
    } else if (req.method === 'GET' && requestUrl.startsWith('/api/users/') && userId) {
        // GET - /api/users/${uuid}
        getUserByUuid(req, res, userId);
    } else if (req.method === 'POST' && requestUrl === '/api/users') {
        // POST - /api/users
        await createUser(req, res);
    } else if (req.method === 'PUT' && requestUrl.startsWith('/api/users/') && userId) {
        // PUT - /api/users/${uuid}
        await updateUserByUuid(req, res, userId);
    } else if (req.method === 'DELETE' && requestUrl.startsWith('/api/users/') && userId) {
        // DELETE - /api/users/${uuid}
        deleteUserByUuid(req, res, userId);
    } else {
        res.statusCode = 404;
        res.end('Endpoint not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

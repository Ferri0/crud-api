import * as dotenv from 'dotenv';
dotenv.config();

import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const hostname = process.env.SERVER_HOST_NAME || '127.0.0.1';
const port = +(process.env.SERVER_PORT || 3000);

const users = [];

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/api' && req.method === 'GET') {
        //response headers
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        //set the response
        res.write('Hi there, This is a Vanilla Node API');
        //end the response
        res.end();
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

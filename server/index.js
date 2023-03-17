import express from 'express';

import http from 'http';

import bodyParser from 'body-parser';

import { Server as ws } from 'socket.io';

import { wsRouter } from './config/wsRouter.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`Server started on port 3000 :)`);
});

const io = new ws(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

io.on('connection', socket => {
    wsRouter(socket);
});

import { Server as io } from 'socket.io';

import { wsRouter } from './config/wsRouter.js';

let ws, wss;
export function initWS(server) {

    wss = new io(server, {
        cors: {
            origin: ["http://172.27.34.71:8080"],
            credentials: true
        }
    });

    wss.on('connection', client => {

        ws = client;
        
        client.isAlive = true;

        client.on('pong', () => {
            client.isAlive = true;
        });

        wsRouter(client);
    });
};

export { ws, wss };
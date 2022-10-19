import { WebSocketServer } from 'ws';

import { wsRouter } from './config/wsRouter.js';

let ws;
export function initWS(server) {

    ws = new WebSocketServer({ server });

    ws.on('connection', wsHandler => {

        ws = wsHandler
        
        wsHandler.isAlive = true;

        wsHandler.on('pong', () => {
            ws.isAlive = true;
        });

        wsHandler.on('message', data => {
            wsRouter(JSON.parse(data));
        });
    });
};

export { ws };
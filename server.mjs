import express from 'express';

import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();

const server = http.createServer(app);

const ws = new WebSocketServer({ server });

ws.on('connection', ws => {

    ws.isAlive = true;

    ws.on('pong', () => {
        ws.isAlive = true;
    });

    //connection is up, let's add a simple simple event
    ws.on('message', message => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

server.listen(3002, () => {
    console.log(`Server started on port 3002 :)`);
});

server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
});
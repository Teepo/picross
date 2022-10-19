import express from 'express';

import http from 'http';

import bodyParser from 'body-parser';

import { initWS } from './ws.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`Server started on port 3000 :)`);
});

initWS(server);
import { lobby } from './../service/lobby.js';

import WebSocket from 'ws';

import { ws } from './../ws.js';

export default function() {

    console.log('init get players');

    lobby.getPlayers()
    .filter(player => {
        console.log(player.client.readyState);
        return player.client.readyState === WebSocket.OPEN && player.client !== ws;
    })
    .map(player => {

        console.log('getPlayers', player.login, player.client.isAlive, player.client.send);

        player.client.send(JSON.stringify({
            players : lobby.getPlayers().map(player => player.login)
        }));
    });
}
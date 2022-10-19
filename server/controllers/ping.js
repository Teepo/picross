import { lobby } from './../service/lobby.js';

export default function() {

    lobby.getPlayers()
    .map(player => {

        console.log('PING TO ', player.login, player.client.isAlive, player.client.send);

        player.client.send(JSON.stringify({
            'ping' : 'pong'
        }));
    });
}
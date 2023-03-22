import { lobby } from './../service/lobby.js';

import coherentRandom from './../../src/boards/coherentRandom.js';

export default function(socket) {

    const players = lobby.getPlayers();

    const boardToClear = coherentRandom(15, 15);

    players.map(player => {
        player.boardToClear = boardToClear;
    });

    socket.broadcast.emit('start');
}
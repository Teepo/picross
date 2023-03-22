import { lobby } from './../service/lobby.js';

import { UserNotExistError } from './../../errors/index.js';

export default function(socket, data) {

    const { socketId } = data;

    try {
        
        const player = lobby.getPlayerBySocketId(socketId);

        player.isReady = !player.isReady;

        socket.emit('set-player-is-ready', { player : player });

        socket.broadcast.emit('set-player-is-ready', { player : player });
    }
    catch(e) {
        
        if (e instanceof UserNotExistError) {
            console.error("setPlayerIsReady > player with socket id doesn't exist", socketId);
        }
    }
}
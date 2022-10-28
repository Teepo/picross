import { lobby } from './../service/lobby.js';

import { UserNotExistError } from './../../errors/index.js';

export default function(socket, data) {

    const { player } = data;

    
    try {
        
        const p = lobby.getPlayerBySocketId(player.socketId);

        p.isReady = !p.isReady;

        socket.emit('set-player-is-ready', {
            player : p.get()
        });

        socket.broadcast.emit('set-player-is-ready', {
            player : p.get()
        });
    }
    catch(e) {
        
        if (e instanceof UserNotExistError) {
            console.error("setPlayerIsReady > player with socket id doesn't exist", player.socketId);
        }
    }
}
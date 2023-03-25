import { lobby } from './../service/lobby.js';

import { UserNotExistError } from './../../errors/index.js';

export default function(socket, data) {

    const { socketId, board } = data;
    
    try {
        
        const player = lobby.getPlayerBySocketId(socketId);

        player.board = board;

        socket.broadcast.emit('update-board', {
            player : player,
            x      : data.x ?? null,
            y      : data.y ?? null,
            state  : data.state ?? null,
        });
    }
    catch(e) {
        
        if (e instanceof UserNotExistError) {
            console.error("updateBoard > player with socket id doesn't exist", socketId);
        }
    }
}
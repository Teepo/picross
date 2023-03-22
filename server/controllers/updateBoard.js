import { lobby } from './../service/lobby.js';

import { UserNotExistError } from './../../errors/index.js';

export default function(socket, data) {

    const { socketId, board } = data;
    
    try {
        
        const player = lobby.getPlayerBySocketId(socketId);

        player.board = board;

        socket.broadcast.emit('update-board', {
            player : player
        });
    }
    catch(e) {
        
        if (e instanceof UserNotExistError) {
            console.error("updateBoard > player with socket id doesn't exist", socketId);
        }
    }
}
import { lobby } from './../service/lobby.js';

import { UserNotExistError } from './../../errors/index.js';

export default function(socket, data) {

    const { player, board } = data;
    
    try {
        
        const p = lobby.getPlayerBySocketId(player.socketId);

        p.board = board;

        console.log('-------------------------------------');
        console.log('UPDATE BOARD', JSON.stringify(board));
        console.log('PLAYER', p.get());
        console.log('-------------------------------------');

        socket.broadcast.emit('update-board', {
            player : p.get()
        });
    }
    catch(e) {

        console.log(e);
        
        if (e instanceof UserNotExistError) {

            console.error("updateBoard > player with socket id doesn't exist", player.socketId);
        }
    }
}
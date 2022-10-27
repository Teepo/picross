import { lobby } from './../service/lobby.js';

import { UserNotExistError } from './../../errors/index.js';

import { wss } from './../ws.js';

export default function(data) {

    const { player } = data;
    
    try {
        
        const p = lobby.getPlayerByWsClientId(player.wsClientId);

        p.board = player.board;

        wss.emit('update-board', {
            player : p.get()
        });
    }
    catch(e) {
        
        if (e instanceof UserNotExistError) {

            console.error("updateBoard > player with ws client id doesn't exist", player.wsClientId);
        }
    }
}
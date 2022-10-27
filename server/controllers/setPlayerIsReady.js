import { lobby } from './../service/lobby.js';

import { UserNotExistError } from './../../errors/index.js';

import { wss, ws } from './../ws.js';

export default function(data) {

    const { player } = data;
    
    try {
        
        const p = lobby.getPlayerByWsClientId(player.wsClientId);

        p.isReady = !p.isReady;

        wss.emit('set-player-is-ready', {
            player : p.get()
        });
    }
    catch(e) {
        
        if (e instanceof UserNotExistError) {

            console.error("setPlayerIsReady > player with ws client id doesn't exist", player.wsClientId);
        }
    }
}
import { lobby } from './../service/lobby.js';
import { Player } from './../service/player.js';

import { UserAlreadyExistError } from './../../errors/index.js';

import { ws } from './../ws.js';

export default function(data) {

    const { login } = data;
    
    try {

        const player = new Player({
            login    : login,
            wsClient : ws
        })
        
        lobby.addPlayer(player);

        ws.emit('add-player-response', { player : player.get() });
    }
    catch(e) {
        
        if (e instanceof UserAlreadyExistError) {

            ws.emit('add-player-response', {
                error : new UserAlreadyExistError
            });
        }
    }
}
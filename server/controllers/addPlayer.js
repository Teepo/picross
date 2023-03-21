import { lobby  } from './../service/lobby.js';
import { Player } from './../service/player.js';

import { UserAlreadyExistError } from './../../errors/index.js';

export default function(socket, data) {

    const { login } = data;
    
    try {

        const player = new Player({
            login  : login,
            socket : socket
        })
        
        lobby.addPlayer(player);
        
        socket.emit('add-player', { socketId : socket.id });
    }
    catch(e) {
        
        if (e instanceof UserAlreadyExistError) {

            socket.emit('add-player-response', {
                error : new UserAlreadyExistError
            });
        }
    }
}
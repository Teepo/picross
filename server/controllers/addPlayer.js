import { lobby } from './../service/lobby.js';
import { Player } from './../service/player.js';

import { UserAlreadyExistError } from './../../errors/index.js';

import { ws } from './../ws.js';

export default function(data) {

    const { login } = data;
    
    try {
        
        lobby.addPlayer(new Player({
            login : login,
            client : ws
        }));

        ws.send(JSON.stringify({ result : true }));
    }
    catch(e) {
        
        if (e instanceof UserAlreadyExistError) {

            ws.send(JSON.stringify({
                error : new UserAlreadyExistError
            }));
        }
    }
}
import { lobby } from './../service/lobby.js';

export default function(socket) {

    try {
        socket.emit('get-players', lobby.getPlayers());
        socket.broadcast.emit('get-players', lobby.getPlayers());
    }
    catch(e) {
        console.error(e);
    }
}
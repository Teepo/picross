import { lobby } from './../service/lobby.js';

export default function(socket, data) {

    const { socketId } = data;

    try {
        socket.emit('get-player', lobby.getPlayerBySocketId(socketId));
    }
    catch(e) {
        console.error(e);
    }
}
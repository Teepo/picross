import { lobby } from './../service/lobby.js';

import { wss } from './../ws.js';

export default function() {
    wss.emit('get-players-response', lobby.getPlayers());
}
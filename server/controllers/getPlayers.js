import { lobby } from './../service/lobby.js';

import { ws, wss } from './../ws.js';

export default function() {

    wss.emit('get-players-response', lobby.getPlayers().map(p => p.login));
}
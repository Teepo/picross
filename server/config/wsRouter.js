const routes = {
    'add-player'          : import('./../controllers/addPlayer.js'),
    'get-players'         : import('./../controllers/getPlayers.js'),
    'set-player-is-ready' : import('./../controllers/setPlayerIsReady.js'),
    'update-player'       : import('./../controllers/updatePlayer.js'),
};

export async function wsRouter(socket) {

    for (const [event, func] of Object.entries(routes)) {

        socket.on(event, async data => {
            (await func).default(socket, data);
        });
    }
};
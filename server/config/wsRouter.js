const routes = {
    'add-player'          : import('./../controllers/addPlayer.js'),
    'get-players'         : import('./../controllers/getPlayers.js'),
    'set-player-is-ready' : import('./../controllers/setPlayerIsReady.js')
};

export async function wsRouter(client) {

    for (const [event, func] of Object.entries(routes)) {

        client.on(event, async data => {
            (await func).default(data);
        });
    }
};
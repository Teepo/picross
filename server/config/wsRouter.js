const routes = {
    'ping'        : import('./../controllers/ping.js'),
    'add-player'  : import('./../controllers/addPlayer.js'),
    'get-players' : import('./../controllers/getPlayers.js')
};

export async function wsRouter(client) {

    for (const [event, func] of Object.entries(routes)) {

        client.on(event, async data => {
            (await func).default(data);
        });
    }
};
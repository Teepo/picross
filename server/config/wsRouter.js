const routes = {
    'ping'        : import('./../controllers/ping.js'),
    'add-player'  : import('./../controllers/addPlayer.js'),
    'get-players' : import('./../controllers/getPlayers.js')
};

export async function wsRouter(data) {

    const { event, body } = data;

    (await routes[event]).default(body);
};
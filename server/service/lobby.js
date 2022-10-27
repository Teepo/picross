import { UserAlreadyExistError } from './../../errors/index.js';
import { UserNotExistError     } from './../../errors/index.js';

class Lobby {

    #players;

    constructor() {
        this.#players = [];
    }

    addPlayer(player) {

        if (this.#players.find(p => p.login === player.login)) {
            throw new UserAlreadyExistError;
        }

        this.#players.push(player);
    }

    getPlayers() {

        return this.#players.map(p => {
            return p.get();
        });
    }

    getPlayerByWsClientId(wsClientId) {

        let player;
        if (!(player = this.#players.find(p => p.wsClient.id === wsClientId))) {
            throw new UserNotExistError;
        }

        return player;
    }
}

export let lobby = new Lobby;
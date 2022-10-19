import { UserAlreadyExistError } from './../../errors/index.js';

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
        return this.#players;
    }
}

export let lobby = new Lobby;
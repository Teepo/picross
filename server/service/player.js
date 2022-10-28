export class Player {

    constructor({ login, socket }) {
        
        this.login = login;
        
        this.socket   = socket;
        this.socketId = socket.id;
        
        this.isReady = false;

        this.board = [];
    }

    get() {

        const { ['socket']: omitted, ...rest } = this;
        
        return rest;
    }
}
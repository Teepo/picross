export class Player {

    constructor({ login, wsClient }) {
        
        this.login      = login;
        
        this.wsClient   = wsClient;
        this.wsClientId = wsClient.id;
        
        this.isReady    = false;

        this.board = [];
    }

    get() {

        const { ['wsClient']: omitted, ...rest } = this;
        
        return rest;
    }
}
<template>
    
    <div class="container">
        <ul class="row">
            <li class="col" v-for="player in players">
                <div class="card">
                    <div class="card-body">
                        <strong class="card-title fw-bold">{{ player.login }}</strong>
                        <strong class="d-block mt-2">Ready : {{ player.isReady }}</strong>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

const { io } = require('socket.io-client');

export default {

    data() {
        
        return {
            socket  : null,
            player  : null,
            players : []
        }
    },

    mounted() {

        this.player = JSON.parse(sessionStorage.getItem('player'));

        this.socket = new io(`ws://${WS_HOST}:3000`);

        this.socket.emit('get-players');
        this.socket.on('get-players-response', players => {
            this.players = players;
        });

        this.socket.on('set-player-is-ready', () => {
            this.socket.emit('get-players');
        });
    },

    methods: {

        setPlayerReady() {

            this.socket = new io(`ws://${WS_HOST}:3000`);
            
            this.socket.emit('set-player-is-ready', {
                player : this.player
            });
        }
    }
}

</script>
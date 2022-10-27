<template>
    
    <div class="container">
        <ul class="row">
            <li class="col" v-for="player in players">
                <div class="card">
                    <div class="card-body">
                        <strong class="card-title fw-bold">{{ player.login }}</strong>
                        <button
                            v-if="this.player.wsClientId == player.wsClientId"
                            @click="setPlayerReady"
                            :class="{ btn: true, 'mt-2' : true, 'btn-success': !player.isReady, 'btn-danger': player.isReady }"
                        >
                            <span v-if="!player.isReady">I'M READY</span>
                            <span v-if="player.isReady">I'M NOT READY</span>
                        </button>
                        <strong class="d-block mt-2" v-else>Ready : {{ player.isReady }}</strong>
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
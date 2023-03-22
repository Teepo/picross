<template>
    
    <div class="container">
        <ul class="row">
            <li class="col" v-for="player in players">
                <div class="card">
                    <div class="card-body">
                        <strong class="card-title fw-bold d-block">{{ player.login }}</strong>
                        <strong class="card-title fw-bold d-block">{{ player.socketId }}</strong>
                        <button
                            v-if="this.player && this.player.socketId == player.socketId"
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
            socket   : null,
            socketId : null,
            player   : null,
            players  : []
        }
    },

    mounted() {

        this.socketId = sessionStorage.getItem('socketId');

        if (!this.socketId) {
            this.$router.push({ name: 'multi-player-home' });
        }

        this.socket = new io(`ws://${WS_HOST}:3000`);

        this.socket.emit('get-player', { socketId : this.socketId });
        this.socket.on('get-player', player => {
            this.player = player;
        });

        this.socket.emit('get-players');
        this.socket.on('get-players', players => {
            this.players = players;
        });

        this.socket.on('set-player-is-ready', data => {

            this.players.find(player => player.socketId == data.player.socketId).isReady = data.player.isReady;

            this.socket.emit('get-players');
        });

        this.socket.on('start', () => {
            this.$router.push({ name: 'multi-player-game' });
        });

        this.socket.on('disconnect', () => {
            sessionStorage.clear();
        });
    },

    methods: {

        setPlayerReady() {

            this.socket.emit('set-player-is-ready', { socketId : this.socketId });
        }
    }
}

</script>
<template>
    <button class="btn btn-primary" @click="start">START GAME</button>
    <template v-for="player in players">
        <Picross _is-disabled is-multiplayer :_player="player" />
    </template>
</template>

<script>

const { io } = require('socket.io-client');

import Picross from './../components/Picross.vue';

export default {
    
    components : { Picross },

    data() {

        return {
            socket  : null,
            players : false
        }
    },

    mounted() {

        this.socket = new io(`ws://${WS_HOST}:3000`);

        this.socket.emit('get-players');
        this.socket.on('get-players', players => {
            this.players = players;
        });
    },

    methods : {

        start() {

            this.socket.emit('start');
        }
    }
}

</script>
<template>
    <div v-for="player in players">
        <Picross _is-disabled is-multiplayer :_player="player" />
    </div>
</template>

<script>

const { io } = require('socket.io-client');

import Picross from './../components/Picross.vue';

export default {
    
    components : { Picross },

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
    },
}

</script>
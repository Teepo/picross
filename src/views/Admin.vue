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
            players : []
        }
    },

    mounted() {

        this.socket = new io(`ws://${WS_HOST}:3000`);

        this.socket.emit('get-players');
        this.socket.on('get-players', players => {
            this.players = players;
        });
    },
}

</script>
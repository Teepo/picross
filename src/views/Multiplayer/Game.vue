<template>
    <template v-if="this.player">
        <Picross is-multiplayer :_player="this.player" :_board="this.player.boardToClear" />
    </template>
</template>

<script>

const { io } = require('socket.io-client');

import Picross from './../../components/Picross';

export default {
    
    components : { Picross },

    data() {

        return {
            player : null
        }
    },

    async mounted () {

        const socket = new io(`ws://${WS_HOST}:3000`);

        const socketId = sessionStorage.getItem('socketId');

        if (!socketId) {
            this.$router.push({ name: 'multi-player-home' });
        }
        
        socket.emit('get-player', { socketId : socketId });
        socket.on('get-player', player => {
            this.player = player;
        });

        socket.on('disconnect', () => {
            sessionStorage.clear();
        });
    },
}

</script>
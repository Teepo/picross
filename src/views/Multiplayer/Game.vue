<template>
    <template v-if="this.player">
        <Picross is-multiplayer :_player="this.player" />
    </template>
</template>

<script>

const { io } = require('socket.io-client');

import Picross from './../../components/Picross';

export default {
    
    components : { Picross },

    data() {

        return {
            socket   : null,
            socketId : null,
            player   : null
        }
    },

    async mounted () {

        this.socket = new io(`ws://${WS_HOST}:3000`);

        this.socketId = sessionStorage.getItem('socketId');

        if (!this.socketId) {
            this.$router.push({ name: 'multi-player-home' });
        }
        
        this.socket.emit('get-player', { socketId : this.socketId });
        this.socket.on('get-player', player => {
            this.player = player;
        });

        this.socket.on('disconnect', () => {
            sessionStorage.clear();
        });
    },

    data() {

        return {
            player : null
        }
    }
}

</script>
<template>
    
    <div class="container">
        <ul class="list-group">
            <li class="list-group-item" v-for="player in players">{{ player }}</li>
        </ul>
    </div>
</template>

<script>

const { io } = require('socket.io-client');

export default {

    data() {
        return {
            players : []
        }
    },

    mounted() {

        const socket = new io('ws://172.29.240.163:3000');

        socket.emit('get-players');
        socket.on('get-players-response', players => {
            this.players = players;
        });
    },

    methods: {
    }
}

</script>
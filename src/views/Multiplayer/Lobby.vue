<template>
    
    <div class="container">
        <ul class="row">
            <li class="col" v-for="player in players">
                <div class="card">
                    <img :src="`https://via.placeholder.com/100/${player.color.replace('#', '')}?text=%20`" class="card-img-top">
                    <div class="card-body">
                        <strong class="card-title fw-bold">{{ player.login }}</strong>
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
            players : []
        }
    },

    mounted() {

        const socket = new io('ws://172.27.41.39:3000');

        socket.emit('get-players');
        socket.on('get-players-response', players => {
            this.players = players;
        });
    },

    methods: {
    }
}

</script>
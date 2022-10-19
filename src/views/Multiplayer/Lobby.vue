<template>
    
    <div class="container">
        <ul class="list-group">
            <li class="list-group-item" v-for="player in players">{{ player }}</li>
        </ul>
    </div>
</template>

<script>

export default {

    data() {
        return {
            players : []
        }
    },

    mounted() {

        const socket = new WebSocket('ws://172.29.240.163:3000');

        socket.onopen = () => {
            socket.send(JSON.stringify({ event : 'get-players' }));
        };

        socket.onmessage = event => {

            console.log(event);

            const { players } = JSON.parse(event.data);

            this.players = players;
        };
    },

    methods: {
    }
}

</script>
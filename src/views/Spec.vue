<template>
    <template v-for="player in players">
        <Picross _is-disabled is-multiplayer :_player="player" />
    </template>
</template>

<script>

import { listenPlayers } from './../database/firebase/index.js';

import Picross from './../components/Picross.vue';

export default {
    
    components : { Picross },

    data() {

        return {
            players : false
        }
    },

    mounted() {

        listenPlayers(data => {

            if (!this.players) {
                this.players = [];
            }

            const { players, eventType } = data;

            if (eventType === 'onValue') {
                this.players = players ?? [];
            }
        })
    },

    methods : {

        start() {

            this.socket.emit('start');
        }
    }
}

</script>
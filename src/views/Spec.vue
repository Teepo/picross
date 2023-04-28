<template>

    <div class="grids">
        <template v-for="player in players" :key="player.seed">
            <Picross _is-disabled is-multiplayer :_player="player" :_board="player.boardToClear" />
        </template>
    </div>
</template>

<script>

import { onChildAddedPlayer, onChildAddedPlayerBoard } from './../database/firebase/index.js';

import Picross from './../components/Picross.vue';

export default {
    
    components : { Picross },

    data() {

        return {
            players : []
        }
    },

    mounted() {

        onChildAddedPlayer(data => {

            const { player } = data;

            player.seed = (new Date).getTime()

            this.players.push(player);

            onChildAddedPlayerBoard(player.id, board => {
                
                const p = this.players.find(p => p.id === player.id);
                
                p.board = board;
                p.seed = (new Date).getTime()
            })
        })
    },

    methods : {

        start() {
            this.socket.emit('start');
        }
    }
}
</script>

<style scoped>
.grids {
    display: flex;
    justify-content: center;
}
</style>
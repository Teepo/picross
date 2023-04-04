<template>
    <template v-if="this.player">
        <Picross is-multiplayer :_player="this.player" :_board="this.player.boardToClear" />
    </template>
</template>

<script>

import { getPlayer } from './../../database/firebase/index.js';

import Picross from './../../components/Picross';

export default {
    
    components : { Picross },

    data() {

        return {
            player : null
        }
    },

    async mounted () {

        this.id = sessionStorage.getItem('id');

        if (!this.id) {
            this.$router.push({ name: 'multi-player-home' });
            return;
        }
        
        this.player = await getPlayer(this.id);
    },
}

</script>
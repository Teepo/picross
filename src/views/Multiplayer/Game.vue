<template>
    <template v-if="this.player">
        <Picross is-multiplayer :_player="this.player" :_board="this.player.boardToClear" />
    </template>
</template>

<script>

import { isIterable } from './../../utils/array'

import { getPlayer, listenEvents, setEventAsView } from './../../database/firebase/index.js';

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

        listenEvents(async event => {

            const { id, type, senderId, views } = event;

            if (this.player.id === senderId) {
                return;
            }

            if (views && isIterable(views) && views.includes(this.player.id)) {
                return;
            }

            await setEventAsView(id, this.player.id);

            if (type === 'return_to_lobby') {
                this.$router.push({ name: 'lobby' });
            }
        });
    },
}

</script>
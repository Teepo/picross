<template>
    <Picross is-multiplayer :_player="player" />
</template>

<script>

import Picross from './../../components/Picross';

export default {
    
    components : { Picross },

    data() {

        const player = JSON.parse(sessionStorage.getItem('player'));

        return {
            socket : null,
            player : player
        }
    }
}

</script>
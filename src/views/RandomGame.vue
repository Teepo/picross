<template>
    <Picross :_board="this.board" />
</template>

<script>

import coherentRandom from './../boards/coherentRandom.js';

import Picross from './../components/Picross';

export default {
    
    components : { Picross },
    
    data() {
        
        return {
            board : coherentRandom(15, 15)
        }
    }
}

</script>
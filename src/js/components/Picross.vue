<template>
    
    <div class="lifes">
        <template v-for="x in [...Array(this.lifeCount)]" :key="x">
            <Svg name="heart" />
        </template>
    </div>
    
    <div class="grid-wrapper">
        <div class="grid">
            <template v-for="(item, x) in [...Array(this.gridSize.x)]">
                <Cell
                    v-for="(item, y) in [...Array(this.gridSize.y)]"
                    :key="y" :_x="x" :_y="y"
                />
            </template>
        </div>
    </div>
</template>

<script>

import Cell from './Cell';

import Svg from './Svg';

export default {

    components : { Cell, Svg },

    data() {
        
        return {
            
            gridSize : {
                x : 15,
                y : 15
            },
            board : [
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            lifeCount : 3,
            lifeLeft  : 3
        };
    },

    mounted() {        
        
        this.$root.board     = this.board;
        this.$root.gridSize  = this.gridSize;
        
        this.$root.lifeCount = this.lifeCount;
        this.$root.lifeLeft  = this.lifeLeft;
    }
}

</script>
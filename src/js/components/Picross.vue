<template>
    <div class="grid">
        <template v-for="(item, x) in [...Array(this.gridSize.x)]">
            <Cell
                v-for="(item, y) in [...Array(this.gridSize.y)]"
                :key="y" :_x="x" :_y="y"
            />
        </template>
    </div>
</template>

<script>

import Cell from './Cell';

export default {

    components : { Cell },

    data() {
        
        return {
            gridSize : {
                x : 15,
                y : 15
            }
        };
    },

    methods : {
    }
}

</script>
<template>
    
    <div class="lifes">
        <template v-for="x in [...Array(this.lifeCount)]" :key="x">
            <Life ref="hearts" />
        </template>
    </div>
    
    <div class="grid-wrapper">
        <div class="grid">
            <template v-for="(item, x) in [...Array(this.gridSize.x)]">
                <Cell
                    v-for="(item, y) in [...Array(this.gridSize.y)]"
                    :key="y" :_x="x" :_y="y"
                    @decrease-life="decreaseLifeHandler"
                />
            </template>
        </div>
    </div>
</template>

<script>

import Cell from './Cell';
import Life from './Life';

export default {

    components : { Cell, Life },

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

        const client = new WebSocket('ws://localhost:3002');

        client.onopen = event => {
            console.log("[open] Connection established", event);
            client.send("My name is John");
        };

        client.onmessage = event => {
            console.log(`[message] Data received from server: ${event.data}`);
        };
        
        this.$root.board     = this.board;
        this.$root.gridSize  = this.gridSize;
        
        this.$root.lifeCount = this.lifeCount;
        this.$root.lifeLeft  = this.lifeLeft;
    },

    methods: {

        decreaseLifeHandler() {

            this.lifeLeft--;

            const heart = this.$refs.hearts[this.lifeLeft] ?? null;

            heart && (heart.isDisabled = true);

            if (this.lifeLeft <= 0) {
                console.log('GAME OVER');
                return;
            }
        }
    }
}

</script>
<template>
    
    <div class="container">
        <div class="lifes">
            <template v-for="x in [...Array(this.lifeCount)]" :key="x">
                <Life ref="hearts" />
            </template>
        </div>
        
        <div class="grid-wrapper">
            <div class="grid tasks tasks-v">
                <div v-for="items in this.getTasksV()" class="task">
                    <span v-for="item in items">{{ item }}</span>
                </div>
            </div>
            <div class="grid cells">
                <template v-for="(item, x) in [...Array(this.gridSize.x)]">
                    <Cell
                        v-for="(item, y) in [...Array(this.gridSize.y)]"
                        :key="y" :_x="x" :_y="y"
                        @decrease-life="decreaseLifeHandler"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script>

import Cell from './../components/Cell';
import Life from './../components/Life';

export default {

    components : { Cell, Life },

    data() {
        
        return {
            
            gridSize : {
                x : 15,
                y : 15
            },
            board : [
                [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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

        console.log(this.getTasksH());
    },

    methods: {

        getTasksH() {

            const tasksH = [];

            this.board.map((h, i) => {
                
                let ii = 0;
                h.map((hv, y) => {
                    
                    if (!tasksH[i]) {
                        tasksH[i] = [];
                    }

                    if (this.board[i][y] === 1) {
                        ii++;
                    }
                    else {
                        ii > 0 && tasksH[i].push(ii);
                        ii = 0;
                    }

                    if (y == this.gridSize.y-1) {
                        ii > 0 && tasksH[i].push(ii);
                        ii = 0;
                    }
                });
            });

            return tasksH;
        },

        getTasksV() {

            const tasksV = [];

            let xi = 0;
            let ii = 0;
            [...Array(this.gridSize.x)].map((xx, xValue) => {

                if (!tasksV[xi]) {
                    tasksV[xi] = [];
                }

                [...Array(this.gridSize.y)].map((yy, yValue) => {

                    if (this.board[yValue][xi] === 1) {
                        ii++;
                    }
                    else {
                        ii > 0 && tasksV[xi].push(ii);
                        ii = 0;
                    }

                    if (yValue == this.gridSize.y-1) {
                        ii > 0 && tasksV[xi].push(ii);
                        ii = 0;
                    }
                });

                xi++;
            });

            return tasksV;
        },

        decreaseLifeHandler() {

            console.log('decreaseLifeHandler', this);

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
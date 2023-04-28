<template>
    
    <div :class="{
        'container' : true,
        'picross'   : true,
        'picross--is-disabled' : this.isDisabled
    }" @end="end" v-if="this.player">
        <div class="lifes">
            <template v-for="(x, index) in [...Array(this.lifeCount)]" :key="x">
                <Life ref="hearts" :_is-disabled="index >= this.player.life" />
            </template>
        </div>

        <div class="grid-wrapper">
            <div class="grid tasks tasks-v">
                <div v-for="(items, x) in this.getTasksV()" class="task" :key="x">
                    <template v-if="items.length > 0">
                        <span v-for="(item, y) in items" :key="y">{{ item }}</span>
                    </template>
                    <template v-else>
                        <span>0</span>
                    </template>
                </div>
            </div>
            <div class="grid tasks tasks-h">
                <div class="task" v-for="(items, x) in this.getTasksH()" :key="x">
                    <template v-if="items.length > 0">
                        <span v-for="(item, y) in items" :key="y">{{ item }}</span>
                    </template>
                    <template v-else>
                        <span>0</span>
                    </template>
                </div>
            </div>
            <div class="grid cells">
                <template v-for="(item, x) in this.player.board">
                    <Cell
                        v-for="(item, y) in this.player.board[x]"
                        :key="y" :_x="x" :_y="y"
                        :_isSelected="item === 1"
                        :_isCrossed="item === -1"
                        @decrease-life="decreaseLifeHandler"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script>

import { updatePlayerBoard, updatePlayerBoardCell } from './../database/firebase/index.js';

import Cell from './../components/Cell.vue';
import Life from './../components/Life.vue';

export default {

    components : { Cell, Life },

    props : {
        _player: {
            type: Object
        },
        _board: {
            type: Array
        },
        _isDisabled: {
            type: Boolean,
            default: false
        },
        isMultiplayer: {
            type: Boolean,
            default: false
        }
    },

    data() {

        return {

            player : this._player,

            isDisabled : this._isDisabled,
            
            gridSize : {
                x : 15,
                y : 15
            },
            board : this._board,
            lifeCount : 3,
            lifeLeft  : 3,
        };
    },

    beforeMount() {

        if (this.isMultiplayer && !this.isDisabled) {
            this.id = sessionStorage.getItem('id');
        }

        this.$root.board = this.board;
        this.$root.gridSize = this.gridSize;
        
        this.$root.lifeCount = this.lifeCount;
        this.$root.lifeLeft  = this.lifeLeft;

        let defaultPlayerBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        this.player = this._player ?? {
            board : defaultPlayerBoard,
            life  : 3
        };

        if (this.isMultiplayer) {

            // on récupère l'état du board
            this.updateBoard();
        }
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

            this.lifeLeft--;

            const heart = this.$refs.hearts[this.lifeLeft] ?? null;

            heart && (heart.isDisabled = true);

            if (this.lifeLeft <= 0) {
                this.end()
                return;
            }
        },

        end() {
            this.isDisabled = true;
        },

        updateBoard() {

            if (this.isDisabled) {
                return;
            }

            if (!this.isMultiplayer) {
                return;
            }

            updatePlayerBoard({
                id    : this.id,
                board : this.player.board
            });
        },

        /**
         * @param {Number} x
         * @param {Number} y
         * @param {Number} state
         *
         */
         updateCell(x = null, y = null, state = null) {

            if (this.isDisabled) {
                return;
            }

            if (!this.isMultiplayer) {
                return;
            }

            updatePlayerBoardCell({
                id    : this.id,
                x     : x,
                y     : y,
                state : state
            });
        }
    }
}

</script>
<template>
    
    <div :class="{
        'container' : true,
        'picross'   : true,
        'picross--is-disabled' : this.isDisabled
    }" @end="end">
        <div class="lifes">
            <template v-for="x in [...Array(this.lifeCount)]" :key="x">
                <Life ref="hearts" />
            </template>
        </div>

        <div class="grid-wrapper">
            <div class="grid tasks tasks-v">
                <div v-for="items in this.getTasksV()" class="task">
                    <template v-if="items.length > 0">
                        <span v-for="item in items">{{ item }}</span>
                    </template>
                    <template v-else>
                        <span>0</span>
                    </template>
                </div>
            </div>
            <div class="grid tasks tasks-h">
                <div v-for="items in this.getTasksH()" class="task">
                    <template v-if="items.length > 0">
                        <span v-for="item in items">{{ item }}</span>
                    </template>
                    <template v-else>
                        <span>0</span>
                    </template>
                </div>
            </div>
            <div class="grid cells">
                <template v-for="(item, x) in this.playerBoard">
                    <Cell
                        v-for="(item, y) in this.playerBoard[x]"
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

const { io } = require('socket.io-client');

import Cell from './../components/Cell.vue';
import Life from './../components/Life.vue';

export default {

    components : { Cell, Life },

    props : {
        _player: {
            type: Object,
            default: false
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

            socket  : null,
            player  : this._player,

            isDisabled : this._isDisabled,
            
            gridSize : {
                x : 15,
                y : 15
            },
            board : [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ],
            playerBoard : [
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
            ],
            lifeCount : 3,
            lifeLeft  : 3,
        };
    },

    mounted() {

        this.socket = new io(`ws://${WS_HOST}:3000`);

        this.$root.board = this.board;
        this.$root.gridSize = this.gridSize;
        
        this.$root.lifeCount = this.lifeCount;
        this.$root.lifeLeft  = this.lifeLeft;

        // pour reprendre une instance en cours
        if (this._player) {
            this.playerBoard = this._player.board;
        }

        // Si pas en mode spec
        if (!this.isDisabled) {
            this.player = JSON.parse(sessionStorage.getItem('player'));
        }
        else {

            // En mode spec, on update tout le board
            this.socket.on('update-board', data => {
                this.playerBoard = data.player.board;
            });
        }

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
            
            this.socket.emit('update-board', {
                player : this.player,
                board  : this.playerBoard
            });
        }
    }
}

</script>

<style scoped>
.container {
    display: block;
    width: auto;
}
</style>
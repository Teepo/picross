<template>
    
    <div :class="{
        'container' : true,
        'picross'   : true,
        'picross--is-disabled' : this.isDisabled
    }" @end="end" v-if="this.player">

        <v-overlay v-model="this.showGameOverOverlay" contained class="overlay-gameover align-center justify-center">
            <v-container>
                <v-btn icon="mdi-window-close" class="btn-close" density="compact" @click="this.showGameOverOverlay = false" color="red"></v-btn>
                <v-card>
                    <v-card-item>
                        <v-card-text class="text-center">
                            <strong class="text-h5 d-block">Plus de vie !</strong>

                            <v-icon class="mt-5" icon="mdi-emoticon-poop" size="x-large"></v-icon>

                            <v-btn v-if="!this.isMultiplayer" prepend-icon="mdi-restore" class="mt-8 bg-primary" @click="this.restart">Recommencer le niveau</v-btn>
                            <v-btn v-if="!this.isMultiplayer" prepend-icon="mdi-autorenew" class="mt-8 bg-primary" @click="this.newGame">Jouer à un autre niveau</v-btn>
                        </v-card-text>
                    </v-card-item>
                </v-card>
            </v-container>
        </v-overlay>

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
                        ref="cells"
                        @decrease-life="decreaseLifeHandler"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script>

import coherentRandom from './../boards/coherentRandom';

import { updatePlayerBoard, updatePlayerBoardCell, updatePlayerLife } from './../database/firebase/index.js';

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

            showGameOverOverlay : false
        };
    },

    beforeMount() {

        if (this.isMultiplayer && !this.isDisabled) {
            this.id = sessionStorage.getItem('id');
        }

        this.$root.board = this.board;
        this.$root.gridSize = this.gridSize;

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
            life  : this.lifeLeft
        };

        this.lifeLeft = this.player.life;

        if (this.isMultiplayer && !this.isDisabled) {

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

            this.isMultiplayer && updatePlayerLife({
                id   : this.player.id,
                life : this.lifeLeft
            });

            if (this.lifeLeft <= 0) {
                this.gameover()
                return;
            }
        },

        win() {
         
            this.isDisabled = true;
        },

        gameover() {
            this.isDisabled          = true;
            this.showGameOverOverlay = true;
        },

        restart() {

            this.isDisabled          = false;
            this.showGameOverOverlay = false;

            this.lifeLeft    = 3;
            this.player.life = 3;

            this.$refs.hearts.map(heart => {
                heart.isDisabled = false;
            });

            this.$refs.cells.map(cell => {
                cell.isSelected = false;
                cell.isCrossed  = false;
                cell.hasError   = false;
            });
        },

        newGame() {

            this.restart();

            this.board = coherentRandom(15, 15);
            this.player.board = this.board;
        },

        updateBoard() {

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
<template>
    <div :class="{
        'cell'                : true,
        
        'cell--is-selected'   : this.isSelected,
        'cell--is-crossed'    : this.isCrossed,
        
        'cell--has-error'     : this.hasError,
        'cell--has-s-error'   : this.hasError && this.isSelected,
        'cell--has-c-error'   : this.hasError && this.isCrossed,
        
        'cell--with-h-border' : (this.y % 5) === 0 && this.y > 0,
        'cell--with-v-border' : (this.x % 5) === 0 && this.x > 0,
    }"
    @click="clickHandler"
    @contextmenu="clickHandler"
    @mouseenter="clickHandler"
    ref="cells">
        <Svg name="cross" v-if="this.isCrossed"></Svg>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

import Svg from './Svg.vue';

import { AudioManager } from './../modules/AudioManager.js';

const IS_NEUTRAL  = 1;
const IS_SELECTED = 1;
const IS_CROSSED  = -1;

export default {

    components : { Svg },

    props: {
        _x : { type : Number, required : true },
        _y : { type : Number, required : true },
        _isSelected : { type : Boolean, required : true },
        _isCrossed  : { type : Boolean, required : true },
    },

    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters(['socket'])
    },

    data : function() {

        return {

            isSelected : this._isSelected,
            isCrossed  : this._isCrossed,
            hasError   : false,

            x : this._x,
            y : this._y,
        };
    },

    mounted() {

        if (!this.$root.cells) {
            this.$root.cells = [];
        }

        if (!this.$root.cells[this.x]) {
            this.$root.cells[this.x] = [];
        }

        if (!this.$root.cells[this.x][this.y]) {
            this.$root.cells[this.x][this.y] = null;
        }

        this.$root.cells[this.x][this.y] = this;

        if (this.$parent.isDisabled) {

            this.socket.on('update-board', data => {

                if (data.player.socketId !== this.$parent.player.socketId) {
                    return;
                }

                if (!data.x || !data.y || !data.state) {
                    return;
                }

                if (data.x !== this.x || data.y  !== this.y) {
                    return;
                }

                if (data.state === IS_SELECTED) {
                    this.isSelected = true;
                }
                else if (data.state === IS_CROSSED) {
                    this.isCrossed = true;
                }
            });
        }
    },

    updated() {

        if (this.$parent.isDisabled) {
            return;
        }

        const value = this.isSelected ? 1 : (this.isCrossed ? -1 : 0);

        this.$parent.player.board[this.x][this.y] = value;

        const state = this.isSelected ? IS_SELECTED : IS_CROSSED;

        this.$parent.updateBoard();
        this.$parent.updateCell(this.x, this.y, state);
    },

    methods : {

        clickHandler(event) {
            
            if (this.$parent.isDisabled) {
                return;
            }

            const type = event.type;

            if (this.isSelected || this.isCrossed) {
                return;
            }

            if (type === 'click') {
                this.isSelected = true;
            }
            else if (type === 'contextmenu') {
                this.isCrossed = true;
            }
            // handle multiple action
            else if (type === 'mouseenter') {

                // right mouse button
                if (event.which === 1) {
                    this.isSelected = true;
                }
                // left mouse button
                else if (event.which === 3) {
                    this.isCrossed = true;
                }
            }

            const board = this.$root.board;

            // handle error
            if (!this.hasError) {
                
                if (this.isSelected && board[this.x][this.y] === 0) {

                    this.hasError = true;

                    this.isSelected = false;
                    this.isCrossed  = true;
                }

                if (this.isCrossed && board[this.x][this.y] === 1) {

                    this.hasError = true;

                    this.isSelected = true;
                    this.isCrossed  = false;
                }
            }

            if (this.hasError) {
                
                AudioManager.play('error');

                this.$emit('decrease-life');
            }
            else if (this.isSelected || this.isCrossed) {
                AudioManager.play('click');
            }

            if (type === 'click' || type === 'contextmenu') {
                this.checkIfBoardIsCleared();
            }
        },

        checkIfBoardIsCleared() {

            let validCellCount    = 0;
            let revealedCellCount = 0;

            for (let x in [...Array(this.$root.gridSize.x)]) {
                for (let y in [...Array(this.$root.gridSize.y)]) {

                    if (this.$root.board[x][y] === 1) {
                        validCellCount++;
                    }

                    if (this.$root.cells[x][y].isSelected || this.$root.cells[x][y].isCrossed) {
                        revealedCellCount++;
                    }
                }
            }

            if (validCellCount === revealedCellCount) {
                this.$parent.end();
            }
        }
    }
}
</script>
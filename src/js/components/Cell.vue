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
    @mouseenter="clickHandler"></div>
</template>

<script>

import { AudioManager } from './../modules/AudioManager';

export default {

    props: {
        _x : { type : Number,  required : true },
        _y : { type : Number,  required : true },
    },

    data : function() {

        return {

            isSelected : false,
            isCrossed  : false,
            hasError   : false,

            x : this._x,
            y : this._y,
        };
    },

    methods : {

        clickHandler(event) {

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
                }

                if (this.isCrossed && board[this.x][this.y] === 1) {
                    this.hasError = true;
                }
            }

            // play sound only after action
            // ( prevent unallowed Media API warning while user didn't interact with browser)
            if (this.isSelected || this.isCrossed) {
                AudioManager.play('se_click');
            }
            
            if (this.hasError) {
                AudioManager.play('se_error');
            }
        }
    }
}
</script>
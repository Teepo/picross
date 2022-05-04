<template>
    <div :class="{
        'cell'               : true,
        'cell--is-selected'  : this.isSelected,
    }" @click="clickHandler">
        <component :is="getPieceComponent()" :cell="this" />
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

import EmptyPiece from './pieces/EmptyPiece';

export default {

    components : { EmptyPiece },

    props: {
        _x : { type : Number,  required : true },
        _y : { type : Number,  required : true },
    },

    computed : {
        ...mapGetters(['board'])
    },

    data : function() {

        return {

            isSelected : false,

            x : this._x,
            y : this._y,

            piece : null,
        };
    },

    methods : {

        getPieceComponent() {
            return this.piece?.name ?? this.board[this.x][this.y];
        },

        hasPiece() {
            return this.getPieceComponent() !== 'EmptyPiece';
        },

        updatePiece(piece) {
            this.piece = piece;
        },

        clickHandler() {
        }
    }
}
</script>
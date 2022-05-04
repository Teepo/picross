<template>
    <div :class="{
        'cell'               : true,
        'cell--is-selected'  : this.isSelected,
    }" @click="clickHandler"></div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {

    props: {
        _x : { type : Number,  required : true },
        _y : { type : Number,  required : true },
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

        clickHandler() {
        }
    }
}
</script>
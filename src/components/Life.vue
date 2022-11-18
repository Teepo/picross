<template>
    <Svg
        name="heart"
        ref="heart"
        :class="{
            'is-disabled' : this.isDisabled
        }"
    ></Svg>
</template>

<script>

import Svg from './Svg';

export default {
    
    components : { Svg },

    props : {
        _isDisabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        
        return {
            isDisabled : this._isDisabled
        }
    }
}

</script>
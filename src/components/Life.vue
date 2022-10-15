<template>
    <Svg
        name="heart"
        ref="heart"
        :class="{
            'is-disabled' : this.isDisabled
        }"
    />
</template>

<script>

import Svg from './Svg';

export default {
    
    components : { Svg },

    data() {
        
        return {
            isDisabled : false
        }
    },

    watch: {
        
        isDisabled(disabled) {

            if (!disabled) {
                return;
            }

            return;
            
            const icon = this.$refs.heart.$el;

            icon.addEventListener('animationEnd', () => {
                icon.classList.add('is-disabled')
            });
        }
    }
}

</script>
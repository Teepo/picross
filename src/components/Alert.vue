<template>
    <div class="container">
        <div :class="`alert alert-${state}`" role="alert">
            {{ message }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="close"></button>
        </div>
    </div>
</template>

<script>

export default {

    props: {
        
        state: {
            type: String,
            default : 'secondary'
        },
        message: {
            type: String,
            required: true
        }
    },

    methods: {
        
        close() {
            document.querySelector('main').dispatchEvent(new CustomEvent('closeAlert'));
        }
    },

    handleWSError(data) {

        const { error } = data;

        if (!!error) {
            document.querySelector('main').dispatchEvent(new CustomEvent('error', { detail: error }));
        }

        return !!error;
    }
}

</script>
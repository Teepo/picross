<template>
    
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Single Player</h5>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Multiplayer</h5>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    components : { },

    data() {
        
        return {
        };
    },

    mounted() {

        const client = new WebSocket('ws://localhost:3002');

        client.onopen = event => {
            console.log("[open] Connection established", event);
            client.send("My name is John");
        };
    },

    methods: {
    }
}
</script>

<style>
body {background-color:tomato;}
</style>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
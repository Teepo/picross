<template>
    
    <div class="container">
        <router-link :to="{name : 'one-player'}" class="card">
            <button type="button" class="btn btn-primary">Single player</button>
        </router-link>

        <router-link :to="{name : 'multi-player-home'}" class="card">
            <button type="button" class="btn btn-primary">Multiplayer</button>
        </router-link>
    </div>
</template>

<style scoped>
.card {
    margin-top: 40px;
}
</style>
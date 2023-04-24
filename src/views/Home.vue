<template>
    
    <div class="container">
        <router-link :to="{ name : 'random-game' }" class="card">
            <v-btn class="bg-primary">RANDOM GAME</v-btn>
        </router-link>

        <router-link :to="{ name : 'multi-player-home' }" class="card">
            <v-btn class="bg-primary">MULTIPLAYER</v-btn>
        </router-link>
    </div>
</template>

<style scoped>
.card {
    margin-top: 40px;
}
</style>
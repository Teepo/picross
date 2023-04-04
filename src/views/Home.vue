<template>
    
    <div class="container">
        <router-link :to="{ name : 'one-player' }" class="card">
            <v-btn class="bg-primary">SINGLE PLAYER</v-btn>
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
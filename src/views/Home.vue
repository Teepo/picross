<template>
    
    <div class="container">
        <div class="card">
            <router-link :to="{name : 'one-player'}">
                <div class="card-body">
                    <h5 class="card-title">Single Player</h5>
                </div>
            </router-link>
        </div>

        <div class="card">
            <router-link :to="{name : 'multi-player-home'}">
                <div class="card-body">
                    <h5 class="card-title">Multiplayer</h5>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin-top: 40px;
}
</style>
<template>
    <v-app>
        <v-main>

            <v-tabs
                align-tabs="center"
            >
                <v-tab><router-link :to="{ name : 'home' }">Home</router-link></v-tab>
                <v-tab><router-link :to="{ name : 'random-game' }">Random game</router-link></v-tab>
                <v-tab><router-link :to="{ name : 'lobby' }">Lobby</router-link></v-tab>
                <v-tab><router-link :to="{ name : 'multi-player-home' }">Multiplayer Home</router-link></v-tab>
                <v-tab><router-link :to="{ name : 'multi-player-game' }">Multiplayer Game</router-link></v-tab>
                <v-tab><router-link :to="{ name : 'spec' }">Spec</router-link></v-tab>
                <v-tab><router-link :to="{ name : 'admin' }">Admin</router-link></v-tab>
            </v-tabs>
            
            <router-view/>
        </v-main>
    </v-app>
</template>
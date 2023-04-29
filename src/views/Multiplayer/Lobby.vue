<template>
    
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center fill-height">

            <v-container v-for="player in players" :key="player.id">
                <v-card :theme="player.isReady ? 'is-ready' : ''">
                    <v-card-item>
                        <v-card-text>
                            <v-row class="justify-space-between align-center">
                                <strong class="font-weight-bold">{{ player.login }}</strong>
                                <v-checkbox-btn
                                    v-if="this.player && this.player.id == player.id"
                                    @click="setPlayerReadyHandler"
                                    :model-value="player.isReady"
                                    label="Je suis prêt(e)"
                                    ></v-checkbox-btn>
                                <template v-else>
                                    <v-icon v-if="player.isReady" icon="mdi-check" color="green-lighten-1"></v-icon>
                                    <v-icon v-else icon="mdi-close" color="red-lighten-1"></v-icon>
                                </template>
                            </v-row>
                        </v-card-text>
                    </v-card-item>
                </v-card>
            </v-container>

        </v-responsive>
    </v-container>
</template>

<script>

import { isIterable } from './../../utils/array'

import {
    getPlayer, setPlayerReady,
    onValuePlayers, onChildAddedPlayers, onChildRemovedPlayers,
    listenEvents, setEventAsView
} from './../../database/firebase/index.js';

export default {

    data() {

        return {
            player   : null,
            players  : []
        }
    },

    async mounted() {

        this.id = sessionStorage.getItem('id');

        if (!this.id) {
            this.$router.push({ name: 'multi-player-home' });
        }

        this.player = await getPlayer(this.id);
        
        if (!this.player) {
            this.cleanSessionAndGoBackToMultiplayerHome();
        }

        onChildAddedPlayers(data => {

            const { player } = data;

            if (!this.players) {
                this.players = [];
            }

            this.players.push(player);
        });

        onChildRemovedPlayers(data => {

            const { player } = data;

            if (this.player.id === player.id) {
                return this.cleanSessionAndGoBackToMultiplayerHome();
            }

            this.players = this.players.filter(p => {
                return p.id !== player.id;
            });
        });

        onValuePlayers(data => {
            
            const { players } = data;
            
            this.players = players;
        });

        listenEvents(async event => {

            const { id, type, senderId, views } = event;

            if (this.player.id === senderId) {
                return;
            }

            if (views && isIterable(views) && views.includes(this.player.id)) {
                return;
            }

            await setEventAsView(id, this.player.id);

            if (type === 'start') {
                this.$router.push({ name: 'multi-player-game' });
            }
        });
    },

    methods: {

        setPlayerReadyHandler() {

            this.player.isReady = !this.player.isReady;

            setPlayerReady(this.player.id, this.player.isReady);
        },

        cleanSessionAndGoBackToMultiplayerHome() {
            sessionStorage.clear();
            this.$router.push({ name: 'multi-player-home' });
        }
    }
};
</script>

<style lang="scss" scoped>
.v-card {

    border: 2px solid rgb(var(--v-theme-red-lighten-1));
    transition: .2s border-color ease-in-out;

    &.v-theme {

        &--is-ready {
            border-color: rgb(var(--v-theme-green-lighten-1));
        }
    }
}
</style>
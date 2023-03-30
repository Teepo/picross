<template>
    
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center fill-height">

            <v-container v-for="player in players">
                <v-card>
                    <v-card-item>
                        <v-card-text>
                            <strong class="d-block">{{ player.login }}</strong>
                            <strong class="d-block">{{ player.id }}</strong>
                            <v-btn
                                v-if="this.player && this.player.id == player.id"
                                @click="setPlayerReadyHandler"
                                :class="{ btn: true, 'mt-2' : true, 'bg-green': !this.player.isReady, 'bg-red': this.player.isReady }"
                            >
                                <span v-if="!this.player.isReady">I'M READY</span>
                                <span v-if="this.player.isReady">I'M NOT READY</span>
                            </v-btn>
                            <strong v-else>Ready : {{ player.isReady }}</strong>
                        </v-card-text>
                    </v-card-item>
                </v-card>
            </v-container>

        </v-responsive>
    </v-container>
</template>

<script>

import { getPlayer, setPlayerReady, listenPlayers } from './../../database/firebase/index.js'; 

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

        listenPlayers(data => {

            if (!this.players) {
                this.players = [];
            }

            const { players, player, eventType } = data;

            if (this.players && player && this.players.some(p => p.id === player.id)) {

                if (eventType === 'onChildRemoved') {
                    return this.cleanSessionAndGoBackToMultiplayerHome()
                }
                return;
            }

            if (eventType === 'onChildAdded') {
                this.players.push(player);
            }
            else if (eventType === 'onChildRemoved') {
                
                this.players = this.players.filter(p => {
                    return p.id !== player.id;
                });
            }
            else if (eventType === 'onValue') {
                this.players = players;
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
}

</script>
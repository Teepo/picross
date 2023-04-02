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
                            <v-btn
                                v-if="this.player && this.player.id == player.id"
                                @click="sendLittleMessage"
                                :class="{ btn: true, 'mt-2' : true, 'bg-blue': true }"
                            >SEND MESSAGE</v-btn>
                            <strong v-else>Ready : {{ player.isReady }}</strong>
                        </v-card-text>
                    </v-card-item>
                </v-card>
            </v-container>

        </v-responsive>
    </v-container>
</template>

<script>

import { isIterable } from './../../utils/array'

import { getPlayer, setPlayerReady, listenPlayers, listenEvents, setEventAsView, sendEvent } from './../../database/firebase/index.js';

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

            if (eventType === 'onChildAdded') {
                this.players.push(player);
            }
            else if (eventType === 'onChildRemoved' && this.player.id === player.id) {
                return this.cleanSessionAndGoBackToMultiplayerHome();
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

        listenEvents(async event => {

            const { id, type, senderId, data, views } = event;

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
        })
    },

    methods: {

        setPlayerReadyHandler() {

            this.player.isReady = !this.player.isReady;

            setPlayerReady(this.player.id, this.player.isReady);
        },

        cleanSessionAndGoBackToMultiplayerHome() {
            sessionStorage.clear();
            this.$router.push({ name: 'multi-player-home' });
        },

        sendLittleMessage() {

            sendEvent({
                type     : 'lol1',
                senderId : this.player.id,
                data : {
                    title : 'test3'
                }
            });
        }
    }
}

</script>
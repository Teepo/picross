<template>

    <v-container class="fill-height">
        <v-responsive class="d-flex align-center fill-height">
            
            <v-container>
                <button class="btn btn-primary" @click="start">START GAME</button>
                <button class="btn btn-primary" @click="cleanPlayers">CLEAN PLAYERS</button>
            </v-container>

            <v-table class="text-left">
                <thead>
                    <tr>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-left">
                            LOGIN
                        </th>

                        <th class="text-left">
                            IS READY
                        </th>

                        <th class="text-left">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="player in players"
                        :key="player.id"
                        ref="players"
                    >
                        <td class="text-left">{{ player.id }}</td>
                        <td>{{ player.login }}</td>
                        <td>{{ player.isReady }}</td>
                        <td>
                            <v-btn icon="mdi-delete" @click="this.delete(player.id)"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-responsive>
  </v-container>
</template>

<script>

import { deletePlayer, deletePlayers, listenPlayers } from './../database/firebase/index.js';

export default {

    data() {

        return {
            players : []
        }
    },

    async mounted() {

        listenPlayers(data => {

            if (!this.players) {
                this.players = [];
            }

            const { players, eventType } = data;

            if (eventType === 'onValue') {
                this.players = players;
            }
        })
    },

    methods : {

        start() {
            this.socket.emit('start');
        },
        
        delete(id) {
            
            deletePlayer(id);

            this.players = this.players.filter(p => {
                return p.id !== id;
            }) ?? [];
        },
        
        cleanPlayers() {
            
            deletePlayers();

            this.players = [];
        },
    }
}
</script>
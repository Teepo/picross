<template>

    <v-container class="fill-height">
        <v-responsive class="d-flex align-center fill-height">

            <v-container>
                <v-btn class="bg-primary" @click="start">START GAME</v-btn>
            </v-container>

            <v-container>
                <v-btn class="bg-primary" @click="cleanPlayers">CLEAN PLAYERS</v-btn>
            </v-container>

            <div class="text-h6 mb-1">
                PLAYERS
            </div>
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
                    <tr v-for="player in players" :key="player.id">
                        <td class="text-left">{{ player.id }}</td>
                        <td>{{ player.login }}</td>
                        <td>{{ player.isReady }}</td>
                        <td>
                            <v-btn icon="mdi-delete" @click="this.delete(player.id)"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>

            <v-container>
                <v-btn class="bg-primary" @click="cleanEvents">CLEAN EVENTS</v-btn>
            </v-container>

            <div class="text-h6 mb-1">
                EVENTS
            </div>
            <v-table class="text-left">
                <thead>
                    <tr>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-left">
                            TYPE
                        </th>

                        <th class="text-left">
                            SENDER ID
                        </th>

                        <th class="text-left">
                            VIEWS
                        </th>

                        <th class="text-left">
                            DATA
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="event in events"
                        :key="event.id"
                        ref="events"
                    >
                        <td class="text-left">{{ event.id }}</td>
                        <td>{{ event.type }}</td>
                        <td>{{ event.senderId }}</td>
                        <td>{{ event.views }}</td>
                        <td>{{ event.data }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-responsive>
  </v-container>
</template>

<script>

import { deletePlayer, deletePlayers, listenPlayers, listenEvents, deleteEvents, sendEvent, giveBoardToClearToPlayers } from './../database/firebase/index.js';

export default {

    data() {

        return {
            players : [],
            events  : []
        }
    },

    async mounted() {

        listenPlayers(data => {

            if (!this.players) {
                this.players = [];
            }

            const { players, eventType } = data;

            if (eventType === 'onValue') {
                this.players = players ?? [];
            }
        })

        listenEvents(event => {

            if (!this.events) {
                this.events = [];
            }

            this.events.push(event)
        })
    },

    methods : {

        async start() {

            await giveBoardToClearToPlayers(this.players.map(player => player.id));

            sendEvent({
                type     : 'start',
                senderId : 'admin'
            });
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

        cleanEvents() {

            deleteEvents();

            this.events = [];
        },
    }
}
</script>
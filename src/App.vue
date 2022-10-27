<template>
  <nav>
    <router-link :to="{ name : 'home' }">Home</router-link>
    <router-link :to="{ name : 'lobby' }">Lobby</router-link>
    <router-link :to="{ name : 'multi-player-game' }">Multiplayer Game</router-link>
    <router-link :to="{ name : 'admin' }">Admin</router-link>
  </nav>
  <Alert v-if="!!error" :state="this.error.state" :message="this.error.message" />
  <main @error="errorHandler" @closeAlert="closeAlert">
    <router-view/>
  </main>
</template>

<script>

import Alert from './components/Alert';

export default {

    components : { Alert },

    data() {
      return {
        error : false
      }
    },

    mounted() {
      // OMG FIX THIS PLZ
      window.WS_HOST = '172.27.34.71';
    },

    methods: {

      errorHandler(error) {
        this.error = error.detail;
      },

      closeAlert() {
        this.error = false;
      }
    }
}

</script>
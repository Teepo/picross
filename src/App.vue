<template>
  <nav>
    <router-link to="/">Home</router-link>
    <button class="btn btn-primary" @click="ping">PING</button>
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

    methods: {

      ping() {

        const socket = new WebSocket('ws://172.29.240.163:3000');

        socket.onopen = () => {
            socket.send(JSON.stringify({ event : 'ping' }));
        };

        socket.onmessage = event => {
            console.log('pong', event);
        };
      },

      errorHandler(error) {
        this.error = error.detail;
      },

      closeAlert() {
        this.error = false;
      }
    }
}

</script>
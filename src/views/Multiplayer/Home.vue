<template>
    
    <div class="container">
        
        <form class="row g-3">
            
            <label for="login" class="form-label">Nickname</label>

            <div class="col auto mb-2">
                <input type="text" class="form-control" id="login" v-model="login" placeholder="John Doe" required>
            </div>

            <label for="login" class="form-label">Color</label>

            <div class="col auto mb-2">
                <input type="color" class="form-control" id="color" v-model="color" required>
            </div>

            <button class="btn btn-primary" @click="go">GO</button>
        </form>
    </div>
</template>

<script>

const { io } = require('socket.io-client');

import Alert from './../../components/Alert';

export default {

    methods: {
        
        go() {

            if (!this.login || this.login === '') {
                return;
            }
            
            const socket = new io('ws://172.27.41.39:3000');

            socket.emit('add-player', {
                login : this.login,
                color : this.color
            });

            // data is player or error
            socket.on('add-player-response', data => {

                const hasError = Alert.handleWSError(data);

                if (hasError) {
                    return;
                }

                sessionStorage.setItem('player', data);

                this.$router.push({ name: 'lobby' });
            });
        }
    }
}

</script>
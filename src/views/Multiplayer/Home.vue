<template>
    
    <div class="container">
        
        <form class="row g-3">
            
            <label for="login" class="form-label">Nickname</label>

            <div class="col auto">
                <input type="text" class="form-control" id="login" v-model="login" placeholder="John Doe" required>
            </div>
            
            <div class="col auto">
                <button class="btn btn-primary mb-2" @click="go">GO</button>
            </div>
        </form>
    </div>
</template>

<script>

const { io } = require('socket.io-client');

import Alert from './../../components/Alert';

export default {

    methods: {
        
        go() {
            
            const socket = new io('ws://172.29.240.163:3000');

            socket.emit('add-player', {
                login : this.login
            });

            socket.on('add-player-response', event => {

                const hasError = Alert.handleWSError(event);

                if (hasError) {
                    return;
                }

                this.$router.push({ name: 'lobby' });
            });
        }
    }
}

</script>
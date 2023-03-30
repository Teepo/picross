<template>
    
    <div class="container">
        
        <form class="row g-3">
            
            <label for="login" class="form-label">Nickname</label>

            <div class="col auto mb-2">
                <input type="text" class="form-control" id="login" v-model="login" placeholder="John Doe" required>
            </div>

            <button class="btn btn-primary" @click="go">GO</button>
        </form>
    </div>
</template>

<script>

import { addPlayer } from './../../database/firebase/index.js'; 

export default {

    methods: {
        
        async go() {

            if (!this.login || this.login === '') {
                return;
            }

            const player = await addPlayer({
                login : this.login
            });

            sessionStorage.setItem('id', player.key);

            this.$router.push({ name: 'lobby' });
        }
    }
}

</script>
<template>
    
    <v-sheet width="300" class="mt-10 mx-auto">
        <v-form validate-on="submit" @submit.prevent="submit">
            <v-text-field v-model="login" label="Login"></v-text-field>
            
            <v-btn block class="bg-primary" @click="go">Submit</v-btn>
        </v-form>
    </v-sheet>

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
import { createStore } from 'vuex';

export const store = createStore({
    state () {
        return {
            player : null
        }
    },
    getters : {
        player (state) { return state.player; }
    },
    mutations: {
        STORE_PLAYER : (state, player) => { state.player = player; },
    },
    actions: {
        SET_PLAYER : ({ context }, player) => { context.commit('STORE_PLAYER', player); },
    }
});
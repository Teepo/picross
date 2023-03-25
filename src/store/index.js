import { createStore } from 'vuex';

export const store = createStore({
    state () {
        return {
            socket : null,
        }
    },
    getters : {
        socket (state) { return state.socket; }
    },
    mutations: {
        STORE_SOCKET : (state, socket) => { state.socket = socket; },
    },
    actions: {
        SET_SOCKET : ({ commit }, socket) => { commit('STORE_SOCKET', socket); },
    }
});
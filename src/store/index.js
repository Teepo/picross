import { createStore } from 'vuex';

export const store = createStore({
    state () {
        return {
            db : null
        }
    },
    getters : {
        db (state) { return state.db; }
    },
    mutations: {
        STORE_DB : (state, db) => { state.db = db; },
    },
    actions: {
        SET_DB : ({ commit }, db) => { commit('STORE_DB', db); },
    }
});
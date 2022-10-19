import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './../views/Home.vue'

const routes = [{
    path: '/',
    component: Home
  }, {
    path: '/one-player',
    name : 'one-player',
    component: () => import(/* webpackChunkName: "views/one-player" */ './../views/OnePlayer.vue')
  }, {
    path: '/multi-player',
    name : 'multi-player-home',
    component: () => import(/* webpackChunkName: "views/multi-player" */ './../views/Multiplayer/Home.vue')
  },
  {
    path: '/lobby',
    name : 'lobby',
    component: () => import(/* webpackChunkName: "views/lobby" */ './../views/Multiplayer/Lobby.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router

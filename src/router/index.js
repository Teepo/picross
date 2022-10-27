import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './../views/Home.vue'

const routes = [{
    path: '/',
    name : 'home',
    component: Home,
  }, {
    path: '/one-player',
    name : 'one-player',
    component: () => import(/* webpackChunkName: "views/one-player" */ './../views/OnePlayer.vue')
  }, {
    path: '/multi-player/home',
    name : 'multi-player-home',
    component: () => import(/* webpackChunkName: "views/multi-player-home" */ './../views/Multiplayer/Home.vue')
  }, {
    path: '/multi-player/game',
    name : 'multi-player-game',
    component: () => import(/* webpackChunkName: "views/multi-player-game" */ './../views/Multiplayer/Game.vue')
  }, {
    path: '/lobby',
    name : 'lobby',
    component: () => import(/* webpackChunkName: "views/lobby" */ './../views/Multiplayer/Lobby.vue')
  }, {
    path: '/admin',
    name : 'admin',
    component: () => import(/* webpackChunkName: "views/admin" */ './../views/Admin.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router

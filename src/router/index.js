import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './../views/Home.vue'
import OnePlayer from './../views/OnePlayer.vue'
import MultiplayerHome from './../views/Multiplayer/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/one-player', name : 'one-player', component: OnePlayer },
  { path: '/multi-player', name : 'multi-player-home', component: MultiplayerHome }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router

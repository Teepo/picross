import { createApp } from 'vue'

import App from './App.vue'

import './registerServiceWorker'

import { store } from './store'
import router from './router'

import './scss/app.scss';

import { AudioManager } from './modules/AudioManager';

AudioManager.load();

createApp(App)
.use(router)
.use(store)
.mount('#app')

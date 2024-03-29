import { createApp } from 'vue'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import colors from 'vuetify/lib/util/colors';

import App from './App.vue'

import './registerServiceWorker'

import router from './router'

import './scss/app.scss';

import { AudioManager } from './modules/AudioManager';

AudioManager.load();

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                colors: {
                    primary: '#1867C0',
                    secondary: '#5CBBF6',
                    'red-lighten-1' : colors.red.lighten1,
                    'green-lighten-1' : colors.green.lighten1
                },
            },
            dark: {
                colors: {
                    'red-lighten-1' : colors.red.lighten1,
                    'green-lighten-1' : colors.green.lighten1
                }
            }
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi }
    },
    ssr: true,
});

createApp(App)
.use(router)
.use(vuetify)
.mount('#app')

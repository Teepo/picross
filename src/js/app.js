import 'regenerator-runtime/runtime';

import { createApp } from 'vue';

import Picross from './components/Picross';

const app = createApp({});

app.config.devtools = true;

app
.component('picross', Picross)
.mount('app')
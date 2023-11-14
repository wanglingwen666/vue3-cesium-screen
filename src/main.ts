import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { registerGlobalPlugin } from './global'
import '@/styles/element-variables.scss'

const app = createApp(App)

app.use(registerGlobalPlugin)

app.mount('#app')

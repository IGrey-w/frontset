import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 👈 加上这一行，引入我们配置好的路由

const app = createApp(App)
app.use(router)
app.mount('#app')
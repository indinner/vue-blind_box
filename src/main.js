import { createApp } from 'vue'
import App from './App.vue'

import instance from "./config/axios.config.js";
import {router} from "./config/router.config.js"
import store from "@/config/vuex.config.js"
import {vant} from "@/config/vant.config.js";
let app=createApp(App)

app.config.globalProperties.$http=instance
app.use(router)
app.use(store)
app.use(vant)
app.mount('#app')

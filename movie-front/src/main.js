import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 쿠키 사용
app.use(VueCookies)

// 쿠키 만료 기간
app.config.globalProperties.$cookies.config("7d")

app.mount('#app')

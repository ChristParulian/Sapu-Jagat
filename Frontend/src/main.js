import { createApp } from 'vue'
import './styles/style.css'
import routes from './routes/routes'
import 'flowbite';
import App from './App.vue'
import { useUserStore } from './models/userStore.js'

const app = createApp(App)

const { initUserFromLocalStorage } = useUserStore()
initUserFromLocalStorage()

app.use(routes).mount('#app')

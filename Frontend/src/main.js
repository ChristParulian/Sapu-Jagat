import { createApp } from 'vue'
import './styles/style.css'
import routes from './routes/routes'
import 'flowbite';
import App from './App.vue'
import { useUserModel } from './models/userModel.js'

const app = createApp(App)

const { initUserFromLocalStorage } = useUserModel()
initUserFromLocalStorage()

app.use(routes).mount('#app')

import { createApp } from 'vue'
import './styles/style.css'
import routes from './routes/routes'
import 'flowbite';
import App from './App.vue'

createApp(App).use(routes).mount('#app')

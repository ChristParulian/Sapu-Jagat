import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import Dashboard from '../pages/dashboard.vue'
import Scan from '../pages/scan.vue'
import Results from '../pages/results.vue'
import History from '../pages/history.vue'
import Redeem from '../pages/redeem.vue'
import Education from '../pages/education.vue'
import About from '../pages/about.vue'
import Profile from '../pages/profile.vue'
import Checkin from '../pages/checkin.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/scan', component: Scan },
  { path: '/results', component: Results },
  { path: '/history', component: History },
  { path: '/redeem', component: Redeem },
  { path: '/education', component: Education },
  { path: '/about', component: About },
  { path: '/profile', component: Profile },
  { path: '/checkin', component: Checkin },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
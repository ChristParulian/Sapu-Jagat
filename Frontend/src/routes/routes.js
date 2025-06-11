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
import NotFound from '../pages/404.vue'

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
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard: redirect to /login if not authenticated
const publicPages = ['/login', '/register']

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  const authRequired = !publicPages.includes(to.path)

  // Jika user belum login dan sedang di halaman login/register,
  // tapi path tidak persis /login atau /register, arahkan ke 404
  if (!isLoggedIn && (from.path === '/login' || from.path === '/register') && !publicPages.includes(to.path) && to.matched.length === 0) {
    return next({ name: 'NotFound' })
  }

  // Jika path tidak ditemukan (tidak match route manapun), arahkan ke 404
  if (to.matched.length === 0) {
    return next({ name: 'NotFound' })
  }

  // Jika user belum login dan akses halaman private, redirect ke login
  if (authRequired && !isLoggedIn) {
    return next('/login')
  }

  next()
})

export default router
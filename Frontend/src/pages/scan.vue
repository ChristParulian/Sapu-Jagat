<template>
  <div class="min-h-screen flex flex-col justify-between bg-bg" style="font-family: 'Poppins', 'Inter', sans-serif;">
    <div class="p-8 flex flex-col items-center relative">
      <button
        @click="logout"
        class="absolute right-0 top-0 px-4 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-primary transition"
        style="margin: 8px;"
      >
        Logout
      </button>
      <h1 class="text-3xl font-bold mb-2 text-primary">Scan Sampah</h1>
      <router-link to="/results" class="mt-6 px-4 py-2 bg-accent text-primary rounded-lg font-semibold hover:bg-secondary transition">Lihat Hasil Scan</router-link>
    </div>
    <BottomNav active="scan" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
const router = useRouter()
function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

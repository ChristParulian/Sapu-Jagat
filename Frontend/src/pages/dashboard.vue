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
      <img src="/logo/logo.png" alt="Logo" class="object-contain" style="width:220px; height:220px; aspect-ratio:1/1; margin-bottom:10px; margin-top:0;" />
      <h1 class="text-3xl font-bold mb-2 text-primary">Selamat datang di <span class="text-accent">Sapu Jagat</span></h1>
      <div class="my-4 w-full flex flex-col items-center">
        <button
          @click="goToCheckin"
          class="px-6 py-3 rounded-lg font-bold text-lg shadow-md transition bg-accent text-primary hover:bg-secondary"
        >
          Check-in Harian
        </button>
      </div>
      <p class="text-secondary text-lg">Dashboard masih kosong.</p>
    </div>
    <BottomNav active="home" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()

function goToCheckin() {
  router.push('/checkin')
}

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <Header />
    <div class="p-8 flex flex-col items-center relative mt-24">
      <h1 class="text-3xl font-bold mb-2 text-primary">Tentang Sapu Jagat</h1>
      <p class="text-secondary text-lg">Belum ada informasi tentang aplikasi.</p>
    </div>
    <BottomNav active="about" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

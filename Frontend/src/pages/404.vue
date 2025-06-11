<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <Header v-if="isLoggedIn" />
    <div class="flex-1 flex flex-col items-center justify-center text-center p-8">
      <img src="/illustrations/illustrasi.png" alt="404 Not Found" class="w-64 max-w-full mb-8" />
      <h1 class="text-4xl font-bold text-primary mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-secondary mb-2">Halaman Tidak Ditemukan</h2>
      <p class="text-lg text-gray-700 mb-6">Sepertinya alamat yang kamu tuju tidak tersedia.<br />Cek kembali URL yang kamu masukkan.</p>
      <div v-if="!isLoggedIn" class="flex flex-wrap gap-2 justify-center mt-6">
        <router-link to="/login" class="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300">Login</router-link>
        <router-link to="/register" class="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300">Register</router-link>
      </div>
    </div>
    <BottomNav v-if="isLoggedIn" />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import BottomNav from '../components/BottomNav.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../models/userModel.js'

const router = useRouter()
const { username } = useUserStore()
const isLoggedIn = username && username !== 'User'
</script>

<style scoped>
.text-primary {
  color: #A4B465;
}
.text-secondary {
  color: #7C6F57;
}
.bg-primary {
  background-color: #A4B465;
}
.bg-secondary {
  background-color: #7C6F57;
}
</style>

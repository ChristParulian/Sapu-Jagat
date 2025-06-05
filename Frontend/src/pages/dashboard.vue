<template>
<<<<<<< Updated upstream
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
<<<<<<< HEAD
          <span v-if="checkedIn">Sudah Check-in Hari Ini</span>
          <span v-else-if="loading">Memproses...</span>
          <span v-else>Check-in Harian</span>
=======
  <div class="min-h-screen flex flex-col justify-between bg-bg" style="font-family: 'Montserrat', 'Open Sans', sans-serif;">    <!-- Header Component -->
    <Header />
      <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">
      <!-- Welcome Back Message -->
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-primary">
          Selamat datang kembali, <span class="text-accent">{{ userName || 'User' }}</span>!
        </h1>
        <p class="text-secondary text-lg">Mulai perjalanan hijau Anda hari ini!</p>
        
        <!-- Mulai Scan Button -->
        <button 
          @click="goToScan"
          class="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 mt-4"
        >
          Mulai Scan
>>>>>>> Stashed changes
=======
          Check-in Harian
>>>>>>> main
        </button>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Sampah Sudah Dipilah -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-base font-semibold text-gray-600 mb-2">Sampah Sudah Dipilah</h3>
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">1,234</div>
          <p class="text-sm text-gray-500">Sampah yang dipilah</p>
        </div>

        <!-- Total Berat Sampah -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-base font-semibold text-gray-600 mb-2">Total Berat Sampah</h3>
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">3,567 kg</div>
          <p class="text-sm text-gray-500">Berat total sampah</p>
        </div>

        <!-- Total Poin Diperoleh -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-base font-semibold text-gray-600 mb-2">Total Poin Diperoleh</h3>
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">5,678</div>
          <p class="text-sm text-gray-500">Poin reward</p>
        </div>

        <!-- Daily Check-in -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-base font-semibold text-gray-600 mb-2">Daily Check-in</h3>
          <button 
            @click="goToCheckin"
            class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full mb-2"
          >
            Check In Hari Ini
          </button>
          <p class="text-xs text-gray-500">Terakhir: 5 Juni 2025</p>
        </div>
      </div>
    </div>
    
    <!-- Bottom Navigation -->
    <BottomNav active="home" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
<<<<<<< HEAD
<<<<<<< Updated upstream
import { checkIn, getCheckinHistoryByMonth } from '../services/api'

const router = useRouter()
const loading = ref(false)
const checkedIn = ref(false)
const notif = ref('')
const notifType = ref('success')
=======
import Header from '../components/Header.vue'
=======

const router = useRouter()

function goToCheckin() {
  router.push('/checkin')
}
>>>>>>> main

const router = useRouter()
const userName = ref('')

// Get user name from localStorage or API
onMounted(async () => {
  // First try to get from localStorage
  const user = localStorage.getItem('user')
  if (user) {
    try {
      const userData = JSON.parse(user)
      userName.value = userData.name || userData.username || userData.email
    } catch (error) {
      console.error('Error parsing user data:', error)
    }
  }

  // If no user data in localStorage, try to get from token
  const token = localStorage.getItem('token')
  if (token && !userName.value) {
    try {
      // Decode JWT token to get user info
      const payload = JSON.parse(atob(token.split('.')[1]))
      userName.value = payload.username || payload.email || 'User'
    } catch (error) {
      console.error('Error decoding token:', error)
      userName.value = 'User'
    }
  }

  // If still no username, set default
  if (!userName.value) {
    userName.value = 'User'
  }
})

function goToCheckin() {
  router.push('/checkin')
}
>>>>>>> Stashed changes

function goToScan() {
  router.push('/scan')
}
</script>

<template>  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">      <!-- Welcome Back Message -->
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-primary">
          Selamat datang kembali, <span class="text-primary">{{ userName || 'User' }}</span>!
        </h1>
        <p class="text-secondary text-lg">Mulai perjalanan hijau Anda hari ini!</p>
        <!-- Mulai Scan Button -->
        <button 
          @click="goToScan"
          class="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 mt-4"
        >
          Mulai Scan
        </button>
      </div>      <!-- Statistics Cards -->
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
          <p class="text-xs text-gray-500">Terakhir: 5 Juni 2025</p>        </div>
      </div>

      <!-- Quick Access Section -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Akses Cepat</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Profile Button -->
          <button 
            @click="goToProfile"
            class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-left group"
          >
            <div class="flex items-center mb-2">
              <svg class="w-8 h-8 text-green-500 mr-3 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/>
                <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              </svg>
              <h3 class="text-lg font-semibold text-gray-800">Profil Pengguna</h3>
            </div>
            <p class="text-gray-600">Kelola informasi akun dan preferensi Anda</p>
          </button>

          <!-- History Button -->
          <button 
            @click="goToHistory"
            class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-left group"
          >
            <div class="flex items-center mb-2">
              <svg class="w-8 h-8 text-blue-500 mr-3 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 class="text-lg font-semibold text-gray-800">Riwayat Kelola Sampah</h3>
            </div>
            <p class="text-gray-600">Lihat riwayat aktivitas pemilahan sampah Anda</p>
          </button>
        </div>
      </div>
    </div>
    <!-- Bottom Navigation -->
    <BottomNav active="dashboard" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'

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

function goToScan() {
  router.push('/scan')
}

function goToProfile() {
  router.push('/profile')
}

function goToHistory() {
  router.push('/history')
}
</script>

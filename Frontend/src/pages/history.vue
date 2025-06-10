<template>  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-primary">Aksi Jagat</h1>
        <p class="text-secondary text-lg">Riwayat aktivitas sampah Anda</p>
      </div>
      
      <!-- Content Placeholder -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center">
        <div class="text-gray-500 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">Belum Ada Riwayat</h3>
        <p class="text-gray-500">Riwayat aktivitas pemilahan sampah Anda akan muncul di sini.</p>
      </div>
    </div>
    
    <!-- Bottom Navigation -->
    <BottomNav active="history" />
    <LoadingIndicator :visible="globalLoading" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'

const router = useRouter()
const globalLoading = ref(false)

// Contoh penggunaan:
// globalLoading.value = true; // sebelum request
// globalLoading.value = false; // setelah selesai
// Terapkan pada setiap request API utama di page ini.

// TODO: Implement history API call when ready
// This will fetch history data from a separate API endpoint
// not from checkin history

</script>

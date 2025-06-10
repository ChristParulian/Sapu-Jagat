<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-primary">Hasil Scan Jagat</h1>
        <p class="text-secondary text-lg">Hasil pemindaian sampah Anda</p>
      </div>
      
      <!-- Content Placeholder -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center">
        <div class="text-gray-500 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">Belum Ada Hasil Scan</h3>
        <p class="text-gray-500">Hasil pemindaian sampah akan muncul di sini setelah Anda melakukan scan.</p>
      </div>
    </div>
    
    <!-- Bottom Navigation -->
    <BottomNav active="results" />
    
    <!-- Loading Indicator -->
    <LoadingIndicator :visible="globalLoading" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'

const router = useRouter()
const globalLoading = ref(false)

// Contoh penggunaan:
// globalLoading.value = true; // sebelum request
// globalLoading.value = false; // setelah selesai
// Terapkan pada setiap request API utama di page ini.

// TODO: Implement scan results functionality when ready
// This will display the results from waste scanning
</script>

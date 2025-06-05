<template>
  <div class="min-h-screen flex flex-col justify-between bg-bg" style="font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-primary">Scan Sampah</h1>
        <p class="text-secondary text-lg">Pindai sampah untuk mendapatkan informasi pemilahan</p>
      </div>
      
      <!-- Camera Container -->
      <div class="max-w-md mx-auto mb-6">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <!-- Camera Preview Area -->
          <div class="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div class="text-center text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <p class="text-sm font-medium">Kamera akan muncul di sini</p>
              <p class="text-xs text-gray-400 mt-1">Arahkan kamera ke sampah yang ingin dipindai</p>
            </div>
          </div>
          
          <!-- Camera Controls -->
          <div class="flex justify-center space-x-4">
            <button class="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50" disabled>
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              Mulai Kamera
            </button>
          </div>
        </div>
      </div>
      
      <!-- Capture Button -->
      <div class="text-center mb-6">
        <button class="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto hover:bg-secondary transition disabled:opacity-50 shadow-lg" disabled>
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
        <p class="text-sm text-gray-500 mt-2">Tekan untuk memindai</p>
      </div>
      
      <!-- Results Link -->
      <div class="text-center">
        <router-link to="/results" class="inline-flex items-center px-6 py-3 bg-accent text-primary rounded-lg font-semibold hover:bg-secondary hover:text-white transition">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Lihat Hasil Scan
        </router-link>
      </div>
    </div>
    
    <!-- Bottom Navigation -->
    <BottomNav active="scan" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'

const router = useRouter()

// TODO: Implement camera functionality when model API is ready
// This will include:
// - Camera access and preview
// - Image capture
// - API call to model for waste classification
// - Navigation to results with scan data

</script>

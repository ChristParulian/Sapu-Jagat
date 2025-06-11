<template>
  <div class="min-h-screen flex flex-col justify-between bg-brand-cream font-sans relative overflow-hidden">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold mb-2 text-brand-forest">Riwayat Scan Sampah</h1>
        <p class="text-brand-forest/70 text-lg">Lihat hasil pemindaian sampah yang telah kamu lakukan</p>
      </div>

      <!-- Loading State -->
      <LoadingIndicator :visible="loading" message="Mengambil riwayat scan..." />

      <!-- Riwayat Scan -->
      <div v-if="!loading && scanHistory.length > 0" class="space-y-4 max-w-2xl mx-auto">
        <div
          v-for="item in scanHistory"
          :key="item.id"
          class="flex items-center justify-between bg-white/90 border border-brand-sage/20 rounded-xl shadow-md px-5 py-4 hover:shadow-lg transition-all"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-brand-sage/10 border border-brand-sage/20">
              <svg v-if="item.detected === 'Plastik'" class="w-7 h-7 text-brand-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 7l2 12a2 2 0 002 2h8a2 2 0 002-2l2-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
              </svg>
              <svg v-else-if="item.detected === 'Kertas'" class="w-7 h-7 text-brand-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7V3a1 1 0 011-1h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1v-4" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 11h10M7 15h6" />
              </svg>
              <svg v-else class="w-7 h-7 text-brand-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <div class="text-lg font-semibold text-brand-forest">{{ item.detected }}</div>
                <span class="inline-block px-2 py-0.5 rounded-full bg-brand-yellow/80 text-brand-forest text-xs font-bold ml-1">+250 point</span>
              </div>
              <div class="text-xs text-brand-sage/80">{{ formatDate(item.created_at) }}</div>
              <div class="text-xs text-brand-sage/60 italic" v-if="item.filename">File: {{ item.filename }}</div>
            </div>
          </div>
          <div>
            <span class="inline-block px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow font-semibold text-xs">
              {{ item.date }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && scanHistory.length === 0" class="flex flex-col items-center justify-center py-16">
        <svg class="w-20 h-20 mb-4 text-brand-sage/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
        </svg>
        <h3 class="text-lg font-semibold text-brand-sage mb-2">Belum Ada Hasil Scan</h3>
        <p class="text-brand-sage/70">Hasil pemindaian sampah akan muncul di sini setelah kamu melakukan scan.</p>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNav active="results" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'

const scanHistory = ref([])
const loading = ref(true)

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function fetchScanHistory() {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(import.meta.env.VITE_API_URL + '/predict/history', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const data = await res.json()
    if (data.status === 'success') {
      scanHistory.value = data.history || []
    } else {
      scanHistory.value = []
    }
  } catch (e) {
    scanHistory.value = []
  }
  loading.value = false
}

onMounted(() => {
  fetchScanHistory()
})
</script>

<style scoped>
.bg-brand-cream {
  background-color: #FEFAE0;
}
.text-brand-forest {
  color: #386641;
}
.text-brand-sage {
  color: #A7C957;
}
.text-brand-yellow {
  color: #FFCF50;
}
.font-sans {
  font-family: 'Montserrat', 'Open Sans', sans-serif;
}
</style>

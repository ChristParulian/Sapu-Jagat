<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">      
      <!-- Welcome Back Message -->
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-primary">
          Selamat datang kembali, <span class="text-primary">{{ userProfile?.username || 'User' }}</span>!
        </h1>
        <p class="text-secondary text-lg">Mulai perjalanan hijau Anda hari ini!</p>
        <!-- Mulai Scan Button -->
        <button 
          @click="goToScan"
          class="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 mt-4"
        >
          Mulai Scan
        </button>
      </div>      
      
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Sampah Sudah Dipilah - Neumorphic -->
        <div class="neumorphic-card p-6">
          <h3 class="text-base font-semibold text-gray-600 mb-2">Sampah Sudah Dipilah</h3>
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">1,234</div>
          <p class="text-sm text-gray-500">Sampah yang dipilah</p>
        </div>
        
        <!-- Total Berat Sampah - Neumorphic -->
        <div class="neumorphic-card p-6">
          <h3 class="text-base font-semibold text-gray-600 mb-2">Total Berat Sampah</h3>
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">3,567 kg</div>
          <p class="text-sm text-gray-500">Berat total sampah</p>
        </div>
        
        <!-- Total Poin Diperoleh - Neumorphic -->
        <div class="neumorphic-card p-6">
          <h3 class="text-base font-semibold text-gray-600 mb-2">Total Poin Diperoleh</h3>
          <div class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{{ userProfile?.points?.toLocaleString('id-ID') ?? 0 }}</div>
          <p class="text-sm text-gray-500">Poin reward</p>
        </div>
          <!-- Daily Check-in - Neumorphic Style -->
        <div class="neumorphic-card p-6">
          <h3 class="text-base font-semibold text-gray-600 mb-2">Jagat Aktif</h3>
          <button 
            @click="goToCheckin"
            class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full mb-2"
          >
            Check In Hari Ini
          </button>
          <p class="text-xs text-gray-500">Terakhir: 5 Juni 2025</p>        
        </div>
      </div>      <!-- Quick Access Section -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Akses Cepat</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <!-- Profile Button - Neumorphic -->
          <button 
            @click="goToProfile"
            class="neumorphic-card p-6 hover:shadow-lg transition-all duration-300 text-left group"
          >
            <div class="flex items-center mb-2">
              <svg class="w-8 h-8 mr-3 transition-transform group-hover:scale-110" style="color:#FEFAE0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/>
                <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              </svg>
              <h3 class="text-lg font-semibold text-gray-800">Profil Jagat</h3>
            </div>
            <p class="text-gray-600">Kelola informasi akun dan preferensi Anda</p>
          </button>

          <!-- History Button - Neumorphic -->
          <button 
            @click="goToHistory"
            class="neumorphic-card p-6 hover:shadow-lg transition-all duration-300 text-left group"
          >
            <div class="flex items-center mb-2">
              <svg class="w-8 h-8 mr-3 transition-transform group-hover:scale-110" style="color:#FEFAE0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 class="text-lg font-semibold text-gray-800">Aksi Jagat</h3>
            </div>
            <p class="text-gray-600">Lihat riwayat aktivitas pemilahan sampah Anda</p>
          </button>
        </div>
      </div>
      <!-- Map Container (not in card) -->
      <div class="w-full flex flex-col items-center mb-8" style="background:transparent;">
        <div class="flex items-center gap-2 mb-1">
          <svg class="w-6 h-6" style="color:#A4B465" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
          </svg>
          <span class="text-lg sm:text-xl font-bold text-gray-800">Peta Jagat</span>
        </div>
        <div class="text-sm text-gray-600 mb-3">Temukan lokasi bank sampah terdekat</div>
        <div id="map" class="map-bordered w-full rounded-lg" style="height:350px; max-width:1000px;"></div>
      </div>
    </div>
    <!-- Bottom Navigation -->
    <BottomNav active="dashboard" />
    <!-- Loading Indicator -->
    <LoadingIndicator :visible="globalLoading" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import { useUserStore } from '../models/userModel.js'
import { useUserProfile } from '../models/userprofileModel.js'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ref, onMounted } from 'vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'

const router = useRouter()
const { username } = useUserStore()
const { userProfile, fetchUserProfile } = useUserProfile()
const globalLoading = ref(false)

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

onMounted(async () => {
  globalLoading.value = true
  try {
    await fetchUserProfile(localStorage.getItem('token'))
    
    // Inisialisasi map
    const map = L.map('map').setView([-6.234985, 106.831627], 10)
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=OCxf3aKSk6gkj1aQKlOR', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors & <a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener">MapTiler</a>',
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      crossOrigin: true
    }).addTo(map)

    // Ambil data lokasi bank sampah
    const res = await fetch('https://api.maptiler.com/data/01974e93-88e2-7375-a40e-2a1dc2e1c474/features.json?key=OCxf3aKSk6gkj1aQKlOR')
    const data = await res.json()
    if (data && data.features) {
      data.features.forEach(f => {
        // Pastikan hanya geometry type Point
        if (f.geometry && f.geometry.type === 'Point' && Array.isArray(f.geometry.coordinates)) {
          const [lng, lat] = f.geometry.coordinates
          // Debug log koordinat dan properti
          console.log('MapTiler marker:', { lat, lng, props: f.properties })
          // Validasi lat/lng
          if (typeof lat === 'number' && typeof lng === 'number' && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
            const name = f.properties.nama_bank_sampah || f.properties.name || f.properties.NAMA || f.properties.nama || f.properties.title || 'Bank Sampah'
            const alamat = f.properties.address || f.properties.alamat || ''
            const deskripsi = f.properties.description || ''
            let popupContent = `<b>${name}</b>`
            if (alamat) popupContent += `<br><span style='font-size:13px;'>${alamat}</span>`
            if (deskripsi) popupContent += `<br><span style='font-size:12px;color:#888;'>${deskripsi}</span>`
            L.marker([lat, lng]).addTo(map).bindPopup(popupContent)
          }
        }
      })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    globalLoading.value = false
  }
})

/* Contoh penggunaan:
globalLoading.value = true; // sebelum request
globalLoading.value = false; // setelah selesai
Terapkan pada setiap request API utama di page ini. */
</script>

<style scoped>
.neumorphic-card {
  background: #A4B465;
  border-radius: 20px;
  box-shadow: 
    20px 20px 40px #A4B46533,
    -20px -20px 40px #A4B46580;
  transition: all 0.3s ease;
  border: none;
  overflow: visible !important;
}

.neumorphic-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    25px 25px 50px #A4B46566,
    -25px -25px 50px #A4B465e6;
}

.neumorphic-card:active {
  transform: translateY(1px);
  box-shadow: 
    10px 10px 20px #A4B46540,
    -10px -10px 20px #A4B465b3,
    inset 5px 5px 10px #A4B46536,
    inset -5px -5px 10px #A4B465cc;
}

/* Ubah semua warna teks di dalam card menjadi #FEFAE0 */
.neumorphic-card,
.neumorphic-card h1,
.neumorphic-card h2,
.neumorphic-card h3,
.neumorphic-card h4,
.neumorphic-card h5,
.neumorphic-card h6,
.neumorphic-card p,
.neumorphic-card span,
.neumorphic-card div,
.neumorphic-card button {
  color: #FEFAE0 !important;
}

/* Override warna placeholder dan input jika ada di dalam card */
.neumorphic-card input,
.neumorphic-card textarea {
  color: #FEFAE0 !important;
  background: transparent;
}

/* Override Tailwind bg-clip-text jika ada */
.neumorphic-card [class*='text-'] {
  color: #FEFAE0 !important;
}

.map-bordered {
  /* border: 3px solid #A4B465; */
  box-shadow: 0 8px 32px #A4B46566, 0 1.5px 8px #A4B46533;
  background: #fff;
}
</style>

<style>
/* Perbaiki z-index agar map dan leaflet tile tidak tertutup elemen lain */
#map {
  z-index: 0;
  min-height: 300px;
}
#map .leaflet-pane,
#map .leaflet-map-pane,
#map .leaflet-tile,
#map .leaflet-marker-icon,
#map .leaflet-popup {
  z-index: 10;
}

/* Pastikan parent .neumorphic-card tidak punya overflow:hidden agar map bisa render tile */
.neumorphic-card {
  overflow: visible !important;
}

/* Header dan BottomNav tetap di atas map */
header, .BottomNav {
  z-index: 50 !important;
  position: relative;
}
</style>

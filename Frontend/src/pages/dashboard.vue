<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">
      <!-- Atas: Salam & Ilustrasi -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <!-- Salam & Scan Button -->
        <div class="flex-1" data-aos="fade-right">
          <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-primary">
            Selamat datang kembali, <span class="text-primary">{{ userProfile?.username || 'User' }}</span>!
          </h1>
          <p class="text-secondary text-lg mb-4">Mulai perjalanan hijau Anda hari ini!</p>
          <button 
            @click="goToScan"
            class="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Mulai Scan Sampah
          </button>
        </div>
        <!-- Ilustrasi -->
        <div class="flex-1 flex justify-center" data-aos="zoom-in">
          <div class="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
            <img src="/illustrations/person-doing-selective-recycle-garbage.jpg" alt="Orang scan sampah" class="w-full drop-shadow-2xl rounded-2xl bg-[#A4B465] p-2" />
            <div class="absolute bottom-2 left-2 bg-black bg-opacity-40 text-xs text-white px-2 py-1 rounded" style="font-size:11px;">
              Image by <a href="https://www.freepik.com/free-photo/person-doing-selective-recycle-garbage_18955511.htm" target="_blank" rel="noopener" class="underline">freepik</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Statistik Total Sampah -->
      <div class="flex justify-center mb-8" data-aos="fade-up">
        <div class="neumorphic-card p-8 w-full max-w-2xl text-center">
          <h3 class="text-lg sm:text-xl font-semibold mb-2">Statistik Total Sampah yang Sudah di Scan</h3>
          <div class="flex flex-col sm:flex-row justify-center gap-6">
            <div>
              <div class="text-2xl sm:text-3xl font-bold mb-1">1,234</div>
              <p class="text-sm">Sampah Sudah Dipilah</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Jagat Aktif, Profil, Aksi -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8" data-aos="fade-up">
        <!-- Card Jagat Aktif -->
        <div class="flex-1 neumorphic-card p-6 flex flex-col items-center">
          <h3 class="text-base font-semibold mb-2">Jagat Aktif</h3>
          <button @click="goToCheckin" class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full mb-2">Check In Hari Ini</button>
          <p class="text-xs">Terakhir: 5 Juni 2025</p>
        </div>
        <!-- Card Profil Jagat (Clickable) -->
        <div class="flex-1 neumorphic-card p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
          @click="goToProfile">
          <h3 class="text-base font-semibold mb-2">Profil Jagat</h3>
        </div>
        <!-- Card Aksi Jagat (Clickable) -->
        <div class="flex-1 neumorphic-card p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
          @click="goToHistory">
          <h3 class="text-base font-semibold mb-2">Aksi Jagat</h3>
        </div>
      </div>
      <!-- Map Section -->
      <div class="w-full flex flex-col items-center mb-8" style="background:transparent;" data-aos="fade-up">
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
import L, { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ref, onMounted } from 'vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { initMap } from '../utils/map.js'

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
  AOS.init({ once: true, duration: 800 })
  globalLoading.value = true
  try {
    await fetchUserProfile(localStorage.getItem('token'))
    // Inisialisasi map pakai utils
    const map = initMap('map')
    // Custom icon untuk marker agar tidak broken image
    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      shadowSize: [41, 41]
    })
    // Ambil data lokasi bank sampah
    const res = await fetch('https://api.maptiler.com/data/01974e93-88e2-7375-a40e-2a1dc2e1c474/features.json?key=OCxf3aKSk6gkj1aQKlOR')
    const data = await res.json()
    if (data && data.features) {
      data.features.forEach(f => {
        // Pastikan hanya geometry type Point
        if (f.geometry && f.geometry.type === 'Point' && Array.isArray(f.geometry.coordinates)) {
          const [lng, lat] = f.geometry.coordinates
          // Validasi lat/lng
          if (typeof lat === 'number' && typeof lng === 'number' && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
            const name = f.properties.nama_bank_sampah || f.properties.name || f.properties.NAMA || f.properties.nama || f.properties.title || 'Bank Sampah'
            const alamat = f.properties.address || f.properties.alamat || ''
            const deskripsi = f.properties.description || ''
            let popupContent = `<b>${name}</b>`
            if (alamat) popupContent += `<br><span style='font-size:13px;'>${alamat}</span>`
            if (deskripsi) popupContent += `<br><span style='font-size:12px;color:#888;'>${deskripsi}</span>`
            L.marker([lat, lng], { icon: customIcon }).addTo(map).bindPopup(popupContent)
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

@media (max-width: 640px) {
  h1, h2, h3, h4, h5, h6, .text-lg, .text-xl, .text-2xl, .text-3xl {
    font-size: 90% !important;
  }
  .neumorphic-card {
    padding: 1rem !important;
  }
  button {
    font-size: 90% !important;
    padding: 0.5rem 1rem !important;
  }
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

<template>
  <div class="min-h-screen flex flex-col justify-between" style="background: linear-gradient(135deg, #FEFAE0 0%, #FEFAE0 40%, rgba(255, 255, 255, 0.9) 60%, #FEFAE0 100%); font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">
      <!-- Atas: Salam & Ilustrasi -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">        <!-- Salam & Button -->
        <div class="flex-1" data-aos="fade-right">          <h1 class="text-3xl sm:text-4xl font-bold mb-4" style="color: #626F47;">
            Selamat datang kembali, <span style="color: #A4B465;">{{ userProfile?.username || 'User' }}</span>!
          </h1>
          <p class="text-lg mb-6" style="color: #626F47;">Mulai perjalanan hijau Anda hari ini!</p>
          <button 
            @click="goToScan"
            class="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg"
            style="background: linear-gradient(135deg, #A4B465, #626F47);"
          >
            Mulai Scan Sampah
          </button>
        </div>
        <!-- Ilustrasi Baru -->
        <div class="flex-1 flex justify-center items-center" data-aos="zoom-in">
          <div class="relative w-full max-w-xs md:max-w-md lg:max-w-lg">
            <img src="/illustrations/illustrasi3.png" alt="Ilustrasi edukasi daur ulang sampah" class="w-full drop-shadow-2xl rounded-3xl p-0 bg-white/0" style="object-fit: contain; background: none;" />
            <div class="absolute bottom-2 left-2 text-xs px-2 py-1 rounded credit-text" style="font-size:11px; pointer-events:auto;">
      <a href="http://www.freepik.com" target="_blank" rel="noopener" style="color:#A4B465; text-decoration:underline;">Designed by pikisuperstar / Freepik</a>
    </div>
          </div>
        </div>
      </div>      <!-- Statistik Section -->
      <div class="mb-8" data-aos="fade-up">
        <div class="glass-card p-8 relative overflow-hidden">          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl" style="background: linear-gradient(135deg, rgba(255, 207, 80, 0.3), rgba(164, 180, 101, 0.3));"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl" style="background: linear-gradient(45deg, rgba(164, 180, 101, 0.2), rgba(98, 111, 71, 0.2));"></div>
          
          <div class="relative z-10">
            <div class="text-center mb-8">              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg" style="background: linear-gradient(135deg, #FFCF50, #A4B465);">
    <!-- Bar chart icon -->
    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="10" width="4" height="8" rx="1" fill="currentColor"/>
      <rect x="9" y="6" width="4" height="12" rx="1" fill="currentColor"/>
      <rect x="15" y="3" width="4" height="15" rx="1" fill="currentColor"/>
    </svg>
  </div>
  <h3 class="text-2xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent" style="background-image: linear-gradient(135deg, #626F47, #A4B465);">
    Statistik Total Sampah Yang Sudah Di Scan
  </h3>
  <p class="text-sm" style="color: #626F47;">Data statistik sampah yang sudah di scan oleh anda tiap bulannya</p>
</div>
            
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
              <canvas ref="chartCanvas" class="w-full h-64"></canvas>
            </div>
          </div>
        </div>
      </div><!-- Jagat Aktif, Profil, Aksi -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8" data-aos="fade-up" data-aos-delay="100">        <!-- Card Jagat Aktif -->
        <div class="group modern-card p-6 relative overflow-hidden" style="background: linear-gradient(135deg, #A4B465, #626F47);">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white">Jagat Aktif</h3>
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <button @click="goToCheckin" class="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg mb-3">
              Check In Hari Ini
            </button>
            <p class="text-white/80 text-xs">
              Terakhir: {{ lastCheckin ? formatDate(lastCheckin) : '-' }}
            </p>
          </div>
        </div>

        <!-- Card Profil Jagat -->
        <div class="group modern-card p-6 relative overflow-hidden cursor-pointer"
          @click="goToProfile" style="background: linear-gradient(135deg, #FFCF50, #A4B465);">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div class="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white">Profil Jagat</h3>
          </div>
        </div>

        <!-- Card Aksi Jagat -->
        <div class="group modern-card p-6 relative overflow-hidden cursor-pointer"
          @click="goToHistory" style="background: linear-gradient(135deg, #626F47, #A4B465);">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div class="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white">Aksi Jagat</h3>
          </div>
        </div>
      </div>      <!-- Map Section -->
      <div class="mb-8" data-aos="fade-up" data-aos-delay="200">
        <div class="glass-card p-8 relative overflow-hidden">          <div class="absolute top-0 left-0 w-28 h-28 rounded-full blur-2xl" style="background: linear-gradient(135deg, rgba(164, 180, 101, 0.2), rgba(98, 111, 71, 0.2));"></div>
          
          <div class="relative z-10">
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow-lg" style="background: linear-gradient(135deg, #A4B465, #626F47);">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent" style="background-image: linear-gradient(135deg, #626F47, #A4B465);">
                Peta Jagat
              </h3>
              <p class="text-sm" style="color: #626F47;">Temukan lokasi bank sampah terdekat</p>
            </div>
            
            <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
              <div id="map" class="w-full rounded-xl shadow-lg" style="height:350px;"></div>
            </div>
          </div>
        </div>
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
import Chart from 'chart.js/auto'

const router = useRouter()
const { username } = useUserStore()
const { userProfile, fetchUserProfile } = useUserProfile()
const globalLoading = ref(false)
const lastCheckin = ref(null)
const chartCanvas = ref(null)

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

function initChart() {
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
      datasets: [{
        label: 'Sampah Dipilah (kg)',
        data: [20, 25, 30, 35, 22, 40],        backgroundColor: [
          'rgba(164, 180, 101, 0.8)',   // #A4B465
          'rgba(255, 207, 80, 0.8)',    // #FFCF50  
          'rgba(98, 111, 71, 0.8)',     // #626F47
          'rgba(164, 180, 101, 0.9)',   // #A4B465
          'rgba(255, 207, 80, 0.9)',    // #FFCF50
          'rgba(98, 111, 71, 0.9)'      // #626F47
        ],
        borderColor: [
          'rgba(164, 180, 101, 1)',     // #A4B465
          'rgba(255, 207, 80, 1)',      // #FFCF50
          'rgba(98, 111, 71, 1)',       // #626F47
          'rgba(164, 180, 101, 1)',     // #A4B465
          'rgba(255, 207, 80, 1)',      // #FFCF50
          'rgba(98, 111, 71, 1)'        // #626F47
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,        hoverBackgroundColor: [
          'rgba(164, 180, 101, 1)',     // #A4B465
          'rgba(255, 207, 80, 1)',      // #FFCF50
          'rgba(98, 111, 71, 1)',       // #626F47
          'rgba(164, 180, 101, 1)',     // #A4B465
          'rgba(255, 207, 80, 1)',      // #FFCF50
          'rgba(98, 111, 71, 1)'        // #626F47
        ],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#A4B465',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} kg sampah dipilah`
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 50,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#6b7280',
            stepSize: 10,
            font: {
              size: 12,
              weight: '500'
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12,
              weight: '600'
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  })
}

async function fetchLastCheckin() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await fetch(`${import.meta.env.VITE_API_URL}/checkin/last`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (data.status === 'success' && data.data.lastCheckin) {
      lastCheckin.value = data.data.lastCheckin
    }
  } catch (e) {
    lastCheckin.value = null
  }
}

onMounted(async () => {
  AOS.init({ once: true, duration: 800 })
  globalLoading.value = true
  try {
    await fetchUserProfile(localStorage.getItem('token'))
    await fetchLastCheckin()
    
    // Initialize chart
    setTimeout(() => {
      initChart()
    }, 100)
    
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

// Helper untuk format tanggal ke "5 Juni 2025"
function formatDate(dateStr) {
  if (!dateStr) return '-'
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  const [year, month, day] = dateStr.split('-')
  return `${Number(day)} ${bulan[Number(month) - 1]} ${year}`
}

/* Contoh penggunaan:
globalLoading.value = true; // sebelum request
globalLoading.value = false; // setelah selesai
Terapkan pada setiap request API utama di page ini. */
</script>

<style scoped>
/* Glass morphism cards */
.glass-card {
  background: rgba(254, 250, 224, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(164, 180, 101, 0.2);
  box-shadow: 
    0 20px 40px rgba(98, 111, 71, 0.1),
    0 15px 12px rgba(98, 111, 71, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 25px 50px rgba(98, 111, 71, 0.15),
    0 20px 20px rgba(98, 111, 71, 0.1),
    inset 0 1px 0 rgba(164, 180, 101, 0.3);
}

/* Modern cards with gradients */
.modern-card {
  border-radius: 20px;
  box-shadow: 
    0 10px 30px rgba(98, 111, 71, 0.15),
    0 1px 8px rgba(98, 111, 71, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.modern-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(98, 111, 71, 0.25),
    0 8px 16px rgba(98, 111, 71, 0.15);
}

/* Animated background */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

/* Enhanced buttons */
button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

button:hover::before {
  left: 100%;
}

/* Chart container enhancements */
canvas {
  border-radius: 12px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

/* Gradient text effects */
.gradient-text {
  background: linear-gradient(135deg, #A4B465, #FFCF50, #626F47);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .glass-card {
    padding: 1.5rem !important;
    border-radius: 16px;
    /* Remove hover/transform/box-shadow for mobile */
    transition: none !important;
    box-shadow: 0 4px 12px rgba(98, 111, 71, 0.08) !important;
  }
  .glass-card:hover {
    transform: none !important;
    box-shadow: 0 4px 12px rgba(98, 111, 71, 0.08) !important;
  }
  .modern-card {
    padding: 1.25rem !important;
    border-radius: 16px;
    /* Remove hover/transform/box-shadow for mobile */
    transition: none !important;
    box-shadow: 0 2px 8px rgba(98, 111, 71, 0.06) !important;
  }
  .modern-card:hover {
    transform: none !important;
    box-shadow: 0 2px 8px rgba(98, 111, 71, 0.06) !important;
  }
  /* Remove icon bounce on mobile for performance */
  .icon-bounce {
    animation: none !important;
  }
}

/* Enhanced map styling */
#map {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Loading states */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Icon animations */
.icon-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* Hover effects for cards */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Backdrop effects */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(164, 180, 101, 0.6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(164, 180, 101, 0.8);
}

.credit-text {
  color: #FEFAE0 !important;
  background: none;
  text-shadow: 0 1px 6px rgba(0,0,0,0.18);
  opacity: 0.55;
  font-weight: 500;
  transition: opacity 0.2s;
}
.credit-text:hover {
  opacity: 0.85;
}
</style>

<style>
/* Global map and component fixes */
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

/* Header dan BottomNav tetap di atas */
header, .BottomNav {
  z-index: 50 !important;
  position: relative;
}

/* Enhanced leaflet popup styling */
.leaflet-popup-content-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.leaflet-popup-tip {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

/* Custom marker styling */
.leaflet-marker-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Smooth transitions for all interactive elements */
* {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Hide default scrollbars on mobile */
@media (max-width: 768px) {
  body {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  body::-webkit-scrollbar {
    display: none;
  }
}
</style>

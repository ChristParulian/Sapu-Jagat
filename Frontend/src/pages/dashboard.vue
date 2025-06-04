<template>
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
          :disabled="loading || checkedIn"
          @click="handleCheckIn"
          class="px-6 py-3 rounded-lg font-bold text-lg shadow-md transition bg-accent text-primary hover:bg-secondary"
          :class="(loading || checkedIn) ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : ''"
        >
          <span v-if="checkedIn">Sudah Check-in Hari Ini</span>
          <span v-else-if="loading">Memproses...</span>
          <span v-else>Check-in Harian</span>
        </button>
        <p v-if="notif" :class="notifType === 'success' ? 'text-green-600' : 'text-red-600'" class="mt-2 font-semibold">{{ notif }}</p>
      </div>
      <p class="text-secondary text-lg">Dashboard masih kosong.</p>
    </div>
    <BottomNav active="home" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import { checkIn, getCheckinHistoryByMonth } from '../services/api'

const router = useRouter()
const loading = ref(false)
const checkedIn = ref(false)
const notif = ref('')
const notifType = ref('success')

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

const today = new Date().toISOString().slice(0, 10)
const thisMonth = today.slice(0, 7)
const checkinDates = ref([])

const checkCheckinStatus = async () => {
  checkedIn.value = false // reset dulu
  checkinDates.value = []
  const token = localStorage.getItem('token')
  if (!token) {
    checkedIn.value = false
    return
  }
  try {
    // Ambil riwayat check-in bulan ini dari API
    const data = await getCheckinHistoryByMonth(token, thisMonth)
    // data = { dates: ["2025-06-01", ...] }
    if (data && Array.isArray(data.dates)) {
      checkinDates.value = data.dates
      checkedIn.value = data.dates.includes(today)
    } else {
      checkedIn.value = false
    }
  } catch (err) {
    checkedIn.value = false
  }
}

const handleCheckIn = async () => {
  loading.value = true
  notif.value = ''
  notifType.value = 'success'
  try {
    const token = localStorage.getItem('token')
    if (!token) throw 'Token tidak ditemukan, silakan login ulang.'
    const res = await checkIn(token)
    notif.value = res.message || 'Check-in berhasil!'
    notifType.value = 'success'
    checkedIn.value = true
  } catch (err) {
    notif.value = err
    notifType.value = 'error'
    if (String(err).toLowerCase().includes('sudah check-in')) {
      checkedIn.value = true
    }
  } finally {
    loading.value = false
    await checkCheckinStatus()
  }
}

onMounted(() => {
  checkCheckinStatus()
})
</script>

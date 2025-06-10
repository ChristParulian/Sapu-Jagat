<template>
  <div class="flex flex-col min-h-[100dvh] bg-bg font-primary" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    <div class="flex-1 w-full max-w-5xl p-1.5 sm:p-4 md:p-8 mt-1.5 sm:mt-4 mb-24 mx-0.5 sm:mx-4 bg-white rounded-2xl shadow-lg border-2 border-secondary">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-3 gap-1.5 sm:gap-2">
        <!-- Tombol Kembali ke Dashboard: Selalu tampil di desktop, dan di mobile tampil di bawah kalender -->
        <div class="flex items-center gap-1" v-if="!isMobile">
          <button @click="goToDashboard" class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-primary hover:bg-secondary text-bg rounded-lg transition-all duration-300 transform hover:scale-105 font-opensans text-xs sm:text-sm">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span class="hidden sm:inline">Kembali ke Beranda Jagat</span>
            <span class="sm:hidden">Kembali</span>
          </button>
        </div>
        <!-- Navigasi bulan/tahun: di desktop kanan, di mobile di atas tabel -->
        <div class="hidden sm:flex flex-row items-center gap-1.5 sm:gap-2 ml-auto mt-8" style="z-index:1; position:relative;">
          <button @click="prevMonth" :disabled="loading" class="flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded bg-gray-200 hover:bg-secondary text-primary transition-colors font-bold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            &lt;
          </button>
          <h2 class="text-base sm:text-xl md:text-2xl font-bold text-primary text-center whitespace-nowrap px-1.5 sm:px-2">{{ monthYearLabel }}</h2>
          <button @click="nextMonth" :disabled="loading" class="flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded bg-gray-200 hover:bg-secondary text-primary transition-colors font-bold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            &gt;
          </button>
        </div>
      </div>
      <!-- Navigasi bulan/tahun khusus mobile, tampil di atas tabel, beri padding atas agar tidak tertutup header -->
      <div class="flex sm:hidden flex-row items-center justify-center gap-2 mb-2 pt-16" style="z-index:1; position:relative;">
        <button @click="prevMonth" :disabled="loading" class="flex items-center justify-center w-8 h-8 rounded bg-gray-200 hover:bg-secondary text-primary transition-colors font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed">
          &lt;
        </button>
        <h2 class="text-base font-bold text-primary text-center whitespace-nowrap px-1">{{ monthYearLabel }}</h2>
        <button @click="nextMonth" :disabled="loading" class="flex items-center justify-center w-8 h-8 rounded bg-gray-200 hover:bg-secondary text-primary transition-colors font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed">
          &gt;
        </button>
      </div>
      <div class="overflow-x-auto -mx-0.5 sm:mx-0">
        <table class="w-full min-w-0 sm:min-w-[640px] lg:min-w-[900px] text-center table-fixed">
          <thead>
            <tr>
              <th v-for="d in days" :key="d" class="py-1 text-xs sm:text-base text-secondary font-medium whitespace-nowrap">{{ d }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, widx) in calendar" :key="widx">
              <td v-for="(date, didx) in week" :key="didx" class="align-top p-0.5 sm:p-1.5">
                <div v-if="date" class="flex flex-col items-center border rounded-lg p-1 min-h-[48px] min-w-[32px] sm:p-3 sm:min-h-[100px] sm:min-w-[85px] lg:min-h-[120px] lg:min-w-[110px] bg-bg mx-auto"
                  :class="{
                    'bg-green-50 border-green-400': isCheckedIn(date),
                    'bg-yellow-50 border-yellow-400': isToday(date) && !isCheckedIn(date),
                    'bg-red-50 border-red-400': isPast(date) && !isCheckedIn(date)
                  }">
                  <div class="font-bold text-primary text-xs sm:text-base lg:text-lg mb-0.5 sm:mb-1">{{ date.getDate() }}</div>
                  <div class="text-[10px] sm:text-sm text-secondary mb-1 text-center leading-tight">Daily<br class="sm:hidden">check-in</div>
                  <template v-if="isCheckedIn(date)">
                    <button class="border border-green-500 text-green-500 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-semibold cursor-not-allowed bg-green-100 mt-0.5 sm:mt-1" disabled>Submitted</button>
                  </template>
                  <template v-else-if="isToday(date)">
                    <button
                      :disabled="!isToday(date) || loading"
                      @click="isToday(date) ? handleCheckInForDate(date) : null"
                      class="border px-1 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-semibold mt-0.5 sm:mt-1 border-blue-500 text-blue-500 hover:bg-blue-100"
                    >
                      <span v-if="loading && submittingDate === date.toISOString().slice(0,10) && isToday(date)">
                        <svg class="animate-spin h-3 w-3 sm:h-4 sm:w-4 mr-1 inline-block text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                        <span class="hidden sm:inline">Loading...</span>
                      </span>
                      <span v-else>Submit</span>
                    </button>
                  </template>
                  <template v-else-if="isPast(date) && !isCheckedIn(date)">
                    <button class="border border-red-500 text-red-500 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-semibold bg-red-100 cursor-not-allowed mt-0.5 sm:mt-1" disabled>Not Submitted</button>
                  </template>
                  <template v-else>
                    <button class="border border-gray-300 text-gray-400 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-semibold bg-gray-100 cursor-not-allowed mt-0.5 sm:mt-1" disabled>Submit</button>
                  </template>
                </div>
                <div v-else class="min-h-[32px] min-w-[24px] sm:min-h-[90px] sm:min-w-[80px] lg:min-h-[120px] lg:min-w-[110px] bg-transparent"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Tombol Kembali ke Dashboard khusus mobile, tampil di bawah kalender -->
      <div class="flex sm:hidden justify-center mt-4 mb-2">
        <button @click="goToDashboard" class="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-secondary text-bg rounded-lg transition-all duration-300 font-opensans text-xs">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Kembali ke Beranda Jagat
        </button>
      </div>
      <div class="flex flex-col items-center mt-3 sm:mt-4 mb-2 sm:mb-0">
        <p v-if="notif" :class="notifType === 'success' ? 'text-green-600' : 'text-red-600'" class="text-xs sm:text-sm text-center px-2">{{ notif }}</p>
      </div>
    </div>
    <BottomNav active="home" />
    <Toast v-model="showToast" :message="toastMsg" type="success" icon="✔️" />
    <LoadingIndicator :visible="globalLoading" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import checkinPresenter from '../presenters/checkinPresenter'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import Toast from '../components/Toast.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import { useUserProfile } from '../models/userprofileModel.js'

const router = useRouter()
const today = new Date();
const selectedMonth = ref(today.toISOString().slice(0, 7))
const history = ref([])
const loading = ref(false)
const notif = ref('')
const notifType = ref('success')
const submittingDate = ref("");
const showToast = ref(false)
const toastMsg = ref('')
const globalLoading = ref(false)

const { userProfile, fetchUserProfile } = useUserProfile()

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const monthYearLabel = computed(() => {
  const [year, month] = selectedMonth.value.split('-').map(Number)
  return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })
})

const calendar = computed(() => {
  const [year, month] = selectedMonth.value.split('-').map(Number);
  const firstDay = new Date(Date.UTC(year, month - 1, 1));
  const lastDay = new Date(Date.UTC(year, month, 0));
  const weeks = [];
  let week = new Array(firstDay.getUTCDay()).fill(null);
  for (let d = 1; d <= lastDay.getUTCDate(); d++) {
    const date = new Date(Date.UTC(year, month - 1, d));
    week.push(date);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
});

function isToday(date) {
  const now = new Date();
  return date &&
    date.getUTCFullYear() === now.getUTCFullYear() &&
    date.getUTCMonth() === now.getUTCMonth() &&
    date.getUTCDate() === now.getUTCDate();
}

function isCheckedIn(date) {
  if (!date) return false;
  const dateStr = date.toISOString().slice(0, 10);
  return history.value.includes(dateStr);
}

function isPast(date) {
  if (!date) return false;
  const now = new Date();
  // Bandingkan dalam UTC
  const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const dateUTC = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return dateUTC < nowUTC;
}

function prevMonth() {
  const [year, month] = selectedMonth.value.split('-').map(Number)
  let newYear = year
  let newMonth = month - 1
  if (newMonth < 1) {
    newMonth = 12
    newYear = year - 1
  }
  selectedMonth.value = `${newYear}-${newMonth.toString().padStart(2, '0')}`
}
function nextMonth() {
  const [year, month] = selectedMonth.value.split('-').map(Number)
  let newYear = year
  let newMonth = month + 1
  if (newMonth > 12) {
    newMonth = 1
    newYear = year + 1
  }
  selectedMonth.value = `${newYear}-${newMonth.toString().padStart(2, '0')}`
}
function goToday() {
  selectedMonth.value = today.toISOString().slice(0, 7)
}
function goToDashboard() {
  router.push('/dashboard')
}
async function fetchHistory() {
  loading.value = true
  globalLoading.value = true // Tampilkan loading saat fetch data awal
  notif.value = ''
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token tidak ditemukan, silakan login ulang.')
    const res = await checkinPresenter.getHistoryByMonth(token, selectedMonth.value)
    history.value = res.dates || res.data?.dates || []
  } catch (err) {
    notif.value = err.message || err
    notifType.value = 'error'
  } finally {
    loading.value = false
    globalLoading.value = false // Sembunyikan loading setelah selesai
  }
}
async function handleCheckInForDate(date) {
  // Hanya izinkan check-in untuk hari ini
  if (!isToday(date)) return;
  loading.value = true
  notif.value = ''
  notifType.value = 'success'
  submittingDate.value = date.toISOString().slice(0, 10)
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token tidak ditemukan, silakan login ulang.')
    const res = await checkinPresenter.checkin(token)
    notif.value = res.message || 'Check-in berhasil! +50 poin'
    notifType.value = 'success'
    showToast.value = true
    toastMsg.value = 'Check-in berhasil! +50 poin'
    await fetchHistory()
    await fetchUserProfile(token) // update poin & username setelah checkin
  } catch (err) {
    notif.value = err.message || err
    notifType.value = 'error'
  } finally {
    loading.value = false
    submittingDate.value = ""
  }
}
const isMobile = ref(false);
onMounted(() => {
  isMobile.value = window.innerWidth < 640;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 640;
  });
  fetchUserProfile(localStorage.getItem('token'))
});
onMounted(fetchHistory)
watch(selectedMonth, fetchHistory)
</script>

<style scoped>
/* Jarak antar tombol submit di kalender agar tidak terlalu rapat di mobile */
@media (max-width: 639px) {
  .calendar-cell-btn {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
}
</style>

<!-- Contoh penggunaan globalLoading:
globalLoading.value = true; // sebelum request
globalLoading.value = false; // setelah selesai
Terapkan pada setiap request API utama di page ini. -->

<template>
  <div class="min-h-screen flex flex-col items-center bg-bg pt-28 lg:pt-32" style="font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    <div class="w-full max-w-5xl p-2 sm:p-4 md:p-8 mt-2 sm:mt-4 mb-20 mx-1 sm:mx-4 bg-white rounded-2xl shadow-lg border-2 border-secondary">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div class="flex items-center gap-2">
          <button @click="goToDashboard" class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-primary hover:bg-secondary text-bg rounded-lg transition-all duration-300 transform hover:scale-105 font-opensans text-xs sm:text-sm">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span class="hidden sm:inline">Kembali ke Dashboard</span>
            <span class="sm:hidden">Kembali</span>
          </button>
        </div>
        <div class="flex flex-row items-center gap-2">
          <button @click="prevMonth" :disabled="loading" class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded bg-gray-200 hover:bg-secondary text-primary transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            &lt;
          </button>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-primary text-center whitespace-nowrap px-2">{{ monthYearLabel }}</h2>
          <button @click="nextMonth" :disabled="loading" class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded bg-gray-200 hover:bg-secondary text-primary transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            &gt;
          </button>
        </div>
      </div>
      <div class="overflow-x-auto -mx-1 sm:mx-0">
        <table class="w-full min-w-[350px] sm:min-w-[640px] lg:min-w-[900px] text-center">
          <thead>
            <tr>
              <th v-for="d in days" :key="d" class="py-2 text-sm sm:text-base text-secondary font-medium">{{ d }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, widx) in calendar" :key="widx">
              <td v-for="(date, didx) in week" :key="didx" class="align-top p-1 sm:p-1.5">
                <div v-if="date" class="flex flex-col items-center border rounded-lg p-2 sm:p-3 min-h-[85px] min-w-[45px] sm:min-h-[100px] sm:min-w-[85px] lg:min-h-[120px] lg:min-w-[110px] bg-bg mx-auto"
                  :class="{
                    'bg-green-50 border-green-400': isCheckedIn(date),
                    'bg-yellow-50 border-yellow-400': isToday(date) && !isCheckedIn(date),
                    'bg-red-50 border-red-400': isPast(date) && !isCheckedIn(date)
                  }">
                  <div class="font-bold text-primary text-sm sm:text-base lg:text-lg mb-1">{{ date.getDate() }}</div>
                  <div class="text-xs sm:text-sm text-secondary mb-2 text-center leading-tight">Daily<br class="sm:hidden">check-in</div>
                  <template v-if="isCheckedIn(date)">
                    <button class="border border-green-500 text-green-500 px-1 sm:px-2 py-1 rounded text-[10px] sm:text-xs font-semibold cursor-not-allowed bg-green-100 mt-1" disabled>Submitted</button>
                  </template>
                  <template v-else-if="isToday(date)">
                    <button
                      :disabled="!isToday(date) || loading"
                      @click="isToday(date) ? handleCheckInForDate(date) : null"
                      class="border px-1 sm:px-2 py-1 rounded text-[10px] sm:text-xs font-semibold mt-1 border-blue-500 text-blue-500 hover:bg-blue-100"
                    >
                      <span v-if="loading && submittingDate === date.toISOString().slice(0,10) && isToday(date)">
                        <svg class="animate-spin h-3 w-3 sm:h-4 sm:w-4 mr-1 inline-block text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                        <span class="hidden sm:inline">Loading...</span>
                      </span>
                      <span v-else>Submit</span>
                    </button>
                  </template>
                  <template v-else-if="isPast(date) && !isCheckedIn(date)">
                    <button class="border border-red-500 text-red-500 px-1 sm:px-2 py-1 rounded text-[10px] sm:text-xs font-semibold bg-red-100 cursor-not-allowed mt-1" disabled>Not Submitted</button>
                  </template>
                  <template v-else>
                    <button class="border border-gray-300 text-gray-400 px-1 sm:px-2 py-1 rounded text-[10px] sm:text-xs font-semibold bg-gray-100 cursor-not-allowed mt-1" disabled>Submit</button>
                  </template>
                </div>
                <div v-else class="min-h-[70px] min-w-[40px] sm:min-h-[90px] sm:min-w-[80px] lg:min-h-[120px] lg:min-w-[110px] bg-transparent"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col items-center mt-4">
        <p v-if="notif" :class="notifType === 'success' ? 'text-green-600' : 'text-red-600'" class="text-xs sm:text-sm text-center px-2">{{ notif }}</p>
      </div>
    </div>
    <BottomNav active="home" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import checkinPresenter from '../presenters/checkinPresenter'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'

const router = useRouter()
const today = new Date();
const selectedMonth = ref(today.toISOString().slice(0, 7))
const history = ref([])
const loading = ref(false)
const notif = ref('')
const notifType = ref('success')
const submittingDate = ref("");

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
    notif.value = res.message || 'Check-in berhasil!'
    notifType.value = 'success'
    await fetchHistory()
  } catch (err) {
    notif.value = err.message || err
    notifType.value = 'error'
  } finally {
    loading.value = false
    submittingDate.value = ""
  }
}
onMounted(fetchHistory)
watch(selectedMonth, fetchHistory)
</script>

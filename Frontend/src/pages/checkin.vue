<template>
  <div class="min-h-screen flex flex-col items-center bg-bg" style="font-family: 'Poppins', 'Inter', sans-serif;">
    <div class="w-full max-w-5xl p-2 sm:p-4 md:p-8 mt-4 sm:mt-6 mb-16 bg-white rounded-2xl shadow-lg border-2 border-secondary">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div class="flex flex-row items-center gap-2">
          <button @click="prevMonth" class="px-3 py-1 rounded bg-gray-200 hover:bg-secondary text-primary font-bold">&lt;</button>
          <h2 class="text-xl sm:text-2xl font-bold text-primary text-center">{{ monthYearLabel }}</h2>
          <button @click="nextMonth" class="px-3 py-1 rounded bg-gray-200 hover:bg-secondary text-primary font-bold">&gt;</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px] text-center">
          <thead>
            <tr>
              <th v-for="d in days" :key="d" class="py-1 text-xs text-secondary">{{ d }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, widx) in calendar" :key="widx">
              <td v-for="(date, didx) in week" :key="didx" class="align-top p-1">
                <div v-if="date" class="flex flex-col items-center border rounded-lg p-2 min-h-[90px] min-w-[110px] sm:min-h-[120px] sm:min-w-[120px] bg-bg mx-auto"
                  :class="{
                    'bg-green-50 border-green-400': isCheckedIn(date),
                    'bg-yellow-50 border-yellow-400': isToday(date) && !isCheckedIn(date),
                    'bg-red-50 border-red-400': isPast(date) && !isCheckedIn(date)
                  }">
                  <div class="font-bold text-primary text-sm sm:text-base">{{ date.getDate() }}</div>
                  <div class="text-xs text-secondary mb-1">Daily check-in</div>
                  <template v-if="isCheckedIn(date)">
                    <button class="border border-green-500 text-green-500 px-2 py-1 rounded text-xs font-semibold cursor-not-allowed bg-green-100 mt-1" disabled>Submitted</button>
                  </template>
                  <template v-else-if="isToday(date)">
                    <button
                      :disabled="!isToday(date) || loading"
                      @click="isToday(date) ? handleCheckInForDate(date) : null"
                      class="border px-2 py-1 rounded text-xs font-semibold mt-1 border-blue-500 text-blue-500 hover:bg-blue-100"
                    >
                      <span v-if="loading && submittingDate === date.toISOString().slice(0,10) && isToday(date)">
                        <svg class="animate-spin h-4 w-4 mr-1 inline-block text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                        Loading...
                      </span>
                      <span v-else>Submit</span>
                    </button>
                  </template>
                  <template v-else-if="isPast(date) && !isCheckedIn(date)">
                    <button class="border border-red-500 text-red-500 px-2 py-1 rounded text-xs font-semibold bg-red-100 cursor-not-allowed mt-1" disabled>Not Submitted</button>
                  </template>
                  <template v-else>
                    <button class="border border-gray-300 text-gray-400 px-2 py-1 rounded text-xs font-semibold bg-gray-100 cursor-not-allowed mt-1" disabled>Submit</button>
                  </template>
                </div>
                <div v-else class="min-h-[90px] min-w-[110px] sm:min-h-[120px] sm:min-w-[120px] bg-transparent"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col items-center mt-4">
        <p v-if="notif" :class="notifType === 'success' ? 'text-green-600' : 'text-red-600'" class="text-sm">{{ notif }}</p>
      </div>
    </div>
    <BottomNav active="home" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import checkinPresenter from '../presenters/checkinPresenter'
import BottomNav from '../components/BottomNav.vue'

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
  const prev = new Date(year, month - 2, 1)
  selectedMonth.value = prev.toISOString().slice(0, 7)
}
function nextMonth() {
  const [year, month] = selectedMonth.value.split('-').map(Number)
  const next = new Date(year, month, 1)
  selectedMonth.value = next.toISOString().slice(0, 7)
}
function goToday() {
  selectedMonth.value = today.toISOString().slice(0, 7)
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

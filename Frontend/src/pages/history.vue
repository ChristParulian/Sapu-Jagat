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
      <h1 class="text-3xl font-bold mb-2 text-primary">Riwayat</h1>
      <div v-if="loading" class="text-secondary text-lg">Loading...</div>
      <div v-else-if="error" class="text-red-500 text-lg">{{ error }}</div>
      <ul v-else-if="history.length > 0" class="mt-4 w-full max-w-md">
        <li v-for="date in history" :key="date" class="py-2 px-4 border-b border-secondary text-primary font-semibold">{{ date }}</li>
      </ul>
      <p v-else class="text-secondary text-lg">Belum ada riwayat.</p>
    </div>
    <BottomNav active="history" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import checkinPresenter from '../presenters/checkinPresenter'

const router = useRouter()
const history = ref([])
const loading = ref(true)
const error = ref('')

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

const fetchHistory = async () => {
  loading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token tidak ditemukan, silakan login ulang.')
    const res = await checkinPresenter.getHistory(token)
    history.value = res.data.history || []
  } catch (err) {
    error.value = err.message || err
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHistory()
})
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Removed duplicate greeting and points display here -->
    <!-- Header Component -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8 flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-2 text-primary">Tukar Poin</h1>
      <p class="text-secondary text-lg mb-6">Tukar poin Anda dengan hadiah menarik!</p>
      <!-- Total Poin -->
      <div class="mb-8 flex items-center justify-center">
        <div class="bg-white rounded-xl shadow px-6 py-3 flex items-center gap-2 border-2 border-[#a7c957]">
          <span class="inline-flex items-center justify-center w-7 h-7">
            <svg class="w-7 h-7 text-[#a7c957]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9.5"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.5 9.5c0-.8-.7-1.5-2.5-1.5s-2.5.7-2.5 1.5.7 1.5 2.5 1.5"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 14.5C9.5 15.3 10.2 16 12 16s2.5-.7 2.5-1.5-1.3-1.5-2.5-1.5"/>
            </svg>
          </span>
          <span class="text-xl font-bold text-[#386641]">{{ totalPoin.toLocaleString('id-ID') }}</span>
          <span class="text-base font-semibold text-[#b7b7a4]">Total Poin</span>
        </div>
      </div>
      <p class="text-secondary text-lg mb-6">Pilih metode penukaran poin Anda:</p>
      <!-- Pilihan Redeem dengan Tombol -->
      <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10 w-full max-w-2xl justify-center">
        <button class="btn-redeem flex-1 min-w-[140px]" @click="openModal('ewallet')">E-Wallet</button>
        <button class="btn-redeem flex-1 min-w-[140px]" @click="openModal('pulsa')">Pulsa</button>
        <button class="btn-redeem flex-1 min-w-[140px]" @click="openModal('token')">Token Listrik</button>
      </div>
      <!-- Modal E-Wallet -->
      <div v-if="showModal === 'ewallet'" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-1 sm:px-2">
        <div class="bg-white rounded-xl shadow-lg p-3 sm:p-6 w-[95vw] max-w-xs sm:max-w-md relative overflow-y-auto max-h-[90vh]">
          <button class="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-700 text-2xl w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full" @click="closeModal" aria-label="Tutup">&times;</button>
          <h2 class="text-lg sm:text-xl font-bold mb-4 text-primary text-center">Redeem E-Wallet</h2>
          <div class="mb-2 text-sm text-gray-600 text-center">Sisa Poin Anda: <span class="font-bold text-[#386641]">{{ totalPoin.toLocaleString('id-ID') }}</span></div>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Pilih E-Wallet</label>
            <select v-model="selectedEwallet" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
              <option disabled value="">-- Pilih E-Wallet --</option>
              <option value="dana">DANA</option>
              <option value="ovo">OVO</option>
              <option value="gopay">GoPay</option>
              <option value="shopeepay">ShopeePay</option>
            </select>
          </div>
          <div v-if="selectedEwallet" class="mb-4">
            <label class="block text-gray-600 mb-2">Nomor E-Wallet</label>
            <input v-model="ewalletNumber" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="20" placeholder="Masukkan nomor e-wallet" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
          </div>
          <div v-if="selectedEwallet" class="mb-4">
            <label class="block text-gray-600 mb-2">Nominal E-Wallet</label>
            <select v-model="selectedEwalletNominal" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
              <option disabled value="">-- Pilih Nominal --</option>
              <option v-for="nom in ewalletNominals" :key="nom.value" :value="nom.value" :disabled="totalPoin < nom.point">
                {{ nom.label }} ({{ nom.point }} poin) <span v-if="totalPoin < nom.point">- Poin tidak cukup</span>
              </option>
            </select>
          </div>
          <div v-if="selectedEwallet" class="flex items-center justify-center mt-2">
            <img :src="ewalletLogos[selectedEwallet]" alt="Logo E-Wallet" class="w-14 h-14 sm:w-20 sm:h-20 object-contain" />
          </div>
          <button v-if="selectedEwallet && selectedEwalletNominal" @click.stop="handleRedeem('ewallet')" class="btn-redeem mt-6 w-full bg-[#626F47] hover:bg-[#4e593a] border-none" :disabled="totalPoin < (ewalletNominals.find(n => n.value === selectedEwalletNominal)?.point || 0)">Tukar E-Wallet</button>
        </div>
      </div>
      <!-- Modal Pulsa -->
      <div v-if="showModal === 'pulsa'" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-1 sm:px-2">
        <div class="bg-white rounded-xl shadow-lg p-3 sm:p-6 w-[95vw] max-w-xs sm:max-w-md relative overflow-y-auto max-h-[90vh]">
          <button class="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-700 text-2xl w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full" @click="closeModal" aria-label="Tutup">&times;</button>
          <h2 class="text-lg sm:text-xl font-bold mb-4 text-primary text-center">Redeem Pulsa</h2>
          <div class="mb-2 text-sm text-gray-600 text-center">Sisa Poin Anda: <span class="font-bold text-[#386641]">{{ totalPoin.toLocaleString('id-ID') }}</span></div>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Pilih Provider</label>
            <select v-model="selectedPulsaProvider" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
              <option disabled value="">-- Pilih Provider --</option>
              <option v-for="prov in pulsaProviders" :key="prov.value" :value="prov.value">{{ prov.label }}</option>
            </select>
          </div>
          <div v-if="selectedPulsaProvider" class="mb-4">
            <label class="block text-gray-600 mb-2">Nomor HP</label>
            <input v-model="pulsaNumber" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="15" placeholder="Masukkan nomor HP" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
          </div>
          <div v-if="selectedPulsaProvider" class="mb-4">
            <label class="block text-gray-600 mb-2">Nominal Pulsa</label>
            <select v-model="selectedPulsaNominal" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
              <option disabled value="">-- Pilih Nominal --</option>
              <option v-for="nom in pulsaNominals" :key="nom.value" :value="nom.value" :disabled="totalPoin < nom.point">
                {{ nom.label }} ({{ nom.point }} poin) <span v-if="totalPoin < nom.point">- Poin tidak cukup</span>
              </option>
            </select>
          </div>
          <div v-if="selectedPulsaProvider" class="flex items-center justify-center mt-2">
            <img :src="pulsaProviderLogos[selectedPulsaProvider]" alt="Logo Provider" class="w-14 h-14 sm:w-20 sm:h-20 object-contain" />
          </div>
          <button v-if="selectedPulsaProvider && selectedPulsaNominal" @click.stop="handleRedeem('pulsa')" class="btn-redeem mt-6 w-full bg-[#626F47] hover:bg-[#4e593a] border-none" :disabled="totalPoin < (pulsaNominals.find(n => n.value === selectedPulsaNominal)?.point || 0)">Tukar Pulsa</button>
        </div>
      </div>
      <!-- Modal Token Listrik -->
      <div v-if="showModal === 'token'" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-1 sm:px-2">
        <div class="bg-white rounded-xl shadow-lg p-3 sm:p-6 w-[95vw] max-w-xs sm:max-w-md relative overflow-y-auto max-h-[90vh]">
          <button class="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-700 text-2xl w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full" @click="closeModal" aria-label="Tutup">&times;</button>
          <h2 class="text-lg sm:text-xl font-bold mb-4 text-primary text-center">Redeem Token Listrik</h2>
          <div class="mb-2 text-sm text-gray-600 text-center">Sisa Poin Anda: <span class="font-bold text-[#386641]">{{ totalPoin.toLocaleString('id-ID') }}</span></div>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Nominal Token</label>
            <select v-model="selectedTokenNominal" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
              <option disabled value="">-- Pilih Nominal --</option>
              <option v-for="nom in tokenNominals" :key="nom.value" :value="nom.value" :disabled="totalPoin < nom.point">
                {{ nom.label }} ({{ nom.point }} poin) <span v-if="totalPoin < nom.point">- Poin tidak cukup</span>
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">Nomor Meter/kWh</label>
            <input v-model="tokenNumber" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="20" minlength="20" placeholder="Masukkan nomor meter/kWh (20 digit)" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
          </div>
          <div class="flex items-center justify-center mt-2">
            <img src="/logo/token-listrik/pln.png" alt="Logo PLN" class="w-14 h-14 sm:w-20 sm:h-20 object-contain" />
          </div>
          <button v-if="selectedTokenNominal" @click.stop="handleRedeem('token')" class="btn-redeem mt-6 w-full bg-[#626F47] hover:bg-[#4e593a] border-none" :disabled="totalPoin < (tokenNominals.find(n => n.value === selectedTokenNominal)?.point || 0)">Tukar Token Listrik</button>
        </div>
      </div>
      <!-- History Penukaran -->
      <div class="w-full max-w-3xl mb-10">
        <div class="bg-white rounded-xl shadow p-5 border border-[#b7b7a4]">
          <h3 class="text-lg font-bold text-[#386641] mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#a7c957]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9.5"/></svg>
            Riwayat Penukaran
          </h3>
          <ul>
            <li v-if="redeemLoading" class="text-gray-400 text-center py-4">Memuat riwayat penukaran...</li>
            <li v-else-if="redeemError" class="text-red-500 text-center py-4">{{ redeemError }}</li>
            <li v-else-if="mappedHistory.length === 0" class="text-gray-400 text-center py-4">Belum ada riwayat penukaran.</li>
            <li v-for="(item, idx) in mappedHistory" :key="idx" class="flex justify-between items-center py-2 border-b last:border-b-0">
              <span class="font-medium text-gray-700">{{ item.tipe }} - {{ item.nominal }}</span>
              <span class="text-sm text-gray-500">{{ item.tanggal }}</span>
              <span class="text-sm font-semibold text-[#a7c957]">-{{ item.poin }} poin</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <LoadingIndicator :visible="globalLoading" :message="globalLoadingMsg" />
    <BottomNav active="redeem" />
    <Toast v-model="showToast" :message="toastMsg" :type="toastType" :icon="toastIcon" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import Toast from '../components/Toast.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import { ref, onMounted, computed } from 'vue'
import { useUserProfile } from '../models/userprofileModel.js'
import { redeem, getRedeemHistory } from '../services/api.js'

const router = useRouter()

const selectedEwallet = ref('')
const selectedEwalletNominal = ref('')
const selectedPulsaNominal = ref('')
const selectedPulsaProvider = ref('')
const selectedTokenNominal = ref('')
const ewalletNumber = ref('')
const pulsaNumber = ref('')
const tokenNumber = ref('')
const dummyHistory = ref([])

// Modal logic
const showModal = ref('')
function openModal(type) {
  showModal.value = type
}
function closeModal() {
  showModal.value = ''
  // Reset pilihan saat modal ditutup
  selectedEwallet.value = ''
  selectedEwalletNominal.value = ''
  selectedPulsaProvider.value = ''
  selectedPulsaNominal.value = ''
  selectedTokenNominal.value = ''
  ewalletNumber.value = ''
  pulsaNumber.value = ''
  tokenNumber.value = ''
}

const ewalletLogos = {
  dana: '/logo/e-wallet/dana.png',
  ovo: '/logo/e-wallet/ovo.png',
  gopay: '/logo/e-wallet/gopay.png',
  shopeepay: '/logo/e-wallet/shopeepay.png',
}

const ewalletNominals = [
  { value: '5.000', label: '5.000', point: 500 },
  { value: '10.000', label: '10.000', point: 900 },
  { value: '20.000', label: '20.000', point: 1700 },
  { value: '50.000', label: '50.000', point: 4000 },
  { value: '100.000', label: '100.000', point: 7500 },
]
const pulsaNominals = [
  { value: '5.000', label: '5.000', point: 600 },
  { value: '10.000', label: '10.000', point: 1100 },
  { value: '20.000', label: '20.000', point: 2000 },
  { value: '50.000', label: '50.000', point: 4800 },
  { value: '100.000', label: '100.000', point: 9000 },
]
const pulsaProviders = [
  { value: 'telkomsel', label: 'Telkomsel' },
  { value: 'indosat', label: 'Indosat' },
  { value: 'xl', label: 'XL' },
  { value: 'axis', label: 'Axis' },
  { value: 'tri', label: 'Tri' },
  { value: 'smartfren', label: 'Smartfren' },
]
const pulsaProviderLogos = {
  telkomsel: ' /logo/provider/telkomsel.png',
  indosat: ' /logo/provider/indosat.png',
  xl: ' /logo/provider/xl.png',
  axis: ' /logo/provider/axis.png',
  tri: ' /logo/provider/3.png',
  smartfren: ' /logo/provider/smartfren.png',
}
const tokenNominals = [
  { value: '5.000', label: '5.000', point: 700 },
  { value: '10.000', label: '10.000', point: 1300 },
  { value: '20.000', label: '20.000', point: 2500 },
  { value: '50.000', label: '50.000', point: 6000 },
  { value: '100.000', label: '100.000', point: 11000 },
]

const showToast = ref(false)
const toastMsg = ref('')
// Tambahkan state untuk type dan icon toast
const toastType = ref('success')
const toastIcon = ref('✔️')

// Total poin statis
const { userProfile, fetchUserProfile } = useUserProfile()

const totalPoin = computed(() => userProfile.value?.points ?? 0)

// Riwayat redeem
const redeemHistory = ref([])
const redeemLoading = ref(false)
const redeemError = ref('')

async function fetchRedeemHistory() {
  globalLoading.value = true
  globalLoadingMsg.value = 'Memuat riwayat penukaran...'
  redeemLoading.value = true
  redeemError.value = ''
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Sesi login habis, silakan login ulang.')
    const data = await getRedeemHistory(token)
    redeemHistory.value = Array.isArray(data) ? data : []
  } catch (err) {
    redeemError.value = err?.message || 'Gagal mengambil riwayat penukaran.'
    redeemHistory.value = []
  } finally {
    redeemLoading.value = false
    globalLoading.value = false
    globalLoadingMsg.value = ''
  }
}

onMounted(() => {
  fetchUserProfile(localStorage.getItem('token'))
  fetchRedeemHistory()
})

// Gantikan dummyHistory dengan computed yang memetakan redeemHistory
const mappedHistory = computed(() => {
  return redeemHistory.value.map(item => ({
    tipe: item.type === 'ewallet' ? `E-Wallet (${item.provider || '-'})` : item.type === 'pulsa' ? `Pulsa (${item.provider || '-'})` : 'Token Listrik',
    nominal: item.amount ? `Rp${item.amount.toLocaleString('id-ID')}` : '-',
    tanggal: item.date || (item.created_at ? item.created_at.slice(0,10) : '-'),
    poin: item.points || '-',
    status: item.status || 'success',
  }))
})

const globalLoading = ref(false)
const globalLoadingMsg = ref('')

async function handleRedeem(type) {
  let token = localStorage.getItem('token')
  if (!token || token === 'null' || token === 'undefined') {
    showToast.value = true
    toastType.value = 'error'
    toastIcon.value = '❗'
    toastMsg.value = 'Sesi login habis, silakan login ulang.'
    setTimeout(() => router.push('/login'), 1500)
    return
  }
  token = token.trim()
  if (!/^eyJ/.test(token)) { // JWT harus diawali eyJ
    showToast.value = true
    toastType.value = 'error'
    toastIcon.value = '❗'
    toastMsg.value = 'Token tidak valid, silakan login ulang.'
    setTimeout(() => router.push('/login'), 1500)
    return
  }
  let payload = {}
  if (type === 'ewallet') {
    const selected = ewalletNominals.find(n => n.value === selectedEwalletNominal.value)
    const amount = Number(selectedEwalletNominal.value.replace(/\./g, ''))
    const points = Number(selected ? selected.point : 0)
    if (!selectedEwallet.value || !ewalletNumber.value || !amount || !points || isNaN(amount) || isNaN(points)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Data e-wallet tidak lengkap atau tidak valid!'
      return
    }
    payload = {
      type: 'ewallet',
      provider: selectedEwallet.value,
      amount,
      points,
      target: ewalletNumber.value
    }
  } else if (type === 'pulsa') {
    const selected = pulsaNominals.find(n => n.value === selectedPulsaNominal.value)
    const amount = Number(selectedPulsaNominal.value.replace(/\./g, ''))
    const points = Number(selected ? selected.point : 0)
    if (!selectedPulsaProvider.value || !pulsaNumber.value || !amount || !points || isNaN(amount) || isNaN(points)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Data pulsa tidak lengkap atau tidak valid!'
      return
    }
    payload = {
      type: 'pulsa',
      provider: selectedPulsaProvider.value,
      amount,
      points,
      target: pulsaNumber.value
    }
  } else if (type === 'token') {
    if (!/^\d{20}$/.test(tokenNumber.value)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Nomor meter/kWh harus 20 digit angka!'
      return
    }
    const selected = tokenNominals.find(n => n.value === selectedTokenNominal.value)
    const amount = Number(selectedTokenNominal.value.replace(/\./g, ''))
    const points = Number(selected ? selected.point : 0)
    if (!amount || !points || isNaN(amount) || isNaN(points)) {
      showToast.value = true
      toastType.value = 'error'
      toastIcon.value = '❗'
      toastMsg.value = 'Data token listrik tidak lengkap atau tidak valid!'
      return
    }
    payload = {
      type: 'token',
      provider: '', // provider harus selalu ada sesuai handler backend
      amount,
      points,
      target: tokenNumber.value
    }
  }
  // Tidak perlu hapus field provider, selalu ada (string kosong jika token listrik)
  // Debug log payload dan tipe data
  console.log('Payload redeem:', payload, JSON.stringify(payload), {
    type: typeof payload.type,
    provider: typeof payload.provider,
    amount: typeof payload.amount,
    points: typeof payload.points,
    target: typeof payload.target,
  })
  globalLoading.value = true
  globalLoadingMsg.value = 'Memproses penukaran...'
  try {
    await redeem(payload, token)
    showToast.value = true
    toastType.value = 'success'
    toastIcon.value = '✔️'
    toastMsg.value = 'Redeem berhasil!'
    await fetchUserProfile(token)
    await fetchRedeemHistory() // refresh riwayat setelah redeem
    closeModal()
  } catch (err) {
    let msg = err?.response?.data?.message || err?.message || 'Redeem gagal!'
    // Jika error karena token, redirect ke login
    if (msg.toLowerCase().includes('token')) {
      toastMsg.value = 'Sesi login habis/invalid, silakan login ulang.'
      setTimeout(() => router.push('/login'), 1800)
    } else {
      toastMsg.value = msg
    }
    showToast.value = true
    toastType.value = 'error'
    toastIcon.value = '❗'
    console.error('Redeem error:', err?.response || err)
  } finally {
    globalLoading.value = false
    globalLoadingMsg.value = ''
  }
}
</script>

<style scoped>
.neumorphic-card {
  background: #FEFAE0;
  border-radius: 20px;
  box-shadow:
    20px 20px 40px rgba(196, 165, 132, 0.18),
    -20px -20px 40px rgba(255, 255, 255, 0.8);
  transition: all 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.18s cubic-bezier(.4,2,.3,1), outline 0.18s;
  border: none;
  will-change: transform, box-shadow;
}

.neumorphic-card:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow:
    25px 25px 50px rgba(196, 165, 132, 0.22),
    -25px -25px 50px rgba(255, 255, 255, 0.92);
}

.neumorphic-card:active {
  transform: scale(0.97) translateY(2px);
  box-shadow:
    10px 10px 20px rgba(196, 165, 132, 0.12),
    -10px -10px 20px rgba(255, 255, 255, 0.7),
    inset 5px 5px 10px rgba(196, 165, 132, 0.13),
    inset -5px -5px 10px rgba(255, 255, 255, 0.8);
}

.neumorphic-card.selected {
  outline: 3px solid #a7c957;
  box-shadow:
    0 8px 24px rgba(106, 153, 78, 0.18),
    0 2px 4px rgba(255, 255, 255, 0.9),
    0 0 0 6px rgba(167, 201, 87, 0.12);
  transform: scale(1.045);
}

.active-card {
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 2px 4px rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

h2 {
  color: #386641;
  letter-spacing: 0.5px;
}

label {
  color: #6c757d;
  font-weight: 600;
}

select {
  background: #fffbe6;
  color: #386641;
  border: 1.5px solid #b7b7a4;
  font-weight: 500;
}

option {
  color: #386641;
}

/* Custom text color classes */
.text-primary {
  color: #386641;
}
.text-secondary {
  color: #b7b7a4;
}

/* Button style for future use */
.btn-redeem {
  background: linear-gradient(90deg, #6a994e 0%, #a7c957 100%);
  color: #fff;
  font-weight: 700;
  border-radius: 10px;
  padding: 0.75rem 2rem;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(106,153,78,0.08);
}
.btn-redeem:hover {
  background: linear-gradient(90deg, #a7c957 0%, #6a994e 100%);
  transform: translateY(-2px) scale(1.04);
}
</style>

<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8 flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-2 text-primary">Tukar Poin</h1>
      <p class="text-secondary text-lg mb-6">Pilih metode penukaran poin Anda:</p>
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
      <!-- History Penukaran -->
      <div class="w-full max-w-3xl mb-10">
        <div class="bg-white rounded-xl shadow p-5 border border-[#b7b7a4]">
          <h3 class="text-lg font-bold text-[#386641] mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#a7c957]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9.5"/></svg>
            Riwayat Penukaran
          </h3>
          <ul>
            <li v-for="(item, idx) in dummyHistory" :key="idx" class="flex justify-between items-center py-2 border-b last:border-b-0">
              <span class="font-medium text-gray-700">{{ item.tipe }} - {{ item.nominal }}</span>
              <span class="text-sm text-gray-500">{{ item.tanggal }}</span>
              <span class="text-sm font-semibold text-[#a7c957]">-{{ item.poin }} poin</span>
            </li>
            <li v-if="dummyHistory.length === 0" class="text-gray-400 text-center py-4">Belum ada riwayat penukaran.</li>
          </ul>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <!-- Card Redeem E-Wallet -->
        <div
          class="neumorphic-card p-6 flex flex-col items-center cursor-pointer"
          :class="[{'opacity-100': activeRedeem === 'ewallet', 'opacity-60': activeRedeem && activeRedeem !== 'ewallet'}, activeRedeem === 'ewallet' ? 'selected' : '']"
          @click.self="setActiveRedeem('ewallet')"
        >
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Redeem E-Wallet</h2>
          <div class="w-full mb-4">
            <label class="block text-gray-600 mb-2">Pilih E-Wallet</label>
            <select v-model="selectedEwallet"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              :disabled="activeRedeem !== 'ewallet'">
              <option disabled value="">-- Pilih E-Wallet --</option>
              <option value="dana">DANA</option>
              <option value="ovo">OVO</option>
              <option value="gopay">GoPay</option>
              <option value="shopeepay">ShopeePay</option>
            </select>
          </div>
          <div v-if="selectedEwallet" class="w-full mb-4">
            <label class="block text-gray-600 mb-2">Nominal E-Wallet</label>
            <select v-model="selectedEwalletNominal"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              :disabled="activeRedeem !== 'ewallet'">
              <option disabled value="">-- Pilih Nominal --</option>
              <option v-for="nom in ewalletNominals" :key="nom.value" :value="nom.value">
                {{ nom.label }} ({{ nom.point }} poin)
              </option>
            </select>
          </div>
          <div v-if="selectedEwallet" class="flex items-center justify-center mt-2">
            <img :src="ewalletLogos[selectedEwallet]" alt="Logo E-Wallet" class="w-24 h-24 object-contain" />
          </div>
          <button v-if="selectedEwallet && selectedEwalletNominal" @click.stop="handleRedeem('ewallet')" class="btn-redeem mt-4 w-full" :disabled="activeRedeem !== 'ewallet'">Tukar E-Wallet</button>
        </div>
        <!-- Card Redeem Pulsa -->
        <div
          class="neumorphic-card p-6 flex flex-col items-center cursor-pointer"
          :class="[{'opacity-100': activeRedeem === 'pulsa', 'opacity-60': activeRedeem && activeRedeem !== 'pulsa'}, activeRedeem === 'pulsa' ? 'selected' : '']"
          @click.self="setActiveRedeem('pulsa')"
        >
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Redeem Pulsa</h2>
          <div class="w-full mb-4">
            <label class="block text-gray-600 mb-2">Pilih Provider</label>
            <select v-model="selectedPulsaProvider"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              :disabled="activeRedeem && activeRedeem !== 'pulsa'">
              <option disabled value="">-- Pilih Provider --</option>
              <option v-for="prov in pulsaProviders" :key="prov.value" :value="prov.value">{{ prov.label }}</option>
            </select>
          </div>
          <div v-if="selectedPulsaProvider" class="w-full mb-4">
            <label class="block text-gray-600 mb-2">Nominal Pulsa</label>
            <select v-model="selectedPulsaNominal"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              :disabled="activeRedeem && activeRedeem !== 'pulsa'">
              <option disabled value="">-- Pilih Nominal --</option>
              <option v-for="nom in pulsaNominals" :key="nom.value" :value="nom.value">
                {{ nom.label }} ({{ nom.point }} poin)
              </option>
            </select>
          </div>
          <div v-if="selectedPulsaProvider" class="flex items-center justify-center mt-2">
            <img :src="pulsaProviderLogos[selectedPulsaProvider]" alt="Logo Provider" class="w-24 h-24 object-contain" />
          </div>
          <button v-if="selectedPulsaProvider && selectedPulsaNominal" @click.stop="handleRedeem('pulsa')" class="btn-redeem mt-4 w-full" :disabled="activeRedeem !== 'pulsa'">Tukar Pulsa</button>
        </div>
        <!-- Card Redeem Token Listrik -->
        <div
          class="neumorphic-card p-6 flex flex-col items-center cursor-pointer"
          :class="[{'opacity-100': activeRedeem === 'token', 'opacity-60': activeRedeem && activeRedeem !== 'token'}, activeRedeem === 'token' ? 'selected' : '']"
          @click.self="setActiveRedeem('token')"
        >
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Redeem Token Listrik</h2>
          <div class="w-full mb-4">
            <label class="block text-gray-600 mb-2">Nominal Token</label>
            <select v-model="selectedTokenNominal"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              :disabled="activeRedeem && activeRedeem !== 'token'">
              <option disabled value="">-- Pilih Nominal --</option>
              <option v-for="nom in tokenNominals" :key="nom.value" :value="nom.value">
                {{ nom.label }} ({{ nom.point }} poin)
              </option>
            </select>
          </div>
          <div class="flex items-center justify-center mt-2">
            <img src="/logo/token-listrik/pln.png" alt="Logo PLN" class="w-24 h-24 object-contain" />
          </div>
          <button v-if="selectedTokenNominal" @click.stop="handleRedeem('token')" class="btn-redeem mt-4 w-full" :disabled="activeRedeem !== 'token'">Tukar Token Listrik</button>
        </div>
      </div>
    </div>
    <BottomNav active="redeem" />
    <Toast v-model="showToast" :message="toastMsg" :type="toastType" :icon="toastIcon" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import Toast from '../components/Toast.vue'
import { ref } from 'vue'

const router = useRouter()

const selectedEwallet = ref('')
const selectedEwalletNominal = ref('')
const selectedPulsaNominal = ref('')
const selectedPulsaProvider = ref('')
const selectedTokenNominal = ref('')

// State untuk mengatur card yang aktif
const activeRedeem = ref('')

function setActiveRedeem(card) {
  activeRedeem.value = activeRedeem.value === card ? '' : card
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
const totalPoin = 2500

// Dummy data history, nanti diganti API
const dummyHistory = [
  { tipe: 'E-Wallet (OVO)', nominal: '10.000', poin: 900, tanggal: '2025-06-01' },
  { tipe: 'Pulsa (Telkomsel)', nominal: '5.000', poin: 600, tanggal: '2025-05-28' },
  { tipe: 'Token Listrik', nominal: '20.000', poin: 2500, tanggal: '2025-05-20' },
]

function handleRedeem(type) {
  // Validasi: hanya kartu aktif yang bisa redeem
  if (activeRedeem.value !== type) {
    showToast.value = true
    toastMsg.value = 'Silakan pilih kartu yang ingin diredeem terlebih dahulu.'
    toastType.value = 'error'
    toastIcon.value = '❗'
    return
  }
  // Ambil point yang dibutuhkan sesuai pilihan
  let requiredPoint = 0;
  if (type === 'ewallet') {
    const nominal = ewalletNominals.find(n => n.value === selectedEwalletNominal.value);
    requiredPoint = nominal ? nominal.point : 0;
  }
  if (type === 'pulsa') {
    const nominal = pulsaNominals.find(n => n.value === selectedPulsaNominal.value);
    requiredPoint = nominal ? nominal.point : 0;
  }
  if (type === 'token') {
    const nominal = tokenNominals.find(n => n.value === selectedTokenNominal.value);
    requiredPoint = nominal ? nominal.point : 0;
  }
  // Validasi point cukup
  if (requiredPoint > totalPoin) {
    showToast.value = true;
    toastMsg.value = 'Point kurang, ayo perbanyak pilah sampah!';
    toastType.value = 'error';
    toastIcon.value = '❗';
    return;
  }
  // Validasi sederhana, bisa dikembangkan sesuai kebutuhan
  showToast.value = true
  toastType.value = 'success'
  toastIcon.value = '✔️'
  if (type === 'ewallet') toastMsg.value = 'Redeem e-wallet berhasil!'
  if (type === 'pulsa') toastMsg.value = 'Redeem pulsa berhasil!'
  if (type === 'token') toastMsg.value = 'Redeem token listrik berhasil!'
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

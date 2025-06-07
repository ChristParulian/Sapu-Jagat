<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8 flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-2 text-primary">Tukar Poin</h1>
      <p class="text-secondary text-lg mb-6">Pilih metode penukaran poin Anda:</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <!-- Card Redeem E-Wallet -->
        <div
          class="neumorphic-card p-6 flex flex-col items-center cursor-pointer"
          :class="{ 'opacity-100': activeRedeem === 'ewallet', 'opacity-60': activeRedeem && activeRedeem !== 'ewallet' }"
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
            <img :src="ewalletLogos[selectedEwallet]" alt="Logo E-Wallet" class="w-16 h-16 object-contain" />
          </div>
          <button v-if="selectedEwallet && selectedEwalletNominal" @click.stop="handleRedeem('ewallet')" class="btn-redeem mt-4 w-full">Tukar E-Wallet</button>
        </div>
        <!-- Card Redeem Pulsa -->
        <div
          class="neumorphic-card p-6 flex flex-col items-center cursor-pointer"
          :class="{ 'opacity-100': activeRedeem === 'pulsa', 'opacity-60': activeRedeem && activeRedeem !== 'pulsa' }"
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
            <img :src="pulsaProviderLogos[selectedPulsaProvider]" alt="Logo Provider" class="w-16 h-16 object-contain" />
          </div>
          <button v-if="selectedPulsaProvider && selectedPulsaNominal" @click.stop="handleRedeem('pulsa')" class="btn-redeem mt-4 w-full">Tukar Pulsa</button>
        </div>
        <!-- Card Redeem Token Listrik -->
        <div
          class="neumorphic-card p-6 flex flex-col items-center cursor-pointer"
          :class="{ 'opacity-100': activeRedeem === 'token', 'opacity-60': activeRedeem && activeRedeem !== 'token' }"
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
            <!-- <img src="/logo/pln.png" alt="Logo PLN" class="w-16 h-16 object-contain" /> -->
          </div>
          <button v-if="selectedTokenNominal" @click.stop="handleRedeem('token')" class="btn-redeem mt-4 w-full">Tukar Token Listrik</button>
        </div>
      </div>
    </div>
    <BottomNav active="redeem" />
    <Toast v-model="showToast" :message="toastMsg" type="success" icon="✔️" />
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
  dana: '// /logo/dana.png',
  ovo: '// /logo/ovo.png',
  gopay: '// /logo/gopay.png',
  shopeepay: '// /logo/shopeepay.png',
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
  telkomsel: '// /logo/telkomsel.png',
  indosat: '// /logo/indosat.png',
  xl: '// /logo/xl.png',
  axis: '// /logo/axis.png',
  tri: '// /logo/tri.png',
  smartfren: '// /logo/smartfren.png',
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

function handleRedeem(type) {
  // Validasi sederhana, bisa dikembangkan sesuai kebutuhan
  showToast.value = true
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
  transition: all 0.3s cubic-bezier(.4,2,.3,1);
  border: none;
}

.neumorphic-card:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow:
    25px 25px 50px rgba(196, 165, 132, 0.22),
    -25px -25px 50px rgba(255, 255, 255, 0.92);
}

.neumorphic-card:active {
  transform: translateY(2px) scale(0.98);
  box-shadow:
    10px 10px 20px rgba(196, 165, 132, 0.12),
    -10px -10px 20px rgba(255, 255, 255, 0.7),
    inset 5px 5px 10px rgba(196, 165, 132, 0.13),
    inset -5px -5px 10px rgba(255, 255, 255, 0.8);
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

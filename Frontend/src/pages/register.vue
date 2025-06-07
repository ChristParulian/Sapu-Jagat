<template>  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl overflow-hidden"><div class="flex flex-col md:flex-row">        <!-- Left Side - Illustration (Hidden on mobile) -->
        <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#626F47] to-[#4a5435] p-8 lg:p-12 flex-col justify-center items-center relative overflow-hidden min-h-screen">          <!-- Background decorative elements -->
          <div class="absolute top-8 left-8 w-16 h-16 bg-[#626F47] rounded-full opacity-20"></div>
          <div class="absolute bottom-8 right-8 w-24 h-24 bg-[#626F47] rounded-full opacity-15"></div>
          <div class="absolute top-1/3 right-12 w-8 h-8 bg-[#626F47] rounded-full opacity-25"></div>
            <!-- Additional decorative elements -->
          <div class="absolute top-20 right-20 w-12 h-12 bg-[#FFCF50] rounded-full opacity-30"></div>
          <div class="absolute bottom-32 left-16 w-6 h-6 bg-[#FEFAE0] rounded-full opacity-40"></div>
          <div class="absolute top-1/2 left-4 w-10 h-10 bg-[#FFCF50] rounded-full opacity-25"></div>
          <div class="absolute bottom-16 right-32 w-8 h-8 bg-[#FEFAE0] rounded-full opacity-35"></div>
          <div class="absolute top-40 left-32 w-4 h-4 bg-[#FFCF50] rounded-full opacity-40"></div>
          <div class="absolute bottom-40 left-8 w-14 h-14 bg-[#FEFAE0] rounded-full opacity-20"></div>
          <div class="absolute top-16 right-4 w-6 h-6 bg-[#FFCF50] rounded-full opacity-30"></div>
          
          <!-- Floating geometric shapes -->
          <div class="absolute top-24 left-20 w-8 h-8 bg-[#FEFAE0] transform rotate-45 opacity-25"></div>
          <div class="absolute bottom-24 right-16 w-6 h-6 bg-[#FFCF50] transform rotate-12 opacity-35"></div>
          <div class="absolute top-2/3 right-8 w-10 h-10 bg-[#FEFAE0] transform -rotate-12 opacity-20"></div>            <!-- Main Waste Sorting Illustration -->
          <div class="relative z-10 w-full max-w-lg flex flex-col items-center">
            <!-- Stats card -->
            <div class="absolute top-0 left-0 bg-white rounded-2xl p-4 shadow-lg transform -rotate-6">
              <div class="text-xs text-gray-500 mb-1">Pengguna Baru</div>
              <div class="text-2xl font-bold text-[#626F47]">9.9k+</div>
            </div>
              <!-- Main illustration image -->
            <div class="mt-12 mb-8 flex justify-center">
              <img src="/illustrations/waste-sorting.png" 
                alt="Waste Sorting Illustration" 
                class="w-96 h-72 object-contain drop-shadow-lg" 
              />            </div>
          </div>        </div>        <!-- Right Side - Register Form -->
        <div class="w-full md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-white">          <!-- Logo and Header -->          <div class="text-center mb-6">            <div class="flex justify-center mb-2">
              <img src="/logo/logo.png" alt="Sapu Jagat" class="w-40 h-40 md:w-48 md:h-48 object-contain" />
            </div>
            
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
              Bergabung dengan Kami,
            </h1>
            <p class="text-base text-gray-600 mb-4">
              Daftar sekarang dan mulai berkontribusi untuk lingkungan yang lebih bersih.
            </p>
          </div>          <!-- Register Form -->
          <form @submit.prevent="handleRegister" class="space-y-4">            <div>
              <label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
              <div class="relative mb-6">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                  </svg>
                </div>
                <input 
                  v-model="email"
                  type="email" 
                  id="input-group-1"
                  required 
                  autocomplete="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  placeholder="your@email.com"
                >
              </div>
            </div>
            <div>
              <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
              <div class="flex mb-6">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                </span>
                <input 
                  v-model="username"
                  type="text" 
                  id="website-admin"
                  required 
                  autocomplete="username"
                  class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="elonmusk"
                >
              </div>
            </div>
              <div>
              <label for="password-group" class="block text-sm font-medium mb-1" :class="error ? 'text-red-700' : 'text-gray-700'">Password</label>
              <div class="relative mb-6">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
                </div>
                <input 
                  v-model="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password-group"
                  required 
                  autocomplete="new-password"
                  :class="[
                    'block w-full ps-10 p-2.5 rounded-lg transition-all duration-200 bg-white shadow-sm pr-12',
                    error ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500' : 'border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#626F47] focus:border-transparent',
                  ]"
                  placeholder="Password"
                />
                <button type="button" @click="showPassword = !showPassword" tabindex="-1"
                  class="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none p-0 m-0 focus:outline-none shadow-none hover:bg-transparent active:bg-transparent">
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" :stroke="error ? '#dc2626' : '#626F47'">
                    <ellipse cx="12" cy="12" rx="8" ry="5.5" stroke-width="2" fill="none" />
                    <circle cx="12" cy="12" r="2.5" stroke-width="2" fill="none" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" :stroke="error ? '#dc2626' : '#626F47'">
                    <ellipse cx="12" cy="12" rx="8" ry="5.5" stroke-width="2" fill="none" />
                    <circle cx="12" cy="12" r="2.5" stroke-width="2" fill="none" />
                    <line x1="5" y1="19" x2="19" y2="5" stroke-width="2" />
                  </svg>
                </button>
              </div>
              <p v-if="error" class="mt-2 text-sm text-red-600"><span class="font-medium">Oh, snapp!</span> {{ error }}</p>
            </div><button 
              type="submit" 
              class="w-full py-3 px-4 bg-[#626F47] hover:bg-[#4a5435] text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Memproses...
              </span>
              <span v-else>Daftar Sekarang</span>
            </button>
          </form><!-- Sign in link -->          <div class="mt-3 text-center">
            <span class="text-gray-600">Sudah punya akun?</span>
            <router-link to="/login" class="ml-1 text-[#626F47] hover:text-[#4a5435] font-semibold hover:underline transition-colors">
              Masuk
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toast v-model="showToast" :message="toastMsg" type="success" icon="✔️" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import registerPresenter from '../presenters/registerPresenter'
import Toast from '../components/Toast.vue'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showToast = ref(false)
const toastMsg = ref('')
const router = useRouter()
const showPassword = ref(false)

const handleRegister = async () => {
  error.value = ''
  loading.value = true
  try {
    const data = await registerPresenter.register(username.value, email.value, password.value)
    if (data.token) {
      localStorage.setItem('token', data.token)
    } else {
      localStorage.setItem('user', JSON.stringify(data))
    }
    toastMsg.value = 'Registrasi berhasil!'
    showToast.value = true
    setTimeout(() => router.push('/dashboard'), 1200)
  } catch (err) {
    error.value = err.message || err
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
input[type="text"],
input[type="email"],
input[type="password"] {
  color: #626F47 !important;
  /* match the submit button color */
}
</style>

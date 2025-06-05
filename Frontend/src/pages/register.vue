<template>
  <div class="min-h-screen flex items-center justify-center bg-bg" style="font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg border-2 border-secondary">
      <div class="flex flex-col items-center mb-2 mt-2">
        <img src="/logo/logo.png" alt="Logo" class="object-contain" style="width:180px; height:180px; aspect-ratio:1/1; margin-bottom:12px; margin-top:0;" />
        <h2 class="text-3xl font-bold text-primary mb-1">Register Sapu Jagat</h2>
        <span class="text-secondary font-semibold">Buat akun baru untuk mulai memilah sampah!</span>
      </div>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block mb-1 text-primary font-semibold">Username</label>
          <input v-model="username" type="text" required autocomplete="username" class="w-full px-3 py-2 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent transition bg-bg text-primary placeholder:text-secondary" placeholder="Username" />
        </div>
        <div>
          <label class="block mb-1 text-primary font-semibold">Email</label>
          <input v-model="email" type="email" required autocomplete="email" class="w-full px-3 py-2 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent transition bg-bg text-primary placeholder:text-secondary" placeholder="Email" />
        </div>
        <div>
          <label class="block mb-1 text-primary font-semibold">Password</label>
          <input v-model="password" type="password" required autocomplete="new-password" class="w-full px-3 py-2 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent transition bg-bg text-primary placeholder:text-secondary" placeholder="Password" />
        </div>
        <button type="submit" class="w-full py-2 rounded bg-primary text-bg font-bold hover:bg-secondary transition flex items-center justify-center" :disabled="loading">
          <span v-if="loading">
            <svg class="animate-spin h-5 w-5 mr-2 inline-block text-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Loading...
          </span>
          <span v-else>Register</span>
        </button>
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </form>
      <div class="text-center text-sm">
        <span class="text-primary">Sudah punya akun?</span> <router-link to="/login" class="text-accent font-semibold hover:underline">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import registerPresenter from '../presenters/registerPresenter'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const handleRegister = async () => {
  error.value = ''
  loading.value = true
  try {
    const data = await registerPresenter.register(username.value, email.value, password.value)
    // data di sini sudah { token, ... } langsung dari model
    if (data.token) {
      localStorage.setItem('token', data.token)
    } else {
      localStorage.setItem('user', JSON.stringify(data))
    }
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message || err
  } finally {
    loading.value = false
  }
}
</script>

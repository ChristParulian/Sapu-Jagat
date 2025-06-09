<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <Header />
    <div class="p-8 flex flex-col items-center relative mt-24">
      <h1 class="text-3xl font-bold mb-2 text-primary">Tentang Sapu Jagat</h1>
      <p class="text-secondary text-lg">Belum ada informasi tentang aplikasi.</p>
    </div>
    <BottomNav active="about" />
    <LoadingIndicator :visible="globalLoading" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'

const router = useRouter()
const globalLoading = ref(false)

// Contoh penggunaan:
// globalLoading.value = true; // sebelum request
// globalLoading.value = false; // setelah selesai
// Terapkan pada setiap request API utama di page ini.

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

<template>
  <div class="min-h-screen w-full flex flex-col justify-between bg-bg font-primary" style="min-height: 100dvh; background-color: #FEFAE0;">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <div class="flex-1 pt-16 sm:pt-24 lg:pt-28 xl:pt-32 px-1.5 sm:px-6 md:px-8 pb-24 sm:pb-20">
      <div class="max-w-screen-lg mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-2xl md:text-3xl font-bold mb-2 text-primary">Profil Jagat</h1>
          <p class="text-secondary text-base">Kelola informasi akun Anda</p>
        </div>
        <div class="flex justify-center">
          <form class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-5 sm:p-14 border border-gray-200 flex flex-col gap-5 sm:gap-12" @submit.prevent="handleEditProfile">
            <div class="flex flex-col items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 sm:w-20 sm:h-20 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
            </div>
            <div class="relative z-0 w-full group">
              <input type="text" v-model="formUsername" id="floating_username" class="block py-3 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder:opacity-0" placeholder="Username" required />
              <label for="floating_username" class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 whitespace-nowrap truncate w-full sm:w-auto text-left sm:text-center">Username</label>
            </div>
            <div class="relative z-0 w-full group">
              <input type="password" v-model="formPassword" id="floating_password" class="block py-3 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder:opacity-0" placeholder="Password Baru" />
              <label for="floating_password" class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 whitespace-nowrap truncate w-full sm:w-auto text-left sm:text-center">Password Baru</label>
            </div>
            <div class="relative z-0 w-full group">
              <input type="password" v-model="formPasswordConfirm" id="floating_repeat_password" class="block py-3 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder:opacity-0" placeholder="Konfirmasi Password Baru" />
              <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 whitespace-nowrap truncate w-full sm:w-auto text-left sm:text-center">Konfirmasi Password Baru</label>
            </div>
            <button type="submit" :disabled="isLoading" class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary/30 font-semibold rounded-xl text-base w-full px-5 py-3 text-center mt-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center">
              <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <span>{{ isLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
            </button>
            <p v-if="formError" class="text-red-500 text-sm mt-2 text-center">{{ formError }}</p>
          </form>
        </div>
      </div>
    </div>
    <BottomNav active="profile" />
    <Toast v-model="showToast" :message="toastMsg" :type="toastType" :icon="toastIcon" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BottomNav from '../components/BottomNav.vue';
import Header from '../components/Header.vue';
import { editUser } from '../services/api';
import Toast from '../components/Toast.vue';
import { useUserStore } from '../models/userStore.js';

const router = useRouter();
const userName = ref('');
const password = ref('********');
const newPassword = ref('');
const confirmPassword = ref('');
const editMode = ref(null);
const newUsername = ref('');
const isLoading = ref(false);
const passwordError = ref('');
const formUsername = ref('');
const formPassword = ref('');
const formPasswordConfirm = ref('');
const formError = ref('');

// Toast state
const showToast = ref(false);
const toastMsg = ref('');
const toastType = ref('success');
const toastIcon = ref('✔️');

const { setUsername } = useUserStore();

function showNotification(message, type = 'success', icon = '✔️') {
  toastMsg.value = message;
  toastType.value = type;
  toastIcon.value = icon;
  showToast.value = true;
}

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const userData = JSON.parse(user);
      userName.value = userData.name || userData.username || userData.email;
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  const token = localStorage.getItem('token');
  if (token && !userName.value) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userName.value = payload.username || payload.email || 'User';
    } catch (error) {
      console.error('Error decoding token:', error);
      userName.value = 'User';
    }
  }

  if (!userName.value) {
    userName.value = 'User';
  }

  if (userName.value) formUsername.value = userName.value;
});

const toggleEditMode = (mode) => {
  editMode.value = editMode.value === mode ? null : mode;
};

const handleEditProfile = async () => {
  formError.value = '';
  if (!formUsername.value) {
    formError.value = 'Username tidak boleh kosong';
    showNotification('Username tidak boleh kosong', 'error');
    return;
  }
  // Cek jika username tidak berubah
  if (formUsername.value === userName.value) {
    formError.value = 'Username sama dengan sebelumnya';
    showNotification('Username sama dengan sebelumnya', 'error', '❗');
    return;
  }
  if (formPassword.value && formPassword.value !== formPasswordConfirm.value) {
    formError.value = 'Password tidak cocok';
    showNotification('Password tidak cocok', 'error', '❗');
    return;
  }
  if (formPassword.value && formPassword.value === formUsername.value) {
    formError.value = 'Password tidak boleh sama dengan username';
    showNotification('Password tidak boleh sama dengan username', 'error', '❗');
    return;
  }
  try {
    isLoading.value = true;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Anda belum login');
    const payload = { username: formUsername.value };
    if (formPassword.value) payload.password = formPassword.value;
    const updated = await editUser(payload, token);
    userName.value = formUsername.value;
    setUsername(formUsername.value); // update global userStore
    showNotification('Profil berhasil diperbarui', 'success');
    formPassword.value = '';
    formPasswordConfirm.value = '';
    // Update localStorage agar username baru langsung tampil di header/beranda
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        userData.name = formUsername.value;
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (e) {}
    }
    // Redirect ke beranda setelah sukses
    setTimeout(() => {
      router.replace('/dashboard');
    }, 1000);
  } catch (error) {
    // Cek error username sudah ada
    if (error.message && error.message.toLowerCase().includes('username')) {
      showNotification('Username sudah tersedia, silakan pilih yang lain', 'error', '❗');
      formError.value = 'Username sudah tersedia, silakan pilih yang lain';
    } else {
      showNotification(error.message || 'Username sudah tersedia, silakan pilih yang lain', 'error', '❗');
      formError.value = error.message || 'Username sudah tersedia, silakan pilih yang lain';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

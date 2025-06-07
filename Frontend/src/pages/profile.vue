<template>
  <div class="min-h-screen w-full flex flex-col justify-between bg-bg font-primary">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <div class="flex-1 pt-20 sm:pt-24 lg:pt-28 xl:pt-32 px-4 sm:px-6 md:px-8 pb-20">
      <div class="max-w-screen-lg mx-auto">
        <div class="text-center mb-6 sm:mb-8">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-primary">Profil Pengguna</h1>
          <p class="text-secondary text-sm sm:text-base">Kelola informasi akun Anda</p>
        </div>
        <div class="flex justify-center">
          <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 w-[320px] sm:w-[360px] md:w-[392px]">
            <!-- Username Section -->
            <div class="flex flex-col items-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              <div class="flex justify-between items-center w-full mb-3">
                <p class="text-primary font-semibold text-base">Username :</p>
                <p class="text-gray-700 text-sm font-semibold">{{ userName || 'User' }}</p>
                <button @click="toggleEditMode('username')" class="px-3 py-1 bg-primary text-bg text-sm rounded-full hover:bg-secondary transition-all">
                  Edit
                </button>
              </div>
              <div class="text-center mb-6 w-full">
                <div v-if="editMode !== 'username'" class="flex justify-center items-center"></div>
                <div v-else>
                  <input v-model="newUsername" type="text" class="w-full px-3 py-2 border border-secondary rounded-lg text-gray-700 bg-bg focus:ring-2 focus:ring-primary" placeholder="Masukkan username baru" />
                  <button @click="handleEditUsername" class="w-full mt-2 py-2 bg-primary text-bg rounded-lg hover:bg-secondary transition-all" :disabled="isLoading">
                    {{ isLoading ? 'Menyimpan...' : 'Simpan' }}
                  </button>
                </div>
              </div>
            </div>
            <!-- Password Section -->
            <div>
              <div class="flex justify-between items-center mb-3">
                <p class="text-primary font-semibold text-base">Password :</p>
                <p class="text-gray-700 text-sm font-semibold">********</p>
                <button @click="toggleEditMode('password')" class="px-3 py-1 bg-primary text-bg text-sm rounded-full hover:bg-secondary transition-all">
                  Edit
                </button>
              </div>
              <div class="text-center mb-6">
                <div v-if="editMode !== 'password'" class="flex justify-center items-center">
                </div>
                <div v-else>
                  <input v-model="newPassword" type="password" class="w-full px-3 py-2 border border-secondary rounded-lg text-gray-700 bg-bg focus:ring-2 focus:ring-primary" placeholder="Password Baru" />
                  <input v-model="confirmPassword" type="password" class="w-full px-3 py-2 border border-secondary rounded-lg text-gray-700 bg-bg focus:ring-2 focus:ring-primary mt-2" placeholder="Konfirmasi Password" />
                <button @click="handleEditPassword" class="w-full mt-2 py-2 bg-primary text-bg rounded-lg hover:bg-secondary transition-all" :disabled="isLoading">
                    {{ isLoading ? 'Menyimpan...' : 'Simpan' }}
                  </button>
                  <p v-if="passwordError" class="text-red-500 text-sm mt-2">{{ passwordError }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BottomNav active="profile" />
    <Toast v-model="showToast" :message="toastMsg" :type="toastType" icon="✔️" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BottomNav from '../components/BottomNav.vue';
import Header from '../components/Header.vue';
import { editUser } from '../services/api';
import Toast from '../components/Toast.vue';

const router = useRouter();
const userName = ref('');
const password = ref('********');
const newPassword = ref('');
const confirmPassword = ref('');
const editMode = ref(null);
const newUsername = ref('');
const isLoading = ref(false);
const passwordError = ref('');

// Toast state
const showToast = ref(false);
const toastMsg = ref('');
const toastType = ref('success');

function showNotification(message, type = 'success') {
  toastMsg.value = message;
  toastType.value = type;
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
});

const toggleEditMode = (mode) => {
  editMode.value = editMode.value === mode ? null : mode;
};

const handleEditUsername = async () => {
  try {
    isLoading.value = true;
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Anda belum login');
    }
    const payload = { username: newUsername.value };
    await editUser(payload, token);
    userName.value = newUsername.value;
    editMode.value = null;
    showNotification('Username berhasil diperbarui', 'success');
  } catch (error) {
    showNotification(error.message || 'Gagal memperbarui username', 'error');
  } finally {
    isLoading.value = false;
  }
};

const handleEditPassword = async () => {
  try {
    passwordError.value = null;
    if (!newPassword.value || !confirmPassword.value) {
      passwordError.value = 'Password tidak boleh kosong';
      return;
    }
    if (newPassword.value !== confirmPassword.value) {
      passwordError.value = 'Password tidak cocok';
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token tidak ditemukan');
    }
    const payload = { password: newPassword.value };
    await editUser(payload, token);
    editMode.value = null;
    newPassword.value = '';
    confirmPassword.value = '';
    showNotification('Password berhasil diperbarui', 'success');
  } catch (error) {
    showNotification(error.message || 'Gagal memperbarui password', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

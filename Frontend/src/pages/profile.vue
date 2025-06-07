<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8 flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-2 text-primary">Profil Pengguna</h1>
      <p class="text-secondary text-lg">Belum ada data profil.</p>
    </div>
    <BottomNav active="profile" />
<<<<<<< Updated upstream
=======
    <Toast v-model="showToast" :message="toastMsg" :type="toastType" icon="✔️" />
>>>>>>> Stashed changes
  </div>
</template>

<script setup>
<<<<<<< Updated upstream
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'

const router = useRouter()
=======
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
>>>>>>> Stashed changes
</script>

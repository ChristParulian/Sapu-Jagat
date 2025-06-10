<template>
  <div class="min-h-screen flex flex-col justify-between" style="background-color: #FEFAE0; font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <!-- Header Component -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8">
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-primary">Scan Jagat</h1>
        <p class="text-secondary text-lg">Pindai sampah untuk mendapatkan informasi pemilahan</p>
      </div>
      
      <!-- Camera Container -->
      <div class="max-w-md mx-auto mb-6">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <!-- Tab Pilihan -->
          <div class="flex mb-4 gap-2">
            <button
              :class="['flex-1 py-2 rounded-l-lg font-semibold', tabMode === 'camera' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700']"
              @click="tabMode = 'camera'"
            >
              Scan Kamera
            </button>
            <button
              :class="['flex-1 py-2 rounded-r-lg font-semibold', tabMode === 'upload' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700']"
              @click="tabMode = 'upload'"
            >
              Upload File
            </button>
          </div>

          <!-- Konten Tab -->
          <div v-if="tabMode === 'camera'">
            <!-- Dropdown Pilihan Kamera -->
            <div v-if="cameraDevices.length > 1" class="mb-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Pilih Kamera</label>
              <select
                v-model="selectedDeviceId"
                class="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none text-gray-900 bg-white"
              >
                <option v-for="cam in cameraDevices" :key="cam.deviceId" :value="cam.deviceId" class="text-gray-900">
                  {{ cam.label }}
                </option>
              </select>
            </div>
            <!-- Camera Preview Area -->
            <div class="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
              <template v-if="!capturedImage">
                <video
                  ref="videoRef"
                  class="w-full h-full object-cover rounded-lg"
                  autoplay
                  playsinline
                  muted
                ></video>
                <div v-if="!cameraStream" class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
                  <span class="text-gray-400 text-sm">Mengakses kamera...</span>
                </div>
              </template>
              <template v-else>
                <img :src="capturedImage" alt="Captured" class="w-full h-full object-cover rounded-lg" />
              </template>
            </div>
            <!-- Camera Controls -->
            <div class="flex justify-center space-x-4">
              <button
                v-if="!cameraStream"
                class="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition"
                @click="startCamera"
                type="button"
              >
                Buka Kamera
              </button>
              <button
                v-if="cameraStream"
                class="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                @click="stopCamera"
                type="button"
              >
                Tutup Kamera
              </button>
              <button
                v-if="cameraStream && !capturedImage"
                class="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition"
                @click="capturePhoto"
                type="button"
              >
                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Ambil Foto
              </button>
              <button
                v-if="capturedImage"
                class="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition"
                @click="submitCaptured"
                type="button"
              >
                Scan Sampah
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-2 text-center">Tekan untuk memindai</p>
          </div>
          <div v-else>
            <!-- Upload File Button -->
            <div class="mb-2">
              <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input">Upload file</label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                id="file_input"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                @change="handleFileChange"
              >
            </div>
            <p class="text-xs text-gray-400 mt-1">Pilih gambar sampah dari galeri Anda</p>
            <button
              v-if="selectedFile"
              class="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition"
              @click="submitFile"
            >
              Submit File
            </button>
          </div>
        </div>
      </div>
      
      <!-- Results Link -->
      <div class="text-center">
        <router-link to="/results" class="inline-flex items-center px-6 py-3 bg-accent text-primary rounded-lg font-semibold hover:bg-secondary hover:text-white transition">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Lihat Hasil Scan
        </router-link>
      </div>
    </div>
    
    <!-- Bottom Navigation -->
    <BottomNav active="scan" />
    
    <!-- Toast Notification -->
    <Toast v-model="showToast" :message="toastMsg" :type="toastType" :icon="toastIcon" />
    
    <!-- Loading Indicator -->
    <LoadingIndicator :visible="globalLoading" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import Toast from '../components/Toast.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { getCameraStream, captureImageFromVideo, getCameraDevices } from '../utils/camera'

const tabMode = ref('camera')
const showToast = ref(false)
const toastMsg = ref('')
const toastType = ref('success')
const toastIcon = ref('✔️')
const selectedFile = ref(null)
const capturedImage = ref(null)
const videoRef = ref(null)
const cameraStream = ref(null)

const cameraDevices = ref([])
const selectedDeviceId = ref('')

async function fetchCameraDevices() {
  try {
    cameraDevices.value = await getCameraDevices()
    if (cameraDevices.value.length > 0) {
      selectedDeviceId.value = cameraDevices.value[0].deviceId
    }
  } catch (e) {
    cameraDevices.value = []
  }
}

async function startCamera() {
  try {
    let constraints = { video: true }
    if (selectedDeviceId.value) {
      constraints = { video: { deviceId: { exact: selectedDeviceId.value } } }
    }
    cameraStream.value = await getCameraStream(constraints)
    if (videoRef.value) {
      videoRef.value.srcObject = cameraStream.value
      videoRef.value.play()
    }
  } catch (err) {
    toastMsg.value = 'Izin kamera ditolak atau tidak tersedia.'
    toastType.value = 'error'
    toastIcon.value = '❌'
    showToast.value = true
  }
}

function stopCamera() {
  if (cameraStream.value) {
    cameraStream.value.getTracks().forEach(track => track.stop())
    cameraStream.value = null
  }
}

function capturePhoto() {
  if (videoRef.value) {
    capturedImage.value = captureImageFromVideo(videoRef.value)
    stopCamera()
  }
}

watch(tabMode, (val) => {
  if (val === 'camera') {
    capturedImage.value = null
    startCamera()
  } else {
    stopCamera()
  }
})

watch(selectedDeviceId, () => {
  if (tabMode.value === 'camera') {
    stopCamera()
    startCamera()
  }
})

onMounted(() => {
  fetchCameraDevices()
  if (tabMode.value === 'camera') startCamera()
})
onBeforeUnmount(() => {
  stopCamera()
})

function handleScanSuccess() {
  showToast.value = true
  toastMsg.value = 'Scan berhasil!'
}

function handleFileChange(e) {
  const file = e.target.files[0]
  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!allowedTypes.includes(file.type)) {
    toastMsg.value = 'File harus berupa gambar JPG, JPEG, atau PNG'
    toastType.value = 'error'
    toastIcon.value = '❌'
    showToast.value = true
    e.target.value = ''
    selectedFile.value = null
    return
  }

  selectedFile.value = file
}

function submitFile() {
  toastMsg.value = 'File berhasil dikirim!'
  toastType.value = 'success'
  toastIcon.value = '✔️'
  showToast.value = true
}

function submitCaptured() {
  toastMsg.value = 'Scan sampah berhasil!'
  toastType.value = 'success'
  toastIcon.value = '✔️'
  showToast.value = true
  // Reset ke kamera lagi
  capturedImage.value = null
  startCamera()
}

// Contoh penggunaan:
// globalLoading.value = true; // sebelum request
// globalLoading.value = false; // setelah selesai
// Terapkan pada setiap request API utama di page ini.

// TODO: Implement camera functionality when model API is ready
// This will include:
// - Camera access and preview
// - Image capture
// - API call to model for waste classification
// - Navigation to results with scan data

</script>

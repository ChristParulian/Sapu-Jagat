<template>
  <div class="min-h-screen flex flex-col justify-between bg-brand-cream font-sans relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 right-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-40 left-10 w-40 h-40 bg-brand-sage/15 rounded-full blur-2xl animate-float-delay"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-forest/5 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>

    <!-- Header Component -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex-1 main-content pt-24 lg:pt-28 xl:pt-32 p-4 sm:p-8 relative z-10">
      <!-- Hero Section -->
      <div class="text-center mb-8" data-aos="fade-down">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-brand-forest">
          {{ tabMode === 'camera' ? 'Scan Jagat' : 'Jagat Kenal' }}
        </h1>
        <p class="text-brand-forest/70 text-lg sm:text-xl max-w-md mx-auto">
          {{ tabMode === 'camera' ? 'Pindai sampah untuk mendapatkan informasi pemilahan yang akurat' : 'Upload gambar untuk mendapatkan informasi pemilahan yang akurat' }}
        </p>
      </div>
      
      <!-- Camera Container -->
      <div class="max-w-lg mx-auto mb-8" data-aos="zoom-in" data-aos-delay="200">
        <div class="glass-card p-6 sm:p-8 relative overflow-hidden group">
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-yellow/30 to-brand-sage/30 rounded-full blur-xl"></div>
          <div class="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-brand-sage/20 to-brand-forest/20 rounded-full blur-lg"></div>
          
          <div class="relative z-10">
            <!-- Tab Navigation -->
            <div class="flex mb-6 bg-brand-cream/50 rounded-2xl p-1 backdrop-blur-sm gap-3 glass-tab-group" data-aos="fade-up" data-aos-delay="300">
              <button
                :class="[
                  'flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 glass-tab',
                  tabMode === 'camera' 
                    ? 'bg-gradient-to-r from-brand-sage to-brand-forest text-white shadow-lg transform scale-105 glass-tab-active' 
                    : 'text-brand-forest/70 hover:text-brand-forest hover:bg-white/50 glass-tab-inactive'
                ]"
                @click="tabMode = 'camera'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Scan Kamera
              </button>
              <button
                :class="[
                  'flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 glass-tab',
                  tabMode === 'upload' 
                    ? 'bg-gradient-to-r from-brand-sage to-brand-forest text-white shadow-lg transform scale-105 glass-tab-active' 
                    : 'text-brand-forest/70 hover:text-brand-forest hover:bg-white/50 glass-tab-inactive'
                ]"
                @click="tabMode = 'upload'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                Upload File
              </button>
            </div>

            <!-- Camera Tab Content -->
            <div v-if="tabMode === 'camera'" class="space-y-6">
              <!-- Camera Selection -->
              <div v-if="isMobile" class="form-group" data-aos="fade-up" data-aos-delay="400">
                <label class="form-label">Pilih Kamera</label>
                <div class="relative">
                  <select
                    v-model="mobileCameraMode"
                    class="form-select appearance-none cursor-pointer"
                  >
                    <option value="environment">📱 Kamera Belakang</option>
                    <option value="user">🤳 Kamera Depan</option>
                  </select>
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg class="w-5 h-5 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div v-else-if="cameraDevices.length > 1" class="form-group" data-aos="fade-up" data-aos-delay="400">
                <label class="form-label">Pilih Kamera</label>
                <div class="relative">
                  <select
                    v-model="selectedDeviceId"
                    class="form-select appearance-none cursor-pointer"
                  >
                    <option v-for="cam in cameraDevices" :key="cam.deviceId" :value="cam.deviceId">
                      📹 {{ cam.label }}
                    </option>
                  </select>
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Camera Preview Area -->
              <div class="camera-preview-container" data-aos="zoom-in" data-aos-delay="500">
                <div class="camera-preview">
                  <template v-if="!capturedImage">
                    <video
                      ref="videoRef"
                      class="camera-video"
                      autoplay
                      playsinline
                      muted
                    ></video>
                    <div v-if="!cameraStream" class="camera-loading no-anim">
                      <span class="loading-text">Kamera belum dibuka</span>
                    </div>
                    <!-- Camera overlay -->
                    <div class="camera-overlay">
                      <div class="scan-frame"></div>
                    </div>
                  </template>
                  <template v-else>
                    <img :src="capturedImage" alt="Captured" class="captured-image" />
                    <div class="success-overlay">
                      <div class="success-badge">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Camera Controls -->
              <div class="camera-controls" data-aos="fade-up" data-aos-delay="600">
                <template v-if="!cameraStream && !capturedImage">
                  <button
                    class="btn-primary-large group"
                    @click="startCamera"
                    type="button"
                  >
                    <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Buka Kamera
                  </button>
                </template>
                <template v-else-if="cameraStream && !capturedImage">
                  <div class="flex gap-3">
                    <button
                      class="btn-secondary flex-1"
                      @click="stopCamera"
                      type="button"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Tutup Kamera
                    </button>
                    <button
                      class="btn-capture flex-1"
                      @click="capturePhoto"
                      type="button"
                    >
                      <div class="capture-ring">
                        <div class="capture-dot"></div>
                      </div>
                      Ambil Foto
                    </button>
                  </div>
                </template>
                <template v-else-if="capturedImage">
                  <div class="flex gap-3">
                    <button
                      class="btn-secondary flex-1"
                      @click="retakePhotoWithCamera"
                      type="button"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      Ambil Ulang & Buka Kamera
                    </button>
                    <button
                      class="btn-scan flex-1"
                      @click="submitCaptured"
                      type="button"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Scan Sampah
                    </button>
                  </div>
                </template>
              </div>

              <div class="text-center" data-aos="fade-up" data-aos-delay="700">
                <p class="text-sm text-brand-forest/60 flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Arahkan kamera ke sampah dan tekan tombol ambil foto
                </p>
              </div>
            </div>

            <!-- Upload Tab Content -->
            <div v-else class="space-y-6">
              <!-- Upload Area -->
              <div class="upload-area" data-aos="fade-up" data-aos-delay="400">
                <div class="upload-dropzone" :class="{ 'dragover': isDragOver }" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
                  <div class="upload-icon">
                    <svg class="w-12 h-12 text-brand-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                  </div>
                  <h3 class="upload-title">Upload Gambar Sampah</h3>
                  <p class="upload-subtitle">Drag & drop atau klik untuk memilih file</p>
                  <div class="upload-formats">
                    <span class="format-badge">JPG</span>
                    <span class="format-badge">JPEG</span>
                    <span class="format-badge">PNG</span>
                  </div>
                  <input
                    class="upload-input"
                    id="file_input"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    @change="handleFileChange"
                  >
                </div>
              </div>

              <!-- File Preview -->
              <div v-if="selectedFile" class="file-preview" data-aos="zoom-in" data-aos-delay="500">
                <div class="preview-container">
                  <img :src="filePreviewUrl" alt="Selected file" class="preview-image" />
                  <div class="preview-overlay">
                    <button @click="removeFile" class="remove-btn">
                      <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="file-info">
                  <p class="file-name">📁 {{ selectedFile.name }}</p>
                  <p class="file-size">📏 {{ formatFileSize(selectedFile.size) }}</p>
                </div>
              </div>

              <!-- Upload Button -->
              <div v-if="selectedFile" class="upload-submit" data-aos="fade-up" data-aos-delay="600">
                <button
                  class="btn-scan w-full"
                  @click="submitFile"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Scan File Gambar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Results Link -->
      <div v-if="predictionResult" class="text-center my-8" data-aos="fade-up" data-aos-delay="650">
        <div class="inline-block px-6 py-4 rounded-2xl shadow-lg bg-white/80 border border-brand-sage/30">
          <div class="text-lg font-semibold text-brand-forest mb-2">Hasil Scan</div>
          <div class="text-2xl font-bold text-brand-sage mb-1">{{ predictionResult.class }}</div>
        </div>
      </div>
      <!-- Button to Results Page -->
      <div class="text-center my-4">
        <router-link to="/results" class="results-link">
          <span class="results-icon">
            <!-- Updated to use provided SVG icon -->
            <svg class="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"/>
            </svg>
          </span>
          <span class="results-text">
            <span class="results-title">Riwayat Scan Anda</span>
            <span class="results-subtitle">Lihat hasil scan sebelumnya</span>
          </span>
          <span class="results-arrow">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </router-link>
      </div>
    </div>
      <!-- Bottom Navigation -->
    <BottomNav active="scan" />
    
    <!-- Toast Notification -->
    <Toast v-model="showToast" :message="toastMsg" :type="toastType" :icon="toastIcon" />
    
    <!-- Loading Indicator -->
    <LoadingIndicator :visible="globalLoading" :message="onFirstLoad ? 'Memuat Scan Jagat...' : 'Sedang mengklasifikasikan gambar, mohon ditunggu...'" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import Toast from '../components/Toast.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { getCameraStream, captureImageFromVideo, getCameraDevices } from '../utils/camera'
import AOS from 'aos'
import 'aos/dist/aos.css'

const tabMode = ref('camera')
const showToast = ref(false)
const toastMsg = ref('')
const toastType = ref('success')
const toastIcon = ref('✔️')
const selectedFile = ref(null)
const capturedImage = ref(null)
const videoRef = ref(null)
const cameraStream = ref(null)
const globalLoading = ref(false)
const filePreviewUrl = ref('')
const isDragOver = ref(false)
const loadingMessage = ref('')
const onFirstLoad = ref(true)

const cameraDevices = ref([])
const selectedDeviceId = ref('')
const isMobile = ref(false)
const mobileCameraMode = ref('environment') // default ke kamera belakang
const predictionResult = ref(null)

// Tampilkan loading saat pertama kali masuk halaman scan
onMounted(() => {
  onFirstLoad.value = true
  globalLoading.value = true;
  setTimeout(() => {
    globalLoading.value = false;
    onFirstLoad.value = false;
  }, 600);

  // Deteksi mobile
  isMobile.value = window.innerWidth <= 640 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  // Initialize AOS hanya jika bukan mobile
  if (!isMobile.value) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true
    })
  }
  fetchCameraDevices()
  // Tidak auto startCamera
})

onBeforeUnmount(() => {
  stopCamera()
  if (filePreviewUrl.value) {
    URL.revokeObjectURL(filePreviewUrl.value)
  }
})

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
    if (isMobile.value) {
      constraints = { video: { facingMode: mobileCameraMode.value } }
    } else if (selectedDeviceId.value) {
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
  // Segera hapus srcObject sebelum pause agar video element langsung blank
  if (videoRef.value) {
    videoRef.value.srcObject = null;
    videoRef.value.pause();
  }
  if (cameraStream.value) {
    cameraStream.value.getTracks().forEach(track => {
      try {
        track.stop();
      } catch (e) {}
    });
    cameraStream.value = null
  }
}

async function resizeImage(base64, maxSize = 640) {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = function () {
      let width = img.width
      let height = img.height
      if (width > height) {
        if (width > maxSize) {
          height = Math.round(height * (maxSize / width))
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = Math.round(width * (maxSize / height))
          height = maxSize
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.src = base64
  })
}

async function capturePhoto() {
  if (videoRef.value) {
    let raw = captureImageFromVideo(videoRef.value)
    // Resize jika mobile
    if (isMobile.value) {
      capturedImage.value = await resizeImage(raw, 640)
    } else {
      capturedImage.value = raw
    }
    stopCamera()
    // Tidak langsung scan, hanya tampilkan preview
  }
}

function retakePhoto() {
  capturedImage.value = null
  startCamera()
}

function retakePhotoWithCamera() {
  capturedImage.value = null;
  startCamera();
}

// Perubahan utama: kamera tidak otomatis menyala saat tabMode 'camera', hanya saat klik tombol
watch(tabMode, (val) => {
  if (val === 'camera') {
    capturedImage.value = null
    stopCamera() // pastikan kamera selalu mati saat masuk tab camera
    // Tidak auto startCamera
  } else {
    stopCamera()
  }
})

watch(selectedDeviceId, () => {
  if (tabMode.value === 'camera') {
    stopCamera()
    // Tidak auto startCamera
  }
})

watch(mobileCameraMode, (val) => {
  if (isMobile.value && cameraStream.value) {
    // Ganti kamera langsung jika sedang aktif
    stopCamera()
    startCamera()
  }
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
  createFilePreview(file)
}

function createFilePreview(file) {
  if (filePreviewUrl.value) {
    URL.revokeObjectURL(filePreviewUrl.value)
  }
  // Untuk mobile, compress preview agar lebih ringan
  if (isMobile.value && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = async (e) => {
      filePreviewUrl.value = await resizeImage(e.target.result, 640)
    }
    reader.readAsDataURL(file)
  } else {
    filePreviewUrl.value = URL.createObjectURL(file)
  }
}

function removeFile() {
  selectedFile.value = null
  if (filePreviewUrl.value) {
    URL.revokeObjectURL(filePreviewUrl.value)
    filePreviewUrl.value = ''
  }
  const fileInput = document.getElementById('file_input')
  if (fileInput) fileInput.value = ''
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Drag and drop handlers
function handleDragOver(e) {
  isDragOver.value = true
}

function handleDragLeave(e) {
  isDragOver.value = false
}

function handleDrop(e) {
  isDragOver.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (allowedTypes.includes(file.type)) {
      selectedFile.value = file
      createFilePreview(file)
    } else {
      toastMsg.value = 'File harus berupa gambar JPG, JPEG, atau PNG'
      toastType.value = 'error'
      toastIcon.value = '❌'
      showToast.value = true
    }
  }
}

async function scanImage(imageDataUrlOrFile) {
  try {
    globalLoading.value = true
    predictionResult.value = null
    let formData = new FormData()
    let fileObj
    if (typeof imageDataUrlOrFile === 'string') {
      // base64 data URL (from camera)
      const res = await fetch(imageDataUrlOrFile)
      const blob = await res.blob()
      // Give a default filename
      fileObj = new File([blob], 'camera.jpg', { type: blob.type || 'image/jpeg' })
    } else if (imageDataUrlOrFile instanceof File) {
      fileObj = imageDataUrlOrFile
    } else {
      throw new Error('Format gambar tidak valid')
    }
    formData.append('image', fileObj)
    // Get JWT token
    const token = localStorage.getItem('token')
    if (!token) {
      toastMsg.value = 'Anda belum login!'
      toastType.value = 'error'
      toastIcon.value = '❌'
      showToast.value = true
      globalLoading.value = false
      return
    }
    // Call API
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/predict`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // 'Content-Type' JANGAN di-set, biar browser set multipart boundary
      },
      body: formData
    })
    let data
    try {
      data = await response.json()
    } catch (e) {
      data = {}
    }
    let detectedLabel = null
    let detectedConfidence = null
    // Cek jika ada array predictions
    if (response.ok && data.status === 'success') {
      if (Array.isArray(data.predictions) && data.predictions.length > 0) {
        // Pilih label dengan confidence tertinggi
        const best = data.predictions.reduce((a, b) => (a.confidence > b.confidence ? a : b))
        detectedLabel = best.label
        detectedConfidence = best.confidence
      } else if (data.detected) {
        detectedLabel = data.detected
        detectedConfidence = data.confidence || null
      }
    }
    if (detectedLabel) {
      predictionResult.value = { class: detectedLabel, confidence: detectedConfidence, ...data }
      toastMsg.value = `Sampah terdeteksi: ${detectedLabel}`
      toastType.value = 'success'
      toastIcon.value = '✔️'
      showToast.value = true
    } else if (!response.ok) {
      // Error dari API (HTTP error)
      predictionResult.value = { class: 'Gagal scan' }
      toastMsg.value = data.message || `Gagal scan: ${response.status} ${response.statusText}`
      toastType.value = 'error'
      toastIcon.value = '❌'
      showToast.value = true
    } else {
      // Error dari API (status success tapi tidak ada hasil)
      predictionResult.value = { class: 'Tidak ada sampah terdeteksi' }
      toastMsg.value = data.message || 'Tidak ada sampah terdeteksi'
      toastType.value = 'error'
      toastIcon.value = '❌'
      showToast.value = true
    }
  } catch (err) {
    predictionResult.value = { class: 'Tidak ada sampah terdeteksi' }
    toastMsg.value = err.message || 'Gagal melakukan scan'
    toastType.value = 'error'
    toastIcon.value = '❌'
    showToast.value = true
  } finally {
    globalLoading.value = false
  }
}

async function submitCaptured() {
  if (!capturedImage.value) return
  await scanImage(capturedImage.value)
  // Reset ke kamera lagi
  capturedImage.value = null
  startCamera()
}

async function submitFile() {
  if (!selectedFile.value) return
  await scanImage(selectedFile.value)
  // Reset file input
  removeFile()
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

<style scoped>
/* Glass morphism cards */
.glass-card {
  background: rgba(254, 250, 224, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(164, 180, 101, 0.2);
  box-shadow: 
    0 20px 40px rgba(98, 111, 71, 0.1),
    0 15px 12px rgba(98, 111, 71, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 25px 50px rgba(98, 111, 71, 0.15),
    0 20px 20px rgba(98, 111, 71, 0.1),
    inset 0 1px 0 rgba(164, 180, 101, 0.3);
}

/* Disable card hover/timbul animation on mobile */
@media (max-width: 640px) {
  .glass-card,
  .glass-card:hover {
    transform: none !important;
    box-shadow: 0 4px 12px rgba(98, 111, 71, 0.08) !important;
    transition: none !important;
  }
}

/* Ensure proper spacing for main content agar tidak tertutup header */
.main-content {
  min-height: calc(100vh - 80px);
  padding-top: clamp(120px, 15vh, 180px);
}

@media (min-width: 1024px) {
  .main-content {
    padding-top: clamp(140px, 18vh, 200px);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .main-content {
    padding-top: clamp(130px, 16vh, 170px);
  }
}

/* Form styling */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #626F47;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid rgba(164, 180, 101, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #626F47;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-select:focus {
  outline: none;
  border-color: #A4B465;
  box-shadow: 
    0 0 0 3px rgba(164, 180, 101, 0.15),
    0 4px 12px rgba(164, 180, 101, 0.1);
  background: rgba(255, 255, 255, 0.95);
}

/* Camera Preview */
.camera-preview-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.camera-preview {
  position: relative;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border: 3px solid rgba(164, 180, 101, 0.3);
}

.camera-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 17px;
}

.captured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 17px;
  /* Hilangkan blur dan overlay saat foto sudah diambil */
  filter: none !important;
}

.camera-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(243, 244, 246, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 17px;
}

.camera-loading.no-anim {
  background: rgba(243, 244, 246, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 80px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(164, 180, 101, 0.3);
  border-left-color: #A4B465;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

.loading-text {
  color: #626F47;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Camera Overlay */
.camera-overlay {
  display: none;
}

.scan-frame {
  display: none;
}

/* Success Overlay */
.success-overlay {
  display: none;
}

.success-badge {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 10px 30px rgba(16, 185, 129, 0.3),
    0 4px 12px rgba(16, 185, 129, 0.2);
  animation: success-bounce 0.6s ease;
}

/* Button Styles */
.btn-primary-large {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #A4B465, #626F47);
  color: white;
  font-weight: 700;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 20px rgba(98, 111, 71, 0.25),
    0 4px 8px rgba(98, 111, 71, 0.15);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.1rem;
}

.btn-primary-large::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-primary-large:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0 12px 30px rgba(98, 111, 71, 0.3),
    0 6px 12px rgba(98, 111, 71, 0.2);
  background: linear-gradient(135deg, #626F47, #A4B465);
}

.btn-primary-large:hover::before {
  left: 100%;
}

.btn-secondary {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 
    0 4px 12px rgba(239, 68, 68, 0.3),
    0 2px 6px rgba(239, 68, 68, 0.2);
}

.btn-secondary:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  box-shadow: 
    0 6px 16px rgba(239, 68, 68, 0.4),
    0 3px 8px rgba(239, 68, 68, 0.3);
}

.btn-capture {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #FFCF50, #f59e0b);
  color: #626F47;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 
    0 4px 12px rgba(255, 207, 80, 0.3),
    0 2px 6px rgba(255, 207, 80, 0.2);
}

.btn-capture:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #f59e0b, #d97706);
  box-shadow: 
    0 6px 16px rgba(255, 207, 80, 0.4),
    0 3px 8px rgba(255, 207, 80, 0.3);
}

.capture-ring {
  width: 24px;
  height: 24px;
  border: 3px solid currentColor;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: capture-pulse 2s ease-in-out infinite;
}

.capture-dot {
  width: 12px;
  height: 12px;
  background: currentColor;
  border-radius: 50%;
}

.btn-scan {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 
    0 4px 12px rgba(16, 185, 129, 0.3),
    0 2px 6px rgba(16, 185, 129, 0.2);
}

.btn-scan:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #059669, #047857);
  box-shadow: 
    0 6px 16px rgba(16, 185, 129, 0.4),
    0 3px 8px rgba(16, 185, 129, 0.3);
}

/* Upload Area */
.upload-area {
  margin-bottom: 1.5rem;
}

.upload-dropzone {
  border: 3px dashed rgba(164, 180, 101, 0.4);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.upload-dropzone:hover,
.upload-dropzone.dragover {
  border-color: #A4B465;
  background: rgba(164, 180, 101, 0.05);
  transform: translateY(-2px);
  box-shadow: 
    0 10px 30px rgba(164, 180, 101, 0.15),
    0 4px 12px rgba(164, 180, 101, 0.1);
}

.upload-icon {
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.upload-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #626F47;
  margin-bottom: 0.5rem;
}

.upload-subtitle {
  color: #626F47;
  opacity: 0.7;
  margin-bottom: 1rem;
}

.upload-formats {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.format-badge {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #A4B465, #626F47);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.upload-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* File Preview */
.file-preview {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(164, 180, 101, 0.2);
  margin-bottom: 1.5rem;
}

.preview-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.remove-btn {
  width: 36px;
  height: 36px;
  background: #ef4444;
  color: white;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.18);
  z-index: 3;
  padding: 0;
}

.remove-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.file-info {
  text-align: center;
}

.file-name,
.file-size {
  color: #626F47;
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.file-name {
  font-weight: 600;
}

.file-size {
  opacity: 0.7;
}

/* Results Link */
.results-link {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 2rem;
  background: rgba(255, 207, 80, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 207, 80, 0.3);
  color: #626F47;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 
    0 8px 25px rgba(255, 207, 80, 0.2),
    0 4px 12px rgba(255, 207, 80, 0.15);
}

.results-link:hover {
  transform: translateY(-3px) scale(1.02);
  background: rgba(255, 207, 80, 1);
  box-shadow: 
    0 12px 35px rgba(255, 207, 80, 0.3),
    0 6px 16px rgba(255, 207, 80, 0.2);
}

.results-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #626F47, #A4B465);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.results-text {
  flex: 1;
  text-align: left;
}

.results-title {
  display: block;
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.results-subtitle {
  display: block;
  opacity: 0.7;
  font-size: 0.875rem;
}

.results-arrow {
  color: #626F47;
  opacity: 0.7;
}

/* Camera Controls */
.camera-controls {
  margin-top: 1.5rem;
}

/* Animations */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-10px) rotate(2deg); 
  }
}

@keyframes float-delay {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-15px) rotate(-2deg); 
  }
}

@keyframes animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes animate-float-delay {
  animation: float-delay 8s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes animate-bounce-slow {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes scan-pulse {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
}

@keyframes capture-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes success-bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .glass-card {
    padding: 1.5rem !important;
    border-radius: 20px;
    transition: none !important;
    box-shadow: 0 4px 12px rgba(98, 111, 71, 0.08) !important;
  }
  .glass-card:hover {
    transform: none !important;
    box-shadow: 0 4px 12px rgba(98, 111, 71, 0.08) !important;
  }
  .upload-dropzone {
    transition: none !important;
    box-shadow: none !important;
    transform: none !important;
  }
  .upload-dropzone:hover,
  .upload-dropzone.dragover {
    box-shadow: none !important;
    transform: none !important;
  }
  .btn-primary-large,
  .btn-secondary,
  .btn-capture,
  .btn-scan {
    transition: none !important;
    box-shadow: none !important;
    transform: none !important;
  }
  .btn-primary-large:hover,
  .btn-secondary:hover,
  .btn-capture:hover,
  .btn-scan:hover {
    box-shadow: none !important;
    transform: none !important;
  }
  .upload-icon,
  .animate-float,
  .animate-float-delay,
  .animate-pulse-slow {
    animation: none !important;
  }
  .success-badge {
    animation: none !important;
  }
  .scan-frame {
    animation: none !important;
  }
}

/* Tambahan responsif untuk kamera di mobile */
@media (max-width: 640px) {
  .camera-preview-container {
    margin-bottom: 1.5rem;
  }
  .camera-preview {
    aspect-ratio: 1;
    min-height: unset;
    max-height: unset;
    width: 100%;
    border-radius: 20px;
    border-width: 3px;
    padding: 0;
  }
  .camera-video,
  .captured-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 17px;
  }
  /* Hanya kamera yang diubah, card dan button tetap kecil */
  .glass-card,
  .btn-primary-large,
  .btn-secondary,
  .btn-capture,
  .btn-scan {
    font-size: 1rem !important;
    padding: 0.75rem 1rem !important;
    border-radius: 12px !important;
    box-shadow: none !important;
    transition: none !important;
  }
}

/* Enhanced focus states */
button:focus,
select:focus {
  outline: 2px solid rgba(164, 180, 101, 0.5);
  outline-offset: 2px;
}

/* Better text selection */
::selection {
  background: rgba(164, 180, 101, 0.3);
  color: #626F47;
}

::-moz-selection {
  background: rgba(164, 180, 101, 0.3);
  color: #626F47;
}

.glass-tab-group {
  background: rgba(254, 250, 224, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(98, 111, 71, 0.08);
  padding: 0.25rem;
  gap: 1rem;
}
.glass-tab {
  background: rgba(255,255,255,0.25);
  border: none;
  box-shadow: 0 2px 8px 0 rgba(98, 111, 71, 0.04);
  transition: all 0.2s;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.glass-tab-active {
  background: linear-gradient(90deg, #A4B465 0%, #626F47 100%);
  color: #fff !important;
  box-shadow: 0 4px 16px 0 rgba(98, 111, 71, 0.12);
  transform: scale(1.05);
}
.glass-tab-inactive {
  background: rgba(255,255,255,0.15);
  color: #626F47 !important;
}
@media (max-width: 640px) {
  .glass-tab-group {
    gap: 0.75rem;
    padding: 0.15rem;
  }
  .glass-tab {
    font-size: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>

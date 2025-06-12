<template>
  <div class="min-h-screen flex flex-col justify-between bg-[#FEFAE0] font-['Montserrat','Open Sans',sans-serif]"
    style="background: linear-gradient(135deg, #FEFAE0 0%, #FEFAE0 40%, rgba(255,255,255,0.9) 60%, #FEFAE0 100%); font-family: 'Montserrat', 'Open Sans', sans-serif;">
    <Header />
    <div v-if="renderError" class="bg-red-100 text-red-700 p-4 m-4 rounded shadow text-center">
      <b>Terjadi error pada render:</b>
      <div class="text-xs mt-2">{{ renderError }}</div>
    </div>
    <!-- Main Content -->
    <div v-else class="flex-1 main-content pt-24 lg:pt-28 xl:pt-32 px-2 sm:px-8 relative z-10 flex flex-col items-center justify-center w-full min-h-[80vh]">
      <div class="text-center mb-6 sm:mb-8 w-full flex flex-col items-center justify-center" data-aos="fade-down">
        <h1 class="text-2xl sm:text-4xl font-bold mb-2 text-brand-forest animate-fade-in">Aksi Jagat</h1>
        <p class="text-brand-forest/70 text-base sm:text-xl max-w-md mx-auto animate-fade-in delay-100">Upload foto sampah, pilih jenis, dan dapatkan rekomendasi penanganan terbaik!</p>
      </div>
      <div class="w-full flex flex-col items-center justify-center">
        <div class="max-w-lg w-full mb-6 sm:mb-8 flex items-center justify-center px-0 sm:px-0">
          <div class="glass-card w-full p-4 sm:p-8 relative overflow-hidden group bg-gradient-to-br from-brand-yellow/80 via-brand-cream/90 to-white/90 border border-brand-sage/30 shadow-2xl text-brand-forest rounded-2xl animate-fade-in-up mb-6 sm:mb-8 flex flex-col items-center">
            <!-- Upload Area -->
            <div class="upload-area mb-6">
              <div
                class="upload-dropzone flex flex-col items-center justify-center border-2 border-dashed border-brand-sage/50 rounded-xl p-6 bg-white/60 transition-all duration-300 hover:shadow-lg hover:bg-brand-sage/10 cursor-pointer"
                :class="{ 'ring-2 ring-brand-yellow': isDragOver }"
                @dragover.prevent="handleDragOver"
                @dragleave.prevent="handleDragLeave"
                @drop.prevent="handleDrop"
                @click="triggerFileInput"
              >
                <div class="upload-icon mb-2">
                  <svg class="w-14 h-14 text-brand-yellow drop-shadow-lg animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
                <h3 class="upload-title text-lg font-semibold text-brand-forest">Upload Foto Sampah</h3>
                <p class="upload-subtitle text-brand-forest/70 text-sm mb-2">Drag & drop atau klik untuk memilih file gambar</p>
                <div class="upload-formats flex gap-2 mb-2">
                  <span class="format-badge bg-brand-sage/30 text-brand-forest px-2 py-0.5 rounded text-xs">JPG</span>
                  <span class="format-badge bg-brand-sage/30 text-brand-forest px-2 py-0.5 rounded text-xs">JPEG</span>
                  <span class="format-badge bg-brand-sage/30 text-brand-forest px-2 py-0.5 rounded text-xs">PNG</span>
                </div>
                <input class="upload-input hidden" id="file_input" type="file" accept="image/jpeg,image/png,image/jpg" @change="handleFileChange">
              </div>
            </div>
            <!-- File Preview -->
            <transition name="fade">
              <div v-if="selectedFile" class="file-preview animate-fade-in-up" data-aos="zoom-in" data-aos-delay="500">
                <div class="preview-container flex flex-col items-center gap-2">
                  <img :src="filePreviewUrl" alt="Selected file" class="preview-image w-28 h-28 object-cover rounded-xl border border-brand-sage/30 shadow-md" />
                  <div class="preview-overlay">
                    <button @click="removeFile" class="remove-btn absolute top-2 right-2 bg-brand-yellow/80 hover:bg-brand-yellow text-brand-forest rounded-full p-1 shadow transition">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <div class="file-info text-xs text-brand-forest/70">
                    <p class="file-name">📁 {{ selectedFile.name }}</p>
                    <p class="file-size">📏 {{ formatFileSize(selectedFile.size) }}</p>
                  </div>
                </div>
              </div>
            </transition>
            <!-- Waste Validation Form -->
            <form @submit.prevent="submitWasteValidation" class="space-y-4 mt-4 animate-fade-in-up delay-200">
              <div class="form-group">
                <label class="form-label font-semibold text-brand-forest">Jenis Sampah</label>
                <select v-model="wasteType" class="form-select w-full rounded-lg border border-brand-sage/40 px-3 py-2 focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition" required>
                  <option value="">Pilih Jenis Sampah</option>
                  <option value="Daun">Daun</option>
                  <option value="Kaca">Kaca</option>
                  <option value="Karet">Karet</option>
                  <option value="Kayu">Kayu</option>
                  <option value="Kertas">Kertas</option>
                  <option value="Logam">Logam</option>
                  <option value="Plastik">Plastik</option>
                  <option value="Styrofoam">Styrofoam</option>
                  <option value="Tekstil">Tekstil</option>
                  <option value="Sisa Makanan">Sisa Makanan</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label font-semibold text-brand-forest">Deskripsi Singkat</label>
                <input v-model="description" class="form-input w-full rounded-lg border border-brand-sage/40 px-3 py-2 focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition" type="text" placeholder="Contoh: Botol plastik bekas minuman" required />
              </div>
              <div class="form-group flex gap-2">
                <div class="flex-1">
                  <label class="form-label font-semibold text-brand-forest">Tanggal</label>
                  <input v-model="date" class="form-input w-full rounded-lg border border-brand-sage/40 px-3 py-2 focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition cursor-not-allowed bg-gray-100 text-gray-500" type="date" required readonly tabindex="-1" />
                </div>
                <div class="flex-1">
                  <label class="form-label font-semibold text-brand-forest">Waktu</label>
                  <input v-model="time" class="form-input w-full rounded-lg border border-brand-sage/40 px-3 py-2 focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition cursor-not-allowed bg-gray-100 text-gray-500" type="time" required readonly tabindex="-1" />
                </div>
              </div>
              <div class="flex gap-2">
                <button class="btn-primary-large flex-1 bg-gradient-to-r from-brand-yellow to-brand-sage text-brand-forest hover:from-brand-sage hover:to-brand-yellow font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-1" type="submit" :disabled="!selectedFile || !wasteType || !description || !date || !time || submitting">
                  Validasi Sampah
                </button>
                <button v-if="selectedFile" class="btn-secondary bg-brand-sage/80 hover:bg-brand-yellow text-brand-forest font-bold shadow transition" type="button" @click="removeFile">
                  <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Hapus
                </button>
              </div>
            </form>
            <!-- Rekomendasi Penanganan -->
            <transition name="fade">
              <div v-if="recommendation" class="mt-6 animate-fade-in-up">
                <div class="inline-block px-6 py-4 rounded-2xl shadow-lg bg-white/80 border border-brand-sage/30">
                  <div class="text-lg font-semibold text-brand-forest mb-2">Rekomendasi Penanganan</div>
                  <div class="text-base text-brand-sage mb-1">{{ recommendation }}</div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!-- Pisahkan Card Riwayat -->
        <div class="max-w-2xl w-full flex flex-col items-center justify-center px-0 sm:px-0">
          <div class="glass-card w-full p-4 sm:p-8 relative overflow-hidden group bg-gradient-to-br from-white/90 via-brand-cream/90 to-brand-yellow/80 border border-brand-sage/30 shadow-2xl text-brand-forest rounded-2xl animate-fade-in-up flex flex-col items-center">
            <h2 class="text-lg sm:text-xl font-bold mb-4 text-brand-forest animate-fade-in text-center w-full">Riwayat Validasi Sampah</h2>
            <div v-if="loadingHistory" class="text-center py-8 w-full">
              <LoadingIndicator :visible="true" message="Mengambil riwayat validasi..." />
            </div>
            <div v-else-if="historyError" class="bg-white rounded-lg shadow-md p-6 border border-red-200 text-center animate-fade-in-up w-full max-w-lg mx-auto">
              <svg class="w-16 h-16 mx-auto mb-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"/>
              </svg>
              <h3 class="text-lg font-semibold text-red-600 mb-2">Gagal Mengambil Riwayat</h3>
              <p class="text-red-500">{{ historyError }}</p>
            </div>
            <div v-else-if="wasteHistory.length === 0" class="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center animate-fade-in-up w-full max-w-lg mx-auto">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 class="text-lg font-semibold text-gray-600 mb-2">Belum Ada Validasi</h3>
              <p class="text-gray-500">Riwayat validasi sampah Anda akan muncul di sini.</p>
            </div>
            <transition-group name="fade-list" tag="div" class="space-y-6 w-full flex flex-col items-center">
              <div v-for="item in wasteHistory" :key="item.id" class="modern-card w-full max-w-lg flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-br from-brand-yellow/80 via-brand-cream/90 to-white/90 border border-brand-sage/40 shadow-xl rounded-2xl animate-fade-in-up hover:shadow-2xl transition-all duration-300">
                <img :src="getPhotoUrl(item.photo)" alt="Foto Sampah" class="w-24 h-24 object-cover rounded-xl border-2 border-brand-sage/40 shadow-md transition-transform duration-300 hover:scale-105" />
                <div class="flex-1 w-full">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div class="font-bold text-brand-forest text-lg sm:text-xl flex items-center gap-2">
                      <span class="inline-block px-3 py-1 rounded-full bg-brand-sage/20 text-brand-forest/80 text-xs font-semibold tracking-wide border border-brand-sage/40">{{ item.waste_type }}</span>
                      <span class="text-xs text-brand-forest/50">{{ formatDate(item.date) }} {{ item.time }}</span>
                    </div>
                    <div class="flex gap-2 mt-2 sm:mt-0">
                      <button class="btn-secondary bg-brand-sage/90 hover:bg-brand-yellow text-brand-forest font-bold shadow transition px-4 py-2 rounded-lg flex items-center gap-1 text-xs" @click="askDelete(item.id)">
                        <svg class="w-6 h-6 text-brand-forest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                        Hapus
                      </button>
                      <button class="btn-primary bg-brand-yellow/90 hover:bg-brand-sage text-brand-forest font-bold shadow transition px-2 py-2 rounded-lg flex items-center gap-1 text-xs w-auto text-left" @click="openRecommendation(item.waste_type)">
                        <svg class="w-5 h-5 text-brand-forest flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        Rekomendasi Penanganan
                      </button>
                    </div>
                  </div>
                  <div class="text-sm text-brand-forest/80 mb-1 font-medium">{{ item.description }}</div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom Navigation -->
    <BottomNav active="history" />
    <LoadingIndicator v-if="globalLoading" :visible="true" message="Memuat Aksi Jagat..." class="fixed inset-0 z-50" />

    <!-- Modal Rekomendasi Penanganan Sampah -->
    <transition name="fade">
      <div v-if="showRecommendationModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="bg-white max-w-2xl w-full rounded-2xl shadow-2xl p-8 relative animate-fade-in-up border border-brand-sage/30 max-h-[90vh] overflow-y-auto sm:max-h-[80vh] sm:p-8 sm:my-8 mx-2">
          <button @click="closeRecommendation" class="absolute top-4 right-4 bg-brand-yellow/90 hover:bg-brand-yellow text-brand-forest rounded-full p-2 shadow transition">
            <svg class="w-6 h-6 text-brand-forest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
          <div class="text-2xl font-extrabold text-brand-forest mb-4 text-center">{{ selectedRecommendation.title }}</div>
          <div class="prose prose-sm max-w-none text-brand-forest/90 prose-a:text-brand-yellow prose-a:underline prose-a:font-semibold prose-ul:mb-2 prose-li:mb-1 prose-ol:mb-1 prose-strong:text-brand-forest prose-strong:font-bold prose-blockquote:italic prose-blockquote:text-brand-sage prose-blockquote:border-brand-yellow prose-blockquote:bg-brand-yellow/10 prose-blockquote:rounded-lg prose-blockquote:p-2 prose-blockquote:my-2 prose-h4:font-bold prose-h4:text-brand-sage prose-h4:mb-1 prose-h5:font-semibold prose-h5:text-brand-sage prose-h5:mb-1 prose-p:mb-2 prose-p:leading-relaxed prose-p:text-base prose-p:text-brand-forest" v-html="selectedRecommendation.content"></div>
        </div>
      </div>
    </transition>

    <!-- Confirm Dialog -->
    <ConfirmDialog :visible="showConfirmDialog" :message="confirmMessage" @ok="onConfirmDelete" @cancel="onCancelDelete" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import BottomNav from '../components/BottomNav.vue'
import Header from '../components/Header.vue'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const renderError = ref('')
const globalLoading = ref(true)
const selectedFile = ref(null)
const filePreviewUrl = ref('')
const isDragOver = ref(false)
const wasteType = ref('')
const description = ref('')
const getCurrentTimeHM = () => {
  const now = new Date()
  const h = now.getHours().toString().padStart(2, '0')
  const m = now.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}
const date = ref(new Date().toISOString().slice(0, 10))
const time = ref(getCurrentTimeHM())
const submitting = ref(false)
const recommendation = ref('')
const wasteHistory = ref([])
const loadingHistory = ref(false)
const historyError = ref('')

const showRecommendationModal = ref(false)
const selectedRecommendation = ref({ title: '', content: '' })
const showConfirmDialog = ref(false)
const itemToDelete = ref(null)
const confirmMessage = ref('')

const wasteRecommendations = {
  'Kaca': {
    title: 'Penanganan Sampah Kaca',
    content: `
<b>Reduce: Kurangi Penggunaan Barang Kaca Sekali Pakai</b><br>
<ul>
<li>Gunakan wadah kaca yang dapat diisi ulang, seperti botol minuman atau toples makanan.</li>
<li>Pilih produk dalam kemasan isi ulang daripada kemasan kaca baru.</li>
<li>Hindari membeli barang kaca yang tidak diperlukan.</li>
</ul>
<b>Reuse: Gunakan Kembali Botol Kaca</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li><b>Pembersihan:</b> Cuci botol kaca menggunakan air hangat dan sabun. Untuk menghilangkan label, gunakan air panas atau cairan penghilang lemak.</li>
    <li><b>Sterilisasi:</b> Rendam botol kaca dalam air mendidih selama 10-15 menit untuk membunuh bakteri.</li>
    <li><b>Pemanfaatan Ulang:</b>
      <ul>
        <li>Gunakan untuk menyimpan air minum, minyak, atau cairan lain.</li>
        <li>Jadikan pot mini untuk tanaman hias seperti sukulen. <a href='https://www.youtube.com/watch?v=2TuLyJrnlro&pp=ygUMUmVkdUNCYWNh' target='_blank'>Lihat Contoh</a></li>
        <li>Manfaatkan sebagai dekorasi dengan menambahkan cat atau lampu kecil di dalamnya. <a href='https://www.youtube.com/watch?v=Ikd8O8eW2AU&pp=ygUVaGlhc2FuIGthY2EgZGFuIGxhbXB1' target='_blank'>Lihat Contoh</a></li>
      </ul>
    </li>
    <li><b>Keamanan:</b>
      <ul>
        <li>Pastikan botol tidak retak untuk menghindari pecah saat digunakan.</li>
        <li>Jangan gunakan botol bekas minuman untuk menyimpan bahan kimia berbahaya.</li>
      </ul>
    </li>
  </ul>
</li>
</ul>
<b>Recycle: Kirim ke Tempat Daur Ulang</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Pisahkan kaca dari tutup logam atau plastik.</li>
    <li>Pastikan kaca dalam keadaan bersih dari sisa makanan atau cairan.</li>
    <li>Hancurkan kaca menjadi potongan kecil jika perlu (selalu utamakan keselamatan).</li>
    <li>Kirim ke bank sampah atau fasilitas daur ulang terdekat yang menerima kaca.</li>
  </ul>
</li>
</ul>
`},
  'Logam': {
    title: 'Penanganan Sampah Logam',
    content: `
<b>Reduce: Kurangi Konsumsi Produk Berkemasan Logam</b><br>
<ul>
<li>Pilih produk dengan kemasan isi ulang atau alternatif yang dapat digunakan kembali.</li>
<li>Beli produk dalam ukuran besar untuk mengurangi jumlah kemasan kaleng.</li>
</ul>
<b>Reuse: Gunakan Kaleng/Logam Bekas sebagai Wadah</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li><b>Pembersihan:</b> Cuci bersih kaleng dengan air hangat dan sabun, sikat bagian dalamnya, lalu keringkan.</li>
    <li><b>Pemanfaatan Ulang:</b>
      <ul>
        <li>Jadikan pot tanaman kecil untuk bunga atau herba. <a href='https://www.youtube.com/watch?v=p1-A4NqoE2E&pp=ygUVcG90IGRhcmkga2FsZW5nIGJla2Fz' target='_blank'>Lihat Contoh</a></li>
        <li>Gunakan sebagai tempat alat tulis seperti pensil dan pulpen. <a href='https://www.youtube.com/watch?v=JY6F-htaUXs&pp=ugMICgJpZBABGAHKBR50ZW1wYXQgYWxhdCB0dWxpcyBrYWxlbmcgYmVrYXM%3D' target='_blank'>Lihat Contoh</a></li>
        <li>Hias menjadi tempat lilin atau dekorasi rumah lainnya. <a href='https://www.youtube.com/watch?v=0zpT7tFIxE0&pp=ygUVcG90IGRhcmkga2FsZW5nIGJla2Fz' target='_blank'>Lihat Contoh</a></li>
      </ul>
    </li>
    <li><b>Keamanan:</b>
      <ul>
        <li>Haluskan bagian pinggir kaleng yang tajam menggunakan amplas.</li>
        <li>Hindari menggunakan kaleng berkarat untuk menyimpan makanan.</li>
      </ul>
    </li>
  </ul>
</li>
</ul>
<b>Recycle: Kirim ke Tempat Pengolahan Logam</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Bersihkan kaleng dari sisa isi.</li>
    <li>Pipihkan atau remas kaleng untuk menghemat ruang.</li>
    <li>Pisahkan logam aluminium dari jenis lainnya jika memungkinkan.</li>
    <li>Serahkan ke bank sampah atau pusat daur ulang logam.</li>
  </ul>
</li>
</ul>
`},
  'Plastik': {
    title: 'Penanganan Sampah Plastik',
    content: `
<b>Reduce: Kurangi Penggunaan Plastik Sekali Pakai</b><br>
<ul>
<li>Selalu bawa tas belanja kain atau tote bag.</li>
<li>Pilih produk dengan kemasan minimal atau ramah lingkungan.</li>
<li>Hindari penggunaan sedotan, sendok, dan garpu plastik.</li>
</ul>
<b>Reuse: Gunakan Ulang Botol/Kantong Plastik</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li><b>Pembersihan:</b> Cuci botol atau kantong plastik dengan air sabun hangat dan keringkan.</li>
    <li><b>Pemanfaatan Ulang:</b>
      <ul>
        <li><b>Botol Plastik:</b> Gunakan untuk proyek DIY seperti pot gantung atau tempat penyimpanan. <a href='https://www.youtube.com/watch?v=NdxuTQUztJY&pp=ygUmcG90IHRhbmFtYW4gZ2FudHVuZyBkYXJpIGJvdG9sIHBsYXN0aWs%3D' target='_blank'>Contoh 1</a>, <a href='https://www.youtube.com/watch?v=fGSrfcOXKBU&pp=ygUibWVyYXBpa2FuIGthYmVsIGRhcmkgYm90b2wgcGxhc3Rpaw%3D%3D' target='_blank'>Contoh 2</a></li>
        <li><b>Kantong Plastik:</b> Manfaatkan untuk kerajinan tangan seperti tas rajut atau sebagai kantong sampah kecil. <a href='https://www.youtube.com/watch?v=dApZuhsfQfY&pp=ygUZdGlrYXIgcGxhc3RpayBkYXVyIHVsYW5nINIHCQmyCQGHKiGM7w%3D%3D' target='_blank'>Lihat Contoh</a></li>
      </ul>
    </li>
    <li><b>Keamanan:</b>
      <ul>
        <li>Jangan gunakan plastik yang sudah kusam, retak, atau berbau.</li>
        <li>Hindari mengisi botol plastik (terutama tipe PETE 1) dengan air panas atau makanan berlemak.</li>
      </ul>
    </li>
  </ul>
</li>
</ul>
<b>Recycle: Kirim ke Tempat Daur Ulang Plastik</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Pisahkan plastik berdasarkan kodenya (misalnya, PET, HDPE) yang biasanya ada di bagian bawah kemasan.</li>
    <li>Pastikan plastik dalam kondisi bersih.</li>
    <li>Kirim ke bank sampah atau fasilitas daur ulang yang sesuai.</li>
  </ul>
</li>
</ul>
`},
  'Styrofoam': {
    title: 'Penanganan Sampah Styrofoam',
    content: `
<b>Reduce: Hindari Penggunaan Styrofoam</b><br>
<ul>
<li>Pilih kemasan makanan dari bahan ramah lingkungan seperti karton, kertas, atau bioplastik.</li>
<li>Gunakan kotak makan pribadi yang dapat digunakan ulang.</li>
<li>Tolak penggunaan produk sekali pakai berbahan styrofoam.</li>
</ul>
<b>Reuse: Gunakan untuk Kerajinan (Jika Terpaksa Ada)</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li><b>Pembersihan:</b> Cukup lap styrofoam dengan kain basah dan biarkan kering.</li>
    <li><b>Pemanfaatan Ulang:</b>
      <ul>
        <li>Gunakan sebagai bahan dekorasi seperti bingkai foto. <a href='https://www.youtube.com/watch?v=rOBupNz16e4&pp=ygUbYmluZ2thaSBmb3RvIGRhcmkgc3R5cm9mb2Ft0gcJCbIJAYcqIYzv' target='_blank'>Lihat Contoh</a></li>
        <li>Manfaatkan untuk membuat model atau miniatur. <a href='https://www.youtube.com/watch?v=8vXOeZ7br4s&pp=ygUecmVwbGlrYSBwZXNhd2F0IGRhcmkgc3R5cm9mb2Ft' target='_blank'>Lihat Contoh</a></li>
        <li>Pakai sebagai pelindung saat mengirim barang pecah belah.</li>
      </ul>
    </li>
    <li><b>Keamanan:</b>
      <ul>
        <li>Jangan gunakan styrofoam untuk makanan panas atau berminyak.</li>
        <li>Gunakan cutter panas saat memotong agar tidak berantakan.</li>
      </ul>
    </li>
  </ul>
</li>
</ul>
<b>Recycle: Daur Ulang Styrofoam Secara Khusus</b><br>
<ul>
<li>Kumpulkan styrofoam dalam kondisi bersih dan kering.</li>
<li>Cari informasi mengenai pusat daur ulang khusus styrofoam di kota Anda, karena tidak semua tempat daur ulang menerimanya.</li>
</ul>
`},
  'Tekstil': {
    title: 'Penanganan Sampah Tekstil',
    content: `
<b>Reduce: Kurangi Pembelian Tekstil yang Tidak Perlu</b><br>
<ul>
<li>Pilih pakaian berkualitas tinggi yang awet dan tahan lama.</li>
<li>Hindari tren fast fashion yang menghasilkan banyak limbah.</li>
<li>Alih fungsikan pakaian lama menjadi kain lap atau pembersih.</li>
</ul>
<b>Reuse: Sumbangkan Pakaian Bekas Layak Pakai</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Pilahlah pakaian yang masih dalam kondisi baik.</li>
    <li>Cuci bersih pakaian tersebut sebelum disumbangkan.</li>
    <li>Donasikan ke panti asuhan, organisasi sosial, atau korban bencana.</li>
  </ul>
</li>
</ul>
<b>Recycle: Olah Pakaian Menjadi Produk Baru</b><br>
<ul>
<li>Potong kain dari pakaian bekas untuk dijadikan bahan kerajinan tangan, seperti tas jinjing, dompet, atau bantal hias. <a href='https://www.youtube.com/watch?v=OuG2D_JZpqg&pp=ygUTdGFzIGRhcmkga2FpbiBwZXJjYQ%3D%3D' target='_blank'>Contoh 1</a>, <a href='https://www.youtube.com/watch?v=uAxIeAwMLpQ&pp=ygUWYmFudGFsIGRhcmkga2FpbiBwZXJjYQ%3D%3D' target='_blank'>Contoh 2</a></li>
</ul>
`},
  'Karet': {
    title: 'Penanganan Sampah Karet',
    content: `
<b>Reduce: Kurangi Produk Karet Sekali Pakai</b><br>
<ul>
<li>Hindari membeli barang karet yang tidak esensial seperti karet gelang berlebihan.</li>
<li>Pilih produk karet yang tahan lama, contohnya sepatu berkualitas.</li>
</ul>
<b>Reuse: Gunakan Ban Bekas untuk Pot atau Furnitur</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Bersihkan ban bekas dari kotoran.</li>
    <li>Lubangi bagian bawah ban untuk drainase air jika dijadikan pot.</li>
    <li>Cat ulang ban agar terlihat lebih menarik dan estetik. <a href='https://www.youtube.com/watch?v=Jpt86_4qv1Q&pp=ygUfY2FyYSBtZW1idWF0IHBvdCBkYXJpIGJhbiBiZWthcw%3D%3D' target='_blank'>Lihat Contoh</a></li>
  </ul>
</li>
</ul>
<b>Recycle: Daur Ulang Karet ke Pusat Pengolahan</b><br>
<ul>
<li>Kumpulkan sampah karet seperti ban atau sol sepatu bekas.</li>
<li>Kirim ke pusat daur ulang khusus karet untuk diolah menjadi produk baru seperti aspal karet atau lantai taman bermain.</li>
</ul>
`},
  'Kertas': {
    title: 'Penanganan Sampah Kertas',
    content: `
<b>Reduce: Kurangi Penggunaan Kertas</b><br>
<ul>
<li>Gunakan kedua sisi kertas sebelum membuangnya.</li>
<li>Pilih komunikasi dan dokumen digital (email, e-book) daripada versi cetak.</li>
<li>Gunakan kain lap yang bisa dicuci sebagai pengganti tisu.</li>
</ul>
<b>Reuse: Gunakan Kertas Bekas untuk Catatan atau Kerajinan</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Kumpulkan kertas yang baru terpakai satu sisi.</li>
    <li>Potong dan jilid menjadi buku catatan kecil. <a href='https://www.youtube.com/watch?v=f_jh-zRPBQo&pp=ugMICgJpZBABGAHKBR5idWt1IGNhdGF0YW4gZGFyaSBrZXJ0YXMgYmVrYXM%3D' target='_blank'>Lihat Contoh</a></li>
    <li>Gunakan untuk kerajinan tangan seperti origami atau amplop buatan sendiri. <a href='https://www.youtube.com/watch?v=I5-9Aoj8pY0&pp=ygUYYW1wbG9wIGRhcmkga2VydGFzIGJla2Fz' target='_blank'>Contoh 1</a>, <a href='https://www.youtube.com/watch?v=54xkc36aOXc&pp=ygUZb3JpZ2FtaSBkYXJpIGtlcnRhcyBiZWthcw%3D%3D' target='_blank'>Contoh 2</a></li>
  </ul>
</li>
</ul>
<b>Recycle: Kirim Kertas ke Tempat Daur Ulang</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Pisahkan kertas bersih dari kertas yang terkontaminasi minyak atau plastik.</li>
    <li>Ikat atau masukkan ke dalam kardus agar tidak berceceran.</li>
    <li>Kirim ke bank sampah atau pusat daur ulang kertas.</li>
  </ul>
</li>
</ul>
`},
  'Kayu': {
    title: 'Penanganan Sampah Kayu',
    content: `
<b>Reduce: Pilih Produk Kayu yang Berkelanjutan</b><br>
<ul>
<li>Gunakan produk kayu yang memiliki sertifikasi legal dan berkelanjutan (misalnya, label FSC).</li>
<li>Hindari penggunaan alat makan kayu sekali pakai.</li>
</ul>
<b>Reuse: Ubah Kayu Bekas menjadi Proyek DIY</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Amplas palet atau kayu bekas untuk menghaluskan permukaannya.</li>
    <li>Rakit menjadi furnitur sederhana seperti meja, rak, atau kursi. <a href='https://www.youtube.com/watch?v=4g73E6eRX6o&pp=ugMICgJpZBABGAHKBRVtZWphIGRhcmkgcGFsZXQgYmVrYXPSBwkJsgkBhyohjO8%3D' target='_blank'>Lihat Contoh</a></li>
    <li>Manfaatkan ranting pohon kering menjadi lampu hias. <a href='https://www.youtube.com/watch?v=krIfRNeijpY&pp=ygUba2VyYWppbmFuIGRhcmkgcmFudGluZyBrYXl1' target='_blank'>Lihat Contoh</a></li>
    <li>Lapisi dengan cat atau pernis untuk melindunginya dari cuaca.</li>
  </ul>
</li>
</ul>
<b>Recycle: Daur Ulang Kayu untuk Kompos atau Energi</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Cacah kayu menjadi serpihan kecil untuk dijadikan campuran kompos (sebagai sumber karbon).</li>
    <li>Kirim limbah kayu ke tempat daur ulang yang bisa mengolahnya lebih lanjut.</li>
  </ul>
</li>
</ul>
`},
  'Daun': {
    title: 'Penanganan Sampah Daun',
    content: `
<b>Reduce: Kurangi Tumpukan Sampah Daun</b><br>
<ul>
<li>Biarkan sebagian daun kering di taman sebagai mulsa alami.</li>
<li>Hindari membakar daun karena menyebabkan polusi udara.</li>
</ul>
<b>Reuse: Gunakan Daun Kering Sebagai Mulsa</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Kumpulkan daun-daun kering.</li>
    <li>Sebarkan di sekitar pangkal tanaman untuk menjaga kelembapan tanah dan menekan pertumbuhan gulma.</li>
    <li>Tambahkan sedikit tanah di atasnya agar tidak tertiup angin. <a href='https://www.youtube.com/watch?v=GIxo9aVQFAY&pp=ygURbXVsc2EgZGF1biBrZXJpbmc%3D' target='_blank'>Lihat Contoh</a></li>
  </ul>
</li>
</ul>
<b>Recycle: Daur Ulang Daun Menjadi Kompos</b><br>
<ul>
<li><b>Langkah-langkah:</b> <a href='https://www.youtube.com/watch?v=QDxOGRj5VMM&pp=ygUUbWVtYnVhdCBwdXB1ayBrb21wb3M%3D' target='_blank'>Lihat Video Panduan</a>
  <ol>
    <li><b>Siapkan Bahan:</b> Campurkan daun kering (bahan cokelat/karbon) dengan sampah hijau seperti sisa sayur (bahan hijau/nitrogen).</li>
    <li><b>Siapkan Wadah:</b> Gunakan komposter, lubang di tanah, atau wadah berventilasi.</li>
    <li><b>Susun Lapisan:</b> Buat lapisan selang-seling antara bahan cokelat dan hijau dengan rasio 2:1.</li>
    <li><b>Jaga Kelembapan:</b> Siram sedikit air agar adonan lembap seperti spons basah.</li>
    <li><b>Aduk Rutin:</b> Aduk tumpukan kompos setiap 1-2 minggu sekali untuk memberi oksigen.</li>
    <li><b>Panen Kompos:</b> Dalam 1-3 bulan, kompos akan matang (berwarna gelap, berbau tanah) dan siap digunakan.</li>
  </ol>
</li>
</ul>
`},
  'Sisa Makanan': {
    title: 'Penanganan Sisa Makanan',
    content: `
<b>Reduce: Kurangi Sisa Makanan dari Sumbernya</b><br>
<ul>
<li>Ambil makanan secukupnya dan habiskan.</li>
<li>Rencanakan menu masakan mingguan agar tidak ada bahan yang terbuang.</li>
<li>Simpan makanan dengan benar agar tidak cepat busuk.</li>
</ul>
<b>Reuse: Olah Sisa Makanan Menjadi Pakan Ternak</b><br>
<ul>
<li><b>Langkah-langkah:</b>
  <ul>
    <li>Pisahkan sisa makanan yang masih layak (tidak basi).</li>
    <li>Pastikan makanan tersebut aman untuk ternak (misalnya, tidak terlalu pedas atau mengandung bahan berbahaya).</li>
    <li>Berikan kepada peternak lokal atau untuk hewan ternak peliharaan. <a href='https://www.youtube.com/watch?v=tFx28W5LVmU&pp=ygUmT2xhaCBTaXNhIE1ha2FuYW4gTWVuamFkaSBQYWthbiBUZXJuYWs%3D' target='_blank'>Lihat Contoh</a></li>
  </ul>
</li>
</ul>
<b>Recycle: Daur Ulang Sisa Makanan Menjadi Kompos</b><br>
<ul>
<li><b>Langkah-langkah:</b> <a href='https://www.youtube.com/watch?v=QDxOGRj5VMM&pp=ygUUbWVtYnVhdCBwdXB1ayBrb21wb3M%3D' target='_blank'>Lihat Video Panduan</a>
  <ol>
    <li><b>Siapkan Bahan:</b> Campurkan sisa makanan organik (bahan hijau/nitrogen) dengan bahan kering seperti daun kering atau kardus (bahan cokelat/karbon).</li>
    <li><b>Siapkan Wadah:</b> Gunakan komposter, lubang di tanah, atau wadah berventilasi.</li>
    <li><b>Susun Lapisan:</b> Buat lapisan selang-seling antara bahan cokelat dan hijau dengan rasio 2:1.</li>
    <li><b>Jaga Kelembapan:</b> Siram sedikit air agar adonan lembap.</li>
    <li><b>Aduk Rutin:</b> Aduk tumpukan kompos setiap 1-2 minggu sekali.</li>
    <li><b>Panen Kompos:</b> Dalam 1-3 bulan, kompos matang siap digunakan untuk menyuburkan tanaman.</li>
  </ol>
</li>
</ul>
`}
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function handleFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!allowedTypes.includes(file.type)) return
  selectedFile.value = file
  createFilePreview(file)
}

function createFilePreview(file) {
  if (filePreviewUrl.value) URL.revokeObjectURL(filePreviewUrl.value)
  filePreviewUrl.value = URL.createObjectURL(file)
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

function handleDragOver() { isDragOver.value = true }
function handleDragLeave() { isDragOver.value = false }
function handleDrop(e) {
  isDragOver.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (allowedTypes.includes(file.type)) {
      selectedFile.value = file
      createFilePreview(file)
    }
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

function getPhotoUrl(photo) {
  if (!photo) return ''
  if (photo.startsWith('http')) return photo
  const base = import.meta.env.VITE_API_URL.replace(/\/$/, '')
  const url = `${base}/${photo.replace(/^\/+/,'')}`
  return url
}

async function submitWasteValidation() {
  if (!selectedFile.value || !wasteType.value || !description.value || !date.value || !time.value) return
  submitting.value = true
  globalLoading.value = true
  recommendation.value = ''
  try {
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    formData.append('waste_type', wasteType.value)
    formData.append('description', description.value)
    formData.append('date', date.value)
    formData.append('time', time.value)
    const token = localStorage.getItem('token')
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await fetch(`${apiUrl}/waste-validation`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
    const data = await res.json()
    if (data.status === 'success') {
      await fetchRecommendation()
      await fetchWasteHistory()
      removeFile()
      wasteType.value = ''
      description.value = ''
      date.value = new Date().toISOString().slice(0, 10)
      time.value = getCurrentTimeHM()
    } else {
      alert(data.message || 'Gagal validasi')
    }
  } catch (err) {
    alert(err.message || 'Gagal validasi')
  } finally {
    submitting.value = false
    globalLoading.value = false
  }
}

async function fetchRecommendation() {
  if (!wasteType.value) return
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await fetch(`${apiUrl}/waste-recommendation?type=${encodeURIComponent(wasteType.value)}`)
    const data = await res.json()
    if (data.status === 'success' && data.recommendation) {
      recommendation.value = data.recommendation
    } else {
      recommendation.value = '' // Jangan tampilkan fallback generic
    }
  } catch {
    recommendation.value = '' // Jangan tampilkan fallback generic
  }
}

async function fetchWasteHistory() {
  loadingHistory.value = true
  historyError.value = ''
  try {
    const token = localStorage.getItem('token')
    const apiUrl = import.meta.env.VITE_API_URL
    if (!token) {
      historyError.value = 'Anda belum login. Silakan login ulang.'
      wasteHistory.value = []
      return
    }
    if (!apiUrl) {
      historyError.value = 'Konfigurasi API tidak ditemukan.'
      wasteHistory.value = []
      return
    }
    const res = await fetch(`${apiUrl}/waste-validation/history`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Gagal mengambil data history')
    const data = await res.json()
    if (data.status === 'success') {
      wasteHistory.value = data.history || []
    } else {
      historyError.value = data.message || 'Gagal mengambil data history.'
      wasteHistory.value = []
    }
  } catch (e) {
    historyError.value = e.message || 'Gagal mengambil data history.'
    wasteHistory.value = []
  } finally {
    loadingHistory.value = false
    globalLoading.value = false // pastikan loading global dimatikan setelah fetch selesai
  }
}

async function deleteWaste(id) {
  globalLoading.value = true
  try {
    const token = localStorage.getItem('token')
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await fetch(`${apiUrl}/waste-validation/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    if (data.status === 'success') {
      await fetchWasteHistory()
    } else {
      alert(data.message || 'Gagal menghapus data')
    }
  } catch (err) {
    alert(err.message || 'Gagal menghapus data')
  } finally {
    globalLoading.value = false
  }
}

function triggerFileInput() {
  const fileInput = document.getElementById('file_input')
  if (fileInput) fileInput.click()
}

function openRecommendation(wasteType) {
  const rec = wasteRecommendations[wasteType]
  if (rec) {
    selectedRecommendation.value = rec
    showRecommendationModal.value = true
  }
}
function closeRecommendation() {
  showRecommendationModal.value = false
}

function askDelete(itemId) {
  itemToDelete.value = itemId
  confirmMessage.value = 'Apakah Anda yakin ingin menghapus riwayat ini?'
  showConfirmDialog.value = true
}
function onConfirmDelete() {
  if (itemToDelete.value) {
    deleteWaste(itemToDelete.value)
  }
  showConfirmDialog.value = false
  itemToDelete.value = null
}
function onCancelDelete() {
  showConfirmDialog.value = false
  itemToDelete.value = null
}

onMounted(() => {
  fetchWasteHistory()
  AOS.init({ once: true }) // Inisialisasi AOS agar animasi muncul setelah reload
})
</script>

<style>
html, body, #app {
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
}
.main-content {
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}
.glass-card {
  box-sizing: border-box;
}
/* Tambahkan style khusus jika diperlukan */
</style>

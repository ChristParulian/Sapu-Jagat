<template>
  <div class="min-h-screen flex flex-col justify-between bg-[#FEFAE0] font-['Montserrat','Open Sans',sans-serif]">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <div class="flex-1 w-full px-2 sm:px-4 pt-20 lg:pt-24 xl:pt-28 pb-8">
      <div class="w-full max-w-lg mx-auto">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-primary text-center">Edukasi Jagat</h1>
        <p class="text-base sm:text-lg md:text-xl mb-8 text-secondary text-center">Pilih kuis yang ingin Anda kerjakan!</p>

        <!-- Quiz Selection -->
        <div v-if="!quizSelected" class="space-y-4 w-full px-4 sm:px-0">
          <button 
            v-for="quiz in quizzes" 
            :key="quiz.title" 
            @click="selectQuiz(quizzes.indexOf(quiz) + 1)" 
            :disabled="completedQuizzes.includes(quizzes.indexOf(quiz) + 1)"
            :class="[
              'w-full bg-primary text-white py-3 px-4 sm:px-6 rounded-lg transition-colors shadow-md text-sm sm:text-base',
              completedQuizzes.includes(quizzes.indexOf(quiz) + 1) ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : 'hover:bg-primary-dark'
            ]"
          >
            {{ quiz.title }}
            <span v-if="completedQuizzes.includes(quizzes.indexOf(quiz) + 1)" class="ml-2 text-xs font-semibold">(Selesai)</span>
          </button>
        </div>

        <!-- Quiz Section -->
        <div v-else class="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mx-2 sm:mx-4">
          <h2 class="text-xl sm:text-2xl font-bold mb-6 text-primary text-center">{{ currentQuizTitle }}</h2>

          <!-- Question Navigation -->
          <div v-if="!quizCompleted" class="space-y-4 sm:space-y-6">
            <div v-if="currentQuestions[currentQuestion - 1].image" class="mb-4 sm:mb-6">
              <img :src="currentQuestions[currentQuestion - 1].image" alt="Question Image" class="w-full rounded-lg shadow-md max-h-[250px] sm:max-h-[300px] object-contain mx-auto" />
            </div>
            <p class="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-secondary">{{ currentQuestion }}. {{ currentQuestions[currentQuestion - 1].question }}</p>
            <div class="space-y-2 sm:space-y-3">
              <button 
                v-for="(option, index) in currentQuestions[currentQuestion - 1].options" 
                :key="index" 
                @click="checkAnswer(index)" 
                class="w-full bg-primary bg-opacity-90 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-primary-dark transition-colors text-left text-sm sm:text-base"
              >
                <span class="inline-block w-6">{{ String.fromCharCode(65 + index) }}.</span>
                {{ option }}
              </button>
            </div>
          </div>

          <!-- Score Display -->
          <div v-if="quizCompleted" class="text-center space-y-4 sm:space-y-6">
            <h2 class="text-xl sm:text-2xl font-bold mb-4 text-primary">Hasil Kuis</h2>
            <div class="space-y-2 sm:space-y-3">
              <p class="text-base sm:text-lg text-secondary">Jawaban Benar: {{ correctAnswers }}</p>
              <p class="text-base sm:text-lg text-secondary">Jawaban Salah: {{ totalQuestions - correctAnswers }}</p>
            </div>
            <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button @click="restartQuiz" class="w-full sm:w-auto bg-primary text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-primary-dark transition-colors shadow-md text-sm sm:text-base">
                Coba Lagi
              </button>
              <button @click="goToMainPage" class="w-full sm:w-auto bg-secondary text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-secondary-dark transition-colors shadow-md text-sm sm:text-base">
                Kembali ke Halaman Utama
              </button>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div v-if="!quizCompleted" class="flex justify-between mt-6 sm:mt-8">
            <button 
              v-if="currentQuestion > 1 && answered" 
              @click="currentQuestion--" 
              class="bg-gray-300 text-gray-700 py-2 px-4 sm:px-6 rounded-lg hover:bg-gray-400 transition-colors shadow-md disabled:opacity-50 text-sm sm:text-base"
              :disabled="!answered"
            >
              Sebelumnya
            </button>
            <div class="flex-1"></div>
            <button 
              v-if="currentQuestion < totalQuestions && answered" 
              @click="currentQuestion++" 
              class="bg-primary text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-primary-dark transition-colors shadow-md disabled:opacity-50 text-sm sm:text-base"
              :disabled="!answered"
            >
              Selanjutnya
            </button>
            <button 
              v-if="currentQuestion === totalQuestions && answered" 
              @click="showConfirmationDialog = true" 
              class="bg-primary text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-primary-dark transition-colors shadow-md disabled:opacity-50 text-sm sm:text-base"
              :disabled="!answered"
            >
              Selesaikan
            </button>
          </div>
        </div>
      </div>
    </div>

    <BottomNav active="education" />
    <LoadingIndicator :visible="globalLoading" />

    <!-- Confirmation Dialog -->
    <div v-if="showConfirmationDialog" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm mx-auto">
        <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-primary">Konfirmasi</h3>
        <p class="text-sm sm:text-base text-secondary mb-4 sm:mb-6">Apakah Anda yakin ingin menyelesaikan kuis?</p>
        <div class="flex justify-end space-x-3 sm:space-x-4">
          <button @click="showConfirmationDialog = false" class="bg-gray-300 text-gray-700 py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-400 transition-colors text-sm sm:text-base">
            Batal
          </button>
          <button @click="confirmEndQuiz" class="bg-primary text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-primary-dark transition-colors text-sm sm:text-base">
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import BottomNav from '../components/BottomNav.vue';
import Header from '../components/Header.vue';
import LoadingIndicator from '../components/LoadingIndicator.vue';

const router = useRouter();
const globalLoading = ref(false);
const quizSelected = ref(false);
const currentQuiz = ref(1);
const currentQuizTitle = ref('');
const currentQuestions = ref([]);
const currentQuestion = ref(1);
const correctAnswers = ref(0);
const quizCompleted = ref(false);
const totalQuestions = ref(0); // Change totalQuestions to a reactive ref
const answered = ref(false);
const showConfirmationDialog = ref(false); // New reactive ref for confirmation dialog
const completedQuizzes = ref([]); // Track completed quizzes

const quizzes = [
  {
    title: 'Kuis 1: Menganalisis Sampah',
    questions: [
      {
        question: "Apakah yang dimaksud dengan sampah?",
        options: [
          "Sampah adalah limbah yang bersifat padat (solid waste), terdiri dari zat organik dan zat anorganik yang masih bermanfaat dan harus dikelola.",
          "Sampah adalah limbah cair dan sudah dapat dimanfaatkan kembali",
          "Sampah adalah limbah yang bersifat padat dan tidak perlu dikelola",
          "Sampah adalah limbah cair yang tidak berbahaya",
          "Sampah adalah limbah cair dan padat yang sangat berguna bagi kesehatan",
        ],
        correctIndex: 0,
      },
      {
        question: "Sampah diklasifikasikan menjadi....",
        options: [
          "Sampah lingkungan dan sampah masyarakat",
          "Sampah padat dan sampah cair",
          "Sampah organik dan sampah anorganik",
          "Sampah hidup dan tak hidup",
          "Sampah kaca dan sampah plastik",
        ],
        correctIndex: 2,
      },
      {
        question: "Sampah plastik dapat menyebabkan menurunnya daya dukung lingkungan. Upaya penanggulangan yang tepat terhadap hal tersebut adalah….",
        options: [
          "Melarang masyarakat menggunakan plastik",
          "Membakar sampah plastik",
          "Meneliti cara penguraian plastik",
          "Melakukan daur ulang sampah plastik",
          "Mengubur plastik ke dalam tanah",
        ],
        correctIndex: 3,
      },
      {
        question: "Penyumbang sampah terbesar bagi bumi adalah…",
        options: [
          "Sampah kegiatan rumah tangga",
          "Sampah plastik",
          "Sampah logam",
          "Sampah kaca",
          "Sampah styrofoam",
        ],
        correctIndex: 0,
      },
      {
        question: "Teknik pengelolaan sampah berbasis 6M adalah pengelolaan sampah yang terdiri atas…",
        options: [
          "Mengurangi , Menggunakan kembali, Mengganti, Memisahkan, Mendaurulang, Mengomposkan",
          "Mengurangi , Menggunakan kembali, Mengganti, Memisahkan, Mendaurulang, Membuang",
          "Mengurangi , Menggunakan kembali, Mengganti, Memisahkan, Mendaurulang, Membakar",
          "Mengurangi , Menggunakan kembali, Mengganti, Memisahkan, Mendaurulang, Menghancurkan",
          "Mengurangi , Menggunakan kembali, Mengganti, Memisahkan, Mendaurulang, Memupuk",
        ],
        correctIndex: 0,
      },
      {
        question: "Membuat barang kerajinan dari botol plastik bekas merupakan penerapan budaya…",
        options: [
          "Menambah sampah",
          "Mendaur ulang sampah",
          "Memilah sampah",
          "Mengomposkan sampah",
          "Menyelamatkan sampah",
        ],
        correctIndex: 1,
      },
      {
        question: "Membawa tumbler atau botol minum yang dapat diisi ulang adalah contoh budaya…",
        options: [
          "Mengurangi sampah plastik",
          "Mendaur ulang sampah",
          "Memilah sampah",
          "Mengomposkan sampah",
          "Membuang sampah",
        ],
        correctIndex: 0,
      },
      {
        question: "Berikut ini adalah sampah-sampah yang dapat terdegradasi/terurai secara alami oleh lingkungan, kecuali…",
        options: [
          "Kulit pisang",
          "Styrofoam",
          "Sisa sayuran",
          "Kulit jeruk",
          "Biji durian",
        ],
        correctIndex: 1,
      },
      {
        question: "Reduce, Reuse, Recycle disingkat ...",
        options: [
          "3R",
          "3C",
          "3M",
          "3E",
        ],
        correctIndex: 0,
      },
      {
        question: "Mendaur ulang sampah menjadi perlengkapan yang berguna disebut...",
        options: [
          "Reduce",
          "Reuse",
          "Recycle",
          "Remor",
        ],
        correctIndex: 2,
      },
      {
        question: "Berikut adalah dampak negatif akibat manusia membuang limbah padat sembarangan, kecuali…",
        options: [
          "Mengurangi keindahan lingkungan",
          "Dapat menurunkan kualitas tanah",
          "Berkembangnya berbagai jenis penyakit",
          "Kesuburan tanah meningkat",
          "Terjadinya banjir",
        ],
        correctIndex: 3,
      },
      {
        question: "Diantara hal-hal berkut ini yang merupakan usaha manusia untuk membina kesimbangan alam adalah …",
        options: [
          "membuka daerah pertanian baru",
          "memburu binatang-binatang liar",
          "Pengomposan daun kering",
          "memperluas daerah industri",
          "perkawinan silang",
        ],
        correctIndex: 2,
      },
      {
        question: "Berikut ini yang bukan merupakan usaha manusia untuk melestarikan lingkungan hidupnya adalah …",
        options: [
          "penggunaan insektisida biologi untuk usaha pertaniannya",
          "penerapan sistem tebang pilih untuk kayu sebagai bahan bangunan",
          "membuang sampah di pantai",
          "penerapan konsep 'panca usaha tani'",
          "pembuatan kebun plasma nutfah",
        ],
        correctIndex: 2,
      },
      {
        question: "Sampah daun kering dan sisa sayuran/buah-buahan dapat diolah menjadi…",
        options: [
          "Pupuk kimia",
          "Pupuk kandang",
          "Pupuk NPK",
          "Pupuk kompos",
          "Bahan bakar",
        ],
        correctIndex: 3,
      },
      {
        question: "Tindakan manusia yang peduli terhadap lingkungan tercermin dari tingkah laku manusia itu sendiri .Salah satu contoh tindakan peduli terhadap lingkungan adalah....",
        options: [
          "Pembangunan kawasan pariwisata dengan hotel –hotel berbintang",
          "penangkapan hewan – hewan langka yang hampir punah",
          "Sistem perairan dengan model sistem tumpang sari",
          "pemanfaatan flora dan fauna tanpa memperhatikan regenerasinya",
          "eksploitasi sumber daya alam untuk memenuhi kebutuhan manusia",
        ],
        correctIndex: 2,
      },
      {
        question: "Limbah yang berasal dari jaringan tubuh makhluk hidup dan dapat terurai disebut......sedangkan limbah yang berasal dari benda mati dan tidak dapat terurai disebut...",
        options: [
          "Limbah organik, limbah anorganik",
          "Limbah anorganik,limbah organik",
          "Limbah rumah tangga,limbah industri",
          "Limbah pertanian, limbah pertambangan",
          "Limbah pertambangan,limbah industri",
        ],
        correctIndex: 0,
      },
      {
        question: "Membawa tas, keranjang, atau kotak saat berbelanja adalah contoh budaya…",
        options: [
          "Mengurangi sampah",
          "Mendaur ulang sampah",
          "Memilah sampah",
          "Mengomposkan sampah",
          "Membuang sampah",
        ],
        correctIndex: 0,
      },
      {
        question: "Berikut ini adalah contoh kegiatan yang mencerminkan peduli lingkungan, kecuali…",
        options: [
          "Menyirami tumbuhan hijau",
          "Menebang pohon jati untuk dibuat sebagai furnitur dengan harga yang mahal",
          "Membeli makanan kecil berbungkus daun pisang",
          "Mematikan lampu ketika sudah tidak digunakan",
          "Membuka jendela daripada menggunakan kipas angin",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    title: 'Kuis 2: Pengelolaan Sampah',
    questions: [
      {
        question: 'Pengelolaan Sampah terdiri atas dua aspek yaitu?',
        options: [
          'Pengumpulan dan Penanganan Sampah',
          'Pengurangan dan Penanganan Sampah',
          'Pengumpulan dan Pengangkutan Sampah',
          'Pemilahan, Pengumpulan, Pengangkutan dan Pengolahan',
        ],
        correctIndex: 1,
      },
      {
        question: 'Apa kepanjangan dari 3R?',
        options: [
          'Refill, Replace, Reduce',
          'Reduce, Reuse, Recycle',
          'Reduce, Refuse, Refill',
          'Reuse, Refill, Recycle',
        ],
        correctIndex: 1,
      },
      {
        question: "Gambar ini termasuk kedalam jenis sampah?",
        image: "/illustrations/sampah1.jpeg", // Updated image path
        options: [
          "Organik",
          "Spesifik",
          "Anorganik",
          "Non-Organik",
        ],
        correctIndex: 0,
      },
      {
        question: 'Kepanjangan dari TPA adalah',
        options: [
          'Tempat Pengumpulan Akhir',
          'Tempat Penampungan Akhir',
          'Tempat Pemulung Akhir',
          'Tempat Pemrosesan Akhir',
        ],
        correctIndex: 3,
      },
      {
        question: 'Jarum suntik termasuk kedalam jenis sampah?',
        options: [
          'Organik',
          'Spesifik/B3',
          'Anorganik',
          'Non-Organik',
        ],
        correctIndex: 1,
      },
      {
        question: "Gambar ini termasuk ke dalam kategori pengelolaan sampah melalui konsep 3R yaitu",
        image: "/illustrations/sampah2.jpeg", // Updated image path
        options: [
          "Reuse",
          "Reduce",
          "Repair",
          "Recycle",
        ],
        correctIndex: 3,
      },
      {
        question: 'Apa Kepanjangan dari TPS?',
        options: [
          'Tempat Pengolahan Sementara',
          'Tempat Pemilahan Sementara',
          'Tempat Pemrosesan Sementara',
          'Tempat Penampungan Sementara',
        ],
        correctIndex: 3,
      },
      {
        question: 'Sampah Anorganik merupakan.......',
        options: [
          'Sampah yang mudah terurai',
          'Sampah berbahaya jika terkena pancaran sinar matahari',
          'Sampah yang terdekomposisi melalui mikroorganisme',
          'Sampah yang tidak mudah terurai',
        ],
        correctIndex: 3,
      },
      {
        question: 'Yoyo berbelanja menggunakan shopping bag, upaya yang telah dilakukan oleh yoyo adalah',
        options: [
          'Refill',
          'Reduce',
          'Reuse',
          'Recycle',
        ],
        correctIndex: 2,
      },
    ],
  },
];

// Load completed quizzes from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem('completedQuizzes');
  if (saved) {
    try {
      completedQuizzes.value = JSON.parse(saved);
    } catch (e) {
      completedQuizzes.value = [];
    }
  }
});

// Watch for changes and save to localStorage
watch(completedQuizzes, (val) => {
  localStorage.setItem('completedQuizzes', JSON.stringify(val));
}, { deep: true });

function selectQuiz(quizIndex) {
  // Prevent selecting a completed quiz
  if (completedQuizzes.value.includes(quizIndex)) return;
  quizSelected.value = true;
  currentQuiz.value = quizIndex;
  currentQuizTitle.value = quizzes[quizIndex - 1].title;
  currentQuestions.value = quizzes[quizIndex - 1].questions;
  currentQuestion.value = 1;
  correctAnswers.value = 0;
  quizCompleted.value = false;
  totalQuestions.value = currentQuestions.value.length;
}

function checkAnswer(selectedIndex) {
  if (currentQuestions.value[currentQuestion.value - 1].correctIndex === selectedIndex) {
    correctAnswers.value++;
  }

  answered.value = true; // Mark the question as answered
}

function confirmEndQuiz() {
  quizCompleted.value = true;
  showConfirmationDialog.value = false;
  // Mark quiz as completed
  if (!completedQuizzes.value.includes(currentQuiz.value)) {
    completedQuizzes.value.push(currentQuiz.value);
  }
}

function restartQuiz() {
  currentQuestion.value = 1;
  correctAnswers.value = 0;
  quizCompleted.value = false;
  answered.value = false; // Reset answered state
}

function goToMainPage() {
  quizSelected.value = false;
  answered.value = false;
}
</script>

<style>
/* ...existing styles... */
</style>

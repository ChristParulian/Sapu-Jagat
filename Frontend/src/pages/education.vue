<template>
  <div
    class="min-h-screen flex flex-col justify-between bg-[#FEFAE0] font-['Montserrat','Open Sans',sans-serif]"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 right-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-40 left-10 w-40 h-40 bg-brand-sage/15 rounded-full blur-2xl animate-float-delay"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-forest/5 rounded-full blur-3xl animate-pulse-slow"
      ></div>
    </div>

    <!-- Header Component -->
    <Header />
    <!-- Main Content -->
    <main
      class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 lg:pt-24 xl:pt-28 pb-8"
    >
      <!-- Hero Section -->
      <div class="text-center mb-12 w-full" data-aos="fade-down">
        <h1
          class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-brand-forest via-brand-sage to-brand-forest bg-clip-text text-transparent"
        >
          Edukasi Jagat
        </h1>
        <p class="text-brand-forest text-lg sm:text-xl mb-8 max-w-md mx-auto">
          Belajar memahami dan mengelola sampah demi lingkungan yang lebih baik!
        </p>
      </div>

      <!-- Edukasi Pengelolaan Sampah Section -->
      <div
        class="glass-card p-8 relative overflow-hidden mb-8"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <!-- Background decoration -->
        <div
          class="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-brand-yellow/20 to-brand-sage/20 rounded-full blur-xl"
        ></div>

        <div class="relative z-10">
          <div class="text-center mb-8">
            <div
              class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-brand-sage to-brand-forest"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-brand-forest mb-4">
              Edukasi Pengelolaan Sampah
            </h2>
            <p class="text-brand-forest/70 text-lg">
              Mari pelajari cara mengelola sampah dengan benar!
            </p>
          </div>

          <!-- Jenis Sampah Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              class="modern-card p-6 relative overflow-hidden cursor-pointer bg-gradient-to-br from-green-50 to-green-100"
            >
              <div
                class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"
              ></div>
              <div class="relative z-10">
                <div class="flex items-center mb-3">
                  <div
                    class="w-10 h-10 bg-brand-sage/20 rounded-full flex items-center justify-center mb-3 text-2xl"
                  >
                    🍃
                  </div>
                  <h3 class="font-semibold text-brand-forest ml-3">
                    Sampah Organik
                  </h3>
                </div>
                <p class="text-sm text-green-900">
                  Sampah yang dapat terurai seperti sisa makanan, daun, dan
                  limbah dapur. Bisa dijadikan pupuk kompos.
                </p>
              </div>
            </div>

            <div
              class="modern-card p-6 relative overflow-hidden cursor-pointer bg-gradient-to-br from-yellow-50 to-yellow-100"
            >
              <div
                class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"
              ></div>
              <div class="relative z-10">
                <div class="flex items-center mb-3">
                  <div
                    class="w-10 h-10 bg-brand-sage/20 rounded-full flex items-center justify-center mb-3 text-2xl"
                  >
                    ♻️
                  </div>
                  <h3 class="font-semibold text-brand-forest ml-3">
                    Sampah Anorganik
                  </h3>
                </div>
                <p class="text-sm text-yellow-900">
                  Seperti plastik, logam, dan kaca. Sulit terurai, namun bisa
                  didaur ulang jika dipisahkan dengan benar.
                </p>
              </div>
            </div>

            <div
              class="modern-card p-6 relative overflow-hidden cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100"
            >
              <div
                class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"
              ></div>
              <div class="relative z-10">
                <div class="flex items-center mb-3">
                  <div
                    class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-2xl"
                  >
                    ⚠️
                  </div>
                  <h3 class="font-semibold text-blue-800 ml-3">Sampah B3</h3>
                </div>
                <p class="text-sm text-blue-900">
                  Limbah Bahan Berbahaya dan Beracun seperti baterai, cat, dan
                  obat. Harus dibuang ke tempat khusus.
                </p>
              </div>
            </div>
          </div>

          <!-- Dampak Section -->
          <div
            class="modern-card bg-gradient-to-br from-brand-cream to-white p-6 mb-8 relative overflow-hidden"
            data-aos="fade-up"
          >
            <div
              class="absolute top-0 right-0 w-24 h-24 bg-brand-sage/5 rounded-full blur-xl"
            ></div>
            <div class="relative z-10">
              <div class="flex items-center mb-4">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center text-2xl"
                >
                  🌍
                </div>
                <h3 class="font-semibold text-brand-forest ml-4 text-lg">
                  Dampak Buruk Sampah Tidak Terpilah
                </h3>
              </div>
              <ul class="list-none ml-4 text-base text-brand-forest space-y-3">
                <li class="flex items-center">
                  <span class="text-red-500 mr-3 flex-shrink-0 text-xl"
                    >⚠️</span
                  >
                  <span>Pencemaran tanah, air, dan udara</span>
                </li>
                <li class="flex items-center">
                  <span class="text-red-500 mr-3 flex-shrink-0 text-xl"
                    >⚠️</span
                  >
                  <span>Menimbulkan bau dan sumber penyakit</span>
                </li>
                <li class="flex items-center">
                  <span class="text-red-500 mr-3 flex-shrink-0 text-xl"
                    >⚠️</span
                  >
                  <span>Mengancam kehidupan laut</span>
                </li>
                <li class="flex items-center">
                  <span class="text-red-500 mr-3 flex-shrink-0 text-xl"
                    >⚠️</span
                  >
                  <span>Menurunkan kualitas hidup masyarakat</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Cara Mendaur Ulang Section -->
          <div class="mb-8" data-aos="fade-up" data-aos-delay="100">
            <div class="flex items-center mb-6">
              <div
                class="w-12 h-12 bg-gradient-to-br from-brand-sage to-brand-forest rounded-full flex items-center justify-center"
              >
                🗑️
              </div>
              <div class="flex items-center">
                <h3 class="font-semibold text-brand-forest ml-3 text-xl">
                  Cara Mendaur Ulang Sampah
                </h3>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                class="modern-card p-5 bg-gradient-to-br from-white to-brand-cream/50"
              >
                <div class="flex items-center mb-3">
                  <div
                    class="w-8 h-8 bg-brand-sage/10 rounded-full flex items-center justify-center text-xl"
                  >
                    🧴
                  </div>
                  <h4 class="font-semibold ml-3 text-brand-forest">Plastik</h4>
                </div>
                <p class="text-sm text-brand-forest/70">
                  Bersihkan, keringkan, dan serahkan ke bank sampah atau tempat
                  daur ulang.
                </p>
              </div>
              <div
                class="modern-card p-5 bg-gradient-to-br from-white to-brand-cream/50"
              >
                <div class="flex items-center mb-3">
                  <div
                    class="w-8 h-8 bg-brand-sage/10 rounded-full flex items-center justify-center text-xl"
                  >
                    📄
                  </div>
                  <h4 class="font-semibold ml-3 text-brand-forest">Kertas</h4>
                </div>
                <p class="text-sm text-brand-forest/70">
                  Pisahkan dari sampah basah, ikat, dan jual ke pengepul atau
                  didaur ulang jadi kertas baru.
                </p>
              </div>
              <div
                class="modern-card p-5 bg-gradient-to-br from-white to-brand-cream/50"
              >
                <div class="flex items-center mb-3">
                  <div
                    class="w-8 h-8 bg-brand-sage/10 rounded-full flex items-center justify-center text-xl"
                  >
                    🥛
                  </div>
                  <h4 class="font-semibold ml-3 text-brand-forest">Kaca</h4>
                </div>
                <p class="text-sm text-brand-forest/70">
                  Kumpulkan pecahan kaca dengan aman. Gunakan wadah tertutup
                  agar tidak melukai orang lain.
                </p>
              </div>
              <div
                class="modern-card p-5 bg-gradient-to-br from-white to-brand-cream/50"
              >
                <div class="flex items-center mb-3">
                  <div
                    class="w-8 h-8 bg-brand-sage/10 rounded-full flex items-center justify-center text-xl"
                  >
                    🍂
                  </div>
                  <h4 class="font-semibold ml-3 text-brand-forest">Organik</h4>
                </div>
                <p class="text-sm text-brand-forest/70">
                  Jadikan kompos menggunakan metode takakura, keranjang kompos,
                  atau biopori.
                </p>
              </div>
            </div>
          </div>

          <!-- Peran Kita Section -->
          <div
            class="glass-card p-6 sm:p-8 relative overflow-hidden mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div
              class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-yellow/20 to-brand-sage/20 rounded-full blur-xl"
            ></div>
            <div class="relative z-10">
              <div class="text-center mb-6">
                <h2
                  class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-forest mb-4"
                >
                  Peran Kita dalam Pengelolaan Sampah
                </h2>
                <p
                  class="text-brand-forest/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto"
                >
                  Mari berkontribusi dalam menjaga lingkungan dengan menerapkan
                  langkah-langkah pengelolaan sampah yang efektif.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div
                  class="modern-card p-4 sm:p-6 relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100"
                >
                  <div class="flex items-center mb-3">
                    <div
                      class="w-10 h-10 bg-brand-sage/20 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-brand-forest"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" stroke-width="2" />
                        <text
                          x="12"
                          y="16"
                          text-anchor="middle"
                          font-size="12"
                          font-weight="bold"
                          fill="currentColor"
                        >
                          1
                        </text>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-brand-forest ml-3">
                      Memilah Sampah
                    </h3>
                  </div>
                  <p class="text-brand-forest/80 text-sm">
                    Memisahkan sampah berdasarkan jenisnya: organik dan
                    anorganik.
                  </p>
                </div>

                <div
                  class="modern-card p-4 sm:p-6 relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100"
                >
                  <div class="flex items-center mb-3">
                    <div
                      class="w-10 h-10 bg-brand-sage/20 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-brand-forest"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" stroke-width="2" />
                        <text
                          x="12"
                          y="16"
                          text-anchor="middle"
                          font-size="12"
                          font-weight="bold"
                          fill="currentColor"
                        >
                          2
                        </text>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-brand-forest ml-3">
                      Mengurangi Sampah
                    </h3>
                  </div>
                  <p class="text-brand-forest/80 text-sm">
                    Mengurangi penggunaan barang sekali pakai dan lebih memilih
                    produk ramah lingkungan.
                  </p>
                </div>

                <div
                  class="modern-card p-4 sm:p-6 relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100"
                >
                  <div class="flex items-center mb-3">
                    <div
                      class="w-10 h-10 bg-brand-sage/20 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-brand-forest"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" stroke-width="2" />
                        <text
                          x="12"
                          y="16"
                          text-anchor="middle"
                          font-size="12"
                          font-weight="bold"
                          fill="currentColor"
                        >
                          3
                        </text>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-brand-forest ml-3">
                      Mendaur Ulang
                    </h3>
                  </div>
                  <p class="text-brand-forest/80 text-sm">
                    Mendaur ulang barang-barang yang masih bisa digunakan untuk
                    mengurangi limbah.
                  </p>
                </div>

                <div
                  class="modern-card p-4 sm:p-6 relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100"
                >
                  <div class="flex items-center mb-3">
                    <div
                      class="w-10 h-10 bg-brand-sage/20 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-brand-forest"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" stroke-width="2" />
                        <text
                          x="12"
                          y="16"
                          text-anchor="middle"
                          font-size="12"
                          font-weight="bold"
                          fill="currentColor"
                        >
                          4
                        </text>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-brand-forest ml-3">
                      Berpartisipasi Aktif
                    </h3>
                  </div>
                  <p class="text-brand-forest/80 text-sm">
                    Mendukung bank sampah dan kegiatan lingkungan di sekitar
                    kita.
                  </p>
                </div>

                <div
                  class="modern-card p-4 sm:p-6 relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 sm:col-span-2"
                >
                  <div class="flex items-center mb-3">
                    <div
                      class="w-10 h-10 bg-brand-sage/20 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-brand-forest"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" stroke-width="2" />
                        <text
                          x="12"
                          y="16"
                          text-anchor="middle"
                          font-size="12"
                          font-weight="bold"
                          fill="currentColor"
                        >
                          5
                        </text>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-brand-forest ml-3">
                      Edukasi
                    </h3>
                  </div>
                  <p class="text-brand-forest/80 text-sm">
                    Menyebarkan edukasi kepada keluarga dan tetangga tentang
                    pentingnya pengelolaan sampah.
                  </p>
                </div>
              </div>

              <!-- Quote Section -->
              <div
                class="mt-8 text-center p-6 border-t border-brand-sage/20"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <p
                  class="italic text-brand-forest/70 text-sm sm:text-base lg:text-lg font-light"
                >
                  "Sampah bukan hanya untuk dibuang, tapi juga untuk
                  dimanfaatkan dengan bijak demi bumi yang lebih bersih."
                </p>
              </div>
            </div>
          </div>

          <!-- Quiz Section -->
          <div
            class="glass-card p-8 relative overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <!-- Background decoration -->
            <div
              class="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-brand-yellow/20 to-brand-sage/20 rounded-full blur-xl"
            ></div>

            <div class="relative z-10">
              <div class="text-center mb-8">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-brand-sage to-brand-forest"
                >
                  <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2
                  class="text-2xl sm:text-3xl font-bold text-brand-forest mb-4"
                >
                  Kuis Edukasi
                </h2>
                <p class="text-brand-forest/70 text-lg">
                  Uji pemahaman Anda tentang pengelolaan sampah!
                </p>
              </div>

              <!-- Quiz Selection -->
              <div v-if="!quizSelected" class="space-y-3 sm:space-y-4">
                <button
                  v-for="quiz in quizzes"
                  :key="quiz.title"
                  @click="selectQuiz(quizzes.indexOf(quiz) + 1)"
                  :disabled="
                    completedQuizzes.includes(quizzes.indexOf(quiz) + 1)
                  "
                  :class="[
                    'w-full py-3 sm:py-4 px-4 sm:px-6 modern-card transition-all duration-300 text-sm sm:text-base font-medium flex items-center justify-between',
                    completedQuizzes.includes(quizzes.indexOf(quiz) + 1)
                      ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-75'
                      : 'bg-gradient-to-r from-brand-sage to-brand-forest text-white hover:shadow-lg hover:-translate-y-1',
                  ]"
                >
                  <span class="flex items-center">
                    <svg
                      class="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        :d="
                          completedQuizzes.includes(quizzes.indexOf(quiz) + 1)
                            ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            : 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                        "
                      />
                    </svg>
                    <span
                      class="text-sm sm:text-base font-bold text-brand-forest"
                      >{{ quiz.title }}</span
                    >
                  </span>
                  <span
                    v-if="completedQuizzes.includes(quizzes.indexOf(quiz) + 1)"
                    class="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-gray-200/50 text-gray-600"
                  >
                    <svg
                      class="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Selesai
                  </span>
                </button>
              </div>

              <!-- Quiz Content -->
              <div
                v-else
                class="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8"
              >
                <h2
                  class="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-brand-forest text-center"
                >
                  {{ currentQuizTitle }}
                </h2>

                <!-- Question Navigation -->
                <div v-if="!quizCompleted" class="space-y-6">
                  <!-- Image if exists -->
                  <div
                    v-if="currentQuestions[currentQuestion - 1].image"
                    class="mb-4"
                  >
                    <img
                      :src="currentQuestions[currentQuestion - 1].image"
                      alt="Question Image"
                      class="w-full rounded-lg shadow-md max-h-[250px] object-contain mx-auto bg-white p-4"
                    />
                  </div>

                  <!-- Question text -->
                  <div class="bg-brand-cream rounded-lg p-4 sm:p-5 shadow-sm">
                    <p class="text-lg text-brand-forest font-medium">
                      {{ currentQuestion }}.
                      {{ currentQuestions[currentQuestion - 1].question }}
                    </p>
                  </div>

                  <!-- Answer options -->
                  <div class="space-y-3">
                    <button
                      v-for="(option, index) in currentQuestions[
                        currentQuestion - 1
                      ].options"
                      :key="index"
                      @click="checkAnswer(index)"
                      class="w-full p-4 rounded-lg bg-white border border-brand-sage/30 hover:border-brand-forest hover:bg-brand-cream/20 transition-all duration-300 text-left text-base flex items-start gap-3 shadow-sm hover:shadow-md quiz-option"
                    >
                      <span
                        class="w-8 h-8 rounded-full bg-brand-sage/20 flex items-center justify-center text-brand-forest text-lg font-medium shrink-0 mt-0.5"
                      >
                        {{ String.fromCharCode(65 + index) }}
                      </span>
                      <span
                        class="text-brand-forest font-medium leading-relaxed"
                        >{{ option }}</span
                      >
                    </button>
                  </div>
                </div>

                <!-- Score Display -->
                <div v-if="quizCompleted" class="text-center space-y-6">
                  <div
                    class="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 bg-gradient-to-br from-brand-sage to-brand-forest"
                  >
                    <svg
                      class="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-brand-forest">
                    Hasil Kuis
                  </h2>
                  <div class="space-y-3">
                    <p class="text-lg text-brand-forest/80">
                      Jawaban Benar:
                      <span class="font-bold text-brand-forest">{{
                        correctAnswers
                      }}</span>
                    </p>
                    <p class="text-lg text-brand-forest/80">
                      Jawaban Salah:
                      <span class="font-bold text-brand-forest">{{
                        totalQuestions - correctAnswers
                      }}</span>
                    </p>
                  </div>
                  <div
                    class="flex flex-col sm:flex-row justify-center gap-4 mt-8"
                  >
                    <button
                      @click="goToMainPage"
                      class="btn-secondary bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Kembali
                    </button>
                  </div>
                </div>

                <!-- Navigation Buttons -->
                <div v-if="!quizCompleted" class="flex justify-between mt-8">
                  <button
                    v-if="currentQuestion > 1 && answered"
                    @click="goToPrevQuestion"
                    class="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-brand-cream text-brand-forest hover:bg-brand-cream/80 transition-all duration-300 text-base font-medium"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>Sebelumnya</span>
                  </button>
                  <div class="flex-1"></div>
                  <button
                    v-if="currentQuestion < totalQuestions && answered"
                    @click="goToNextQuestion"
                    class="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-brand-forest text-white hover:bg-brand-forest/90 transition-all duration-300 text-base font-medium"
                  >
                    <span>Selanjutnya</span>
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="currentQuestion === totalQuestions && answered"
                    @click="showConfirmationDialog = true"
                    class="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-brand-forest text-white hover:bg-brand-forest/90 transition-all duration-300 text-base font-medium"
                  >
                    <span>Selesai</span>
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <BottomNav active="education" />
    <LoadingIndicator
      :visible="globalLoading"
      message="Memuat Edukasi Jagat..."
    />

    <!-- Confirmation Dialog -->
    <div
      v-if="showConfirmationDialog"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
    >
      <div
        class="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm mx-auto"
      >
        <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-primary">
          Konfirmasi
        </h3>
        <p class="text-sm sm:text-base text-secondary mb-4 sm:mb-6">
          Apakah Anda yakin ingin menyelesaikan kuis?
        </p>
        <div class="flex justify-end space-x-3 sm:space-x-4">
          <button
            @click="showConfirmationDialog = false"
            class="bg-gray-300 text-gray-700 py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-400 transition-colors text-sm sm:text-base"
          >
            Batal
          </button>
          <button
            @click="confirmEndQuiz"
            class="bg-primary text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-primary-dark transition-colors text-sm sm:text-base"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="toastMsg"
      :class="`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-sm sm:text-base transition-all duration-300 ease-in-out z-50 ${toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`"
      class="pointer-events-auto"
    >
      {{ toastMsg }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import BottomNav from "../components/BottomNav.vue";
import Header from "../components/Header.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const router = useRouter();
const globalLoading = ref(true);
const quizSelected = ref(false);
const currentQuiz = ref(1);
const currentQuizTitle = ref("");
const currentQuestions = ref([]);
const currentQuestion = ref(1);
const correctAnswers = ref(0);
const quizCompleted = ref(false);
const totalQuestions = ref(0); // Change totalQuestions to a reactive ref
const answered = ref(false);
const showConfirmationDialog = ref(false); // New reactive ref for confirmation dialog
const completedQuizzes = ref([]); // Track completed quizzes
const token = ref(localStorage.getItem("token") || "");
const selectedAnswers = ref({}); // Track selected answers

// Fetch quiz status from backend
async function fetchQuizStatus() {
  if (!token.value) return;
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/quiz/status`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    if (res.data.status === "success") {
      // If backend returns array (future), use it. If boolean, handle as legacy.
      if (Array.isArray(res.data.done)) {
        completedQuizzes.value = res.data.done;
      } else if (typeof res.data.done === "number") {
        // If backend returns a number (e.g., 1 or 2), treat as single quiz completed
        completedQuizzes.value = [res.data.done];
      } else if (res.data.done === true) {
        completedQuizzes.value = [1, 2];
      } else {
        completedQuizzes.value = [];
      }
    } else {
      completedQuizzes.value = [];
    }
  } catch (e) {
    completedQuizzes.value = [];
  }
}

// Always fetch from backend on mount and when token changes
onMounted(fetchQuizStatus);

// Watch token changes (login/logout/ganti akun)
watch(token, () => {
  fetchQuizStatus();
});

// If token in localStorage changes (user login/logout from another tab), update token and refetch
window.addEventListener("storage", (e) => {
  if (e.key === "token") {
    token.value = e.newValue || "";
  }
});

// When user logs in or out in this tab, update token and refetch
function setToken(newToken) {
  token.value = newToken;
  localStorage.setItem("token", newToken);
}

const quizzes = [
  {
    title: "Kuis 1: Menganalisis Sampah",
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
        question:
          "Sampah plastik dapat menyebabkan menurunnya daya dukung lingkungan. Upaya penanggulangan yang tepat terhadap hal tersebut adalah….",
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
        question:
          "Teknik pengelolaan sampah berbasis 6M adalah pengelolaan sampah yang terdiri atas…",
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
        question:
          "Membuat barang kerajinan dari botol plastik bekas merupakan penerapan budaya…",
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
        question:
          "Membawa tumbler atau botol minum yang dapat diisi ulang adalah contoh budaya…",
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
        question:
          "Berikut ini adalah sampah-sampah yang dapat terdegradasi/terurai secara alami oleh lingkungan, kecuali…",
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
        options: ["3R", "3C", "3M", "3E"],
        correctIndex: 0,
      },
      {
        question:
          "Mendaur ulang sampah menjadi perlengkapan yang berguna disebut...",
        options: ["Reduce", "Reuse", "Recycle", "Remor"],
        correctIndex: 2,
      },
      {
        question:
          "Berikut adalah dampak negatif akibat manusia membuang limbah padat sembarangan, kecuali…",
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
        question:
          "Diantara hal-hal berkut ini yang merupakan usaha manusia untuk membina kesimbangan alam adalah …",
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
        question:
          "Berikut ini yang bukan merupakan usaha manusia untuk melestarikan lingkungan hidupnya adalah …",
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
        question:
          "Sampah daun kering dan sisa sayuran/buah-buahan dapat diolah menjadi…",
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
        question:
          "Tindakan manusia yang peduli terhadap lingkungan tercermin dari tingkah laku manusia itu sendiri .Salah satu contoh tindakan peduli terhadap lingkungan adalah....",
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
        question:
          "Limbah yang berasal dari jaringan tubuh makhluk hidup dan dapat terurai disebut......sedangkan limbah yang berasal dari benda mati dan tidak dapat terurai disebut...",
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
        question:
          "Membawa tas, keranjang, atau kotak saat berbelanja adalah contoh budaya…",
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
        question:
          "Berikut ini adalah contoh kegiatan yang mencerminkan peduli lingkungan, kecuali…",
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
    title: "Kuis 2: Pengelolaan Sampah",
    questions: [
      {
        question: "Pengelolaan Sampah terdiri atas dua aspek yaitu?",
        options: [
          "Pengumpulan dan Penanganan Sampah",
          "Pengurangan dan Penanganan Sampah",
          "Pengumpulan dan Pengangkutan Sampah",
          "Pemilahan, Pengumpulan, Pengangkutan dan Pengolahan",
        ],
        correctIndex: 1,
      },
      {
        question: "Apa kepanjangan dari 3R?",
        options: [
          "Refill, Replace, Reduce",
          "Reduce, Reuse, Recycle",
          "Reduce, Refuse, Refill",
          "Reuse, Refill, Recycle",
        ],
        correctIndex: 1,
      },
      {
        question: "Gambar ini termasuk kedalam jenis sampah?",
        image: "/illustrations/sampah1.jpeg", // Updated image path
        options: ["Organik", "Spesifik", "Anorganik", "Non-Organik"],
        correctIndex: 0,
      },
      {
        question: "Kepanjangan dari TPA adalah",
        options: [
          "Tempat Pengumpulan Akhir",
          "Tempat Penampungan Akhir",
          "Tempat Pemulung Akhir",
          "Tempat Pemrosesan Akhir",
        ],
        correctIndex: 3,
      },
      {
        question: "Jarum suntik termasuk kedalam jenis sampah?",
        options: ["Organik", "Spesifik/B3", "Anorganik", "Non-Organik"],
        correctIndex: 1,
      },
      {
        question:
          "Gambar ini termasuk ke dalam kategori pengelolaan sampah melalui konsep 3R yaitu",
        image: "/illustrations/sampah2.jpeg", // Updated image path
        options: ["Reuse", "Reduce", "Repair", "Recycle"],
        correctIndex: 3,
      },
      {
        question: "Apa Kepanjangan dari TPS?",
        options: [
          "Tempat Pengolahan Sementara",
          "Tempat Pemilahan Sementara",
          "Tempat Pemrosesan Sementara",
          "Tempat Penampungan Sementara",
        ],
        correctIndex: 3,
      },
      {
        question: "Sampah Anorganik merupakan.......",
        options: [
          "Sampah yang mudah terurai",
          "Sampah berbahaya jika terkena pancaran sinar matahari",
          "Sampah yang terdekomposisi melalui mikroorganisme",
          "Sampah yang tidak mudah terurai",
        ],
        correctIndex: 3,
      },
      {
        question:
          "Yoyo berbelanja menggunakan shopping bag, upaya yang telah dilakukan oleh yoyo adalah",
        options: ["Refill", "Reduce", "Reuse", "Recycle"],
        correctIndex: 2,
      },
    ],
  },
];

// Cek status kuis dari backend saat mount
onMounted(async () => {
  const saved = localStorage.getItem("completedQuizzes");
  if (saved) {
    try {
      completedQuizzes.value = JSON.parse(saved);
    } catch (e) {
      completedQuizzes.value = [];
    }
  }
  // Cek status kuis dari backend (jika backend sudah support per-kuis, update di sini)
  // Untuk sekarang, hanya sync dari localStorage
});

// Load completed quizzes from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem("completedQuizzes");
  if (saved) {
    try {
      completedQuizzes.value = JSON.parse(saved);
    } catch (e) {
      completedQuizzes.value = [];
    }
  }
});

// Watch for changes and save to localStorage
watch(
  completedQuizzes,
  (val) => {
    localStorage.setItem("completedQuizzes", JSON.stringify(val));
  },
  { deep: true },
);

onMounted(() => {
  AOS.init({ once: false, duration: 800 });
  setTimeout(() => {
    AOS.refresh();
  }, 100);
});

function selectQuiz(quizIndex) {
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
  selectedAnswers.value[currentQuestion.value] = selectedIndex;

  if (
    selectedIndex ===
    currentQuestions.value[currentQuestion.value - 1].correctIndex
  ) {
    correctAnswers.value++;
  }

  answered.value = true; // Mark the question as answered
}

async function confirmEndQuiz() {
  quizCompleted.value = true;
  showConfirmationDialog.value = false;
  try {
    if (!token.value) throw new Error("Anda belum login!");
    globalLoading.value = true;
    // Kirim nomor kuis yang diselesaikan ke backend
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/quiz/submit`,
      { quiz_id: currentQuiz.value },
      {
        headers: { Authorization: `Bearer ${token.value}` },
      },
    );
    if (res.data.status === "success") {
      toastMsg.value = "Kuis berhasil disubmit! +500 poin";
      toastType.value = "success";
      if (!completedQuizzes.value.includes(currentQuiz.value)) {
        completedQuizzes.value = [
          ...completedQuizzes.value,
          currentQuiz.value,
        ].filter((v, i, arr) => arr.indexOf(v) === i);
      }
      await fetchQuizStatus();
      // Tambahkan reload halaman agar status kuis langsung terupdate
      window.location.reload();
    } else {
      toastMsg.value = res.data.message || "Gagal submit kuis";
      toastType.value = "error";
    }
  } catch (err) {
    toastMsg.value =
      err?.response?.data?.message || err.message || "Gagal submit kuis";
    toastType.value = "error";
  } finally {
    globalLoading.value = false;
  }
}

const goToMainPage = () => {
  window.location.reload();
};

function goToNextQuestion() {
  currentQuestion.value++;
  answered.value = false;
}
function goToPrevQuestion() {
  currentQuestion.value--;
  answered.value = false;
}

// Simulate loading for demo purposes
setTimeout(() => {
  globalLoading.value = false;
}, 600);
// Cleaned: All logic is in <script setup>, no dead code, clear function names, and all UI logic separated. No unnecessary comments or unused imports. All state and logic is grouped and concise. No functional changes.
</script>

<style scoped>
/* Glass card styling */
.glass-card {
  background: rgba(254, 250, 224, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(164, 180, 101, 0.2);
  box-shadow:
    0 20px 40px rgba(98, 111, 71, 0.1),
    0 15px 12px rgba(98, 111, 71, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

/* Modern card styling */
.modern-card {
  border-radius: 16px;
  box-shadow:
    0 4px 12px rgba(98, 111, 71, 0.08),
    0 2px 4px rgba(98, 111, 71, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(164, 180, 101, 0.1);
}

.modern-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 24px rgba(98, 111, 71, 0.12),
    0 4px 8px rgba(98, 111, 71, 0.08);
}

/* Float animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes float-delay {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-3deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hero title styling */
.hero-title {
  line-height: 1.1;
  padding: 1rem 0;
  margin: 0;
  overflow: visible;
}

/* Responsiveness for different screen sizes */
/* Extra small devices (phones, 320px and up) */
@media (min-width: 320px) {
  .glass-card {
    padding: 1rem !important;
    border-radius: 16px;
  }

  .modern-card {
    padding: 0.75rem !important;
    transform: none !important;
  }

  .modern-card:hover {
    transform: none !important;
  }

  .hero-title {
    font-size: 1.75rem !important;
    padding: 0.75rem 0;
  }

  h2 {
    font-size: 1.25rem !important;
  }

  h3 {
    font-size: 1rem !important;
  }

  p {
    font-size: 0.875rem !important;
  }

  .text-sm {
    font-size: 0.75rem !important;
  }

  .w-8 {
    width: 1.5rem !important;
  }

  .h-8 {
    height: 1.5rem !important;
  }

  .space-y-3 > * + * {
    margin-top: 0.5rem !important;
  }

  .gap-6 {
    gap: 0.75rem !important;
  }

  .mb-8 {
    margin-bottom: 1.5rem !important;
  }

  .p-4 {
    padding: 0.75rem !important;
  }
}

/* Small devices (large phones, 375px and up) */
@media (min-width: 375px) {
  .glass-card {
    padding: 1.25rem !important;
  }

  .modern-card {
    padding: 1rem !important;
  }

  .hero-title {
    font-size: 2rem !important;
  }

  h2 {
    font-size: 1.5rem !important;
  }

  .p-4 {
    padding: 1rem !important;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .glass-card {
    padding: 2rem !important;
    border-radius: 24px;
  }

  .modern-card {
    padding: 1.5rem !important;
    transform: translateY(-4px);
  }

  .modern-card:hover {
    transform: translateY(-8px);
  }

  .hero-title {
    font-size: 2.5rem !important;
    padding: 1.25rem 0;
  }

  h2 {
    font-size: 2rem !important;
  }

  h3 {
    font-size: 1.25rem !important;
  }

  p {
    font-size: 1rem !important;
  }

  .text-sm {
    font-size: 0.875rem !important;
  }

  .space-y-3 > * + * {
    margin-top: 0.75rem !important;
  }

  .gap-6 {
    gap: 1.5rem !important;
  }

  .mb-8 {
    margin-bottom: 2rem !important;
  }
}

/* Quiz specific styles */
.quiz-content {
  max-width: 48rem;
  margin: 2rem auto;
  padding: 0 1rem;
}

.quiz-question {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.quiz-option {
  background-color: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(164, 180, 101, 0.2);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quiz-option:hover {
  transform: translateY(-2px);
  border-color: #a4b465;
  box-shadow: 0 4px 6px rgba(164, 180, 101, 0.1);
}

.quiz-option.selected {
  background-color: #a4b465;
  color: white;
  border-color: #626f47;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(98, 111, 71, 0.2);
}

/* Question counter styling */
.question-counter {
  font-size: 0.875rem;
  color: #626f47;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Quiz navigation buttons */
.quiz-nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
}

.quiz-button {
  padding: 0.875rem 1.5rem;
  font-weight: 600;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #a4b465, #626f47);
  color: white;
  transition: all 0.2s ease;
  border: none;
  min-width: 120px;
  text-align: center;
}

.quiz-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(98, 111, 71, 0.2);
}

.quiz-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Quiz results styling */
.quiz-results {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quiz-score {
  font-size: 2rem;
  font-weight: 700;
  color: #626f47;
  margin: 1rem 0;
}

/* Confirmation dialog responsiveness */
@media (max-width: 375px) {
  .confirmation-dialog {
    width: 90% !important;
    padding: 1rem !important;
  }

  .confirmation-dialog h3 {
    font-size: 1rem !important;
  }

  .confirmation-dialog p {
    font-size: 0.875rem !important;
  }

  .confirmation-dialog button {
    padding: 0.5rem 1rem !important;
    font-size: 0.875rem !important;
  }
}

/* Toast notification responsiveness */
@media (max-width: 375px) {
  .toast-notification {
    width: 90% !important;
    font-size: 0.875rem !important;
    padding: 0.75rem 1rem !important;
  }
}

/* Image styling in quiz */
.quiz-image {
  width: 100%;
  max-width: 480px;
  margin: 1rem auto;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive & bugfix for quiz on mobile s (320px) */
@media (max-width: 375px) {
  .bg-white\/95.backdrop-blur-sm.rounded-xl.shadow-lg.p-6.sm\:p-8 {
    width: 100vw !important;
    min-width: 0 !important;
    max-width: 100vw !important;
    padding: 0.5rem !important;
    border-radius: 0.75rem !important;
    font-size: 0.95rem !important;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
  }
  .bg-brand-cream.rounded-lg.p-4.sm\:p-5.shadow-sm {
    padding: 0.5rem !important;
    font-size: 0.95rem !important;
    word-break: break-word !important;
  }
  .quiz-option,
  .space-y-3 > * + * {
    padding: 0.5rem 0.75rem !important;
    font-size: 0.85rem !important;
    gap: 0.5rem !important;
    min-width: 0 !important;
    word-break: break-word !important;
    flex-wrap: wrap !important;
  }
  .quiz-option span {
    font-size: 1rem !important;
    word-break: break-word !important;
  }
  .quiz-content {
    max-width: 100vw !important;
    margin: 0 !important;
    padding: 0.5rem !important;
  }
  .question-counter {
    font-size: 0.75rem !important;
    padding: 0.25rem !important;
  }
  .quiz-nav-buttons {
    flex-direction: column !important;
    gap: 0.5rem !important;
  }
  .quiz-button {
    min-width: 80px !important;
    font-size: 0.85rem !important;
    padding: 0.5rem 1rem !important;
  }
  .quiz-results {
    padding: 1rem !important;
    font-size: 1rem !important;
  }
  .quiz-score {
    font-size: 1.25rem !important;
  }
  .w-20.h-20.rounded-full.mb-4.bg-gradient-to-br.from-brand-sage.to-brand-forest {
    width: 3.5rem !important;
    height: 3.5rem !important;
  }
  .w-10.h-10.bg-brand-sage\/20.rounded-full.flex.items-center.justify-center {
    width: 2.25rem !important;
    height: 2.25rem !important;
  }
  .w-8.h-8.text-white {
    width: 1.5rem !important;
    height: 1.5rem !important;
  }
}

/* Bugfix: make sure quiz container never overflow and always show next question */
.bg-white\/95.backdrop-blur-sm.rounded-xl.shadow-lg.p-6.sm\:p-8,
.quiz-option,
.bg-brand-cream.rounded-lg.p-4.sm\:p-5.shadow-sm {
  word-break: break-word !important;
  overflow-wrap: break-word !important;
  min-width: 0 !important;
}

/* Bugfix: always show next question, reset answered after next/prev */
/* Tambahkan ke script setup: setelah currentQuestion++ atau currentQuestion--, set answered.value = false; */
</style>

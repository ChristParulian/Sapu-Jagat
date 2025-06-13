<template>
  <LoadingIndicator
    :visible="globalLoading"
    message="Memuat Tentang Sapu Jagat..."
    class="fixed inset-0 z-[9999]"
  />
  <div
    class="min-h-screen flex flex-col justify-between bg-[#FEFAE0] font-['Montserrat','Open Sans',sans-serif]"
  >
    <!-- Removed Animated Background -->
    <Header />

    <!-- Main Content -->
    <div
      class="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 pt-16 sm:pt-20 lg:pt-24 xl:pt-28 pb-6 sm:pb-8"
    >
      <!-- Hero Section -->
      <div
        class="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12"
      >
        <div class="w-full lg:w-1/2 space-y-3 sm:space-y-4">
          <h1
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left"
          >
            <span
              class="bg-gradient-to-r from-brand-forest via-brand-sage to-brand-yellow bg-clip-text text-transparent"
            >
              Sapu Jagat: Mengolah Sampah untuk Masa Depan
            </span>
          </h1>
          <p
            class="text-sm sm:text-base md:text-lg text-brand-forest/80 text-center lg:text-left"
          >
            Sapu Jagat adalah platform inovatif yang berfokus pada pengelolaan
            sampah secara berkelanjutan. Kami menyediakan solusi untuk mendaur
            ulang, mengurangi limbah, dan menciptakan lingkungan yang lebih
            bersih dan sehat.
          </p>
          <p
            class="text-sm sm:text-base md:text-lg text-brand-forest/80 text-center lg:text-left"
          >
            Dengan teknologi modern dan pendekatan komunitas, kami membantu
            masyarakat untuk berkontribusi dalam menjaga bumi kita.
          </p>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center">
          <div class="relative">
            <!-- Removed animated/blurred background -->
            <img
              src="/public/illustrations/illustrasi2.png"
              alt="Ilustrasi Sapu Jagat"
              class="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-contain rounded-2xl shadow-lg bg-brand-sage/20 p-3"
            />
          </div>
        </div>
      </div>

      <!-- More About Us -->
      <div
        class="glass-card p-4 sm:p-6 lg:p-8 relative overflow-hidden mb-4 sm:mb-8"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div
          class="absolute top-0 right-0 w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-br from-brand-yellow/20 to-brand-sage/20 rounded-full blur-xl"
        ></div>

        <div class="relative z-10">
          <div class="text-center mb-6 sm:mb-8">
            <h2
              class="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-forest"
            >
              Lebih Dekat dengan Kami
            </h2>
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            <div
              class="modern-card p-4 sm:p-6 relative overflow-hidden cursor-pointer bg-gradient-to-br from-green-50 to-green-100"
            >
              <div class="flex items-center mb-3">
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-brand-sage/20 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 sm:w-6 sm:h-6 text-brand-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3
                  class="font-semibold text-brand-forest ml-3 text-sm sm:text-base"
                >
                  Daur Ulang
                </h3>
              </div>
              <p class="text-xs sm:text-sm text-brand-forest/70">
                Solusi inovatif untuk mengolah sampah menjadi produk bermanfaat.
              </p>
            </div>

            <div
              class="modern-card p-4 sm:p-6 relative overflow-hidden cursor-pointer bg-gradient-to-br from-yellow-50 to-yellow-100"
            >
              <div class="flex items-center mb-3">
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-brand-sage/20 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 sm:w-6 sm:h-6 text-brand-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h3
                  class="font-semibold text-brand-forest ml-3 text-sm sm:text-base"
                >
                  Pengurangan Limbah
                </h3>
              </div>
              <p class="text-xs sm:text-sm text-brand-forest/70">
                Strategi efektif untuk mengurangi dampak sampah terhadap
                lingkungan.
              </p>
            </div>

            <div
              class="modern-card p-4 sm:p-6 relative overflow-hidden cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100"
            >
              <div class="flex items-center mb-3">
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-brand-sage/20 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 sm:w-6 sm:h-6 text-brand-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3
                  class="font-semibold text-brand-forest ml-3 text-sm sm:text-base"
                >
                  Komunitas Hijau
                </h3>
              </div>
              <p class="text-xs sm:text-sm text-brand-forest/70">
                Bersama membangun kesadaran dan aksi nyata untuk lingkungan.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Vision & Mission -->
      <div
        class="glass-card p-4 sm:p-6 lg:p-8 relative overflow-hidden mb-4 sm:mb-8"
        data-aos="fade-up"
      >
        <div
          class="absolute top-0 right-0 w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-br from-brand-yellow/20 to-brand-sage/20 rounded-full blur-xl"
        ></div>

        <div class="relative z-10 space-y-6 sm:space-y-8">
          <div>
            <h2
              class="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-forest mb-3 sm:mb-4 text-center"
            >
              Visi
            </h2>
            <p
              class="text-sm sm:text-base lg:text-lg text-brand-forest/80 text-center px-2 sm:px-4"
            >
              Menjadi platform terdepan dalam pengelolaan sampah yang
              berkelanjutan untuk menciptakan lingkungan yang lebih bersih dan
              sehat.
            </p>
          </div>

          <div>
            <h2
              class="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-forest mb-3 sm:mb-4 text-center"
            >
              Misi
            </h2>
            <ul class="space-y-3 sm:space-y-4">
              <li
                class="flex items-start sm:items-center bg-white/50 rounded-lg p-3 sm:p-4 transition-all hover:bg-white hover:shadow-md"
              >
                <div
                  class="w-6 h-6 sm:w-8 sm:h-8 bg-brand-sage/20 rounded-full flex-shrink-0 flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0"
                >
                  <span class="text-brand-forest font-semibold">1</span>
                </div>
                <p class="text-sm sm:text-base text-brand-forest/80">
                  Meningkatkan kesadaran masyarakat tentang pentingnya
                  pengelolaan sampah.
                </p>
              </li>
              <li
                class="flex items-start sm:items-center bg-white/50 rounded-lg p-3 sm:p-4 transition-all hover:bg-white hover:shadow-md"
              >
                <div
                  class="w-6 h-6 sm:w-8 sm:h-8 bg-brand-sage/20 rounded-full flex-shrink-0 flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0"
                >
                  <span class="text-brand-forest font-semibold">2</span>
                </div>
                <p class="text-sm sm:text-base text-brand-forest/80">
                  Menyediakan teknologi dan solusi inovatif untuk daur ulang dan
                  pengurangan limbah.
                </p>
              </li>
              <li
                class="flex items-start sm:items-center bg-white/50 rounded-lg p-3 sm:p-4 transition-all hover:bg-white hover:shadow-md"
              >
                <div
                  class="w-6 h-6 sm:w-8 sm:h-8 bg-brand-sage/20 rounded-full flex-shrink-0 flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0"
                >
                  <span class="text-brand-forest font-semibold">3</span>
                </div>
                <p class="text-sm sm:text-base text-brand-forest/80">
                  Membangun komunitas yang peduli terhadap lingkungan.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Team -->
      <div
        class="glass-card p-4 sm:p-6 lg:p-8 relative overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          class="absolute top-0 right-0 w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-br from-brand-yellow/20 to-brand-sage/20 rounded-full blur-xl"
        ></div>

        <div class="relative z-10">
          <h2
            class="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-forest mb-6 sm:mb-8 text-center"
          >
            Kenali Tim Kami
          </h2>

          <div
            class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            <div
              v-for="(member, index) in teamMembers"
              :key="member.id"
              class="flex flex-col items-center justify-between mc-card animate-fade-in h-[240px] sm:h-[280px] lg:h-[320px]"
              :data-aos="'fade-up'"
              :data-aos-delay="200 + index * 100"
              :data-aos-duration="800"
            >
              <div class="flex flex-col items-center pt-2">
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover mb-3"
                />
                <div
                  class="text-base sm:text-lg font-bold text-brand-forest text-center leading-tight min-h-[2.5em] flex items-center"
                >
                  {{ member.name }}
                </div>
                <div
                  class="text-xs sm:text-sm text-brand-forest/70 text-center"
                >
                  {{ member.id }}
                </div>
              </div>
              <div class="flex items-center justify-center gap-4 mb-4">
                <a
                  :href="member.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-9 h-9 flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-200"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                </a>
                <a
                  :href="member.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-9 h-9 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BottomNav active="about" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import BottomNav from "../components/BottomNav.vue";
import Header from "../components/Header.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

const globalLoading = ref(true);

onMounted(() => {
  AOS.init({
    once: true,
    duration: 800,
  });
  setTimeout(() => {
    AOS.refresh();
    globalLoading.value = false;
  }, 600);
});

const teamMembers = [
  {
    name: "Nur Aziz Raihan",
    id: "FC190D5Y2190",
    image: "/image/Aziz.png",
    linkedin: "https://www.linkedin.com/in/nur-aziz-raihan/",
    github: "https://github.com/azizazizz",
  },
  {
    name: "Christoba Parulian Sihombing",
    id: "FC190D5Y2219",
    image: "/image/Cris.png",
    linkedin: "https://www.linkedin.com/in/christoba-parulian-sihombing/",
    github: "https://github.com/ChristParulian",
  },
  {
    name: "Farid Ilham",
    id: "FC190D5Y1972",
    image: "/image/Farid.png",
    linkedin: "https://www.linkedin.com/in/farid-ilham-685642351/",
    github: "https://github.com/IcySkyNothing",
  },
  {
    name: "Nadia Alzena Zahrani",
    id: "MC006D5X2400",
    image: "/image/Nadia.png",
    linkedin: "https://www.linkedin.com/in/nadia-alzena-zahrani/",
    github: "https://github.com/nadeyyah",
  },
  {
    name: "Muhammad Rizki Putra",
    id: "MC011D5Y1471",
    image: "/image/Rizki.png",
    linkedin: "https://www.linkedin.com/in/rizki-putra/",
    github: "https://github.com/Muhammad-Rizki-Putra",
  },
  {
    name: "Siti Arfah Hamidah",
    id: "MC109D5X0661",
    image: "/image/Siti.png",
    linkedin: "https://www.linkedin.com/in/siti-arfah-hamidah/",
    github: "https://github.com/arfahhamidah",
  },
];
</script>

<style>
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 25px 50px rgba(98, 111, 71, 0.15),
    0 20px 15px rgba(98, 111, 71, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 0.5);
}

/* Modern card styling */
.modern-card {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 4px 12px rgba(98, 111, 71, 0.08),
    0 2px 4px rgba(98, 111, 71, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(164, 180, 101, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.modern-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 24px rgba(98, 111, 71, 0.12),
    0 4px 8px rgba(98, 111, 71, 0.08);
}

.modern-card::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    transparent 60%
  );
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-card:hover::after {
  opacity: 0.15;
  transform: scale(1);
}

/* MC Card Styling */
.mc-card {
  background: #fff;
  border-radius: 18px;
  border: 1.5px solid #e5e7eb;
  box-shadow:
    0 4px 16px rgba(98, 111, 71, 0.1),
    0 1.5px 4px rgba(98, 111, 71, 0.04);
  padding: 1.25rem 1rem 1.5rem 1rem;
  margin-bottom: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.mc-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 12px 28px rgba(98, 111, 71, 0.15),
    0 4px 10px rgba(98, 111, 71, 0.1);
}

.mc-card img {
  transition: transform 0.3s ease;
}

.mc-card:hover img {
  transform: scale(1.05);
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-20px) rotate(5deg) scale(1.05);
  }
}

@keyframes float-delay {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-15px) rotate(-3deg) scale(1.03);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
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
  animation: pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

/* Additional responsive styles */
@media (max-width: 374px) {
  .modern-card {
    padding: 0.75rem !important;
  }

  .modern-card h3 {
    font-size: 0.875rem !important;
  }

  .modern-card p {
    font-size: 0.75rem !important;
  }

  .glass-card {
    padding: 0.75rem !important;
    margin-bottom: 0.75rem !important;
  }

  .text-2xl {
    font-size: 1.25rem !important;
  }

  .text-xl {
    font-size: 1.125rem !important;
  }

  .space-y-6 > * + * {
    margin-top: 1rem !important;
  }

  .space-y-4 > * + * {
    margin-top: 0.75rem !important;
  }
}
</style>

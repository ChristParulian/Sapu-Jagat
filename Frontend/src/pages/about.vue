<template>
  <div class="min-h-screen flex flex-col justify-between bg-[#FEFAE0] font-primary">
    <Header />
    <!-- Main Content -->
    <div class="flex-1 w-full pt-16 sm:pt-20 lg:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Section 1: Introduction -->
        <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12 sm:mb-16">
          <div class="w-full lg:w-1/2 space-y-4">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary text-center lg:text-left">
              Sapu Jagat: Mengolah Sampah untuk Masa Depan
            </h1>
            <p class="text-base sm:text-lg text-secondary text-center lg:text-left">
              Sapu Jagat adalah platform inovatif yang berfokus pada pengelolaan sampah secara berkelanjutan. 
              Kami menyediakan solusi untuk mendaur ulang, mengurangi limbah, dan menciptakan lingkungan yang lebih bersih dan sehat.
            </p>
            <p class="text-base sm:text-lg text-secondary text-center lg:text-left">
              Dengan teknologi modern dan pendekatan komunitas, kami membantu masyarakat untuk berkontribusi dalam menjaga bumi kita.
            </p>
          </div>
          <div class="w-full lg:w-1/2 flex justify-center">
            <img 
              src="/public/logo/logo.png" 
              alt="Sapu Jagat" 
              class="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain rounded-2xl shadow-lg bg-[#A4B465] p-3 transition-transform hover:scale-105 duration-300"
            />
          </div>
        </div>

        <!-- Section 2: More About Us -->
        <div class="mb-12 sm:mb-16">
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-primary text-center mb-6 sm:mb-8">
            Lebih Dekat dengan Kami
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div class="bg-white rounded-xl shadow-md p-4 sm:p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img src="/public/icons/icons.png" alt="Daur Ulang" class="w-full h-32 sm:h-40 object-contain mb-4" />
              <h3 class="text-lg font-semibold text-primary text-center">Daur Ulang</h3>
            </div>
            <div class="bg-white rounded-xl shadow-md p-4 sm:p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img src="/public/icons/icons.png" alt="Pengurangan Limbah" class="w-full h-32 sm:h-40 object-contain mb-4" />
              <h3 class="text-lg font-semibold text-primary text-center">Pengurangan Limbah</h3>
            </div>
            <div class="bg-white rounded-xl shadow-md p-4 sm:p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:col-span-1 sm:mx-auto lg:mx-0 sm:w-1/2 lg:w-full">
              <img src="/public/icons/icons.png" alt="Komunitas Hijau" class="w-full h-32 sm:h-40 object-contain mb-4" />
              <h3 class="text-lg font-semibold text-primary text-center">Komunitas Hijau</h3>
            </div>
          </div>
        </div>

        <!-- Section 3: Vision & Mission -->
        <div class="mb-12 sm:mb-16">
          <div class="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-3xl mx-auto">
            <div class="space-y-6 sm:space-y-8">
              <div>
                <h2 class="text-xl sm:text-2xl font-bold text-primary mb-3">Visi</h2>
                <p class="text-base sm:text-lg text-secondary">
                  Menjadi platform terdepan dalam pengelolaan sampah yang berkelanjutan untuk menciptakan lingkungan yang lebih bersih dan sehat.
                </p>
              </div>
              <div>
                <h2 class="text-xl sm:text-2xl font-bold text-primary mb-3">Misi</h2>
                <ul class="text-base sm:text-lg text-secondary space-y-2 list-disc list-inside">
                  <li>Meningkatkan kesadaran masyarakat tentang pentingnya pengelolaan sampah.</li>
                  <li>Menyediakan teknologi dan solusi inovatif untuk daur ulang dan pengurangan limbah.</li>
                  <li>Membangun komunitas yang peduli terhadap lingkungan.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Meet Our Team -->
        <div>
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-primary text-center mb-6 sm:mb-8">
            Kenali Tim Kami
          </h2>
          <div class="relative px-4 sm:px-6">
            <swiper
              :modules="[Navigation, Pagination]"
              :slides-per-view="1"
              :space-between="24"
              :pagination="{ clickable: true }"
              :navigation="true"
              :breakpoints="{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                }
              }"
              class="mySwiper !pb-12"
            >
              <swiper-slide v-for="(member, index) in teamMembers" :key="index">
                <div class="bg-white rounded-xl shadow-md p-6 flex flex-col items-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <img 
                    :src="member.image" 
                    :alt="member.name" 
                    class="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-4 shadow-md transition-transform duration-300 hover:scale-105" 
                  />
                  <h3 class="text-lg font-bold text-primary text-center mb-1">{{ member.name }}</h3>
                  <p class="text-sm text-secondary text-center mb-4">{{ member.id }}</p>
                  <div class="flex items-center gap-4">
                    <a 
                      :href="member.linkedin" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      class="text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-blue-50"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      :href="member.github" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      class="text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-50"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <BottomNav active="about" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BottomNav from '../components/BottomNav.vue';
import Header from '../components/Header.vue';

const teamMembers = [
  {
    name: 'Nadia Alzena Zahrani',
    id: 'MC006D5X2400',
    image: '/image/Nadia.png',
    linkedin: 'https://www.linkedin.com/in/nadia-alzena-zahrani/',
    github: 'https://github.com/nadeyyah'
  },
  {
    name: 'Muhammad Rizki Putra',
    id: 'MC011D5Y1471',
    image: '/image/Rizki.png',
    linkedin: 'https://www.linkedin.com/in/rizki-putra/',
    github: 'https://github.com/Muhammad-Rizki-Putra'
  },
  {
    name: 'Siti Arfah Hamidah',
    id: 'MC109D5X0661',
    image: '/image/Siti.png',
    linkedin: 'https://www.linkedin.com/in/siti-arfah-hamidah/',
    github: 'https://github.com/arfahhamidah'
  },
  {
    name: 'Nur Aziz Raihan',
    id: 'FC190D5Y2190',
    image: '/image/Aziz.png',
    linkedin: 'https://www.linkedin.com/in/nur-aziz-raihan/',
    github: 'https://github.com/azizazizz'
  },
  {
    name: 'Christoba Parulian Sihombing',
    id: 'FC190D5Y2219',
    image: '/image/Cris.png',
    linkedin: 'https://www.linkedin.com/in/christoba-parulian-sihombing/',
    github: 'https://github.com/ChristParulian'
  },
  {
    name: 'Farid Ilham',
    id: 'FC190D5Y1972',
    image: '/image/Farid.png',
    linkedin: 'https://www.linkedin.com/in/farid-ilham-685642351/',
    github: 'https://github.com/IcySkyNothing'
  }
];
</script>

<style>
/* Swiper custom styling */
.swiper-pagination-bullet {
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--primary);
  opacity: 0.5;
  transition: all 0.3s;
}
.swiper-pagination-bullet-active {
  width: 0.75rem;
  height: 0.75rem;
  background-color: var(--primary);
  opacity: 1;
}
.swiper-button-next,
.swiper-button-prev {
  color: var(--primary);
  opacity: 0.75;
  transition: opacity 0.3s;
}
.swiper-button-next:hover,
.swiper-button-prev:hover {
  opacity: 1;
}
.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 1.5rem;
}

@media (min-width: 640px) {
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 1.875rem;
  }
}

@media (max-width: 640px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }
}
</style>

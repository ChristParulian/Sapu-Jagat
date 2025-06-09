<template>
  <div 
    class="z-50 fixed bottom-4 px-2 left-1/2 -translate-x-1/2 w-[95vw] max-w-lg lg:hidden"
    :class="{'sm:left-1/2 sm:-translate-x-1/2 sm:w-[95vw] sm:max-w-5xl sm:bottom-4 sm:px-0': true}"
    style="pointer-events: none;">
    <transition name="bottomnav-fade-center">
      <div 
        v-show="showNav" 
        class="bg-[#626F47] border border-accent rounded-full shadow-lg h-20 w-full origin-bottom"
        :class="{'sm:h-20 sm:max-w-5xl': true}"
        style="pointer-events: auto;">
        <div class="grid h-full max-w-lg grid-cols-5 mx-auto font-medium items-center sm:max-w-5xl">
          <!-- Home -->
          <router-link to="/dashboard" class="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95"
            :class="active==='dashboard' ? '' : ''">
            <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='dashboard' ? 'text-accent animate-bounce' : ''" :style="active==='dashboard' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"></path>
            </svg>
            <span class="nav-label text-xs transition-all duration-300" :class="[active==='dashboard' ? 'text-accent font-semibold nav-label--active' : '', active!=='dashboard' ? 'nav-label--inactive' : '']" :style="active==='dashboard' ? '' : 'color: #A4B465'">Beranda Jagat</span>
          </router-link>
          <!-- Redeem (kiri scan) -->
          <router-link to="/redeem" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
            <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='redeem' ? 'text-accent animate-bounce' : ''" :style="active==='redeem' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9.5"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.5 9.5c0-.8-.7-1.5-2.5-1.5s-2.5.7-2.5 1.5.7 1.5 2.5 1.5"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 14.5C9.5 15.3 10.2 16 12 16s2.5-.7 2.5-1.5-1.3-1.5-2.5-1.5"/>
            </svg>
            <span class="nav-label text-xs transition-all duration-300" :class="[active==='redeem' ? 'text-accent font-semibold nav-label--active' : '', active!=='redeem' ? 'nav-label--inactive' : '']" :style="active==='redeem' ? '' : 'color: #A4B465'">Dompet Jagat</span>
          </router-link>
          <!-- Scan (center) -->
          <div class="flex flex-col items-center justify-center relative w-full h-full">
            <router-link to="/scan"
              :class="[
                'inline-flex flex-col items-center justify-center w-14 h-14 rounded-full border-4 border-[#626F47] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group',
                active==='scan' ? 'bg-yellow-400' : 'bg-accent'
              ]"
              style="z-index:2; margin-top:0;">
              <svg class="w-6 h-6 transition-all duration-300 group-hover:scale-110" :style="'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </router-link>
            <span v-if="active==='scan'" class="nav-label-scan text-xs font-semibold text-yellow-400 transition-all duration-300"
              :class="'sm:absolute sm:inset-x-0 sm:bottom-2 sm:text-center sm:w-full'"
              >Scan Jagat</span>
          </div>
          <!-- Education (kanan scan) -->
          <router-link to="/education" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
            <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='education' ? 'text-accent animate-pulse' : ''" :style="active==='education' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <span class="nav-label text-xs transition-all duration-300" :class="[active==='education' ? 'text-accent font-semibold nav-label--active' : '', active!=='education' ? 'nav-label--inactive' : '']" :style="active==='education' ? '' : 'color: #A4B465'">Edukasi Jagat</span>
          </router-link>
          <!-- Tentang -->
          <router-link to="/about" class="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
            <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='about' ? 'text-accent animate-pulse' : ''" :style="active==='about' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="nav-label text-xs transition-all duration-300" :class="[active==='about' ? 'text-accent font-semibold nav-label--active' : '', active!=='about' ? 'nav-label--inactive' : '']" :style="active==='about' ? '' : 'color: #A4B465'">Tentang Jagat</span>
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const props = defineProps({
  active: String
})
const showNav = ref(true);
let lastScrollY = window.scrollY;
let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        showNav.value = false;
      } else {
        showNav.value = true;
      }
      lastScrollY = window.scrollY;
      ticking = false;
    });
    ticking = true;
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.bottomnav-fade-center-enter-active, .bottomnav-fade-center-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1);
  transform-origin: bottom center !important;
}
.bottomnav-fade-center-enter-from, .bottomnav-fade-center-leave-to {
  opacity: 0;
  transform: scale(0.7) translateY(60px);
  /* No translateX here! */
  transform-origin: bottom center !important;
}
.bottomnav-fade-center-enter-to, .bottomnav-fade-center-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
  /* No translateX here! */
  transform-origin: bottom center !important;
}

/* Hapus style yang menyebabkan slide dari kanan */
/* Tidak perlu atur left/right di transition, sudah diatur di class utama */

@media (max-width: 640px) {
  .nav-label, .nav-label-scan {
    display: none;
  }
  .nav-label--active, .nav-label-scan {
    display: inline !important;
  }
}
@media (min-width: 641px) {
  .nav-label, .nav-label-scan {
    display: none;
  }
  .nav-label--active, .nav-label-scan {
    display: inline !important;
  }
}
.nav-label-scan {
  margin-top: 0.25rem;
  position: static;
  background: transparent;
  white-space: nowrap;
  text-align: center;
}
</style>

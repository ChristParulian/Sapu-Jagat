<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 border-t border-accent h-20" style="background-color: #626F47;">
    <div class="grid h-full max-w-lg grid-cols-6 mx-auto font-medium">
      <router-link to="/dashboard" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='dashboard' ? 'text-accent animate-bounce' : ''" :style="active==='dashboard' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"></path>
        </svg>
        <span class="text-xs transition-all duration-300" :class="active==='dashboard' ? 'text-accent font-semibold' : ''" :style="active==='dashboard' ? '' : 'color: #A4B465'">Beranda Jagat</span>
      </router-link>

      <router-link to="/scan" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='scan' ? 'text-accent animate-pulse' : ''" :style="active==='scan' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span class="text-xs transition-all duration-300" :class="active==='scan' ? 'text-accent font-semibold' : ''" :style="active==='scan' ? '' : 'color: #A4B465'">Scan Jagat</span>
      </router-link>

      <router-link to="/results" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='results' ? 'text-accent animate-bounce' : ''" :style="active==='results' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-xs transition-all duration-300" :class="active==='results' ? 'text-accent font-semibold' : ''" :style="active==='results' ? '' : 'color: #A4B465'">Hasil Jagat</span>
      </router-link>      <router-link to="/redeem" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='redeem' ? 'text-accent animate-bounce' : ''" :style="active==='redeem' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9.5"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.5 9.5c0-.8-.7-1.5-2.5-1.5s-2.5.7-2.5 1.5.7 1.5 2.5 1.5"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 14.5C9.5 15.3 10.2 16 12 16s2.5-.7 2.5-1.5-1.3-1.5-2.5-1.5"/>
        </svg>
        <span class="text-xs transition-all duration-300" :class="active==='redeem' ? 'text-accent font-semibold' : ''" :style="active==='redeem' ? '' : 'color: #A4B465'">Dompet Jagat</span>
      </router-link>

      <router-link to="/education" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='education' ? 'text-accent animate-pulse' : ''" :style="active==='education' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <span class="text-xs transition-all duration-300" :class="active==='education' ? 'text-accent font-semibold' : ''" :style="active==='education' ? '' : 'color: #A4B465'">Edukasi Jagat</span>
      </router-link>

      <router-link to="/about" class="inline-flex flex-col items-center justify-center px-5 hover:bg-accent/10 group transition-all duration-300 hover:scale-105 active:scale-95">
        <svg class="w-6 h-6 mb-1 transition-all duration-300 group-hover:scale-110" :class="active==='about' ? 'text-accent animate-pulse' : ''" :style="active==='about' ? '' : 'color: #A4B465'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-xs transition-all duration-300" :class="active==='about' ? 'text-accent font-semibold' : ''" :style="active==='about' ? '' : 'color: #A4B465'">Tentang Jagat</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  active: String
})
</script>
